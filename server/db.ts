import { and, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, votes } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

/** Returns vote counts for all adIds in one query: { [adId]: count } */
export async function getVoteCounts(): Promise<Record<string, number>> {
  const db = await getDb();
  if (!db) return {};
  const rows = await db
    .select({ adId: votes.adId, count: sql<number>`count(*)` })
    .from(votes)
    .groupBy(votes.adId);
  return Object.fromEntries(rows.map(r => [r.adId, Number(r.count)]));
}

/** Returns the set of adIds the given openId has voted on */
export async function getVotedAdIds(openId: string): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({ adId: votes.adId }).from(votes).where(eq(votes.openId, openId));
  return rows.map(r => r.adId);
}

/** Toggle vote: inserts if not present, deletes if present. Returns new voted state. */
export async function toggleVote(adId: string, openId: string): Promise<{ voted: boolean }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select({ id: votes.id })
    .from(votes)
    .where(and(eq(votes.adId, adId), eq(votes.openId, openId)))
    .limit(1);
  if (existing.length > 0) {
    await db.delete(votes).where(and(eq(votes.adId, adId), eq(votes.openId, openId)));
    return { voted: false };
  } else {
    await db.insert(votes).values({ adId, openId });
    return { voted: true };
  }
}

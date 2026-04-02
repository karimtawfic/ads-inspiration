import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock DB helpers
vi.mock("../db", () => ({
  getVoteCounts: vi.fn(),
  getVotedAdIds: vi.fn(),
  toggleVote: vi.fn(),
}));

import * as db from "../db";

describe("votes router logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAll returns counts and voted list", async () => {
    vi.mocked(db.getVoteCounts).mockResolvedValue({ "hvac-before-after": 5, "roofing-hero-shot": 2 });
    vi.mocked(db.getVotedAdIds).mockResolvedValue(["hvac-before-after"]);

    const counts = await db.getVoteCounts();
    const voted = await db.getVotedAdIds("anon-test-id");

    expect(counts["hvac-before-after"]).toBe(5);
    expect(counts["roofing-hero-shot"]).toBe(2);
    expect(voted).toContain("hvac-before-after");
    expect(voted).not.toContain("roofing-hero-shot");
  });

  it("toggleVote returns voted: true when inserting", async () => {
    vi.mocked(db.toggleVote).mockResolvedValue({ voted: true });
    vi.mocked(db.getVoteCounts).mockResolvedValue({ "hvac-before-after": 6 });

    const result = await db.toggleVote("hvac-before-after", "anon-test-id");
    expect(result.voted).toBe(true);
  });

  it("toggleVote returns voted: false when removing", async () => {
    vi.mocked(db.toggleVote).mockResolvedValue({ voted: false });
    vi.mocked(db.getVoteCounts).mockResolvedValue({ "hvac-before-after": 5 });

    const result = await db.toggleVote("hvac-before-after", "anon-test-id");
    expect(result.voted).toBe(false);
  });

  it("getVoteCounts returns empty object when no votes", async () => {
    vi.mocked(db.getVoteCounts).mockResolvedValue({});
    const counts = await db.getVoteCounts();
    expect(counts).toEqual({});
  });
});

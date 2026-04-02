import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getVoteCounts, getVotedAdIds, toggleVote } from "../db";

/**
 * Votes router — anonymous voting via a browser fingerprint stored in localStorage.
 * No login required: the client sends a stable anonId (UUID generated once per browser).
 */
export const votesRouter = router({
  /** Returns { counts: {adId: number}, voted: string[] } for the given anonId */
  getAll: publicProcedure
    .input(z.object({ anonId: z.string().min(1) }))
    .query(async ({ input }) => {
      const [counts, voted] = await Promise.all([
        getVoteCounts(),
        getVotedAdIds(input.anonId),
      ]);
      return { counts, voted };
    }),

  /** Toggle vote for an adId. Returns new voted state + updated count for that ad. */
  toggle: publicProcedure
    .input(z.object({ adId: z.string().min(1), anonId: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { voted } = await toggleVote(input.adId, input.anonId);
      const counts = await getVoteCounts();
      return { voted, count: counts[input.adId] ?? 0 };
    }),
});

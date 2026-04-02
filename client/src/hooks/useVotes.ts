import { useCallback, useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";

/** Returns a stable anonymous ID for this browser, stored in localStorage */
function getAnonId(): string {
  const key = "ad_canvas_anon_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function useVotes() {
  const anonId = useRef(getAnonId()).current;

  const { data, refetch } = trpc.votes.getAll.useQuery(
    { anonId },
    { staleTime: 30_000 }
  );

  // Local optimistic state layered on top of server state
  const [optimisticCounts, setOptimisticCounts] = useState<Record<string, number>>({});
  const [optimisticVoted, setOptimisticVoted] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (data && !initialized) {
      setOptimisticCounts(data.counts);
      setOptimisticVoted(new Set(data.voted));
      setInitialized(true);
    } else if (data) {
      // Merge server state — server is source of truth after refetch
      setOptimisticCounts(data.counts);
      setOptimisticVoted(new Set(data.voted));
    }
  }, [data]);

  const toggleMutation = trpc.votes.toggle.useMutation({
    onSuccess: (result, variables) => {
      // Sync with authoritative server result
      setOptimisticCounts(prev => ({ ...prev, [variables.adId]: result.count }));
      setOptimisticVoted(prev => {
        const next = new Set(prev);
        result.voted ? next.add(variables.adId) : next.delete(variables.adId);
        return next;
      });
    },
    onError: (_err, variables) => {
      // Rollback optimistic update on error
      setOptimisticCounts(prev => {
        const prev2 = { ...prev };
        const wasVoted = optimisticVoted.has(variables.adId);
        prev2[variables.adId] = Math.max(0, (prev2[variables.adId] ?? 0) + (wasVoted ? 1 : -1));
        return prev2;
      });
      setOptimisticVoted(prev => {
        const next = new Set(prev);
        const wasVoted = next.has(variables.adId);
        wasVoted ? next.delete(variables.adId) : next.add(variables.adId);
        return next;
      });
    },
  });

  const toggleVote = useCallback(
    (adId: string) => {
      const isVoted = optimisticVoted.has(adId);
      // Optimistic update
      setOptimisticVoted(prev => {
        const next = new Set(prev);
        isVoted ? next.delete(adId) : next.add(adId);
        return next;
      });
      setOptimisticCounts(prev => ({
        ...prev,
        [adId]: Math.max(0, (prev[adId] ?? 0) + (isVoted ? -1 : 1)),
      }));
      toggleMutation.mutate({ adId, anonId });
    },
    [optimisticVoted, optimisticCounts, anonId, toggleMutation]
  );

  return {
    counts: optimisticCounts,
    voted: optimisticVoted,
    toggleVote,
    isLoading: !initialized,
  };
}

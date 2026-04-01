import { useState, useCallback } from "react";

const STORAGE_KEY = "ad_canvas_saved";

function loadSaved(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function persist(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
}

export function useSavedAds() {
  const [saved, setSaved] = useState<Set<string>>(() => loadSaved());

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persist(next);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => saved.has(id), [saved]);

  const clearAll = useCallback(() => {
    setSaved(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { saved, toggle, isSaved, clearAll };
}

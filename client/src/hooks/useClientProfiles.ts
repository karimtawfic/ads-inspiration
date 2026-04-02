/**
 * useClientProfiles
 * Manages multiple named brand parameter profiles in localStorage.
 * Each profile is a full BrandParams snapshot + a display name.
 */
import { useState, useCallback } from "react";
import type { BrandParams } from "./useBrandParams";

export interface ClientProfile {
  id: string;
  name: string;
  params: BrandParams;
  createdAt: number;
  updatedAt: number;
}

interface ProfilesState {
  profiles: ClientProfile[];
  activeId: string | null;
}

const STORAGE_KEY = "ad_canvas_client_profiles";

function load(): ProfilesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ProfilesState;
  } catch {}
  return { profiles: [], activeId: null };
}

function save(state: ProfilesState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function uid() {
  return `profile_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function useClientProfiles() {
  const [state, setState] = useState<ProfilesState>(load);

  const persist = useCallback((next: ProfilesState) => {
    setState(next);
    save(next);
  }, []);

  /** Create a new profile from the given params, set it as active */
  const createProfile = useCallback(
    (name: string, params: BrandParams): ClientProfile => {
      const profile: ClientProfile = {
        id: uid(),
        name: name.trim() || "New Client",
        params,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      persist({
        profiles: [...state.profiles, profile],
        activeId: profile.id,
      });
      return profile;
    },
    [state, persist]
  );

  /** Update the params of an existing profile */
  const updateProfile = useCallback(
    (id: string, partial: Partial<BrandParams>) => {
      persist({
        ...state,
        profiles: state.profiles.map((p) =>
          p.id === id
            ? { ...p, params: { ...p.params, ...partial }, updatedAt: Date.now() }
            : p
        ),
      });
    },
    [state, persist]
  );

  /** Rename a profile */
  const renameProfile = useCallback(
    (id: string, name: string) => {
      persist({
        ...state,
        profiles: state.profiles.map((p) =>
          p.id === id ? { ...p, name: name.trim() || p.name, updatedAt: Date.now() } : p
        ),
      });
    },
    [state, persist]
  );

  /** Delete a profile; if it was active, clear activeId */
  const deleteProfile = useCallback(
    (id: string) => {
      const remaining = state.profiles.filter((p) => p.id !== id);
      persist({
        profiles: remaining,
        activeId: state.activeId === id ? (remaining[0]?.id ?? null) : state.activeId,
      });
    },
    [state, persist]
  );

  /** Switch to a profile by id — returns its params */
  const switchProfile = useCallback(
    (id: string): BrandParams | null => {
      const profile = state.profiles.find((p) => p.id === id);
      if (!profile) return null;
      persist({ ...state, activeId: id });
      return profile.params;
    },
    [state, persist]
  );

  /** Overwrite the active profile's params (called on every brand field change) */
  const syncActiveProfile = useCallback(
    (params: BrandParams) => {
      if (!state.activeId) return;
      persist({
        ...state,
        profiles: state.profiles.map((p) =>
          p.id === state.activeId
            ? { ...p, params, updatedAt: Date.now() }
            : p
        ),
      });
    },
    [state, persist]
  );

  const activeProfile = state.profiles.find((p) => p.id === state.activeId) ?? null;

  return {
    profiles: state.profiles,
    activeId: state.activeId,
    activeProfile,
    createProfile,
    updateProfile,
    renameProfile,
    deleteProfile,
    switchProfile,
    syncActiveProfile,
  };
}

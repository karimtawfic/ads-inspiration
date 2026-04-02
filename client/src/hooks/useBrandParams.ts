import { useState, useEffect, useCallback } from "react";

export interface BrandParams {
  brandName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  language: string;
  location: string;
  season: string;
  tagline: string;
  phone: string;
  website: string;
}

const DEFAULT_PARAMS: BrandParams = {
  brandName: "",
  logoUrl: "",
  primaryColor: "#6366F1",
  secondaryColor: "#F59E0B",
  language: "English",
  location: "",
  season: "Year-round",
  tagline: "",
  phone: "",
  website: "",
};

const STORAGE_KEY = "ad_canvas_brand_params";

export function useBrandParams() {
  const [params, setParams] = useState<BrandParams>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_PARAMS, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_PARAMS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  }, [params]);

  const update = useCallback((patch: Partial<BrandParams>) => {
    setParams((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setParams(DEFAULT_PARAMS), []);

  const hasParams = Object.values(params).some((v) => v !== "" && v !== DEFAULT_PARAMS.primaryColor && v !== DEFAULT_PARAMS.secondaryColor && v !== "English" && v !== "Year-round");

  /**
   * Inject brand params into a replication prompt template.
   * Tokens: {BRAND}, {LOGO}, {PRIMARY_COLOR}, {SECONDARY_COLOR},
   *         {LANGUAGE}, {LOCATION}, {SEASON}, {TAGLINE}, {PHONE}, {WEBSITE}
   */
  const injectIntoPrompt = useCallback(
    (template: string): string => {
      return template
        .replace(/\{BRAND\}/g, params.brandName || "[Your Brand]")
        .replace(/\{LOGO\}/g, params.logoUrl || "[Logo URL]")
        .replace(/\{PRIMARY_COLOR\}/g, params.primaryColor)
        .replace(/\{SECONDARY_COLOR\}/g, params.secondaryColor)
        .replace(/\{LANGUAGE\}/g, params.language)
        .replace(/\{LOCATION\}/g, params.location || "[Your City/Region]")
        .replace(/\{SEASON\}/g, params.season)
        .replace(/\{TAGLINE\}/g, params.tagline || "[Your Tagline]")
        .replace(/\{PHONE\}/g, params.phone || "[Your Phone]")
        .replace(/\{WEBSITE\}/g, params.website || "[Your Website]");
    },
    [params]
  );

  return { params, update, reset, hasParams, injectIntoPrompt };
}

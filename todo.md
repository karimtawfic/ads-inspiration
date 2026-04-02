# Meta Ad Creative Canvas — TODO

## Option B: Agency-Grade Swipe File (AI-generated mockups)
- [x] Define 20 hand-curated ad patterns across 10 angles × 5 niches
- [x] Generate 15 high-quality AI ad creative mockups (agency-grade, AI image generation)
- [x] Upload all generated images to CDN
- [x] Build adData.ts with curated patterns + CDN image URLs

## Option C: Competitor Intelligence Tool
- [x] Build Meta Ad Library API integration (by Facebook Page URL)
- [x] Build backend tRPC route: competitor.searchByPage(pageIdentifier, country, limit)
- [x] Build Competitor Intel tab UI with results grid + replication prompts
- [x] Demo mode with mock data when META_ACCESS_TOKEN not set

## Option A: AI Generator (already built — improve quality)
- [x] Improved image generation prompts (AI-generated, not Pillow compositing)
- [x] Generate button in header opens full generator panel
- [x] Add "Generate All Angles" batch mode (sequential, progress bar, 2-col grid, save each)

## Full Canvas UI Rebuild
- [x] Rebuild Home.tsx with 2 tabs: Swipe File | Competitor Intel + Generate button
- [x] Dark intelligence board theme consistent across all tabs
- [x] All images served from CDN (no local assets)

## Tests & Delivery
- [x] Vitest tests for generate router (4 tests passing)
- [x] Vitest tests for auth.logout (1 test passing)
- [x] Vitest tests for competitor router (5 tests passing)
- [x] Save checkpoint

## Full Matrix: Every Niche × Every Angle (110 creatives)
- [x] Generate all 110 ad creative images (10 niches × 11 angles) in parallel
- [x] Upload all 110 images to CDN
- [x] Rebuild adData.ts with all 110 entries (full matrix)
- [x] Update canvas UI to support matrix view / niche grouping
- [x] Save checkpoint

## Matrix Niche Navigation
- [x] Add niche anchor scroll in matrix view (sidebar niche click scrolls to section)

## Saved Creatives
- [x] Add useSavedAds hook (localStorage, toggle, clear)
- [x] Add star button to AdCard (grid + matrix view)
- [x] Add Saved tab to header tab switcher
- [x] Build Saved tab content (grid of saved ads, empty state, clear-all)
- [x] Star state visible in detail drawer too

## Saved Tab Niche Grouping
- [x] Group saved creatives by niche in Saved tab (section headers, per-niche count)

## Active Niche Highlight on Scroll
- [x] IntersectionObserver tracks visible niche section and highlights it in sidebar (matrix mode only)

## Brand Parameters + Blueprint Editor
- [x] Create useBrandParams hook (localStorage: brandName, logoUrl, primaryColor, secondaryColor, language, location, season)
- [x] Build BrandParamsPanel component (slide-in drawer, all fields editable)
- [x] Add "Brand" button to header to open panel
- [x] Inject brand params into replication prompt template (token replacement)
- [x] Expand blueprint in detail drawer: editable hook, copy formula, trust element, CTA, replication prompt
- [x] Show brand-injected prompt preview with copy button
- [x] Show diff/highlight of injected tokens in the prompt

## Generate → Brand Params Sync
- [x] Read GenerateAdPanel fields (companyName, location, etc.)
- [x] Call useBrandParams.update() when Generate panel fields change
- [x] Show "Brand params updated" toast confirmation

## BrandParamsPanel Layout Fix
- [x] Rewrite BrandParamsPanel with clean non-overlapping layout (fields stacking/bleeding issue)

## BrandParamsPanel Layout Fix v2
- [x] Rewrite BrandParamsPanel with pure inline styles (no Tailwind flex/gap) to fix field overlap

## Brand Token Injection into Prompts
- [x] Seed all 110 replication prompts in adData.ts with {BRAND}, {LOCATION}, {SEASON}, {LANGUAGE}, {PHONE}, {WEBSITE} tokens
- [x] Verify detail drawer injection logic replaces tokens with live brand param values

## Row Density + Format Selector
- [x] Add row density control (2-6 per row) to header toolbar — replaces fixed auto-fill grid
- [x] Add per-creative format selector (1:1 / 4:5 / 9:16) on each AdCard
- [x] Apply correct aspect ratio to card image container based on selected format
- [x] Ensure 1:1 safe zone: all text/button elements in creative images stay within center square when cropped from 4:5 or 9:16
- [x] Format selector also available in detail drawer image preview

## Client Profile Switcher
- [x] Build useClientProfiles hook (CRUD: create, rename, delete, switch, list — localStorage)
- [x] Add profile switcher UI to BrandParamsPanel header (dropdown/list, add, rename, delete, active indicator)
- [x] Wire active profile into useBrandParams so switching profiles updates all brand params instantly
- [x] Auto-save current params to active profile on every field change

## Light Mode + Premium UI Overhaul
- [x] Add light/dark CSS variables to index.css
- [x] Make ThemeProvider switchable in App.tsx
- [x] Add light/dark toggle button to header
- [x] Remove format switcher (1:1/4:5/9:16) from header toolbar
- [x] Add format switcher inside detail drawer (above image preview)
- [x] Premium UI overhaul: header, sidebar, cards, drawer, typography, spacing

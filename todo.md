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

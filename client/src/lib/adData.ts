// ============================================================
// Meta Ad Creative Canvas — Ad Data
// Mix of: Real Meta Ad Library captures + SwipeFile real ads + AI-generated patterns
// All images served from CDN
// ============================================================

export type Angle =
  | "Before / After"
  | "Offer / Discount"
  | "Social Proof"
  | "Pain / FOMO"
  | "Hero Shot"
  | "Features / Benefits"
  | "Lead Magnet"
  | "UGC / Testimonial"
  | "Process / How It Works"
  | "Seasonal / Urgency"
  | "Financing / Monthly"
  | "Humor / Pattern Interrupt";

export type Niche =
  | "Remodeling"
  | "HVAC"
  | "Roofing"
  | "Pest Control"
  | "Pressure Washing"
  | "Epoxy / Flooring"
  | "Landscaping"
  | "Windows"
  | "Plumbing"
  | "Roofing / Storm";

export type Format = "Static Image" | "Carousel" | "Video" | "Lead Form";
export type SourceType = "Meta Ad Library" | "SwipeFile" | "AI Pattern";

export const ALL_ANGLES: Angle[] = [
  "Before / After",
  "Offer / Discount",
  "Social Proof",
  "Pain / FOMO",
  "Hero Shot",
  "Features / Benefits",
  "Lead Magnet",
  "UGC / Testimonial",
  "Process / How It Works",
  "Seasonal / Urgency",
  "Financing / Monthly",
  "Humor / Pattern Interrupt",
];

export const ALL_NICHES: Niche[] = [
  "Remodeling",
  "HVAC",
  "Roofing",
  "Pest Control",
  "Pressure Washing",
  "Epoxy / Flooring",
  "Landscaping",
  "Windows",
  "Plumbing",
  "Roofing / Storm",
];

export const ALL_FORMATS: Format[] = [
  "Static Image",
  "Carousel",
  "Video",
  "Lead Form",
];

export const ANGLE_COLORS: Record<Angle, string> = {
  "Before / After": "#F59E0B",
  "Offer / Discount": "#EF4444",
  "Social Proof": "#10B981",
  "Pain / FOMO": "#F97316",
  "Hero Shot": "#3B82F6",
  "Features / Benefits": "#8B5CF6",
  "Lead Magnet": "#06B6D4",
  "UGC / Testimonial": "#EC4899",
  "Process / How It Works": "#6366F1",
  "Seasonal / Urgency": "#84CC16",
  "Financing / Monthly": "#14B8A6",
  "Humor / Pattern Interrupt": "#A78BFA",
};

export const ANGLE_BG: Record<Angle, string> = {
  "Before / After": "#F59E0B18",
  "Offer / Discount": "#EF444418",
  "Social Proof": "#10B98118",
  "Pain / FOMO": "#F9731618",
  "Hero Shot": "#3B82F618",
  "Features / Benefits": "#8B5CF618",
  "Lead Magnet": "#06B6D418",
  "UGC / Testimonial": "#EC489918",
  "Process / How It Works": "#6366F118",
  "Seasonal / Urgency": "#84CC1618",
  "Financing / Monthly": "#14B8A618",
  "Humor / Pattern Interrupt": "#A78BFA18",
};

export interface AdExample {
  id: string;
  title: string;
  angle: Angle;
  niche: Niche;
  format: Format;
  imageUrl: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: SourceType;
  advertiser?: string;
  whyItWorks: string;
  hook: string;
  copyFormula: string;
  trustElement: string;
  ctaType: string;
  replicationPrompt: string;
}

export const AD_EXAMPLES: AdExample[] = [
  // ─── REAL ADS — Meta Ad Library ───────────────────────────────────────────
  {
    id: "real-hvac-sunglow",
    title: "AC Service — Humor / Pattern Interrupt (Real Ad)",
    angle: "Humor / Pattern Interrupt",
    niche: "HVAC",
    format: "Static Image",
    sourceType: "SwipeFile",
    sourceName: "SwipeFile — Sun Glow Heating & Cooling",
    sourceUrl: "https://swipefile.com/dont-sweat-it-service-your-ac-now",
    advertiser: "Sun Glow Heating & Cooling (Portland, OR)",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hvac_sunglow_fridge_d824562a.png",
    hook: "READY FOR THE SUMMER HEAT?",
    whyItWorks:
      "Woman lying on kitchen floor in front of open fridge = instant pattern interrupt. Nobody expects this image in a home services ad. The humor is relatable — every homeowner has felt this way. The QR code for scheduling reduces friction to zero. 'Since 1972' in one line establishes 50+ years of authority. The problem is shown visually, not stated — 10x more powerful than text.",
    copyFormula:
      "Relatable pain (shown visually, not stated) → Humor that creates shareability → Authority signal (years in business) → Zero-friction CTA (QR code). The humor does the targeting — only people with AC problems will care.",
    trustElement:
      "'Keeping your home comfortable since 1972' — decades of authority in one line. Phone number large and readable. QR code for instant scheduling. Social handles for credibility.",
    ctaType:
      "Scan QR / Call direct — dual-path CTA serves both digital-native and phone-preferring demographics",
    replicationPrompt: `REPLICATION PROMPT — Humor / Pattern Interrupt (HVAC)

Platform: Facebook / Instagram Feed
Format: Static Image 4:5 (1080×1350px)
Advertiser: [COMPANY NAME] — [CITY]

VISUAL SPEC:
• Top banner: "READY FOR THE SUMMER HEAT?" — bold white caps on dark navy bar
• Hero image: person lying on kitchen floor in front of open refrigerator, stealing cold air (humorous, relatable, real photo not stock)
• Bottom section: company logo + name prominently displayed
• Tagline: "Keeping your home comfortable since [YEAR]"
• Phone number: large, readable
• QR code: bottom right corner for instant scheduling
• Social handles: Facebook + Twitter icons

COPY (Primary Text):
Don't sweat it. 🥵 If you're eyeing your fridge like a personal cooling station, your AC has officially waited too long for a checkup. Get your AC serviced before the heat hits — book in 60 seconds.

HEADLINE: Don't Sweat It. Service Your AC Now.
CTA: Book Now

NEGATIVE PROMPTS:
• No stock photo models
• No generic blue/white HVAC imagery
• No corporate tone
• No fake urgency ("limited time!")

VARIANTS TO TEST:
1. Same layout, different humor image: person in front of freezer eating ice cream
2. Same layout, dog lying on tile floor panting
3. Serious version: before/after energy bill comparison`,
  },
  {
    id: "real-hvac-empire",
    title: "HVAC $95/Month Financing Anchor (Real Ad)",
    angle: "Financing / Monthly",
    niche: "HVAC",
    format: "Static Image",
    sourceType: "SwipeFile",
    sourceName: "SwipeFile — Empire Plumbing & Air Conditioning",
    sourceUrl: "https://swipefile.com/family-owned-hvac-from-95-per-month-oac",
    advertiser: "Empire Plumbing and Air Conditioning (Arizona)",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hvac_empire_95mo_12821c84.png",
    hook: "NEW HVAC SYSTEMS AS LOW AS $95/MO O.A.C.",
    whyItWorks:
      "The monthly price dominates the visual hierarchy — $95/MO in massive yellow typography is impossible to miss. Monthly framing converts a $6,000+ purchase into a digestible $95 decision. O.A.C. qualifier keeps it legally clean without killing the hook. 'Family Owned & Locally Operated' adds trust and warmth in one line. Product image (actual HVAC units) makes the offer concrete and real.",
    copyFormula:
      "Monthly price anchor (not total price) → Product photo (makes it tangible) → Local trust signal → Soft qualifier (O.A.C.) → CTA. The price is the entire creative — everything else is trust scaffolding.",
    trustElement:
      "Family Owned & Locally Operated badge. Circular logo treatment signals established brand. Product photo (actual units) = no ambiguity about what you're buying.",
    ctaType:
      "Send Message — low-friction Facebook native CTA that keeps the lead in-platform",
    replicationPrompt: `REPLICATION PROMPT — Financing / Monthly Price Anchor (HVAC)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)
Advertiser: [COMPANY NAME] — [CITY]

VISUAL SPEC:
• Background: deep navy blue (#002B5C or similar)
• Company logo: centered top, circular badge treatment, white on dark
• Dominant text: "NEW HVAC SYSTEMS AS LOW AS" — white bold caps, 36px
• PRICE: "$[XX]/MO" — massive yellow/gold text, 96px+, bold, high contrast
• Qualifier: "O.A.C." — smaller white text below price
• Product image: actual HVAC unit (outdoor condenser) — right side or bottom
• Bottom strip: "[COMPANY] — Family Owned & Locally Operated" — white italic on dark bar

COPY (Primary Text):
[CITY] heat is no joke — neither are we. Get a brand-new HVAC system installed for as low as $[XX]/month O.A.C. Family-owned, locally operated, zero hassle.

HEADLINE: New HVAC from $[XX]/mo — Family Owned & Installed
CTA: Send Message / Get Quote

NEGATIVE PROMPTS:
• Never show total price ($6,000+) — always monthly
• No stock photos of smiling families
• No cluttered layouts — price must dominate

VARIANTS TO TEST:
1. "$0 Down + $[XX]/mo" — zero-down anchor
2. "Beat the [CITY] Heat for $[XX]/mo" — seasonal + price
3. Carousel: Slide 1 (price) → Slide 2 (what's included) → Slide 3 (financing options)`,
  },
  {
    id: "real-hvac-library",
    title: "HVAC — Active Ads Landscape (Meta Library)",
    angle: "Social Proof",
    niche: "HVAC",
    format: "Static Image",
    sourceType: "Meta Ad Library",
    sourceName: "Meta Ad Library — HVAC Service (US, sorted by impressions)",
    sourceUrl:
      "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=HVAC+service&search_type=keyword_unordered&media_type=image&sort_data[mode]=total_impressions&sort_data[direction]=desc",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/meta_library_hvac_screenshot_5eb6284f.png",
    hook: "Professional. Knowledgeable. 5-Star Service.",
    whyItWorks:
      "Social proof headline uses customer language verbatim — more credible than brand claims. Low-barrier offer ($7 home warranty) removes risk objection entirely. Smiling customer photo creates emotional connection. Star rating visible in ad copy reinforces credibility. Multiple active advertisers visible — shows the competitive landscape and dominant formats currently winning.",
    copyFormula:
      "Customer-voice adjectives as headline → Visual trust (smiling customer) → Low-barrier offer → Star rating → CTA. The customer's words in the headline are more persuasive than any brand claim.",
    trustElement:
      "5-star rating + customer language in headline + branded technician uniform. The combination of customer voice + visual proof + rating is the highest-trust stack for home services.",
    ctaType: "Learn More — appropriate for cold audiences who need more context",
    replicationPrompt: `REPLICATION PROMPT — Social Proof / Customer Voice (HVAC)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)
Advertiser: [COMPANY NAME] — [CITY]

VISUAL SPEC:
• Background: clean white or light gray
• Hero image: smiling homeowner with technician in branded uniform (trust + warmth)
• Headline overlay: "[CUSTOMER ADJECTIVE]. [CUSTOMER ADJECTIVE]. [X]-Star Service." — dark bold text
• Subtext: "Words our customers use to describe us"
• Star rating (★★★★★) prominently displayed
• Review count: "[X]+ Reviews"
• Company logo + name bottom left
• CTA button: "Get a Free Quote"

COPY (Primary Text):
"[Verbatim customer quote — specific, emotional, includes an objection overcome]" — [First Name], [City]

See why [X]+ [CITY] homeowners trust [COMPANY] for all their HVAC needs.

HEADLINE: [X]-Star HVAC Service in [CITY]
CTA: Get a Free Quote

NEGATIVE PROMPTS:
• No generic quotes ("Great service!")
• No stock photos of models
• No made-up review counts

VARIANTS TO TEST:
1. Google review screenshot as the entire creative (native feel)
2. 3-review grid: three short quotes + names + stars
3. Video: customer talking to camera (UGC style)`,
  },
  {
    id: "real-roofing-library",
    title: "Roofing — Free Estimate Active Ads (Meta Library)",
    angle: "Lead Magnet",
    niche: "Roofing",
    format: "Carousel",
    sourceType: "Meta Ad Library",
    sourceName: "Meta Ad Library — Roofing Free Estimate (US, sorted by impressions)",
    sourceUrl:
      "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=roofing+free+estimate&search_type=keyword_unordered&media_type=image&sort_data[mode]=total_impressions&sort_data[direction]=desc",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/meta_roofing_860e5651.png",
    hook: "Attention [CITY] Homeowners 🏠 — Get Your FREE Roof Estimate Today",
    whyItWorks:
      "Geo-targeted headline creates instant relevance. 'FREE' removes the #1 objection before it forms. Carousel format shows multiple proof points: free estimate + years of experience + warranty. Checklist visual (✓ Family Owned, ✓ Factory Trained, ✓ Full Confidence Warranty) builds trust fast. 'Schedule in Seconds' reduces friction and implies ease.",
    copyFormula:
      "Geo hook (Attention [CITY] Homeowners) → Free offer → Proof checklist → Social proof → Urgency → CTA. The geo hook is the most important element — it creates immediate relevance before the brain can scroll.",
    trustElement:
      "Family Owned + Licensed + Warranty + Years of experience + Free estimate. The checklist format makes trust signals scannable in under 2 seconds.",
    ctaType:
      "Get Quote — short, direct, no ambiguity. 'Get Quote' outperforms 'Learn More' for high-intent roofing audiences.",
    replicationPrompt: `REPLICATION PROMPT — Free Estimate / Lead Magnet (Roofing)

Platform: Facebook / Instagram Feed
Format: Carousel (3 slides) — 1:1 (1080×1080px each)
Advertiser: [COMPANY NAME] — [CITY]

SLIDE 1 — HOOK:
• Dark background with dramatic roofing photo (aerial or close-up of quality shingles)
• Large text overlay: "GET A FREE ROOFING ESTIMATE TODAY" — bold white/yellow
• Subtext: "Attention [CITY] Homeowners 🏠"
• CTA button: "Get Quote"

SLIDE 2 — PROOF CHECKLIST:
• Clean dark background
• Checklist:
  ✓ Family Owned & Licensed
  ✓ [X]+ Years of Experience
  ✓ Full Confidence Warranty
  ✓ Quick & Easy Financing Available
• Company logo + "[X] Years of Experience" badge

SLIDE 3 — SOCIAL PROOF:
• 5-star review screenshot or testimonial
• Customer name + city
• Photo of completed roof (aerial preferred)
• CTA: "Schedule Your Free Estimate"

COPY (Primary Text):
Attention [CITY] Homeowners 🏠

We've replaced [X]+ roofs in [CITY]. Family-owned, fully licensed, and backed by a full warranty. Schedule your FREE estimate — we'll come to you.

HEADLINE: Free Roof Estimate — [CITY] Homeowners
CTA: Get Quote

VARIANTS TO TEST:
1. Storm damage angle: "Did the last storm damage your roof?"
2. Insurance angle: "We help you navigate your insurance claim"
3. Urgency: "Only [X] free estimates left this month"`,
  },
  {
    id: "real-pest-library",
    title: "Pest Control — Active Lead Gen Ads (Meta Library)",
    angle: "Pain / FOMO",
    niche: "Pest Control",
    format: "Static Image",
    sourceType: "Meta Ad Library",
    sourceName: "Meta Ad Library — Pest Control Service (US, sorted by impressions)",
    sourceUrl:
      "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=pest+control+service&search_type=keyword_unordered&media_type=image&sort_data[mode]=total_impressions&sort_data[direction]=desc",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/meta_pest_control_93bbe5c2.png",
    hook: "Bugs In Your [CITY] Home? Here's What To Do.",
    whyItWorks:
      "Pain-first hook triggers immediate emotional response (disgust/urgency). Guarantee removes risk objection entirely. 'Fast' addresses the urgency of the problem. Technician in uniform builds trust. Simple, direct CTA with no ambiguity. The pest image creates visceral urgency that no copy can replicate.",
    copyFormula:
      "Pain hook (question format) → Solution statement → Guarantee → Speed signal → CTA. The question format engages the reader's self-assessment instinct — if they have bugs, they feel called out.",
    trustElement:
      "Money-back guarantee + Pet-safe badge + Same-day service + Licensed & Insured. The guarantee is the most important element — it removes the 'what if it doesn't work' objection.",
    ctaType:
      "Book Free Inspection — 'Free Inspection' is a low-commitment entry point that qualifies leads",
    replicationPrompt: `REPLICATION PROMPT — Pain / FOMO (Pest Control)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)
Advertiser: [COMPANY NAME] — [CITY]

VISUAL SPEC:
• Split layout: left side — close-up pest image (ants, roaches, or mosquitoes — creates urgency)
• Right side — smiling uniformed technician OR clean pest-free home
• OR: Full-bleed photo of clean home with overlay text
• Headline overlay: "BUGS IN YOUR [CITY] HOME?" — bold, high-contrast
• Subtext: "We eliminate them. Guaranteed."
• Green checkmark badges: ✓ Same-Day Service ✓ Pet Safe ✓ 100% Guaranteed
• Company logo + phone number
• CTA button: "Book Free Inspection"

COPY (Primary Text):
Seeing bugs in your [CITY] home? 🪲

[COMPANY] eliminates [pest type] fast — same-day service available. Pet-safe treatments, 100% satisfaction guaranteed. Book your free inspection today.

HEADLINE: [CITY] Pest Control — Free Inspection
CTA: Book Free Inspection

VARIANTS TO TEST:
1. Neighbor FOMO: "Your neighbors on [Street] got treated this week. Are you next?"
2. Seasonal: "Termite season peaks in [Month]. Is your home protected?"
3. Damage angle: split image — cozy home vs. structural termite damage`,
  },
  {
    id: "real-plumbing-library",
    title: "Plumbing — Branded Vehicle + Trust (Meta Library)",
    angle: "Hero Shot",
    niche: "Plumbing",
    format: "Static Image",
    sourceType: "Meta Ad Library",
    sourceName: "Meta Ad Library — Plumbing Free Estimate (US, sorted by impressions)",
    sourceUrl:
      "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=plumbing+free+estimate&search_type=keyword_unordered&media_type=image&sort_data[mode]=total_impressions&sort_data[direction]=desc",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/meta_plumbing_12770ce7.png",
    hook: "Fast Service & Quality Work — That's What We Were Built On.",
    whyItWorks:
      "Branded vehicle photo (van/truck) is one of the highest-trust visuals in home services — it signals a real, established business. Founding story copy creates emotional connection. Speed + quality combination addresses the two primary homeowner concerns. Clean, professional look signals reliability before a word is read. Simple 'Learn More' CTA works for cold audiences.",
    copyFormula:
      "Brand authority statement → Founding story (emotional connection) → Speed + quality promise → Trust badges → CTA. The vehicle photo does the trust work — copy just needs to reinforce it.",
    trustElement:
      "Branded vehicle with logo + Licensed & Insured + 24/7 Emergency + Upfront Pricing. The branded vehicle is the single most effective trust signal for plumbing — it signals a real, professional operation.",
    ctaType:
      "Get a Free Estimate — zero commitment, removes the 'what will it cost?' objection before it forms",
    replicationPrompt: `REPLICATION PROMPT — Hero Shot / Brand Authority (Plumbing)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 or 4:5 (1080×1080px or 1080×1350px)
Advertiser: [COMPANY NAME] — [CITY]

VISUAL SPEC:
• Hero image: branded company van/truck parked in front of a suburban home (clean, professional, daytime)
• Company logo prominently displayed on vehicle
• Headline overlay: "FAST SERVICE. QUALITY WORK." — bold white text on dark overlay
• Subtext: "Serving [CITY] since [YEAR]"
• Trust badges bottom strip: ✓ Licensed & Insured ✓ 24/7 Emergency ✓ Upfront Pricing
• Phone number large and readable
• CTA button: "Get a Free Estimate"

COPY (Primary Text):
Fast service and quality work — that's what [COMPANY] has been built on since [YEAR].

Licensed, insured, upfront pricing. No surprise bills. No waiting. [CITY]'s most trusted plumber.

HEADLINE: [CITY] Plumbing — Fast, Reliable, Upfront Pricing
CTA: Get a Free Estimate

VARIANTS TO TEST:
1. Emergency angle: "Burst pipe at 2am? We answer." — 24/7 focus
2. Price transparency: "See your price before we start. Always."
3. Speed: "We're [X] minutes from your [CITY] home right now."`,
  },
  {
    id: "real-landscaping-library",
    title: "Landscaping — Before/After Carousel (Meta Library)",
    angle: "Before / After",
    niche: "Landscaping",
    format: "Carousel",
    sourceType: "Meta Ad Library",
    sourceName: "Meta Ad Library — Landscaping Lawn Care (US, sorted by impressions)",
    sourceUrl:
      "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=landscaping+lawn+care&search_type=keyword_unordered&media_type=image&sort_data[mode]=total_impressions&sort_data[direction]=desc",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/meta_landscaping_f1e6ea6f.png",
    hook: "Transform Your Yard This Season — See What Your Neighbors Are Saying",
    whyItWorks:
      "Before/after carousel is the highest-converting format for visual transformation services. Neighbor social proof creates FOMO. Same-week availability reduces the 'I'll do it later' objection. Seasonal hook creates natural urgency. Visual transformation is the product — the ad shows the result, not the process.",
    copyFormula:
      "Visual transformation (before → after) → Neighbor FOMO → Seasonal urgency → Same-week availability → Free estimate → CTA. The carousel format forces engagement — each swipe is a micro-commitment.",
    trustElement:
      "Before/after photos + review count + same-week availability + free estimate. The before/after is the trust element — it proves capability without any claims.",
    ctaType:
      "Get Free Quote — direct, removes the 'how much will this cost?' barrier immediately",
    replicationPrompt: `REPLICATION PROMPT — Before / After Carousel (Landscaping)

Platform: Facebook / Instagram Feed
Format: Carousel (3 slides) — 1:1 (1080×1080px each)
Advertiser: [COMPANY NAME] — [CITY]

SLIDE 1 — BEFORE:
• Photo: overgrown, neglected yard (real job photo, not stock)
• Text overlay: "BEFORE" — bold red/orange, top left
• Subtext: "Sound familiar?"
• Arrow pointing right (implies swipe)

SLIDE 2 — AFTER:
• Photo: same yard (or similar) after professional landscaping
• Text overlay: "AFTER" — bold green, top left
• Subtext: "[COMPANY NAME] — [CITY]'s Top-Rated Lawn Care"
• Star rating overlay: ★★★★★ [X]+ Reviews

SLIDE 3 — OFFER:
• Clean background
• "FREE ESTIMATE + Same-Week Service Available"
• 5-star rating + review count
• CTA: "Get Your Free Quote"

COPY (Primary Text):
See what your [CITY] neighbors are saying about [COMPANY]. 🌿

We transform overgrown, neglected yards into show-stopping outdoor spaces. [X]+ happy customers. Free estimates. Same-week service available.

HEADLINE: [CITY] Lawn Care — Free Estimate This Week
CTA: Get Free Quote

VARIANTS TO TEST:
1. Drone aerial before/after — shows full property scope
2. Time-lapse video: 30-second transformation
3. Neighbor FOMO: "3 homes on [Street] just got transformed. Yours next?"`,
  },
  {
    id: "real-remodeling-library",
    title: "Home Remodeling — Bathroom Transformation (Meta Library)",
    angle: "Before / After",
    niche: "Remodeling",
    format: "Carousel",
    sourceType: "Meta Ad Library",
    sourceName: "Meta Ad Library — Home Remodeling Bathroom (US, sorted by impressions)",
    sourceUrl:
      "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=home+remodeling+bathroom&search_type=keyword_unordered&media_type=image&sort_data[mode]=total_impressions&sort_data[direction]=desc",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/meta_remodeling_94827431.png",
    hook: "From This → To This. See What Your Bathroom Could Look Like.",
    whyItWorks:
      "'From This → To This' is the simplest, most effective before/after hook in remodeling. Financing available removes the #1 objection (cost) for high-ticket services. Free design consultation is a low-risk lead magnet that attracts serious buyers. Visual transformation does the selling — copy handles objections.",
    copyFormula:
      "Visual transformation hook → Portfolio proof → Financing objection removal → Free consultation → CTA. The financing callout is the most important element for high-ticket remodeling — it converts 'I can't afford it' into 'I can afford $X/month'.",
    trustElement:
      "Before/after photos + financing available + free consultation + project portfolio. The portfolio is the trust element — it proves capability at scale.",
    ctaType:
      "Book Free Consultation — 'consultation' implies expertise and personalization, not just a sales call",
    replicationPrompt: `REPLICATION PROMPT — Before / After + Financing (Remodeling)

Platform: Facebook / Instagram Feed
Format: Carousel (3 slides) — 1:1 (1080×1080px each)
Advertiser: [COMPANY NAME] — [CITY]

SLIDE 1 — HOOK:
• Split image: old bathroom (left) → new bathroom (right)
• Arrow between them: "→"
• Text overlay: "FROM THIS → TO THIS"
• Subtext: "[COMPANY NAME] — [CITY] Remodeling"

SLIDE 2 — PORTFOLIO:
• 3-4 high-quality photos of completed projects
• Each with project type label: "Master Bath • Kitchen • Basement"
• Star rating overlay

SLIDE 3 — OFFER:
• Clean background
• "FREE DESIGN CONSULTATION"
• "Financing Available — 0% for [X] months"
• CTA: "Book Your Free Consultation"

COPY (Primary Text):
[CITY] homeowners — see what your bathroom could look like. 🛁

[COMPANY] has transformed [X]+ homes in [CITY]. Financing available. Free design consultation with no obligation. See your new space before we start.

HEADLINE: [CITY] Remodeling — Free Design Consultation
CTA: Book Free Consultation

VARIANTS TO TEST:
1. Accessibility angle: walk-in shower, grab bars — targets 55+ segment
2. ROI angle: "This bathroom renovation added $[X] to their home value"
3. Speed: "Complete bathroom remodel in [X] days — guaranteed"`,
  },

  // ─── AI PATTERN EXAMPLES ──────────────────────────────────────────────────
  {
    id: "pattern-before-after",
    title: "Kitchen Remodel — Split Before/After + Free Quote Hook",
    angle: "Before / After",
    niche: "Remodeling",
    format: "Static Image",
    sourceType: "AI Pattern",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_before_after-Ke9YU7xbaSEpyfVJcqvjgM.webp",
    hook: "Transform Your Kitchen in 14 Days",
    whyItWorks:
      "The split-screen creates an instant visual contrast that stops the scroll. The brain processes transformation imagery in under 150ms. The 'BEFORE' label anchors the pain state, while 'AFTER' delivers the aspiration. The bottom bar consolidates all trust signals (stars, count, CTA) into one scannable strip — reducing cognitive load at the decision moment.",
    copyFormula:
      "Visual transformation + time-bound promise + social proof count + zero-risk CTA. The number '14 Days' creates a specific, believable timeline that generic 'fast service' claims can't match.",
    trustElement:
      "847 Homeowners Served (volume = social proof) + 5-star rating. Both are in the same visual zone as the CTA to reduce friction.",
    ctaType: "Get Free Quote — zero commitment, low friction",
    replicationPrompt: `REPLICATION PROMPT — Before / After (Remodeling)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)

VISUAL SPEC:
• Left half: "BEFORE" label + photo of outdated kitchen/bathroom (real job photo)
• Right half: "AFTER" label + photo of completed renovation
• Dividing line or arrow between halves
• Bottom bar (dark): Logo left | ★★★★★ [X] Reviews center | "Get Free Quote" button right
• Headline overlay top: "[SPECIFIC TIMEFRAME] Transformation"

COPY:
Headline: Transform Your [Room] in [X] Days
Body: [X]+ homeowners in [CITY] have trusted us. Free quote, no obligation.
CTA: Get Free Quote

VARIANTS:
1. Bathroom before/after
2. Flooring before/after
3. Exterior before/after`,
  },
  {
    id: "pattern-offer-discount",
    title: "HVAC — $500 Off Offer + Urgency + Technician Hero",
    angle: "Offer / Discount",
    niche: "HVAC",
    format: "Static Image",
    sourceType: "AI Pattern",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_offer_discount-3ZLNYmZjYubTZ9autivnm5.webp",
    hook: "$500 OFF New AC Installation",
    whyItWorks:
      "The dollar amount dominates the visual hierarchy — it's the first thing the eye lands on. The technician photo humanizes the brand and signals professionalism. The red urgency banner creates scarcity. The bottom trust strip (BBB, stars, phone, CTA) handles all objections in one row. The 0% financing starburst removes the biggest barrier to high-ticket service purchases.",
    copyFormula:
      "Dominant offer number + service name + urgency deadline + financing objection removal + trust badges + CTA. The offer is the entire creative — copy is secondary.",
    trustElement:
      "BBB A+ badge + 5-star rating + phone number. The BBB badge specifically converts skeptical homeowners who've been burned before.",
    ctaType: "Book Now — Free Estimate (dual benefit: book + free)",
    replicationPrompt: `REPLICATION PROMPT — Offer / Discount (HVAC)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)

VISUAL SPEC:
• Background: deep navy blue
• Dominant text: "$[AMOUNT] OFF [SERVICE]" — largest element on canvas, yellow/white
• Technician photo: branded uniform, smiling, professional
• Red urgency banner: "Expires [DATE]" or "This Week Only"
• Starburst badge top-right: "0% Financing Available"
• Bottom trust strip: BBB logo | ★★★★★ | Phone number | CTA button

COPY:
Headline: $[AMOUNT] Off [Service] — This Week Only
Body: [X]+ installs in [CITY]. Licensed, insured, 0% financing available.
CTA: Book Now — Free Estimate

VARIANTS:
1. Percentage off: "20% OFF Any Repair"
2. Free add-on: "Free Thermostat with Any Install"
3. Bundle: "$[X] OFF When You Book AC + Furnace"`,
  },
  {
    id: "pattern-social-proof",
    title: "Roofing — Facebook Post Style Social Proof Wall",
    angle: "Social Proof",
    niche: "Roofing",
    format: "Static Image",
    sourceType: "AI Pattern",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_social_proof-VPjhfmxwec2Xt9d7cS5bgk.webp",
    hook: '"They replaced our entire roof in one day. No mess, no stress."',
    whyItWorks:
      "Rendered as a native Facebook post — not an ad — which dramatically reduces ad blindness. The quote is specific, emotional, and uses real objections ('no mess, no stress'). The circular profile photo adds authenticity. The completed roof photo provides visual proof of quality. The Google rating with review count is the most trusted social proof signal for home services.",
    copyFormula:
      "Verbatim customer quote (specific, emotional) + reviewer name + city + stars + visual proof of work + aggregate rating + trust badges + CTA.",
    trustElement:
      "Google Rating 4.9★ from 312 reviews + GAF Certified + BBB A+ + Licensed & Insured. The review count (312) signals volume of satisfied customers.",
    ctaType:
      "Get Your Free Roof Inspection — inspection = low commitment entry point",
    replicationPrompt: `REPLICATION PROMPT — Social Proof / Review Wall (Roofing)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)

VISUAL SPEC:
• Render as native Facebook post (white background, post chrome)
• Circular profile photo: real customer (not stock model)
• Quote text: verbatim customer review — specific, includes objection overcome
• Reviewer name + city below quote
• Star rating (★★★★★) below name
• Completed roof photo: aerial or wide-angle
• Bottom strip: Google Rating [X.X]★ from [X] reviews | GAF Certified | BBB A+

COPY:
Headline: [X]+ [CITY] Homeowners. [X.X]-Star Rated. See Why.
Body: [Verbatim quote]. — [Name], [City]
CTA: Get Your Free Roof Inspection

RULES:
• Quote MUST include a specific objection overcome (speed, cleanliness, price)
• Never use generic quotes ("Great service!")
• Reviewer name + city = credibility (specificity matters)`,
  },
  {
    id: "pattern-pain-fomo",
    title: "Pest Control — Neighbor FOMO + Termite Damage Contrast",
    angle: "Pain / FOMO",
    niche: "Pest Control",
    format: "Static Image",
    sourceType: "AI Pattern",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_pain_fomo-KY5pgRqTHWxojVxn9wm2st.webp",
    hook: "Your Neighbors Are Getting Treated This Week. Are You Next?",
    whyItWorks:
      "The headline triggers two psychological mechanisms simultaneously: social comparison ('your neighbors') and FOMO ('are you next?'). The split image creates a visceral before/after of the stakes — cozy home vs. structural destruction. The seasonal hook ('peaks in April') adds urgency tied to a real external trigger.",
    copyFormula:
      "Social comparison hook + seasonal urgency trigger + pain visualization (damage photo) + educational credibility statement + zero-risk CTA + response guarantee.",
    trustElement:
      "24-Hour Response Guaranteed badge + company logo with shield icon (protection symbolism). The guarantee removes the 'what if I call and they don't show' objection.",
    ctaType:
      "Get a FREE Inspection Before It's Too Late — urgency embedded in CTA copy",
    replicationPrompt: `REPLICATION PROMPT — Pain / FOMO (Pest Control)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)

VISUAL SPEC:
• Red headline bar top: "YOUR NEIGHBORS ARE GETTING TREATED THIS WEEK"
• Split image: left = cozy home interior | right = structural pest damage
• Seasonal callout: "Termite season peaks in [Month]"
• Shield badge: "24-Hour Response Guaranteed"
• Yellow CTA button: "Get a FREE Inspection Before It's Too Late"

COPY:
Headline: Your neighbors on [Street] are getting treated. Are you next?
Body: Termite season peaks in [Month]. [COMPANY] eliminates infestations fast — 24-hour response guaranteed.
CTA: Get FREE Inspection

VARIANTS:
1. Damage-only: extreme close-up of termite damage — no copy needed
2. Seasonal: "Spring = Peak Termite Season in [CITY]"
3. Neighbor: "3 homes on your street treated this week"`,
  },
  {
    id: "pattern-hero-shot",
    title: "Pressure Washing — Cinematic Hero Shot",
    angle: "Hero Shot",
    niche: "Pressure Washing",
    format: "Static Image",
    sourceType: "AI Pattern",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hero_shot-UjTbEqjUkeyBMjxNwUM4Fo.webp",
    hook: "Your Driveway Deserves Better",
    whyItWorks:
      "The action shot of water spraying on a driveway triggers the 'satisfying clean' dopamine response — the same mechanism behind viral pressure washing videos. The branded uniform establishes professionalism. The clean stripe in the driveway is the visual proof of the result.",
    copyFormula:
      "Aspirational identity hook (your property deserves X) + visual proof of result + speed/convenience promise + social proof count + instant-action CTA.",
    trustElement:
      "500+ Jobs This Season (recency + volume) + 5-star rating. 'This Season' signals active, current demand — not a stale business.",
    ctaType:
      "Book Online — Instant Quote (online booking + instant = zero friction)",
    replicationPrompt: `REPLICATION PROMPT — Hero Shot (Pressure Washing)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)

VISUAL SPEC:
• Action shot: technician in branded uniform pressure washing driveway
• Clean stripe visible in frame (dirty left, clean right) — this IS the value prop
• Cinematic lighting (golden hour or dramatic)
• Bottom gradient overlay: transparent top → dark bottom
• Text on overlay: "Your [Surface] Deserves Better"
• Trust strip: ★★★★★ | [X]+ Jobs This Season | "Book Online — Instant Quote"

COPY:
Headline: Your Driveway Deserves Better. Book Online in 60 Seconds.
Body: [X]+ jobs this season in [CITY]. Instant online quote. Same-week availability.
CTA: Book Online — Instant Quote

RULES:
• The clean stripe MUST be visible — it's the entire value proposition
• Technician must be in branded uniform with logo visible
• Never use stock photos — real job photos only`,
  },
  {
    id: "pattern-seasonal-urgency",
    title: "Roofing — Storm Season Urgency + Free Inspection",
    angle: "Seasonal / Urgency",
    niche: "Roofing / Storm",
    format: "Static Image",
    sourceType: "AI Pattern",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_seasonal_urgency-X5LoMZPLrrELkHYhR9vtRf.webp",
    hook: "Storm Season Is Here. Is Your Roof Ready?",
    whyItWorks:
      "Storm damage ads are the highest-converting seasonal trigger for roofing because the external event (weather) creates urgency the advertiser doesn't have to manufacture. 'Limited to 25 Homes' creates genuine scarcity. The insurance claim assistance callout is a massive differentiator — most homeowners don't know they can get help navigating claims.",
    copyFormula:
      "Seasonal threat hook (question format) + scarcity offer + 3 differentiating benefits + trust badges + phone number + CTA. The question format engages the reader's self-assessment instinct.",
    trustElement:
      "GAF Master Elite badge (top 3% of roofers nationally) + BBB A+ + phone number with branded vanity number.",
    ctaType:
      "Claim Your Free Inspection — 'Claim' implies the offer is theirs to take, not a request",
    replicationPrompt: `REPLICATION PROMPT — Seasonal / Urgency (Roofing)

Platform: Facebook / Instagram Feed
Format: Static Image 1:1 (1080×1080px)
TIMING: Run the week before and after any major storm event in your market

VISUAL SPEC:
• Dramatic storm sky background or damaged roof photo
• Headline: "STORM SEASON IS HERE. IS YOUR ROOF READY?" — bold white
• Scarcity badge: "Limited to [X] Free Inspections This Month"
• 3 differentiators:
  ✓ Free Storm Damage Inspection
  ✓ Insurance Claim Assistance
  ✓ Emergency Repairs Available
• Trust badges: GAF Master Elite | BBB A+ | Licensed & Insured
• Phone number: large, readable (vanity number if available)
• CTA: "Claim Your Free Inspection"

COPY:
Headline: [CITY] homeowners — did the last storm damage your roof?
Body: [COMPANY] provides free storm damage inspections and helps you navigate your insurance claim. Limited availability — [X] spots left this month.
CTA: Claim Your Free Inspection

RULES:
• Run ONLY after real storm events — don't manufacture urgency
• Insurance claim assistance is the #1 differentiator — always include it
• GAF Master Elite or equivalent cert is the most credible badge in roofing`,
  },
];

// ─── AD INTELLIGENCE SOURCES ─────────────────────────────────────────────────
export const AD_INTELLIGENCE_SOURCES = [
  {
    name: "Meta Ad Library",
    url: "https://www.facebook.com/ads/library/",
    description:
      "Search any competitor or keyword. Filter by country, active status, and media type. Sort by impressions to find highest-volume ads.",
    tier: "Free",
    bestFor: "Competitor research, keyword-based discovery, active ad monitoring",
  },
  {
    name: "SwipeFile",
    url: "https://swipefile.com/category/ads",
    description:
      "Curated ad examples with psychological breakdowns. Best for HVAC and home services. Includes copy analysis and trend data.",
    tier: "Free",
    bestFor: "Psychological breakdowns, copy analysis, home service niches",
  },
  {
    name: "Foreplay",
    url: "https://www.foreplay.co/swipe-file",
    description:
      "Agency-grade swipe file. Save ads from Meta, TikTok, YouTube. Best-in-class for creative research and team collaboration.",
    tier: "$49/mo",
    bestFor: "Team swipe files, multi-platform, creative briefs",
  },
  {
    name: "Motion",
    url: "https://www.motionapp.com",
    description:
      "Creative analytics + swipe file. Shows which creatives are actually scaling based on spend data. Best for performance-focused teams.",
    tier: "$99/mo",
    bestFor: "Performance data, scaling signals, creative analytics",
  },
  {
    name: "MagicBrief",
    url: "https://www.magicbrief.com",
    description:
      "AI-powered ad research. Find winning ads by niche, angle, and format. Includes brief generation from saved ads.",
    tier: "$49/mo",
    bestFor: "AI-assisted research, brief generation, niche filtering",
  },
  {
    name: "AdSpy",
    url: "https://adspy.com",
    description:
      "Largest Facebook/Instagram ad database. Search by keyword, advertiser, or landing page URL. Best for deep competitor intelligence.",
    tier: "$149/mo",
    bestFor: "Largest database, landing page search, deep competitor intel",
  },
];

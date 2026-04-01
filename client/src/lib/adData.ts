// ============================================================
// Meta Ad Creative Canvas — Ad Data
// 15 agency-grade AI-generated ad examples
// Each with full replication blueprint + variants
// ============================================================

export type Angle =
  | "Before / After"
  | "Offer / Discount"
  | "Social Proof"
  | "Pain / Urgency"
  | "Hero Shot"
  | "Features / Benefits"
  | "UGC / Testimonial"
  | "Process / How-To"
  | "Seasonal Urgency"
  | "Neighbor FOMO"
  | "Financing";

export type Niche =
  | "HVAC"
  | "Roofing"
  | "Plumbing"
  | "Electrical"
  | "Pest Control"
  | "Landscaping"
  | "Pressure Washing"
  | "Epoxy Flooring"
  | "Window Cleaning"
  | "Kitchen Remodeling";

export type Format = "Static Image" | "Carousel" | "Video" | "Lead Form";
export type SourceType = "Agency Curated" | "Meta Ad Library" | "AI Generated";

export const ANGLE_COLORS: Record<Angle, string> = {
  "Before / After": "#10B981",
  "Offer / Discount": "#F59E0B",
  "Social Proof": "#3B82F6",
  "Pain / Urgency": "#EF4444",
  "Hero Shot": "#8B5CF6",
  "Features / Benefits": "#06B6D4",
  "UGC / Testimonial": "#F97316",
  "Process / How-To": "#6366F1",
  "Seasonal Urgency": "#84CC16",
  "Neighbor FOMO": "#EC4899",
  "Financing": "#0EA5E9",
};

export const ANGLE_BG: Record<Angle, string> = {
  "Before / After": "#10B98115",
  "Offer / Discount": "#F59E0B15",
  "Social Proof": "#3B82F615",
  "Pain / Urgency": "#EF444415",
  "Hero Shot": "#8B5CF615",
  "Features / Benefits": "#06B6D415",
  "UGC / Testimonial": "#F9731615",
  "Process / How-To": "#6366F115",
  "Seasonal Urgency": "#84CC1615",
  "Neighbor FOMO": "#EC489915",
  "Financing": "#0EA5E915",
};

export const ALL_ANGLES: Angle[] = [
  "Before / After",
  "Offer / Discount",
  "Social Proof",
  "Pain / Urgency",
  "Hero Shot",
  "Features / Benefits",
  "UGC / Testimonial",
  "Process / How-To",
  "Seasonal Urgency",
  "Neighbor FOMO",
  "Financing",
];

export const ALL_NICHES: Niche[] = [
  "HVAC",
  "Roofing",
  "Plumbing",
  "Electrical",
  "Pest Control",
  "Landscaping",
  "Pressure Washing",
  "Epoxy Flooring",
  "Window Cleaning",
  "Kitchen Remodeling",
];

export const ALL_FORMATS: Format[] = ["Static Image", "Carousel", "Video", "Lead Form"];

export interface AdExample {
  id: string;
  title: string;
  niche: Niche;
  angle: Angle;
  format: Format;
  sourceType: SourceType;
  sourceName: string;
  sourceUrl: string;
  advertiser?: string;
  imageUrl: string;
  hook: string;
  copyFormula: string;
  trustElement: string;
  ctaType: string;
  whyItWorks: string;
  replicationPrompt: string;
  variants: string[];
}

export const AD_EXAMPLES: AdExample[] = [
  {
    id: "hvac-before-after",
    title: "HVAC — Old Unit vs New Install Split",
    niche: "HVAC",
    angle: "Before / After",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — High-Impression HVAC",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=HVAC&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hvac_ba_v2_908ef670.jpg",
    hook: "Is your AC older than 10 years? Here's what a new system looks like.",
    copyFormula: "Visual contrast (old rusty unit vs clean new install) + age-based trigger + outcome statement",
    trustElement: "Before/After badge top-left + '10-Year Warranty' trust pill top-right",
    ctaType: "Get Free Quote →",
    whyItWorks: "The split image creates instant visual contrast that stops the scroll. Homeowners with aging systems self-identify immediately. The age trigger ('older than 10 years') is hyper-specific and creates a mental checkbox. The outcome (cool home, lower bills) is implied by the visual — no need to state it.",
    replicationPrompt: `Professional Meta Facebook ad creative for an HVAC company. Split image: left half shows a dirty, old, rusty HVAC outdoor unit from the 1990s, weathered and corroded; right half shows a brand new, clean, modern Carrier or Trane HVAC unit installed on a clean concrete pad next to a well-maintained home. Dark gradient scrim on bottom 45%. Large bold white text: "IS YOUR AC OLDER THAN 10 YEARS?" in massive bold condensed font. Smaller white text: "New system installed in 1 day. 10-year warranty. Financing from $89/mo." Blue CTA button: "GET FREE QUOTE →". Top left green badge: "BEFORE / AFTER". Top right dark badge: "10-Year Warranty". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Swap headline to 'YOUR AC IS COSTING YOU $200/MONTH EXTRA.' — targets cost-conscious homeowners",
      "Use interior shot: left = sweating family in hot room, right = family relaxed in cool home — more emotional",
      "Add a specific number: 'We've replaced 847 units in [City] this summer.' — social proof layer",
    ],
  },
  {
    id: "roofing-free-inspection",
    title: "Roofing — Free Inspection Aerial Drone Shot",
    niche: "Roofing",
    angle: "Offer / Discount",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — High-Impression Roofing",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=roofing+free+inspection&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_roofing_offer_v2_7269af3d.jpg",
    hook: "Free Roof Inspection. This Week Only.",
    copyFormula: "Free offer + scarcity (this week only) + fear trigger (most homeowners don't know) + specific deliverable (27-point inspection)",
    trustElement: "Offer/Free badge + Limited Spots trust pill",
    ctaType: "Book Free Inspection →",
    whyItWorks: "The aerial drone shot creates a neighborhood-level visual that makes every homeowner think 'that could be my street.' The 'this week only' scarcity is simple but effective. The fear trigger ('don't know until it's too late') activates loss aversion. The specific '27-point inspection' adds credibility and perceived value to a free offer.",
    replicationPrompt: `Professional Meta Facebook ad creative for a roofing company. Aerial drone shot of a beautiful suburban neighborhood with well-maintained homes and roofs, blue sky, warm lighting. Dark gradient scrim on bottom 45%. Large bold white text: "FREE ROOF INSPECTION. THIS WEEK ONLY." in massive bold font. Smaller white text: "Most homeowners don't know their roof is failing until it's too late. Book your free 27-point inspection." Red CTA button: "BOOK FREE INSPECTION →". Top left red badge: "OFFER / FREE". Top right dark badge: "Limited Spots". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Replace aerial with close-up of damaged shingles — more visceral, higher urgency",
      "Add a specific dollar value: 'Free $299 Roof Inspection' — anchors the value of the free offer",
      "Use a before/after: damaged roof vs new roof — combines offer angle with transformation",
    ],
  },
  {
    id: "pest-neighbor-fomo",
    title: "Pest Control — Neighbor FOMO Termite Spread",
    niche: "Pest Control",
    angle: "Neighbor FOMO",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Pest Control FOMO",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=pest+control+termite&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_pest_fomo_v3_a40eacf5.jpg",
    hook: "14 of your neighbors just treated. Termites spread fast.",
    copyFormula: "Specific social proof number + neighborhood context + spreading threat + free inspection offer",
    trustElement: "Neighbor FOMO badge + Free Inspection trust pill",
    ctaType: "Book Free Inspection →",
    whyItWorks: "The specific number '14 neighbors' feels hyper-local and real — not generic. The service truck in front of a neighborhood house makes it visual and believable. The spreading threat ('termites spread fast') creates urgency without being alarmist. This angle works because it combines social proof with FOMO — if your neighbors are doing it, you should too.",
    replicationPrompt: `Professional Meta Facebook ad creative for a pest control company. Photo of a suburban neighborhood street with houses, a branded pest control truck parked in front of one home, dusk lighting, sense of neighborhood activity. Dark gradient scrim on bottom 45%. Large bold white text: "14 OF YOUR NEIGHBORS JUST TREATED." in massive bold font. Smaller white text: "Termites spread fast. Get your free inspection before they reach your home." Orange CTA button: "BOOK FREE INSPECTION →". Top left orange badge: "NEIGHBOR FOMO". Top right dark badge: "Free Inspection". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Change to '23 homes on your street treated this month' — higher number, more urgency",
      "Use a close-up macro shot of termite damage inside wood — more visceral fear trigger",
      "Add a map visual showing treated homes in a radius — hyper-local targeting feel",
    ],
  },
  {
    id: "electrical-social-proof",
    title: "Electrical — 2,400+ Homeowners Social Proof",
    niche: "Electrical",
    angle: "Social Proof",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Electrical Social Proof",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=electrician+panel+upgrade&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_electrical_social_proof_v3_8b505224.jpg",
    hook: "2,400+ homeowners trust us with their panel.",
    copyFormula: "Specific volume number + trust statement + credentials (licensed master electricians) + rating proof",
    trustElement: "Social Proof badge + ★ 4.9 · 2,400+ Jobs trust pill",
    ctaType: "Get Free Estimate →",
    whyItWorks: "The specific number (2,400+) is more credible than a round number. The electrician working on a panel is the exact scenario homeowners fear — it signals competence and professionalism. 'Licensed master electricians' is a credential that matters to homeowners. The combination of volume + rating + credential creates a triple trust stack.",
    replicationPrompt: `Professional Meta Facebook ad creative for an electrical company. Photo of a professional electrician in a blue uniform working on an electrical panel, focused expression, clean organized workspace, professional lighting. Dark gradient scrim on bottom 45%. Large bold white text: "2,400+ HOMEOWNERS TRUST US WITH THEIR PANEL." in massive bold font. Smaller white text: "Licensed master electricians. Same-day service. 5-star rated on Google." Yellow CTA button: "GET FREE ESTIMATE →". Top left yellow badge: "SOCIAL PROOF". Top right dark badge: "★ 4.9 · 2,400+ Jobs". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Replace number with a specific Google review quote — more personal and authentic",
      "Show a before/after of a dangerous old panel vs new modern panel — adds visual proof",
      "Use a homeowner testimonial photo instead of technician — shifts from B2B to peer trust",
    ],
  },
  {
    id: "pressure-wash-before-after",
    title: "Pressure Washing — Driveway Like New in 2 Hours",
    niche: "Pressure Washing",
    angle: "Before / After",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Pressure Washing",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=pressure+washing+driveway&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_pressure_wash_v3_597befec.jpg",
    hook: "Your driveway. Like new. In 2 hours.",
    copyFormula: "Punchy 3-part headline (what, result, time) + visual proof (before/after split) + price anchor + guarantee",
    trustElement: "Before/After badge + Same-Day Available trust pill",
    ctaType: "Get Instant Quote →",
    whyItWorks: "The dramatic split image is the most powerful creative format for pressure washing — the contrast between dark stained concrete and bright white clean concrete is visually shocking. The 3-part headline is punchy and scannable. The time commitment ('2 hours') removes the objection of 'it'll take forever.' The price anchor ($199) makes it feel accessible.",
    replicationPrompt: `Professional Meta Facebook ad creative for a pressure washing company. Split image: left half shows a dark, stained, mold-covered concrete driveway; right half shows the same driveway bright white and spotless after pressure washing. Dark gradient scrim on bottom 45%. Large bold white text: "YOUR DRIVEWAY. LIKE NEW. IN 2 HOURS." in massive bold font. Smaller white text: "Driveways, patios, roofs. Starting at $199. Fully insured." Teal CTA button: "GET INSTANT QUOTE →". Top left teal badge: "BEFORE / AFTER". Top right dark badge: "Same-Day Available". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a roof cleaning before/after — higher ticket, more dramatic visual contrast",
      "Show a patio/deck transformation — targets homeowners with outdoor entertaining spaces",
      "Add a 'Your neighbors are noticing' subhead — layers FOMO onto the transformation",
    ],
  },
  {
    id: "remodeling-kitchen",
    title: "Kitchen Remodeling — Dream Kitchen in 3 Weeks",
    niche: "Kitchen Remodeling",
    angle: "Before / After",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Kitchen Remodeling",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=kitchen+remodeling&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_remodeling_kitchen_v3_6f5fda6a.jpg",
    hook: "Your dream kitchen. In 3 weeks.",
    copyFormula: "Aspirational outcome + specific timeline + price anchor + financing offer + free design hook",
    trustElement: "Before/After badge + Financing Available trust pill",
    ctaType: "Get Free Design →",
    whyItWorks: "The before/after is the highest-converting format for remodeling because the transformation is dramatic and aspirational. The '3 weeks' timeline removes the fear of a long, disruptive project. The free 3D design offer is a low-commitment entry point that gets leads in the door. Financing removes the price objection before it's raised.",
    replicationPrompt: `Professional Meta Facebook ad creative for a kitchen remodeling company. Split image: left half shows a dated 1990s kitchen with old oak cabinets, laminate counters, old appliances; right half shows a stunning modern kitchen with white shaker cabinets, quartz countertops, stainless steel appliances, pendant lighting. Dark gradient scrim on bottom 45%. Large bold white text: "YOUR DREAM KITCHEN. IN 3 WEEKS." in massive bold font. Smaller white text: "Full kitchen remodels from $18,000. Financing available. Free 3D design." Purple CTA button: "GET FREE DESIGN →". Top left purple badge: "BEFORE / AFTER". Top right dark badge: "Financing Available". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use bathroom remodel instead — similar transformation, different audience segment",
      "Show a specific style: 'Modern farmhouse kitchen transformation' — targets style-specific buyers",
      "Lead with the financing: '$0 down. $299/month. Your dream kitchen.' — price-sensitive audience",
    ],
  },
  {
    id: "plumbing-emergency",
    title: "Plumbing — Burst Pipe 60-Min Emergency Response",
    niche: "Plumbing",
    angle: "Pain / Urgency",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Emergency Plumbing",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=emergency+plumbing&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_plumbing_pain_v3_f3965915.jpg",
    hook: "Burst pipe? We're there in 60 min.",
    copyFormula: "Pain question + specific response time + 24/7 availability + flat-rate pricing objection removal",
    trustElement: "Pain/Urgency badge + 24/7 Emergency trust pill",
    ctaType: "Call Now →",
    whyItWorks: "The flooded kitchen image is visceral and immediately activates fear — every homeowner has had a plumbing scare. The question format ('Burst pipe?') creates instant self-identification. The 60-minute response time is specific and credible. 'No overtime charges' removes the biggest objection for emergency services — the fear of being price-gouged in a crisis.",
    replicationPrompt: `Professional Meta Facebook ad creative for an emergency plumbing company. Photo of a flooded kitchen floor with water pouring from under a sink cabinet, dramatic dark lighting, flashlight beam, sense of panic and urgency. Dark gradient scrim on bottom 45%. Large bold white text: "BURST PIPE? WE'RE THERE IN 60 MIN." in massive bold font. Smaller white text: "Emergency plumbing, 24/7. Flat-rate pricing. No overtime charges." Red CTA button: "CALL NOW →". Top left red badge: "PAIN / URGENCY". Top right dark badge: "24/7 Emergency". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a clogged drain / sewage backup visual — different emergency scenario, same urgency",
      "Show a water heater failure — targets a specific high-ticket emergency",
      "Add a phone number in large text — for audiences who call rather than click",
    ],
  },
  {
    id: "hvac-financing",
    title: "HVAC — $0 Down $89/Mo Financing Offer",
    niche: "HVAC",
    angle: "Financing",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — HVAC Financing",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=HVAC+financing&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hvac_financing_v3_54721134.jpg",
    hook: "New AC system. $0 down. $89/mo.",
    copyFormula: "Product + $0 down anchor + monthly payment (not total price) + credential + warranty + broad approval",
    trustElement: "Offer/Financing badge + OAC · 0% APR Available trust pill",
    ctaType: "Check Financing →",
    whyItWorks: "Showing the monthly payment ($89/mo) instead of the total system cost ($8,000+) dramatically reduces sticker shock. '$0 down' removes the biggest barrier to purchase. The happy family in a cool room creates the aspirational outcome. 'Financing for all credit types' expands the addressable audience. This is the highest-converting angle for HVAC in summer months.",
    replicationPrompt: `Professional Meta Facebook ad creative for an HVAC company offering financing. Photo of a happy family (parents and child) relaxing in a cool, comfortable modern living room, mini-split AC unit visible on wall, summer sunlight through windows. Dark gradient scrim on bottom 45%. Large bold white text: "NEW AC SYSTEM. $0 DOWN. $89/MO." in massive bold font. Smaller white text: "Carrier-certified install. 10-year warranty. Financing for all credit types." Blue CTA button: "CHECK FINANCING →". Top left blue badge: "OFFER / FINANCING". Top right dark badge: "OAC · 0% APR Available". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Change to heat pump: 'Heat + Cool. $0 down. $99/mo.' — targets dual-season markets",
      "Use a worried homeowner looking at a broken unit — leads with pain before the financing solution",
      "Add a countdown: 'Summer pricing ends [date]' — seasonal urgency layer",
    ],
  },
  {
    id: "roofing-storm-damage",
    title: "Roofing — Storm Damage Insurance Claim",
    niche: "Roofing",
    angle: "Pain / Urgency",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Storm Damage Roofing",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=roofing+storm+damage+insurance&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_roofing_storm_v3_cc88bc05.jpg",
    hook: "Storm damage? Your insurance covers this.",
    copyFormula: "Pain question + relief statement (insurance covers it) + objection removal (no out-of-pocket) + claim handling offer",
    trustElement: "Pain/Storm badge + Insurance Claim Help trust pill",
    ctaType: "Get Free Inspection →",
    whyItWorks: "The storm damage visual creates immediate relevance after any weather event. The key insight: 'your insurance covers this' removes the #1 objection (cost) before it's raised. 'We handle the insurance claim' removes the #2 objection (complexity). 'No out-of-pocket cost' is the most powerful phrase in storm damage roofing — it makes the decision feel risk-free.",
    replicationPrompt: `Professional Meta Facebook ad creative for a roofing company targeting storm damage. Dramatic photo of a suburban home with visible storm damage on the roof — missing shingles, broken sections — dark storm clouds in the background, sense of urgency and damage. Dark gradient scrim on bottom 45%. Large bold white text: "STORM DAMAGE? YOUR INSURANCE COVERS THIS." in massive bold font. Smaller white text: "Free storm inspection. We handle the insurance claim. No out-of-pocket cost." Red CTA button: "GET FREE INSPECTION →". Top left red badge: "PAIN / STORM". Top right dark badge: "Insurance Claim Help". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Run immediately after a named storm event — hyper-timely, highest relevance",
      "Add a specific insurance company: 'We work with State Farm, Allstate, USAA' — builds trust",
      "Show a split: damaged roof vs new roof with 'Insurance paid for this' caption",
    ],
  },
  {
    id: "landscaping-hero",
    title: "Landscaping — The Lawn Your Neighbors Will Envy",
    niche: "Landscaping",
    angle: "Hero Shot",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Landscaping Hero",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=lawn+care+landscaping&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_landscaping_hero_v3_1fd03be7.jpg",
    hook: "The lawn your neighbors will envy.",
    copyFormula: "Social aspiration headline + weekly price anchor + included services list + no-contract objection removal",
    trustElement: "Hero Shot badge + No Contracts trust pill",
    ctaType: "Get Free Quote →",
    whyItWorks: "The golden-hour hero shot of a perfect lawn is aspirational and scroll-stopping. 'The lawn your neighbors will envy' taps into social status and pride of ownership — two of the strongest motivators for home services. The weekly price anchor ($89/month) makes it feel like a subscription, not a big purchase. 'No contracts' removes commitment anxiety.",
    replicationPrompt: `Professional Meta Facebook ad creative for a landscaping company. Hero shot of a stunning, perfectly manicured front yard with lush green lawn, colorful flower beds, stone pathway, beautiful stone home in background, golden hour sunlight. Dark gradient scrim on bottom 45%. Large bold white text: "THE LAWN YOUR NEIGHBORS WILL ENVY." in massive bold font. Smaller white text: "Weekly lawn care from $89/month. Fertilization, edging, cleanup included." Green CTA button: "GET FREE QUOTE →". Top left green badge: "HERO SHOT". Top right dark badge: "No Contracts". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a before/after: dead patchy lawn vs lush green lawn — adds transformation proof",
      "Show a family enjoying the lawn — shifts from product to lifestyle outcome",
      "Add a seasonal hook: 'Spring lawn prep. Book now before slots fill.' — urgency layer",
    ],
  },
  {
    id: "epoxy-before-after",
    title: "Epoxy Flooring — Garage Floor in 1 Day",
    niche: "Epoxy Flooring",
    angle: "Before / After",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Epoxy Flooring",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=epoxy+garage+floor&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_epoxy_before_after_v2_59c0d233.jpg",
    hook: "Your garage floor in 1 day.",
    copyFormula: "Outcome + time commitment (1 day) + price anchor + feature stack (crack-free, stain-proof) + guarantee",
    trustElement: "Before/After badge + 1-Day Install trust pill",
    ctaType: "Get Free Quote →",
    whyItWorks: "The split image is perfect for epoxy — the contrast between cracked grey concrete and gleaming metallic epoxy is dramatic. '1 day' is the key differentiator — homeowners fear disruption. The feature stack (crack-free, stain-proof, guaranteed) addresses the main objections. The price anchor ($1,200) is specific and credible.",
    replicationPrompt: `Professional Meta Facebook ad creative for an epoxy flooring company. Split image: left half shows a cracked, stained, grey concrete garage floor with oil stains; right half shows the same garage floor transformed with a stunning metallic silver-blue epoxy coating, gleaming under bright garage lights. Dark gradient scrim on bottom 45%. Large bold white text: "YOUR GARAGE FLOOR IN 1 DAY." in massive bold condensed font. Smaller white text: "Epoxy coating from $1,200. Crack-free. Stain-proof. Guaranteed." Silver-blue CTA button: "GET FREE QUOTE →". Top left silver badge: "BEFORE / AFTER". Top right dark badge: "1-Day Install". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a basement floor transformation — different room, same dramatic contrast",
      "Show a commercial/shop floor — targets business owners, higher ticket",
      "Add a car parked on the finished floor — lifestyle shot showing the end state",
    ],
  },
  {
    id: "window-cleaning-before-after",
    title: "Window Cleaning — See Your Home Clearly Again",
    niche: "Window Cleaning",
    angle: "Before / After",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Window Cleaning",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=window+cleaning&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_window_cleaning_v2_9366f878.jpg",
    hook: "See your home clearly again.",
    copyFormula: "Aspirational headline (clarity/vision metaphor) + interior + exterior scope + price anchor + streak-free guarantee",
    trustElement: "Before/After badge + Fully Insured · Bonded trust pill",
    ctaType: "Book Online in 60 Sec →",
    whyItWorks: "The 'see clearly again' headline works on two levels — literal (clean windows) and metaphorical (fresh perspective on your home). The before/after of a house exterior is immediately relatable. 'Book online in 60 sec' removes friction and signals ease. The price anchor ($149) is accessible. 'Streak-free guarantee' addresses the main quality objection.",
    replicationPrompt: `Professional Meta Facebook ad creative for a window cleaning company. Split image: left half shows a house with dirty, streaky, grimy windows; right half shows the same house with crystal-clear sparkling windows reflecting blue sky and trees. Dark gradient scrim on bottom 45%. Large bold white text: "SEE YOUR HOME CLEARLY AGAIN." in massive bold font. Smaller white text: "Interior + exterior from $149. Streak-free guarantee." Cyan CTA button: "BOOK ONLINE IN 60 SEC →". Top left cyan badge: "BEFORE / AFTER". Top right dark badge: "Fully Insured · Bonded". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a close-up of a single dirty vs clean window pane — more intimate and detailed",
      "Show a homeowner looking out through clean windows — lifestyle outcome shot",
      "Target commercial: 'Your storefront windows. Crystal clear. In 2 hours.' — B2B angle",
    ],
  },
  {
    id: "hvac-process",
    title: "HVAC — How We Fix Your AC in 3 Steps",
    niche: "HVAC",
    angle: "Process / How-To",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — HVAC Process",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=HVAC+same+day+service&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hvac_process_v2_3c41ac4d.jpg",
    hook: "How we fix your AC in 3 steps.",
    copyFormula: "Process transparency headline + numbered steps (diagnosis, quote, fix) + same-day CTA + no hidden fees objection removal",
    trustElement: "Process/How-To badge + No Hidden Fees trust pill",
    ctaType: "Book Same-Day Service →",
    whyItWorks: "The process angle builds trust by showing transparency — homeowners fear being ripped off by contractors. The numbered steps (1. Diagnose. 2. Quote. 3. Fix.) make the service feel predictable and safe. The professional technician with tools signals competence. 'No hidden fees' is the most common objection in HVAC — addressing it in the creative pre-qualifies leads.",
    replicationPrompt: `Professional Meta Facebook ad creative for an HVAC company showing the service process. Photo of a clean, professional HVAC technician in a blue uniform doing a diagnostic check on a home AC system, digital tools visible, professional lighting. Dark gradient scrim on bottom 45%. Large bold white text: "HOW WE FIX YOUR AC IN 3 STEPS." in massive bold font. Smaller white text: "1. Free same-day diagnosis. 2. Flat-rate quote. 3. Fixed in hours — not days." Blue CTA button: "BOOK SAME-DAY SERVICE →". Top left blue badge: "PROCESS / HOW-TO". Top right dark badge: "No Hidden Fees". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a carousel format — one step per slide, swipeable — higher engagement",
      "Show the technician at the door greeting the homeowner — emphasizes the experience",
      "Add a timer graphic: 'Average repair time: 2.3 hours' — specificity builds trust",
    ],
  },
  {
    id: "roofing-ugc-testimonial",
    title: "Roofing — UGC Homeowner Testimonial",
    niche: "Roofing",
    angle: "UGC / Testimonial",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Roofing UGC",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=roofing+reviews&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_roofing_ugc_v2_f6d9a61b.jpg",
    hook: '"Done in 1 day. Cleaned up perfectly. Best contractor we\'ve ever hired."',
    copyFormula: "Direct quote (specific, authentic) + attribution (first name, city) + review count social proof + CTA",
    trustElement: "UGC/Testimonial badge + ★ 4.9 · 847 Reviews trust pill",
    ctaType: "See More Reviews →",
    whyItWorks: "The authentic couple photo in front of their newly roofed home is the most trusted creative format — it looks like a real person, not an ad. The quote is specific ('done in 1 day', 'cleaned up perfectly') which makes it credible. The attribution (Mike & Sarah T.) feels real. The review count (847) provides social proof at scale. This format bypasses ad skepticism.",
    replicationPrompt: `Professional Meta Facebook ad creative styled as a UGC testimonial for a roofing company. Photo of a happy middle-aged couple standing in front of their newly re-roofed home, smiling naturally, casual clothes, authentic feel, new dark shingles visible on roof behind them. Dark gradient scrim on bottom 45%. Large bold white text with quotation marks: '"DONE IN 1 DAY. CLEANED UP PERFECTLY. BEST CONTRACTOR WE'VE EVER HIRED."' in bold font. Smaller text: "— Mike & Sarah T., [City]". Orange CTA button: "SEE MORE REVIEWS →". Top left orange badge: "UGC / TESTIMONIAL". Top right dark badge: "★ 4.9 · 847 Reviews". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Use a video testimonial format — homeowner talking to camera in front of their home",
      "Show the before (damaged roof) in the background of the testimonial photo",
      "Use a Google review screenshot overlay instead of a quote — more authentic digital proof",
    ],
  },
  {
    id: "landscaping-seasonal",
    title: "Landscaping — Spring Slots Filling Fast",
    niche: "Landscaping",
    angle: "Seasonal Urgency",
    format: "Static Image",
    sourceType: "Agency Curated",
    sourceName: "Agency Pattern — Seasonal Landscaping",
    sourceUrl: "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=lawn+care+spring&search_type=keyword_unordered&media_type=image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_landscaping_seasonal_v2_61b6922f.jpg",
    hook: "Spring slots filling fast. Only 12 new spots left.",
    copyFormula: "Seasonal trigger + specific scarcity number (12 spots) + rate lock incentive + CTA",
    trustElement: "Seasonal Urgency badge + Limited Availability trust pill",
    ctaType: "Claim Your Spot →",
    whyItWorks: "The seasonal urgency angle is most effective when run in late winter/early spring when homeowners are thinking about their lawn. The specific number ('12 new spots') creates real scarcity — not fake countdown timers. 'Lock in your rate before prices increase' adds a financial incentive on top of the scarcity. The spring flower imagery is aspirational and timely.",
    replicationPrompt: `Professional Meta Facebook ad creative for a landscaping company with seasonal urgency. Beautiful photo of a lush green lawn with spring tulips and daffodils blooming, golden hour sunlight filtering through trees. Dark gradient scrim on bottom 45%. Large bold white text: "SPRING SLOTS FILLING FAST." in massive bold font. Smaller white text: "Only 12 new lawn care spots left this month. Lock in your rate before prices increase." Green CTA button: "CLAIM YOUR SPOT →". Top left green badge: "SEASONAL URGENCY". Top right dark badge: "Limited Availability". Agency-quality ad. 4:5 ratio.`,
    variants: [
      "Run in fall: 'Fall cleanup slots filling fast. Last chance before winter.' — seasonal pivot",
      "Add a specific date: 'Spring pricing ends April 30.' — hard deadline urgency",
      "Show a waitlist: 'Join 47 homeowners on the spring waitlist' — social proof + scarcity",
    ],
  },
];

export interface AdIntelligenceSource {
  name: string;
  url: string;
  tier: "Free" | "Paid" | "Freemium";
  price?: string;
  description: string;
  bestFor: string;
}

export const AD_INTELLIGENCE_SOURCES: AdIntelligenceSource[] = [
  {
    name: "Meta Ad Library",
    url: "https://www.facebook.com/ads/library/",
    tier: "Free",
    description: "Official Meta tool showing all active ads. Filter by keyword, country, and impressions. Best source for competitor research.",
    bestFor: "Competitor research · Active ad discovery · Copy inspiration",
  },
  {
    name: "Motion",
    url: "https://www.motionapp.com",
    tier: "Paid",
    price: "$99/mo",
    description: "Creative analytics platform showing which ad creatives are performing best. Used by top DTC brands and agencies.",
    bestFor: "Performance data · Creative testing · Agency workflows",
  },
  {
    name: "MagicBrief",
    url: "https://magicbrief.com",
    tier: "Freemium",
    price: "Free / $49/mo",
    description: "Ad swipe file and creative briefing tool. Save ads from any platform and generate AI-powered briefs.",
    bestFor: "Swipe file · Creative briefs · Team collaboration",
  },
  {
    name: "Foreplay",
    url: "https://foreplay.co",
    tier: "Paid",
    price: "$49/mo",
    description: "Ad discovery and creative intelligence platform. Curated database of high-performing ads across Meta, TikTok, and YouTube.",
    bestFor: "Curated swipe file · Competitor tracking · Brief generation",
  },
  {
    name: "AdSpy",
    url: "https://adspy.com",
    tier: "Paid",
    price: "$149/mo",
    description: "Largest searchable database of Facebook and Instagram ads. Filter by engagement, date, country, and more.",
    bestFor: "Deep competitor research · Niche discovery · Copy mining",
  },
  {
    name: "TikTok Creative Center",
    url: "https://ads.tiktok.com/business/creativecenter",
    tier: "Free",
    description: "TikTok's official ad inspiration hub showing top-performing ads by industry, region, and objective.",
    bestFor: "Video ad inspiration · Hook research · Trend discovery",
  },
];

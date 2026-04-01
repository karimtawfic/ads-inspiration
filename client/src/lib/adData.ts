// ============================================================
// Meta Ad Creative Canvas — Ad Data
// 10 AI-generated examples, one per creative angle
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
  | "Seasonal / Urgency";

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
  whyItWorks: string;
  hook: string;
  copyFormula: string;
  trustElement: string;
  ctaType: string;
  replicationNotes: string;
}

export const AD_EXAMPLES: AdExample[] = [
  {
    id: "1",
    title: "Kitchen Remodel — Split Before/After + Free Quote Hook",
    angle: "Before / After",
    niche: "Remodeling",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_before_after-Ke9YU7xbaSEpyfVJcqvjgM.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The split-screen creates an instant visual contrast that stops the scroll. The brain processes transformation imagery in under 150ms. The 'BEFORE' label anchors the pain state, while 'AFTER' delivers the aspiration. The bottom bar consolidates all trust signals (stars, count, CTA) into one scannable strip — reducing cognitive load at the decision moment.",
    hook: "Transform Your Kitchen in 14 Days",
    copyFormula:
      "Visual transformation + time-bound promise + social proof count + zero-risk CTA. The number '14 Days' creates a specific, believable timeline that generic 'fast service' claims can't match.",
    trustElement:
      "847 Homeowners Served (volume = social proof) + 5-star rating. Both are in the same visual zone as the CTA to reduce friction.",
    ctaType: "Get Free Quote — zero commitment, low friction",
    replicationNotes:
      "Use real job photos, not stock. The before must look genuinely bad — don't sanitize it. The after must be aspirational. Headline should include a specific timeframe or number. Bottom bar: logo left, stars center, CTA button right. Orange CTA on dark bar = highest contrast ratio for click.",
  },
  {
    id: "2",
    title: "HVAC — $500 Off Offer + Urgency + Technician Hero",
    angle: "Offer / Discount",
    niche: "HVAC",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_offer_discount-3ZLNYmZjYubTZ9autivnm5.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The dollar amount dominates the visual hierarchy — it's the first thing the eye lands on. The technician photo humanizes the brand and signals professionalism. The red urgency banner creates scarcity. The bottom trust strip (BBB, stars, phone, CTA) handles all objections in one row. The 0% financing starburst removes the biggest barrier to high-ticket service purchases.",
    hook: "$500 OFF New AC Installation",
    copyFormula:
      "Dominant offer number + service name + urgency deadline + financing objection removal + trust badges + CTA. The offer is the entire creative — copy is secondary.",
    trustElement:
      "BBB A+ badge + 5-star rating + phone number. The BBB badge specifically converts skeptical homeowners who've been burned before.",
    ctaType: "Book Now — Free Estimate (dual benefit: book + free)",
    replicationNotes:
      "The offer number must be the largest element on the canvas. Navy blue background = trust + authority for trades. Red urgency banner must be bold and specific — 'Expires Friday' beats 'Limited Time'. Technician must be in branded uniform, smiling, holding tools. Starburst badge top-right = financing objection handled before they even read the copy.",
  },
  {
    id: "3",
    title: "Roofing — Facebook Post Style Social Proof Wall",
    angle: "Social Proof",
    niche: "Roofing",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_social_proof-VPjhfmxwec2Xt9d7cS5bgk.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "Rendered as a native Facebook post — not an ad — which dramatically reduces ad blindness. The quote is specific, emotional, and uses real objections ('no mess, no stress'). The circular profile photo adds authenticity. The completed roof photo provides visual proof of quality. The Google rating with review count is the most trusted social proof signal for home services.",
    hook:
      '"They replaced our entire roof in one day. No mess, no stress. Best contractor we\'ve ever hired."',
    copyFormula:
      "Verbatim customer quote (specific, emotional) + reviewer name + city + stars + visual proof of work + aggregate rating + trust badges + CTA.",
    trustElement:
      "Google Rating 4.9★ from 312 reviews + GAF Certified + BBB A+ + Licensed & Insured. The review count (312) signals volume of satisfied customers.",
    ctaType:
      "Get Your Free Roof Inspection — inspection = low commitment entry point",
    replicationNotes:
      "The quote must include a specific objection overcome (speed, cleanliness, professionalism). Never use generic quotes like 'Great service!'. Include the reviewer's first name and city — specificity = credibility. The circular profile photo must look like a real person, not a stock model. Completed work photo should be aerial or wide-angle to show full scope.",
  },
  {
    id: "4",
    title: "Pest Control — Neighbor FOMO + Termite Damage Contrast",
    angle: "Pain / FOMO",
    niche: "Pest Control",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_pain_fomo-KY5pgRqTHWxojVxn9wm2st.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The headline triggers two psychological mechanisms simultaneously: social comparison ('your neighbors') and FOMO ('are you next?'). The split image creates a visceral before/after of the stakes — cozy home vs. structural destruction. The seasonal hook ('peaks in April') adds urgency tied to a real external trigger. The yellow CTA button on dark background has the highest contrast ratio for click-through.",
    hook: "Your Neighbors Are Getting Treated This Week. Are You Next?",
    copyFormula:
      "Social comparison hook + seasonal urgency trigger + pain visualization (damage photo) + educational credibility statement + zero-risk CTA + response guarantee.",
    trustElement:
      "24-Hour Response Guaranteed badge + company logo with shield icon (protection symbolism). The guarantee removes the 'what if I call and they don't show' objection.",
    ctaType:
      "Get a FREE Inspection Before It's Too Late — urgency embedded in CTA copy",
    replicationNotes:
      "The neighbor reference works because homeowners are competitive about their property. The damage photo must be genuinely alarming — structural, not surface-level. The seasonal hook must be real and timely. Red headline bar = danger/warning signal. Yellow CTA = action/urgency. The 'before it's too late' phrasing in the CTA reinforces the FOMO without being manipulative.",
  },
  {
    id: "5",
    title: "Pressure Washing — Cinematic Hero Shot + Satisfaction Hook",
    angle: "Hero Shot",
    niche: "Pressure Washing",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_hero_shot-UjTbEqjUkeyBMjxNwUM4Fo.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The action shot of water spraying on a driveway triggers the 'satisfying clean' dopamine response — the same mechanism behind viral pressure washing videos. The branded uniform establishes professionalism. The clean stripe in the driveway is the visual proof of the result. The gradient overlay keeps text readable without obscuring the hero image. The 'Instant Quote' CTA removes the friction of scheduling.",
    hook: "Your Driveway Deserves Better",
    copyFormula:
      "Aspirational identity hook (your property deserves X) + visual proof of result + speed/convenience promise + social proof count + instant-action CTA.",
    trustElement:
      "500+ Jobs This Season (recency + volume) + 5-star rating. 'This Season' signals active, current demand — not a stale business.",
    ctaType:
      "Book Online — Instant Quote (online booking + instant = zero friction)",
    replicationNotes:
      "The action shot must show the clean stripe — the contrast between dirty and clean in the same frame is the entire value proposition. Technician must be in branded uniform with logo visible. Cinematic lighting (golden hour or dramatic) elevates perceived quality. Bottom gradient overlay: transparent at top, dark at bottom — keeps the image visible while making text readable. The headline should address the homeowner's identity, not just the service.",
  },
  {
    id: "6",
    title: "Epoxy Flooring — 4-Benefit Checklist + Luxury Result Photo",
    angle: "Features / Benefits",
    niche: "Epoxy / Flooring",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_features_benefits-hgLnZi7n3cVQJNeSEz3EEC.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The checklist format is the highest-performing layout for features/benefits ads because it allows rapid scanning. Each benefit is paired with a specific outcome, not just a feature name. The luxury car on the finished floor creates aspirational context — it's not just a floor, it's a lifestyle upgrade. The '3D Floor Preview' in the CTA is a unique differentiator that reduces purchase anxiety for a high-ticket, permanent installation.",
    hook: "Why 500+ Homeowners Chose Us for Their Garage Floor",
    copyFormula:
      "Social proof number in headline + 4 benefit/outcome pairs (feature → what it means for you) + aspirational visual + unique CTA differentiator.",
    trustElement:
      "500+ homeowners (volume) + Licensed & Insured + 5-star rating. The 'Licensed & Insured' badge is critical for in-home service businesses — it's a top objection.",
    ctaType:
      "Get Your Free Quote + 3D Floor Preview — the '3D Preview' is a unique hook that differentiates from competitors",
    replicationNotes:
      "Each checklist item must follow the formula: Feature Name — What It Means For You. Never list features without outcomes. The result photo must be aspirational — luxury car, clean space, dramatic lighting. Dark background makes the green checkmarks and white text pop. The CTA must include a unique differentiator (3D preview, same-day quote, etc.) that competitors don't offer.",
  },
  {
    id: "7",
    title: "Landscaping — Free Design Guide Lead Magnet",
    angle: "Lead Magnet",
    niche: "Landscaping",
    format: "Lead Form",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_lead_magnet-Dv2cEiEExrYqbb4ZHrzZdz.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The lead magnet angle works because it offers value before asking for anything. The aspirational backyard photo creates desire. The white card overlay creates a clean, editorial feel that signals quality. The specific content description ('12 Pages. Backyard Layouts, Plant Palettes...') makes the guide feel tangible and worth the email exchange. The 'No spam' micro-copy removes the email opt-in objection.",
    hook: "FREE: 2025 Outdoor Living Design Guide",
    copyFormula:
      "Free resource offer + specific content description (pages, topics) + geographic relevance (Montreal Homeowners) + email capture + trust signal (As Seen In) + no-spam reassurance.",
    trustElement:
      "As Seen In: Montreal Gazette, HomeStars — media mentions signal credibility and authority in the local market.",
    ctaType:
      "Send Me the Free Guide — first-person CTA copy outperforms 'Download' or 'Get'",
    replicationNotes:
      "The guide must be specific — page count, topics covered, geographic relevance. Vague lead magnets ('Free Tips!') don't convert. The aspirational photo must match the guide topic exactly. White card overlay creates contrast and draws the eye to the offer. First-person CTA ('Send Me') outperforms third-person ('Download Now') by 15-25% in A/B tests. The 'No spam' line must be present — it directly addresses the #1 opt-in objection.",
  },
  {
    id: "8",
    title: "Windows — UGC Video Style: Homeowner Savings Story",
    angle: "UGC / Testimonial",
    niche: "Windows",
    format: "Video",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_ugc_testimonial-EQMRnerwpu8Wohh33YXjTy.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "UGC-style ads outperform polished brand ads by 4x for service businesses because they feel like a recommendation from a neighbor, not an advertisement. The selfie format signals authenticity. The specific savings claim ('$180/month') is concrete and believable. Rendering it as a native Facebook post with the play button makes it feel organic — reducing ad blindness. The caption copy continues the story, driving curiosity to watch.",
    hook: "I saved $180/month on heating after these windows!",
    copyFormula:
      "Authentic selfie thumbnail + specific financial outcome in text overlay + story-continuation caption + play button (implies more content) + Learn More CTA.",
    trustElement:
      "The UGC format itself is the trust element — it looks like a real person's post, not an ad. The specific dollar amount ($180/month) is the credibility anchor.",
    ctaType:
      "Learn More — soft CTA appropriate for video/story format; hard CTAs reduce video completion rates",
    replicationNotes:
      "Film this with a real customer in their home, not an actor. The selfie must look genuinely amateur — professional lighting kills the UGC effect. The text overlay must include a specific, verifiable claim (savings amount, time saved, problem solved). The caption must create curiosity and continue the story. Never use 'Watch Now' as CTA for UGC — 'Learn More' or 'See How' performs better.",
  },
  {
    id: "9",
    title: "Plumbing — 3-Step Process + Technician Handshake",
    angle: "Process / How It Works",
    niche: "Plumbing",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_process_howto-Lo5yb8bCnJpHijrHNg6wrY.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "The process format reduces the #1 barrier to booking home services: uncertainty about what happens next. By making the process transparent and simple (3 steps), it removes the 'I don't know what I'm getting into' objection. The flat-rate pricing callout in Step 2 directly addresses the 'surprise bill' fear. The handshake photo signals partnership and satisfaction. The Facebook post chrome makes it feel native.",
    hook: "How We Fix Your Plumbing in 3 Simple Steps",
    copyFormula:
      "Process transparency headline + 3 numbered steps (each with icon + outcome + objection removal) + visual proof of satisfied customer + geographic trust signal + CTA.",
    trustElement:
      "5-star rating + 'Serving Greater Toronto Area' (geographic specificity = local trust) + verified badge on company name.",
    ctaType:
      "Book Your Appointment Now — direct, action-oriented, no ambiguity",
    replicationNotes:
      "Each step must include an objection removal: Step 1 (availability: 'We Answer 24/7'), Step 2 (pricing fear: 'Flat Rate, No Surprises'), Step 3 (quality guarantee: 'Or We Come Back Free'). The handshake photo must show a professional technician in uniform — not a stock photo of two businesspeople. Geographic specificity in the trust strip is critical for local service businesses. Facebook post chrome increases native feel.",
  },
  {
    id: "10",
    title: "Roofing — Storm Season Urgency + Free Inspection Scarcity",
    angle: "Seasonal / Urgency",
    niche: "Roofing / Storm",
    format: "Static Image",
    imageUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/ad_seasonal_urgency-X5LoMZPLrrELkHYhR9vtRf.webp",
    sourceName: "Agency Creative Pattern",
    sourceUrl: "https://www.facebook.com/ads/library/",
    whyItWorks:
      "Storm damage ads are the highest-converting seasonal trigger for roofing because the external event (weather) creates urgency the advertiser doesn't have to manufacture. The damaged roof photo is visceral and immediately relevant to any homeowner. 'Limited to 25 Homes' creates genuine scarcity. The insurance claim assistance callout is a massive differentiator — most homeowners don't know they can get help navigating claims. The GAF Master Elite badge is the highest trust signal in roofing.",
    hook: "Storm Season Is Here. Is Your Roof Ready?",
    copyFormula:
      "Seasonal threat hook (question format) + scarcity offer + 3 differentiating benefits + trust badges + phone number + CTA. The question format engages the reader's self-assessment instinct.",
    trustElement:
      "GAF Master Elite badge (top 3% of roofers nationally) + BBB A+ + phone number with branded vanity number (888-ROOF-911 signals emergency availability).",
    ctaType:
      "Claim Your Free Inspection — 'Claim' implies the offer is theirs to take, not a request",
    replicationNotes:
      "Run this ad the week before and after any major storm event in your target market. The damaged roof photo must look like a real suburban home, not a commercial building. 'Limited to 25 Homes' must be a real constraint — don't fake scarcity. Insurance claim assistance is the #1 differentiator for storm-season roofing — always include it. The GAF Master Elite or equivalent manufacturer certification is the most credible trust badge in roofing.",
  },
];

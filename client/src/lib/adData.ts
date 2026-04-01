// ============================================================
// Meta Ad Creative Canvas — Service Business Lead Gen
// Design: Dark Intelligence Board
// All images served from CDN. Angle taxonomy color-coded.
// ============================================================

export type Angle =
  | "Before / After"
  | "Offer / Discount"
  | "Social Proof"
  | "Pain / FOMO"
  | "Hero Shot"
  | "Features / Benefits"
  | "Process / How It Works"
  | "Seasonal / Urgency"
  | "UGC / Testimonial"
  | "Lead Magnet";

export type Format = "Static Image" | "Carousel" | "Video" | "Lead Form";
export type Niche =
  | "HVAC"
  | "Roofing"
  | "Pressure Washing"
  | "Epoxy / Flooring"
  | "Landscaping"
  | "Remodeling"
  | "Plumbing"
  | "Electrical"
  | "General Home Services";

export interface AdExample {
  id: string;
  title: string;
  niche: Niche;
  angle: Angle;
  format: Format;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  hook: string;
  trustElement: string;
  ctaType: string;
  copyFormula: string;
  replicationNotes: string;
  whyItWorks: string;
}

export const ANGLE_COLORS: Record<Angle, string> = {
  "Before / After": "#3B82F6",       // blue-500
  "Offer / Discount": "#F59E0B",     // amber-500
  "Social Proof": "#10B981",         // emerald-500
  "Pain / FOMO": "#EF4444",          // red-500
  "Hero Shot": "#8B5CF6",            // violet-500
  "Features / Benefits": "#6366F1",  // indigo-500
  "Process / How It Works": "#A855F7", // purple-500
  "Seasonal / Urgency": "#F97316",   // orange-500
  "UGC / Testimonial": "#14B8A6",    // teal-500
  "Lead Magnet": "#EC4899",          // pink-500
};

export const ANGLE_BG: Record<Angle, string> = {
  "Before / After": "rgba(59,130,246,0.15)",
  "Offer / Discount": "rgba(245,158,11,0.15)",
  "Social Proof": "rgba(16,185,129,0.15)",
  "Pain / FOMO": "rgba(239,68,68,0.15)",
  "Hero Shot": "rgba(139,92,246,0.15)",
  "Features / Benefits": "rgba(99,102,241,0.15)",
  "Process / How It Works": "rgba(168,85,247,0.15)",
  "Seasonal / Urgency": "rgba(249,115,22,0.15)",
  "UGC / Testimonial": "rgba(20,184,166,0.15)",
  "Lead Magnet": "rgba(236,72,153,0.15)",
};

export const AD_EXAMPLES: AdExample[] = [
  {
    id: "1",
    title: "Home Improvement Planning — Free Quote Hook",
    niche: "Remodeling",
    angle: "Lead Magnet",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/LYRhxYy6hAg6_77bc2475.png",
    sourceUrl: "https://handoff.ai/blog/facebook-ad-types-remodeling",
    sourceName: "Handoff AI",
    hook: "Planning a Home Remodel? — question-based hook targeting homeowners in research mode",
    trustElement: "Free Quote badge + friendly CTA copy",
    ctaType: "Free Quote",
    copyFormula: "Question Hook → Value Promise → Low-friction CTA",
    replicationNotes: "Use a high-quality lifestyle kitchen/bathroom photo. Bold question headline in contrasting color block. 'FREE QUOTE' badge bottom-right. Keep copy under 6 words on image.",
    whyItWorks: "Catches homeowners mid-research. Question format creates self-identification. Free quote removes commitment barrier.",
  },
  {
    id: "2",
    title: "Plumbing Solutions — Services List + Branded Technician",
    niche: "Plumbing",
    angle: "Features / Benefits",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/7QkzFHEZjPVj_24dbbc4d.jpg",
    sourceUrl: "https://posterMyWall.com",
    sourceName: "PosterMyWall",
    hook: "PLUMBING SOLUTIONS — We Fix All Your Plumbing Problems",
    trustElement: "Uniformed technician, 24/7 badge, phone number prominent",
    ctaType: "Call Us",
    copyFormula: "Bold Service Category → Bulleted Service List → Phone CTA",
    replicationNotes: "Branded color block (navy/orange). Technician in uniform, hard hat. Service list with checkmarks. Phone number large. '24/7 OPEN' badge. Works for any trade.",
    whyItWorks: "Immediately communicates what you do. Uniform builds trust. Service list handles objections visually. Phone CTA captures high-intent leads.",
  },
  {
    id: "3",
    title: "Modern Plumbing — Social Proof Wall + Awards",
    niche: "Plumbing",
    angle: "Social Proof",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/DciJUcxjWH73_30249e79.jpg",
    sourceUrl: "https://roiminds.com/blog/plumbing-ads",
    sourceName: "ROI Minds",
    hook: "Serviced Once, Customer For Life — 270+ Five Star Reviews",
    trustElement: "3× 'Best of Flathead' award badges, review count, team photo",
    ctaType: "Contact Us",
    copyFormula: "Tagline → Proof Points (awards + reviews) → Team photo → Phone",
    replicationNotes: "Stack award badges prominently. Include team/owner photo for authenticity. Review count in bold. Value differentiators as bullet list (no upsell, senior discounts, etc.).",
    whyItWorks: "Award badges act as third-party validation. Review count provides social proof at scale. Team photo humanizes the brand.",
  },
  {
    id: "4",
    title: "Electrical Services — Expert Care Grid",
    niche: "Electrical",
    angle: "Features / Benefits",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/2PShMoItqQ6v_1761af61.png",
    sourceUrl: "https://lokalhq.com/blog/electrician-facebook-ads",
    sourceName: "Lokal HQ",
    hook: "Expert Care For All Your Electrical Needs",
    trustElement: "Branded uniform, service icons (Repairs / Installations / Inspections / 24/7 Emergency)",
    ctaType: "Visit Instagram / Call",
    copyFormula: "Headline → Icon Grid of Services → Branded Technician Photo → Phone",
    replicationNotes: "Dark background makes brand colors pop. 4-icon service grid is scannable in 1 second. Technician in branded shirt. Emergency badge drives urgency.",
    whyItWorks: "Icon grid communicates breadth of services instantly. Dark background = premium feel. Emergency angle creates urgency without being pushy.",
  },
  {
    id: "5",
    title: "Pressure Washing — Before/After Multi-Surface",
    niche: "Pressure Washing",
    angle: "Before / After",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/E1LUyjE4bEgM_304eb323.jpg",
    sourceUrl: "https://zeely.ai/blog/15-pressure-washing-ads",
    sourceName: "Zeely AI",
    hook: "Refer a Neighbor, Get $25 — Restore / Remove / Keep",
    trustElement: "Real before/after photos across 3 surfaces (fence, deck, car)",
    ctaType: "Book Now (×3)",
    copyFormula: "Referral Incentive → 3-column Before/After Grid → Benefit Labels → Book Now",
    replicationNotes: "3-column grid showing different surfaces = broader appeal. Referral hook adds virality. Each column has its own CTA button. Warm background color (dusty rose) stands out in feed.",
    whyItWorks: "Multiple surfaces = multiple homeowner pain points hit simultaneously. Referral mechanic turns customers into lead sources. Visual transformation is the proof.",
  },
  {
    id: "6",
    title: "Power Washing — Drone Aerial Before/After",
    niche: "Pressure Washing",
    angle: "Before / After",
    format: "Video",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/6AfFYIKpiX5N_780fc7e2.png",
    sourceUrl: "https://facebook.com/ads/library",
    sourceName: "Meta Ad Library",
    hook: "10% Off Spring Power Washing Promo — Seasonal discount on soft wash",
    trustElement: "Real job photo, company name, direct website link",
    ctaType: "Get Quote",
    copyFormula: "Seasonal Offer → Process Explanation → Social Proof → CTA",
    replicationNotes: "Aerial or wide-angle shot of actual job site. Seasonal discount creates urgency. Soft wash differentiation builds expertise. Simple layout, no design needed — authenticity wins.",
    whyItWorks: "Seasonal timing (spring clean) aligns with homeowner mindset. Discount lowers barrier. Real photo = trust. Simple copy outperforms polished design in this niche.",
  },
  {
    id: "7",
    title: "Epoxy Garage Floors — Tiered Pricing Offer",
    niche: "Epoxy / Flooring",
    angle: "Offer / Discount",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/YVcXck5Po74H_94f30098.png",
    sourceUrl: "https://roiminds.com/blog/epoxy-ads",
    sourceName: "ROI Minds",
    hook: "$200 OFF 1-Car / $300 OFF 2-Car / $400 OFF 3-Car Garage",
    trustElement: "Lifetime warranty badge, phone number, website URL",
    ctaType: "Free Quote / Call",
    copyFormula: "Tiered Discount Grid → Lifetime Warranty → Phone CTA",
    replicationNotes: "Tiered pricing makes the 3-car option feel like the obvious choice (anchoring). Blue/white brand colors. Garage icons for each tier. Warranty badge handles the main objection. Works for any flooring niche.",
    whyItWorks: "Tiered offer creates anchoring effect — 3-car looks like best value. Lifetime warranty removes risk objection. Specific dollar amounts feel more credible than % discounts.",
  },
  {
    id: "8",
    title: "Epoxy Flooring — Product Demo UGC Style",
    niche: "Epoxy / Flooring",
    angle: "UGC / Testimonial",
    format: "Video",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/0qyLKacRpKsc_b24825e3.png",
    sourceUrl: "https://roiminds.com/blog/epoxy-ads",
    sourceName: "ROI Minds",
    hook: "Everything You Need To Pour — product demo in action",
    trustElement: "Hands-on product demo, brand name prominent, real application footage",
    ctaType: "Shop / Learn More",
    copyFormula: "Action Hook → Product Demo → Brand Name → Shop CTA",
    replicationNotes: "POV/hands-on video of the product being applied. Bold text overlay on dark background. No voiceover needed — visual is the hook. Works for any service with a visible transformation process.",
    whyItWorks: "Process video builds confidence in the product/service. POV angle creates immersion. Bold text overlay works with sound off (90% of feed views).",
  },
  {
    id: "9",
    title: "Siding Contractor — Carousel Financing Offer",
    niche: "General Home Services",
    angle: "Offer / Discount",
    format: "Carousel",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/5ZWSuYROJFUB_105d20f4.png",
    sourceUrl: "https://tradiedigital.co/blog/home-improvement-ads",
    sourceName: "Tradie Digital",
    hook: "CARL'S has several financing options to choose from — making it even easier to start that summer siding project!",
    trustElement: "#1 Local Siding Company badge, real project photos",
    ctaType: "Get Quote",
    copyFormula: "Financing Offer → Project Photos → Social Proof Badge → Get Quote",
    replicationNotes: "Carousel: Card 1 = financing hook + project photo. Card 2 = #1 badge + testimonial. Card 3 = CTA. Financing angle removes the biggest objection (cost). Summer timing creates urgency.",
    whyItWorks: "Financing removes the #1 objection (price). Carousel format lets you tell a story across multiple cards. '#1 Local' badge is credible and local-specific.",
  },
  {
    id: "10",
    title: "Roofing — Hail Damage Free Inspection",
    niche: "Roofing",
    angle: "Seasonal / Urgency",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/MZl5wFY1w4VW_0c2b8140.webp",
    sourceUrl: "https://roiminds.com/blog/roofing-facebook-ads",
    sourceName: "ROI Minds",
    hook: "Hail Damage? Can't Be Seen Without Close Inspection — FREE Inspection",
    trustElement: "Real hail damage photo, FREE badge, licensed contractor implied",
    ctaType: "Free Inspection",
    copyFormula: "Event Trigger (storm) → Hidden Risk Education → Free Offer → CTA",
    replicationNotes: "Run after any weather event in the target area. Real damage photo is the hook — no design needed. 'Can't be seen' creates fear of unknown damage. Free inspection = zero barrier to entry.",
    whyItWorks: "Event-triggered ads have 3–5× higher relevance scores. Hidden damage angle creates urgency without being alarmist. Free inspection is the lowest-friction offer in roofing.",
  },
  {
    id: "11",
    title: "Roofing — High-Performing Facebook Ads Examples",
    niche: "Roofing",
    angle: "Social Proof",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/JhW8sbGZBqVh_603aa366.png",
    sourceUrl: "https://lokalhq.com/blog/roofing-facebook-ads",
    sourceName: "Lokal HQ",
    hook: "Multiple roofing ad creative formats showing what works for lead gen",
    trustElement: "Real project photos, review counts, local business credibility",
    ctaType: "Get Free Estimate",
    copyFormula: "Social Proof → Project Photos → Local Credibility → Estimate CTA",
    replicationNotes: "Compile 3–4 real project photos in a grid. Add star rating and review count. Local city name in headline. 'Free Estimate' is the universal roofing CTA.",
    whyItWorks: "Real photos outperform stock. Review count provides social proof. Local specificity increases relevance score and CTR.",
  },
  {
    id: "12",
    title: "Grayhawk Remodeling — Interior Transformation",
    niche: "Remodeling",
    angle: "Hero Shot",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/cy4KBDah3S3f_45f4b50b.png",
    sourceUrl: "https://facebook.com/ads/library",
    sourceName: "Meta Ad Library — Grayhawk Systems",
    hook: "Make Your House A Home — Book Now",
    trustElement: "Beautiful interior photo, company name, Book Now CTA",
    ctaType: "Book Now",
    copyFormula: "Aspirational Headline → Beautiful Hero Photo → Simple CTA",
    replicationNotes: "High-quality interior/exterior photo is 90% of the work. Minimal text overlay. Aspirational copy (not features). 'Book Now' CTA. Works for kitchens, bathrooms, windows, siding.",
    whyItWorks: "Aspirational imagery creates desire before the copy does any work. Minimal text lets the photo breathe. Book Now CTA captures high-intent traffic.",
  },
  {
    id: "13",
    title: "Home Remodeling — Free Consultation Lead Form",
    niche: "Remodeling",
    angle: "Lead Magnet",
    format: "Lead Form",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/DGf6u259CFUp_a356d499.png",
    sourceUrl: "https://tradiedigital.co/blog/home-improvement-ads",
    sourceName: "Tradie Digital",
    hook: "Ready to Transform Your Bathroom? Get a Free Consultation Today!",
    trustElement: "No-obligation promise, free consultation offer, simple form",
    ctaType: "Get Free Consultation",
    copyFormula: "Transformation Question → No-Obligation Promise → Simple Form → CTA",
    replicationNotes: "Lead form ads keep users on Facebook — higher conversion rate for cold traffic. 'No-obligation' removes risk. Ask only name, email, phone. Follow up within 5 minutes.",
    whyItWorks: "Lead forms remove the landing page friction point. Pre-filled data from Facebook profile increases completion rate. No-obligation language reduces hesitation.",
  },
  {
    id: "14",
    title: "HVAC — Strategy Overview for Lead Gen",
    niche: "HVAC",
    angle: "Features / Benefits",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/MJoCA92fxqKJ_429fd129.jpg",
    sourceUrl: "https://hookagency.com/blog/hvac-facebook-ads",
    sourceName: "Hook Agency",
    hook: "Mastering HVAC Facebook Ads — Strategies for Effective Campaigns",
    trustElement: "Professional imagery, service credibility, local trust signals",
    ctaType: "Learn More / Book Service",
    copyFormula: "Seasonal Relevance → Service Benefit → Trust Signals → CTA",
    replicationNotes: "HVAC ads perform best with seasonal hooks (AC before summer, heating before winter). Show the unit + comfortable family. Energy savings angle works year-round.",
    whyItWorks: "Seasonal timing creates natural urgency. Energy savings is a financial benefit that resonates universally. Comfort imagery creates emotional connection.",
  },
  {
    id: "15",
    title: "Landscaping — Project Showcase Carousel",
    niche: "Landscaping",
    angle: "Hero Shot",
    format: "Carousel",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/kDlyv09uEqvK_3d6ee62f.png",
    sourceUrl: "https://facebook.com/ads/library",
    sourceName: "Meta Ad Library — Your Local Landscaper",
    hook: "Check out this amazing project completed on 1.5 acres — Book Now",
    trustElement: "Real project photos, specific project details (1.5 acres), team names",
    ctaType: "Book Now",
    copyFormula: "Real Project Story → Specific Details → Team Mention → Book Now",
    replicationNotes: "Use real project photos — never stock. Mention specific details (acreage, project type). Name the crew members for authenticity. Carousel shows the full transformation.",
    whyItWorks: "Specificity (1.5 acres, crew names) signals authenticity. Real project photos create aspiration. Carousel format increases engagement time.",
  },
  {
    id: "16",
    title: "Client Testimonial Video Ad",
    niche: "General Home Services",
    angle: "UGC / Testimonial",
    format: "Video",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/8uoyrDSSZJe7_85c19cb2.jpg",
    sourceUrl: "https://hookagency.com/blog/home-services-facebook-ads-guide",
    sourceName: "Hook Agency",
    hook: "The best review is a client review — What are your client successes?",
    trustElement: "Real client quote, client name + title, video testimonial format",
    ctaType: "Call Now",
    copyFormula: "Client Quote → Client Name/Title → Company Branding → CTA",
    replicationNotes: "Record 30–60 sec video testimonials from happy clients. Ask: 'What problem did we solve?' and 'What would you tell a neighbor?' Branded lower-third with client name. Works across all service niches.",
    whyItWorks: "Third-party validation is 10× more credible than self-promotion. Video testimonials are the highest-trust format. Specific results ('made my company grow') beat generic praise.",
  },
  {
    id: "17",
    title: "Home Services — Lead Gen Framework Overview",
    niche: "General Home Services",
    angle: "Lead Magnet",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/EAxHvWSZsiJC_0ba3f177.png",
    sourceUrl: "https://seominteractive.com/blog/facebook-ads-lead-gen",
    sourceName: "SEOM Interactive",
    hook: "Lead Generation on Facebook: What Works Now",
    trustElement: "Compelling offer, optimized instant forms, relatable creative",
    ctaType: "Submit / Get Access",
    copyFormula: "Framework Headline → 3-Pillar Visual → CTA",
    replicationNotes: "The 3-pillar framework (Compelling Offer + Optimized Form + Relatable Creative) is the replication blueprint for any service business. Use this as your testing matrix.",
    whyItWorks: "Visual frameworks are highly shareable and educational. Position your agency or service as the expert. Works as a lead magnet for B2B (agencies selling to contractors).",
  },
  {
    id: "18",
    title: "Epoxy Flooring — Design + Financing Combo",
    niche: "Epoxy / Flooring",
    angle: "Offer / Discount",
    format: "Static Image",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030950457/dRncbxXNmUf38BsvK4wvny/yseKEc3gBNLh_ab01866f.png",
    sourceUrl: "https://behance.net",
    sourceName: "Behance",
    hook: "Elevate Your Space with Stunning Epoxy Flooring — 60 Days No Payments",
    trustElement: "Financing offer, why choose us list, free consultation CTA",
    ctaType: "Schedule Free Consultation",
    copyFormula: "Aspirational Headline → Why Choose Us → Financing Offer → Free Consult CTA",
    replicationNotes: "Blue brand color = trust. Beautiful finished floor photo. 'Why Choose Us' bullet list handles objections. 60-day financing removes price barrier. Free consultation is low-friction entry.",
    whyItWorks: "Financing offer (60 days no payments) removes the #1 objection. Beautiful result photo creates desire. Free consultation CTA is zero-commitment.",
  },
];

export const ALL_ANGLES: Angle[] = [
  "Before / After",
  "Offer / Discount",
  "Social Proof",
  "Pain / FOMO",
  "Hero Shot",
  "Features / Benefits",
  "Process / How It Works",
  "Seasonal / Urgency",
  "UGC / Testimonial",
  "Lead Magnet",
];

export const ALL_NICHES: Niche[] = [
  "HVAC",
  "Roofing",
  "Pressure Washing",
  "Epoxy / Flooring",
  "Landscaping",
  "Remodeling",
  "Plumbing",
  "Electrical",
  "General Home Services",
];

export const ALL_FORMATS: Format[] = [
  "Static Image",
  "Carousel",
  "Video",
  "Lead Form",
];

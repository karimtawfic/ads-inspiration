import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { generateImage } from "../_core/imageGeneration";
import { invokeLLM } from "../_core/llm";

// ─── Input Schema ──────────────────────────────────────────────────────────────
const GenerateAdInput = z.object({
  niche: z.string().min(1),
  angle: z.string().min(1),
  companyName: z.string().optional().default(""),
  offer: z.string().optional().default(""),
  location: z.string().optional().default("North America"),
  tagline: z.string().optional().default(""),
});

// ─── Prompt Builder ────────────────────────────────────────────────────────────
function buildImagePrompt(params: {
  niche: string;
  angle: string;
  companyName: string;
  offer: string;
  location: string;
  tagline: string;
}): string {
  const { niche, angle, companyName, offer, location, tagline } = params;

  const angleDirectives: Record<string, string> = {
    "Before / After": `Split-screen layout. LEFT: a damaged, dirty, or broken ${niche.toLowerCase()} scene — dark, gritty, realistic. RIGHT: pristine, professional, clean result after service. Bold dividing line in the center. Text overlay on left: "BEFORE" in red. Text overlay on right: "AFTER" in green. Photorealistic photography style.`,
    "Offer / Discount": `Bold promotional ad. Large centered headline text: "${offer || "FREE ESTIMATE"}". Bright accent color background (red or orange). Company name "${companyName || niche + " Pro"}" in bold at top. Star rating and phone number at bottom. Clean, high-contrast design. Professional service business aesthetic.`,
    "Social Proof": `Testimonial-style ad. Real-looking homeowner photo on left (smiling, casual). Large pull quote on right: "Best ${niche.toLowerCase()} company I've ever used — 5 stars!" Five gold stars. Company logo area at bottom. Warm, trustworthy color palette. Photorealistic.`,
    "Pain / FOMO": `Urgent warning-style ad. Dramatic close-up of a ${niche.toLowerCase()} problem (cracked roof, leaking pipe, HVAC failure, pest infestation). Bold red text overlay: "Don't wait until it's too late." Urgency subtext below. Dark, high-contrast background. Photorealistic problem photography.`,
    "Hero Shot": `Premium hero image ad. Professional ${niche.toLowerCase()} technician in branded uniform, confident pose, standing in front of a clean service truck with company branding. Blue sky background. Clean, aspirational. Company name overlay at bottom. Photorealistic commercial photography style.`,
    "Features / Benefits": `Clean benefits list ad. Three or four bold feature icons with short text labels (e.g., "Licensed & Insured", "Same-Day Service", "5-Star Rated", "Free Estimate"). Company name at top. CTA button at bottom: "Get Your Free Quote". Professional, modern design. Dark background with white text.`,
    "Lead Magnet": `Free offer ad. Prominent "FREE" badge or ribbon in top corner. Main visual: a checklist or guide document mockup. Headline: "Free ${niche} Inspection Checklist". Subtext: "Download instantly — no strings attached." Clean, trustworthy design. Blue and white color palette.`,
    "UGC / Testimonial": `User-generated content style ad. Casual, authentic-looking photo of a happy homeowner in front of their home after ${niche.toLowerCase()} service. Handwritten-style font overlay with their quote. Instagram-style frame. Authentic, unpolished aesthetic. Real-feeling, not stock photo.`,
    "Process / How It Works": `Three-step process infographic ad. Step 1: "Call Us" with phone icon. Step 2: "We Come to You" with truck icon. Step 3: "Problem Solved" with checkmark icon. Clean horizontal layout. Company colors. Professional, reassuring design. Bold step numbers.`,
    "Seasonal / Urgency": `Seasonal urgency ad. Background: relevant seasonal imagery (storm clouds, summer heat, winter snow, spring flooding). Bold headline: "Storm Season Is Here — Is Your ${niche} Ready?" Countdown timer graphic or "Limited Spots Available" badge. High-contrast, urgent design.`,
    "Financing / Monthly": `Financing offer ad. Large bold text: "$${offer || "95"}/month" in center. Subtext: "No money down — OAC". Company name at top. Clean, modern financial-style design. Blue and white palette. Trust badges: "Licensed", "Insured", "BBB Accredited". Professional.`,
    "Humor / Pattern Interrupt": `Humorous, attention-grabbing ad. Unexpected, funny visual metaphor related to ${niche.toLowerCase()} (e.g., a melting ice cream cone for HVAC, a fridge sweating for AC service). Bold, playful headline. Bright colors. Company name and CTA at bottom. Eye-catching, scroll-stopping design.`,
  };

  const directive = angleDirectives[angle] || `Professional ${niche} service business Facebook ad creative. Clean, modern design. Company name: ${companyName || niche + " Pro"}. Offer: ${offer || "Free Estimate"}. Location: ${location}.`;

  const locationNote = location ? ` Targeting ${location} homeowners.` : "";
  const companyNote = companyName ? ` Company: "${companyName}".` : "";
  const taglineNote = tagline ? ` Tagline: "${tagline}".` : "";

  return `Professional Meta Facebook ad creative for a ${niche} service business. ${directive}${companyNote}${taglineNote}${locationNote}

Style requirements: photorealistic or clean graphic design, high production value, looks like a real $5,000/month agency-produced Facebook ad. 1:1 square format (1080x1080). No watermarks. No lorem ipsum. All text must be readable and professional. The ad should look like it's currently running and converting leads.

Negative: avoid clip art, cartoon style, low quality, blurry, pixelated, amateur design, stock photo watermarks, generic templates.`;
}

// ─── Replication Prompt Builder ────────────────────────────────────────────────
async function buildReplicationPrompt(params: {
  niche: string;
  angle: string;
  companyName: string;
  offer: string;
  location: string;
  tagline: string;
}): Promise<{
  replicationPrompt: string;
  copyFormula: string;
  hook: string;
  trustElement: string;
  ctaType: string;
  whyItWorks: string;
  variants: string[];
}> {
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an elite Meta ads creative strategist for service businesses. You produce precise, replication-ready ad creative blueprints. Output JSON only.`,
      },
      {
        role: "user",
        content: `Generate a complete ad creative blueprint for:
- Niche: ${params.niche}
- Angle: ${params.angle}
- Company: ${params.companyName || "generic " + params.niche + " company"}
- Offer: ${params.offer || "Free Estimate"}
- Location: ${params.location}
- Tagline: ${params.tagline || "none"}

Return JSON with these exact fields:
{
  "replicationPrompt": "A detailed Midjourney/DALL-E/Gemini prompt to recreate this ad creative (150-200 words, very specific about visual layout, colors, typography, photography style)",
  "copyFormula": "The exact headline + body copy formula used (e.g., 'PAIN HEADLINE + CREDIBILITY PROOF + URGENCY CTA')",
  "hook": "The specific opening hook line for this ad (the first thing they read/see)",
  "trustElement": "The trust signal used (e.g., '247 5-star reviews', 'Licensed & Insured', 'BBB A+ Rating')",
  "ctaType": "The CTA type and text (e.g., 'Lead Form — Get My Free Quote', 'Click — Call Now')",
  "whyItWorks": "2-3 sentences explaining the psychological mechanism that makes this angle convert for this niche",
  "variants": ["Variant 1: brief description of a different execution of the same angle", "Variant 2: ...", "Variant 3: ..."]
}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "ad_blueprint",
        strict: true,
        schema: {
          type: "object",
          properties: {
            replicationPrompt: { type: "string" },
            copyFormula: { type: "string" },
            hook: { type: "string" },
            trustElement: { type: "string" },
            ctaType: { type: "string" },
            whyItWorks: { type: "string" },
            variants: { type: "array", items: { type: "string" } },
          },
          required: ["replicationPrompt", "copyFormula", "hook", "trustElement", "ctaType", "whyItWorks", "variants"],
          additionalProperties: false,
        },
      },
    },
  });

  const rawContent = response.choices?.[0]?.message?.content;
  if (!rawContent) throw new Error("LLM returned no content");
  const content = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);

  return JSON.parse(content);
}

// ─── Router ────────────────────────────────────────────────────────────────────
export const generateRouter = router({
  createAdCreative: publicProcedure
    .input(GenerateAdInput)
    .mutation(async ({ input }) => {
      const params = {
        niche: input.niche,
        angle: input.angle,
        companyName: input.companyName,
        offer: input.offer,
        location: input.location,
        tagline: input.tagline,
      };

      // Run image generation and blueprint in parallel
      const [imageResult, blueprint] = await Promise.all([
        generateImage({ prompt: buildImagePrompt(params) }),
        buildReplicationPrompt(params),
      ]);

      return {
        imageUrl: imageResult.url ?? "",
        ...blueprint,
        niche: input.niche,
        angle: input.angle,
        companyName: input.companyName,
        offer: input.offer,
      };
    }),
});

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

// Meta Ad Library Graph API endpoint
const META_AD_LIBRARY_URL = "https://graph.facebook.com/v19.0/ads_archive";

interface MetaAdResult {
  id: string;
  ad_creative_bodies?: string[];
  ad_creative_link_captions?: string[];
  ad_creative_link_descriptions?: string[];
  ad_creative_link_titles?: string[];
  ad_snapshot_url?: string;
  page_name?: string;
  page_id?: string;
  impressions?: { lower_bound: string; upper_bound: string };
  spend?: { lower_bound: string; upper_bound: string };
  ad_delivery_start_time?: string;
  ad_delivery_stop_time?: string;
  languages?: string[];
  publisher_platforms?: string[];
}

export interface CompetitorAd {
  id: string;
  pageName: string;
  pageId: string;
  headline: string;
  body: string;
  description: string;
  snapshotUrl: string;
  impressionsLow: string;
  impressionsHigh: string;
  spendLow: string;
  spendHigh: string;
  startDate: string;
  platforms: string[];
  replicationPrompt: string;
  angle: string;
  hook: string;
}

function extractPageIdFromUrl(url: string): string | null {
  // Handle formats:
  // https://www.facebook.com/CompanyName/
  // https://facebook.com/pages/Company-Name/123456789
  // https://www.facebook.com/profile.php?id=123456789
  // Direct page ID numbers
  
  const trimmed = url.trim();
  
  // Direct numeric ID
  if (/^\d+$/.test(trimmed)) return trimmed;
  
  // profile.php?id=
  const profileMatch = trimmed.match(/profile\.php\?id=(\d+)/);
  if (profileMatch) return profileMatch[1];
  
  // /pages/*/ID
  const pagesMatch = trimmed.match(/\/pages\/[^/]+\/(\d+)/);
  if (pagesMatch) return pagesMatch[1];
  
  // Extract page name from URL for search
  const nameMatch = trimmed.match(/facebook\.com\/([^/?#]+)/);
  if (nameMatch && nameMatch[1] !== "profile.php") return nameMatch[1];
  
  return null;
}

async function generateReplicationPrompt(ad: MetaAdResult): Promise<{ replicationPrompt: string; angle: string; hook: string }> {
  const body = ad.ad_creative_bodies?.[0] || "";
  const title = ad.ad_creative_link_titles?.[0] || "";
  const description = ad.ad_creative_link_descriptions?.[0] || "";
  
  const adText = [title, body, description].filter(Boolean).join("\n");
  
  if (!adText.trim()) {
    return {
      replicationPrompt: "No copy available to generate replication prompt.",
      angle: "Unknown",
      hook: "No hook detected",
    };
  }
  
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert Meta ad creative strategist. Analyze ad copy and output JSON with:
- angle: the creative angle (one of: Before/After, Offer/Discount, Social Proof, Pain/Urgency, Hero Shot, Features/Benefits, UGC/Testimonial, Process/How-To, Seasonal Urgency, Neighbor FOMO, Financing, Humor)
- hook: the opening hook in 1 sentence
- replicationPrompt: a detailed prompt to recreate this ad as a Meta static image ad creative, including visual spec, copy, CTA, badges, and format. Be specific and actionable.`,
        },
        {
          role: "user",
          content: `Analyze this Meta ad and generate a replication prompt:\n\nPage: ${ad.page_name || "Unknown"}\nTitle: ${title}\nBody: ${body}\nDescription: ${description}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ad_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              angle: { type: "string" },
              hook: { type: "string" },
              replicationPrompt: { type: "string" },
            },
            required: ["angle", "hook", "replicationPrompt"],
            additionalProperties: false,
          },
        },
      },
    });
    
    const content = response.choices?.[0]?.message?.content;
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      return parsed;
    }
  } catch (e) {
    // fallback
  }
  
  return {
    replicationPrompt: `Recreate this ${ad.page_name || "service business"} ad as a professional Meta static image creative. Copy: "${adText.slice(0, 200)}". Use dark scrim, bold white headline, trust badge, and strong CTA button.`,
    angle: "Unknown",
    hook: body.split(".")[0] || body.slice(0, 100),
  };
}

export const competitorRouter = router({
  searchByPage: publicProcedure
    .input(
      z.object({
        pageIdentifier: z.string().min(1),
        country: z.string().default("US"),
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .mutation(async ({ input }) => {
      const pageId = extractPageIdFromUrl(input.pageIdentifier);
      
      if (!pageId) {
        throw new Error("Could not extract page identifier from URL. Please provide a valid Facebook page URL or page ID.");
      }
      
      // Check if we have a Meta access token
      const accessToken = process.env.META_ACCESS_TOKEN;
      
      if (!accessToken) {
        // Return mock data showing what the feature would look like
        return {
          ads: getMockCompetitorAds(pageId),
          pageName: "Demo Company (Meta API key required)",
          pageId,
          totalFound: 3,
          note: "Connect your Meta API token to pull real competitor ads. See setup instructions below.",
          requiresToken: true,
        };
      }
      
      try {
        // Build the API request
        const params = new URLSearchParams({
          access_token: accessToken,
          ad_type: "ALL",
          ad_reached_countries: `["${input.country}"]`,
          search_page_ids: `[${/^\d+$/.test(pageId) ? pageId : `"${pageId}"`}]`,
          fields: [
            "id",
            "ad_creative_bodies",
            "ad_creative_link_captions",
            "ad_creative_link_descriptions",
            "ad_creative_link_titles",
            "ad_snapshot_url",
            "page_name",
            "page_id",
            "impressions",
            "spend",
            "ad_delivery_start_time",
            "ad_delivery_stop_time",
            "publisher_platforms",
          ].join(","),
          limit: String(input.limit),
        });
        
        const response = await fetch(`${META_AD_LIBRARY_URL}?${params}`);
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error?.error?.message || "Meta API request failed");
        }
        
        const data = await response.json();
        const rawAds: MetaAdResult[] = data.data || [];
        
        if (rawAds.length === 0) {
          return {
            ads: [],
            pageName: pageId,
            pageId,
            totalFound: 0,
            note: "No active ads found for this page.",
            requiresToken: false,
          };
        }
        
        // Generate replication prompts for each ad
        const processedAds: CompetitorAd[] = await Promise.all(
          rawAds.map(async (ad) => {
            const { replicationPrompt, angle, hook } = await generateReplicationPrompt(ad);
            return {
              id: ad.id,
              pageName: ad.page_name || pageId,
              pageId: ad.page_id || pageId,
              headline: ad.ad_creative_link_titles?.[0] || "",
              body: ad.ad_creative_bodies?.[0] || "",
              description: ad.ad_creative_link_descriptions?.[0] || "",
              snapshotUrl: ad.ad_snapshot_url || "",
              impressionsLow: ad.impressions?.lower_bound || "N/A",
              impressionsHigh: ad.impressions?.upper_bound || "N/A",
              spendLow: ad.spend?.lower_bound || "N/A",
              spendHigh: ad.spend?.upper_bound || "N/A",
              startDate: ad.ad_delivery_start_time || "",
              platforms: ad.publisher_platforms || [],
              replicationPrompt,
              angle,
              hook,
            };
          })
        );
        
        return {
          ads: processedAds,
          pageName: rawAds[0]?.page_name || pageId,
          pageId,
          totalFound: rawAds.length,
          note: null,
          requiresToken: false,
        };
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Meta Ad Library API error: ${message}`);
      }
    }),
});

function getMockCompetitorAds(pageId: string): CompetitorAd[] {
  return [
    {
      id: "mock-1",
      pageName: "Example HVAC Company",
      pageId,
      headline: "New AC System — $0 Down, $89/Mo",
      body: "Beat the summer heat without breaking the bank. Get a brand-new, energy-efficient AC system installed by our certified technicians. Financing available for all credit types. Call today for a free quote!",
      description: "Carrier-certified installation · 10-year warranty · Same-day service",
      snapshotUrl: "https://www.facebook.com/ads/library/",
      impressionsLow: "10000",
      impressionsHigh: "50000",
      spendLow: "500",
      spendHigh: "999",
      startDate: "2025-06-01",
      platforms: ["facebook", "instagram"],
      angle: "Financing",
      hook: "Beat the summer heat without breaking the bank.",
      replicationPrompt: `Professional Meta Facebook ad creative for an HVAC company. Happy family in a cool living room, AC unit visible. Large bold white text: "NEW AC SYSTEM. $0 DOWN. $89/MO." Smaller text: "Carrier-certified. 10-year warranty. Financing for all credit types." Blue CTA button: "GET FREE QUOTE →". Dark scrim on bottom 40%. 4:5 ratio.`,
    },
    {
      id: "mock-2",
      pageName: "Example HVAC Company",
      pageId,
      headline: "Is Your AC Older Than 10 Years?",
      body: "Most homeowners don't realize their aging AC is costing them hundreds extra per year in energy bills. Get a free efficiency audit and find out if a new system makes financial sense for you.",
      description: "Free audit · No obligation · Certified technicians",
      snapshotUrl: "https://www.facebook.com/ads/library/",
      impressionsLow: "5000",
      impressionsHigh: "20000",
      spendLow: "200",
      spendHigh: "499",
      startDate: "2025-05-15",
      platforms: ["facebook"],
      angle: "Pain / Urgency",
      hook: "Most homeowners don't realize their aging AC is costing them hundreds extra per year.",
      replicationPrompt: `Professional Meta Facebook ad creative for an HVAC company. Split image: old rusty AC unit vs new clean modern unit. Large bold white text: "IS YOUR AC OLDER THAN 10 YEARS?" Smaller text: "It's costing you $200/month extra. Free efficiency audit — no obligation." Red CTA button: "BOOK FREE AUDIT →". Dark scrim on bottom 40%. 4:5 ratio.`,
    },
    {
      id: "mock-3",
      pageName: "Example HVAC Company",
      pageId,
      headline: "2,847 Homeowners Served. 4.9 Stars.",
      body: "\"Best HVAC company we've ever used. On time, professional, and the price was exactly what they quoted.\" — Sarah M., Phoenix AZ. Join thousands of satisfied homeowners.",
      description: "★★★★★ Rated · Licensed & Insured · Same-day available",
      snapshotUrl: "https://www.facebook.com/ads/library/",
      impressionsLow: "20000",
      impressionsHigh: "100000",
      spendLow: "1000",
      spendHigh: "4999",
      startDate: "2025-04-01",
      platforms: ["facebook", "instagram"],
      angle: "Social Proof",
      hook: "Best HVAC company we've ever used.",
      replicationPrompt: `Professional Meta Facebook ad creative for an HVAC company. Happy homeowner couple in front of their home. Large bold white text: '"BEST HVAC COMPANY WE\'VE EVER USED."' Attribution: "— Sarah M., Phoenix AZ". Smaller text: "2,847 homeowners served. 4.9 stars. Same-day service." Blue CTA button: "SEE MORE REVIEWS →". Dark scrim on bottom 40%. 4:5 ratio.`,
    },
  ];
}

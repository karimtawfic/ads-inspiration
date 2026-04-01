import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock the heavy dependencies ─────────────────────────────────────────────
vi.mock("../_core/imageGeneration", () => ({
  generateImage: vi.fn().mockResolvedValue({ url: "https://cdn.example.com/test-ad.png" }),
}));

vi.mock("../_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            replicationPrompt: "A professional HVAC service Facebook ad with before/after split layout...",
            copyFormula: "PAIN HEADLINE + SOCIAL PROOF + URGENCY CTA",
            hook: "Is your AC ready for summer?",
            trustElement: "247 5-star Google reviews",
            ctaType: "Lead Form — Get My Free Quote",
            whyItWorks: "Before/after visuals create immediate desire. The transformation is visceral.",
            variants: [
              "Variant 1: Use a bathroom remodel instead of HVAC",
              "Variant 2: Show a winter heating scenario",
              "Variant 3: Use a video testimonial format",
            ],
          }),
        },
      },
    ],
  }),
}));

// ─── Import after mocks ───────────────────────────────────────────────────────
import { generateRouter } from "./generate";
import type { TrpcContext } from "../_core/context";

function createCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("generate.createAdCreative", () => {
  it("returns imageUrl and blueprint fields for valid input", async () => {
    const caller = generateRouter.createCaller(createCtx());
    const result = await caller.createAdCreative({
      niche: "HVAC",
      angle: "Before / After",
      companyName: "Smith HVAC",
      offer: "Free Estimate",
      location: "Texas",
      tagline: "Your comfort, our priority",
    });

    expect(result.imageUrl).toBe("https://cdn.example.com/test-ad.png");
    expect(result.hook).toBe("Is your AC ready for summer?");
    expect(result.copyFormula).toContain("PAIN HEADLINE");
    expect(result.trustElement).toBe("247 5-star Google reviews");
    expect(result.ctaType).toContain("Lead Form");
    expect(result.replicationPrompt).toBeTruthy();
    expect(result.whyItWorks).toBeTruthy();
    expect(result.variants).toHaveLength(3);
    expect(result.niche).toBe("HVAC");
    expect(result.angle).toBe("Before / After");
  });

  it("works with minimal input (no optional fields)", async () => {
    const caller = generateRouter.createCaller(createCtx());
    const result = await caller.createAdCreative({
      niche: "Roofing",
      angle: "Offer / Discount",
    });

    expect(result.imageUrl).toBeTruthy();
    expect(result.niche).toBe("Roofing");
    expect(result.angle).toBe("Offer / Discount");
  });

  it("rejects empty niche", async () => {
    const caller = generateRouter.createCaller(createCtx());
    await expect(
      caller.createAdCreative({ niche: "", angle: "Hero Shot" })
    ).rejects.toThrow();
  });

  it("rejects empty angle", async () => {
    const caller = generateRouter.createCaller(createCtx());
    await expect(
      caller.createAdCreative({ niche: "Plumbing", angle: "" })
    ).rejects.toThrow();
  });
});

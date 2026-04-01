import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock LLM to avoid real API calls
vi.mock("../_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            angle: "Before / After",
            hook: "See the transformation homeowners are raving about",
            replicationPrompt:
              "Professional Meta Facebook ad creative mockup, 1:1 square format, before/after split composition",
          }),
        },
      },
    ],
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("competitor.searchByPage", () => {
  beforeEach(() => {
    // Ensure no real META_ACCESS_TOKEN in tests
    delete process.env.META_ACCESS_TOKEN;
  });

  it("returns demo data when META_ACCESS_TOKEN is not set", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.competitor.searchByPage({
      pageIdentifier: "https://www.facebook.com/AngiHomeServices",
      country: "US",
      limit: 10,
    });

    expect(result.requiresToken).toBe(true);
    expect(result.ads.length).toBeGreaterThan(0);
    expect(result.ads[0]).toHaveProperty("id");
    expect(result.ads[0]).toHaveProperty("headline");
    expect(result.ads[0]).toHaveProperty("replicationPrompt");
    expect(result.ads[0]).toHaveProperty("angle");
    expect(result.ads[0]).toHaveProperty("hook");
  });

  it("extracts page name from full Facebook URL", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.competitor.searchByPage({
      pageIdentifier: "https://www.facebook.com/Thumbtack",
      country: "CA",
      limit: 5,
    });

    expect(result).toHaveProperty("pageName");
    expect(result).toHaveProperty("pageId");
    expect(result).toHaveProperty("totalFound");
    expect(result.ads).toBeInstanceOf(Array);
  });

  it("handles raw page ID input", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.competitor.searchByPage({
      pageIdentifier: "123456789",
      country: "US",
      limit: 10,
    });

    expect(result.requiresToken).toBe(true);
    expect(result.ads).toBeInstanceOf(Array);
  });

  it("rejects empty pageIdentifier", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.competitor.searchByPage({
        pageIdentifier: "",
        country: "US",
        limit: 10,
      })
    ).rejects.toThrow();
  });

  it("returns ads with all required fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.competitor.searchByPage({
      pageIdentifier: "https://www.facebook.com/HomeAdvisor",
      country: "US",
      limit: 10,
    });

    for (const ad of result.ads) {
      expect(ad).toHaveProperty("id");
      expect(ad).toHaveProperty("pageName");
      expect(ad).toHaveProperty("angle");
      expect(ad).toHaveProperty("hook");
      expect(ad).toHaveProperty("replicationPrompt");
      expect(ad).toHaveProperty("platforms");
      expect(Array.isArray(ad.platforms)).toBe(true);
    }
  });
});

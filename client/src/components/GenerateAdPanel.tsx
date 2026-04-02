// ============================================================
// GenerateAdPanel — AI Ad Creative Generator
// Pick niche + angle + optional client details → AI generates
// a pixel-perfect ad mockup + full replication blueprint
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import {
  ALL_ANGLES,
  ALL_NICHES,
  ANGLE_COLORS,
  ANGLE_BG,
  type Angle,
  type Niche,
} from "@/lib/adData";
import {
  X,
  Sparkles,
  Copy,
  CheckCheck,
  Download,
  Loader2,
  ChevronDown,
  Wand2,
  Zap,
  Layers,
  RefreshCw,
} from "lucide-react";
import { useBrandParams } from "@/hooks/useBrandParams";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────
interface GeneratedAd {
  imageUrl: string;
  replicationPrompt: string;
  copyFormula: string;
  hook: string;
  trustElement: string;
  ctaType: string;
  whyItWorks: string;
  variants: string[];
  niche: string;
  angle: string;
  companyName: string;
  offer: string;
}

// ─── Copy Button ──────────────────────────────────────────────
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="flex items-center gap-1.5 text-[11px] font-mono rounded px-2 py-1 transition-all"
      style={{
        color: copied ? "#10B981" : "#9CA3AF",
        background: copied ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
      {copied ? "Copied" : label}
    </button>
  );
}

// ─── Blueprint Row ────────────────────────────────────────────
function BlueprintRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="group flex flex-col gap-1.5 rounded-lg p-3"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>
          {label}
        </span>
        <CopyButton text={value} label="Copy" />
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{value}</p>
    </div>
  );
}

// ─── Select Dropdown ──────────────────────────────────────────
function SelectField({
  label,
  value,
  options,
  onChange,
  colorMap,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  colorMap?: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg px-3 py-2.5 text-sm pr-8 outline-none transition-all cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: colorMap?.[value] || "#E5E3DF",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#1A1A1C", color: "#E5E3DF" }}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "#6B7280" }}
        />
      </div>
    </div>
  );
}

// ─── Text Input ───────────────────────────────────────────────
function TextField({
  label,
  value,
  onChange,
  placeholder,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <label className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>
          {label}
        </label>
        {optional && (
          <span className="text-[10px] font-mono" style={{ color: "#4B5563" }}>optional</span>
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#E5E3DF",
          fontFamily: "'Inter', sans-serif",
        }}
      />
    </div>
  );
}

// ─── Result Panel ─────────────────────────────────────────────
function GeneratedResult({
  result,
  onReset,
}: {
  result: GeneratedAd;
  onReset: () => void;
}) {
  const angleColor = ANGLE_COLORS[result.angle as Angle] || "#6366F1";
  const angleBg = ANGLE_BG[result.angle as Angle] || "#6366F118";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-5"
    >
      {/* Generated Image */}
      <div className="relative rounded-xl overflow-hidden" style={{ background: "#0A0A0C" }}>
        <img
          src={result.imageUrl}
          alt={`${result.angle} — ${result.niche}`}
          className="w-full object-cover"
          style={{ maxHeight: "400px", objectPosition: "top" }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="text-[11px] font-mono font-semibold px-2 py-1 rounded-md"
            style={{ color: angleColor, background: angleBg, border: `1px solid ${angleColor}30` }}
          >
            {result.angle}
          </span>
          <span
            className="text-[11px] font-mono font-semibold px-2 py-1 rounded-md"
            style={{ color: "#E5E3DF", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {result.niche}
          </span>
        </div>
        {/* Download button */}
        <a
          href={result.imageUrl}
          download="ad-creative.png"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-mono font-semibold transition-all hover:opacity-90"
          style={{ background: "rgba(0,0,0,0.7)", color: "#E5E3DF", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
          <Download size={11} />
          Save
        </a>
      </div>

      {/* Why It Works */}
      <div
        className="rounded-lg p-4"
        style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.18)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap size={12} style={{ color: "#3B82F6" }} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#3B82F6" }}>
            Why It Works
          </span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{result.whyItWorks}</p>
      </div>

      {/* Replication Blueprint */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers size={12} style={{ color: "#F59E0B" }} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#F59E0B" }}>
            Replication Blueprint
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <BlueprintRow label="Hook" value={result.hook} />
          <BlueprintRow label="Copy Formula" value={result.copyFormula} />
          <BlueprintRow label="Trust Element" value={result.trustElement} />
          <BlueprintRow label="CTA Type" value={result.ctaType} />
          <BlueprintRow label="AI Replication Prompt" value={result.replicationPrompt} />
        </div>
      </div>

      {/* Variants */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={12} style={{ color: "#A78BFA" }} />
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#A78BFA" }}>
            3 Variants to Test
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {result.variants.map((v, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg p-3"
              style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.15)" }}
            >
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold mt-0.5"
                style={{ background: "rgba(167,139,250,0.2)", color: "#A78BFA" }}
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#C4B5FD" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Another */}
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#E5E3DF",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <Wand2 size={14} />
        Generate Another
      </button>
    </motion.div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────
export function GenerateAdPanel({ onClose }: { onClose: () => void }) {
  const [niche, setNiche] = useState<string>(ALL_NICHES[0]);
  const [angle, setAngle] = useState<string>(ALL_ANGLES[0]);
  const [companyName, setCompanyName] = useState("");
  const [offer, setOffer] = useState("");
  const [location, setLocation] = useState("North America");
  const [tagline, setTagline] = useState("");
  const [result, setResult] = useState<GeneratedAd | null>(null);
  const [batchMode, setBatchMode] = useState(false);
  const [batchResults, setBatchResults] = useState<GeneratedAd[]>([]);
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchTotal, setBatchTotal] = useState(0);
  const [syncedToBrand, setSyncedToBrand] = useState(false);
  const { update: updateBrandParams, params: brandParams } = useBrandParams();
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-fill from brand params on mount (if brand params already set)
  useEffect(() => {
    if (brandParams.brandName && !companyName) setCompanyName(brandParams.brandName);
    if (brandParams.location && location === "North America") setLocation(brandParams.location);
    if (brandParams.tagline && !tagline) setTagline(brandParams.tagline);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced sync: when company fields change, push to brand params after 800ms idle
  useEffect(() => {
    if (!companyName && !location && !tagline) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      updateBrandParams({
        ...(companyName ? { brandName: companyName } : {}),
        ...(location ? { location } : {}),
        ...(tagline ? { tagline } : {}),
      });
      setSyncedToBrand(true);
      setTimeout(() => setSyncedToBrand(false), 2000);
      toast.success("Brand params synced", { description: "Company details saved to your brand profile." });
    }, 800);
    return () => { if (syncTimerRef.current) clearTimeout(syncTimerRef.current); };
  }, [companyName, location, tagline]);

  const generateMutation = trpc.generate.createAdCreative.useMutation({
    onSuccess: (data) => {
      setResult(data as GeneratedAd);
    },
  });

  const handleGenerate = () => {
    setResult(null);
    setBatchMode(false);
    generateMutation.mutate({
      niche,
      angle,
      companyName,
      offer,
      location,
      tagline,
    });
  };

  const handleGenerateAllAngles = async () => {
    setBatchMode(true);
    setBatchResults([]);
    setBatchProgress(0);
    setBatchTotal(ALL_ANGLES.length);
    setResult(null);
    // Fire each angle sequentially to avoid rate limits
    for (let i = 0; i < ALL_ANGLES.length; i++) {
      const currentAngle = ALL_ANGLES[i];
      try {
        await new Promise<void>((resolve) => {
          generateMutation.mutate(
            { niche, angle: currentAngle, companyName, offer, location, tagline },
            {
              onSuccess: (data) => {
                setBatchResults((prev) => [...prev, data as GeneratedAd]);
                setBatchProgress(i + 1);
                resolve();
              },
              onError: () => {
                setBatchProgress(i + 1);
                resolve();
              },
            }
          );
        });
      } catch {
        setBatchProgress(i + 1);
      }
    }
  };

  const angleColor = ANGLE_COLORS[angle as Angle] || "#6366F1";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Panel */}
      <motion.div
        className="relative ml-auto h-full overflow-y-auto flex flex-col"
        style={{
          width: "min(720px, 95vw)",
          background: "#111113",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <Wand2 size={15} style={{ color: "#818CF8" }} />
            </div>
            <div>
              <h2 className="text-base font-bold leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
                Generate Ad Creative
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[11px] font-mono" style={{ color: "#6B7280" }}>
                  AI-generated mockup + full replication blueprint
                </p>
                <AnimatePresence>
                  {syncedToBrand && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="flex items-center gap-1 text-[10px] font-mono rounded-full px-2 py-0.5"
                      style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}
                    >
                      <RefreshCw size={9} />
                      Synced to Brand
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 transition-colors hover:bg-white/10"
            style={{ color: "#9CA3AF" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 p-6 flex-1">
          {result ? (
            <GeneratedResult result={result} onReset={() => setResult(null)} />
          ) : (
            <>
              {/* Form */}
              <div className="flex flex-col gap-4">
                {/* Niche + Angle */}
                <div className="grid grid-cols-2 gap-3">
                  <SelectField
                    label="Niche"
                    value={niche}
                    options={ALL_NICHES}
                    onChange={setNiche}
                  />
                  <SelectField
                    label="Angle"
                    value={angle}
                    options={ALL_ANGLES}
                    onChange={setAngle}
                    colorMap={ANGLE_COLORS}
                  />
                </div>

                {/* Angle description */}
                <div
                  className="rounded-lg px-4 py-3 flex items-center gap-2"
                  style={{
                    background: `${angleColor}08`,
                    border: `1px solid ${angleColor}25`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: angleColor }}
                  />
                  <span className="text-xs font-mono" style={{ color: angleColor }}>
                    {angle} — {getAngleDescription(angle)}
                  </span>
                </div>

                {/* Client details */}
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={setCompanyName}
                    placeholder="e.g. Smith HVAC Services"
                    optional
                  />
                  <TextField
                    label="Offer / Hook"
                    value={offer}
                    onChange={setOffer}
                    placeholder="e.g. Free Estimate, $95/mo"
                    optional
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Location / Market"
                    value={location}
                    onChange={setLocation}
                    placeholder="e.g. Montreal, Texas, North America"
                    optional
                  />
                  <TextField
                    label="Tagline"
                    value={tagline}
                    onChange={setTagline}
                    placeholder="e.g. Your comfort, our priority"
                    optional
                  />
                </div>
              </div>

              {/* Error */}
              {generateMutation.isError && (
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#FCA5A5" }}
                >
                  {generateMutation.error?.message || "Generation failed. Try again."}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={generateMutation.isPending}
                className="flex items-center justify-center gap-3 rounded-xl py-4 text-base font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  color: "#FFFFFF",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
                }}
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating your ad creative…
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    Generate Ad Creative
                  </>
                )}
              </button>

              {/* Generate All Angles button */}
              <button
                onClick={handleGenerateAllAngles}
                disabled={generateMutation.isPending || batchMode}
                className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  color: "#818CF8",
                  border: "1px solid rgba(99,102,241,0.3)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <Sparkles size={15} />
                Generate All {ALL_ANGLES.length} Angles for {niche}
              </button>

              {generateMutation.isPending && !batchMode && (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#6366F1", animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#8B5CF6", animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#A78BFA", animationDelay: "300ms" }} />
                  </div>
                  <p className="text-xs font-mono" style={{ color: "#6B7280" }}>
                    Building image + replication blueprint in parallel…
                  </p>
                </div>
              )}

              {/* Batch mode progress */}
              {batchMode && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>
                      {batchProgress < batchTotal ? `Generating angle ${batchProgress + 1} of ${batchTotal}…` : `All ${batchTotal} angles complete`}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "#6366F1" }}>
                      {batchResults.length} ready
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full rounded-full h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${batchTotal > 0 ? (batchProgress / batchTotal) * 100 : 0}%`,
                        background: "linear-gradient(90deg, #6366F1, #A78BFA)",
                      }}
                    />
                  </div>
                  {/* Batch results grid */}
                  {batchResults.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {batchResults.map((r, i) => (
                        <div
                          key={i}
                          className="rounded-lg overflow-hidden"
                          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <img
                            src={r.imageUrl}
                            alt={r.angle}
                            className="w-full object-cover"
                            style={{ height: "120px", objectPosition: "top" }}
                          />
                          <div className="px-2 py-1.5 flex items-center justify-between" style={{ background: "#161618" }}>
                            <span className="text-[10px] font-mono" style={{ color: ANGLE_COLORS[r.angle as Angle] || "#9CA3AF" }}>
                              {r.angle}
                            </span>
                            <a
                              href={r.imageUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono hover:opacity-80"
                              style={{ color: "#6B7280" }}
                            >
                              Save
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {batchProgress >= batchTotal && batchResults.length > 0 && (
                    <button
                      onClick={() => { setBatchMode(false); setBatchResults([]); setBatchProgress(0); }}
                      className="text-xs font-mono rounded-md px-3 py-1.5 transition-colors hover:bg-white/8 self-start"
                      style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      Clear batch results
                    </button>
                  )}
                </div>
              )}

              {/* What you'll get */}
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-[11px] font-mono uppercase tracking-widest font-semibold mb-3" style={{ color: "#4B5563" }}>
                  What you'll get
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "AI-generated ad mockup image",
                    "Hook + copy formula",
                    "Trust element spec",
                    "CTA type + text",
                    "AI replication prompt",
                    "3 variants to A/B test",
                    "Why it works breakdown",
                    "One-click copy for each field",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#6366F1" }} />
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Angle Descriptions ───────────────────────────────────────
function getAngleDescription(angle: string): string {
  const map: Record<string, string> = {
    "Before / After": "Split-screen transformation — high visual impact",
    "Offer / Discount": "Lead with a specific dollar or % offer",
    "Social Proof": "Reviews, ratings, customer count as primary hook",
    "Pain / FOMO": "Call out the problem before it gets worse",
    "Hero Shot": "Premium brand image — technician, truck, team",
    "Features / Benefits": "Checklist of what makes you different",
    "Lead Magnet": "Free guide, checklist, or inspection as hook",
    "UGC / Testimonial": "Real customer voice, authentic feel",
    "Process / How It Works": "3-step simplicity removes friction",
    "Seasonal / Urgency": "Time-bound or weather-driven hook",
    "Financing / Monthly": "Low monthly payment removes price objection",
    "Humor / Pattern Interrupt": "Unexpected visual stops the scroll",
  };
  return map[angle] || "Proven conversion angle for service businesses";
}

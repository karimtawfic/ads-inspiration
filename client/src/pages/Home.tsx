// ============================================================
// Meta Ad Creative Canvas — Home Page
// Design: Dark Intelligence Board
// Space Grotesk display, Inter body, JetBrains Mono metadata
// Color-coded angle taxonomy, masonry grid, lightbox drawer
// ============================================================

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AD_EXAMPLES,
  ALL_ANGLES,
  ALL_NICHES,
  ALL_FORMATS,
  ANGLE_COLORS,
  ANGLE_BG,
  AD_INTELLIGENCE_SOURCES,
  type AdExample,
  type Angle,
  type Niche,
  type Format,
  type SourceType,
} from "@/lib/adData";
import { X, ExternalLink, Search, ChevronRight, Layers, Tag, Zap, Copy, CheckCheck, BookOpen, Database, Wand2, Target, LayoutGrid, Table2, Star, Building2, Columns, Sun, Moon, ThumbsUp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { GenerateAdPanel } from "@/components/GenerateAdPanel";
import CompetitorIntel from "@/pages/CompetitorIntel";
import { useSavedAds } from "@/hooks/useSavedAds";
import { useVotes } from "@/hooks/useVotes";
import { useBrandParams } from "@/hooks/useBrandParams";
import { BrandParamsPanel } from "@/components/BrandParamsPanel";

// ─── Angle Badge ─────────────────────────────────────────────
function AngleBadge({ angle, small }: { angle: Angle; small?: boolean }) {
  const color = ANGLE_COLORS[angle];
  const bg = ANGLE_BG[angle];
  return (
    <span
      className={`inline-flex items-center rounded-sm font-mono font-medium tracking-tight ${small ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"}`}
      style={{ color, background: bg, border: `1px solid ${color}30` }}
    >
      {angle}
    </span>
  );
}

// ─── Format Badge ─────────────────────────────────────────────
function SourceBadge({ sourceType }: { sourceType: SourceType }) {
  const map: Record<SourceType, { color: string; label: string }> = {
    "Meta Ad Library": { color: "#1877F2", label: "Meta Library" },
    "Agency Curated": { color: "#10B981", label: "Agency Curated" },
    "AI Generated": { color: "#8B5CF6", label: "AI Generated" },
  };
  const { color, label } = map[sourceType];
  return (
    <span
      className="inline-flex items-center rounded-sm font-mono text-[10px] px-1.5 py-0.5 font-medium"
      style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}

function FormatBadge({ format }: { format: Format }) {
  const map: Record<Format, string> = {
    "Static Image": "#6366F1",
    Carousel: "#8B5CF6",
    Video: "#EF4444",
    "Lead Form": "#10B981",
  };
  return (
    <span
      className="inline-flex items-center rounded-sm font-mono text-[10px] px-1.5 py-0.5 font-medium"
      style={{ color: map[format], background: `${map[format]}18`, border: `1px solid ${map[format]}30` }}
    >
      {format}
    </span>
  );
}

// ─── Editable Replication Row ────────────────────────────────
function EditableReplicationRow({
  label,
  value,
  onChange,
  multiline,
  highlight,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  highlight?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(99,102,241,0.4)",
    color: "#E5E3DF",
    borderRadius: 6,
    padding: "8px 10px",
    fontSize: 13,
    width: "100%",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.6,
    resize: multiline ? "vertical" : "none",
  };
  return (
    <div
      className="group flex flex-col gap-1.5 rounded-md p-3"
      style={{
        background: highlight ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.04)",
        border: highlight ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-mono uppercase tracking-widest"
          style={{ color: highlight ? "#818CF8" : "#6B7280" }}
        >
          {label}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing((v) => !v)}
            className="flex items-center gap-1 text-[10px] rounded px-1.5 py-0.5"
            style={{ color: editing ? "#6366F1" : "#9CA3AF", background: editing ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.06)" }}
          >
            {editing ? "Done" : "Edit"}
          </button>
          <button
            onClick={copy}
            className="flex items-center gap-1 text-[10px] rounded px-1.5 py-0.5"
            style={{ color: "#9CA3AF", background: "rgba(255,255,255,0.06)" }}
          >
            {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      {editing ? (
        multiline ? (
          <textarea
            style={{ ...inputStyle, minHeight: 80 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        ) : (
          <input
            style={inputStyle}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        )
      ) : (
        <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{value}</p>
      )}
    </div>
  );
}

//// ─── Highlighted Prompt ──────────────────────────────────────
const TOKEN_MAP: Record<string, keyof import('@/hooks/useBrandParams').BrandParams> = {
  "{BRAND}": "brandName",
  "{LOGO}": "logoUrl",
  "{PRIMARY_COLOR}": "primaryColor",
  "{SECONDARY_COLOR}": "secondaryColor",
  "{LANGUAGE}": "language",
  "{LOCATION}": "location",
  "{SEASON}": "season",
  "{TAGLINE}": "tagline",
  "{PHONE}": "phone",
  "{WEBSITE}": "website",
};

function HighlightedPrompt({
  base,
  injected,
  params,
  hasParams,
}: {
  base: string;
  injected: string;
  params: import('@/hooks/useBrandParams').BrandParams;
  hasParams: boolean;
}) {
  // If no brand params, just show the plain prompt
  if (!hasParams) {
    return <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "#C4C2BE" }}>{injected}</p>;
  }

  // Split the injected prompt into segments: normal text vs injected values
  // Strategy: find all token positions in base, map to their injected values, render highlighted
  const tokens = Object.keys(TOKEN_MAP);
  const tokenRegex = new RegExp(tokens.map((t) => t.replace(/[{}]/g, "\\$&")).join("|"), "g");

  // Build segments from base string
  const segments: Array<{ text: string; isToken: boolean; token?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = tokenRegex.exec(base)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: base.slice(lastIndex, match.index), isToken: false });
    }
    const key = TOKEN_MAP[match[0]];
    const value = params[key] as string;
    segments.push({ text: value || match[0], isToken: true, token: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < base.length) {
    segments.push({ text: base.slice(lastIndex), isToken: false });
  }

  // If no tokens found in base, show injected as-is
  if (segments.length === 0 || segments.every((s) => !s.isToken)) {
    return <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "#C4C2BE" }}>{injected}</p>;
  }

  return (
    <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "#C4C2BE" }}>
      {segments.map((seg, i) =>
        seg.isToken ? (
          <span
            key={i}
            className="rounded px-0.5"
            style={{ background: "rgba(99,102,241,0.18)", color: "#A5B4FC", border: "1px solid rgba(99,102,241,0.25)" }}
            title={`Injected from: ${seg.token}`}
          >
            {seg.text}
          </span>
        ) : (
          seg.text
        )
      )}
    </p>
  );
}

// ─── Lightbox / Detail Drawer ─────────────────────────────
type FormatMode = "1:1" | "4:5" | "9:16";
function AdDetailDrawer({ ad, onClose, isSaved, onToggleSave, formatMode, setFormatMode, voteCount = 0, isVoted = false, onToggleVote }: { ad: AdExample; onClose: () => void; isSaved: boolean; onToggleSave: () => void; formatMode: FormatMode; setFormatMode: (f: FormatMode) => void; voteCount?: number; isVoted?: boolean; onToggleVote?: () => void }) {
  const { params, injectIntoPrompt, hasParams } = useBrandParams();

  // Editable blueprint state — initialized from ad, reset when ad changes
  const [hook, setHook] = useState(ad.hook);
  const [copyFormula, setCopyFormula] = useState(ad.copyFormula);
  const [trustElement, setTrustElement] = useState(ad.trustElement);
  const [ctaType, setCtaType] = useState(ad.ctaType);
  const [replicationPrompt, setReplicationPrompt] = useState(ad.replicationPrompt);

  // When ad changes (user navigates), reset to new ad's values
  useEffect(() => {
    setHook(ad.hook);
    setCopyFormula(ad.copyFormula);
    setTrustElement(ad.trustElement);
    setCtaType(ad.ctaType);
    setReplicationPrompt(ad.replicationPrompt);
  }, [ad.id]);

  const brandInjectedPrompt = injectIntoPrompt(replicationPrompt);
  const [promptCopied, setPromptCopied] = useState(false);
  const copyPrompt = () => {
    navigator.clipboard.writeText(brandInjectedPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 1800);
  };

  return (
    <AnimatePresence>
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

        {/* Drawer panel */}
        <motion.div
          className="relative ml-auto h-full overflow-y-auto flex flex-col"
          style={{
            width: "min(680px, 95vw)",
            background: "#111113",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2 flex-wrap">
              <AngleBadge angle={ad.angle} />
              <FormatBadge format={ad.format} />
              <span className="text-xs font-mono" style={{ color: "#6B7280" }}>{ad.niche}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleVote?.(); }}
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-all hover:bg-white/10"
                style={{ color: isVoted ? "#6366F1" : "#6B7280" }}
                title={isVoted ? "Remove vote" : "Upvote this creative"}
              >
                <ThumbsUp size={15} fill={isVoted ? "#6366F1" : "none"} />
                {voteCount > 0 && <span className="text-xs font-mono">{voteCount}</span>}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
                className="rounded-md p-1.5 transition-all hover:bg-white/10"
                style={{ color: isSaved ? "#F59E0B" : "#6B7280" }}
                title={isSaved ? "Remove from saved" : "Save creative"}
              >
                <Star size={16} fill={isSaved ? "#F59E0B" : "none"} />
              </button>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 transition-colors hover:bg-white/10"
                style={{ color: "#9CA3AF" }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Image — format preview with aspect ratio */}
          {(() => {
            const drawerAspect: Record<string, string> = { "1:1": "1/1", "4:5": "4/5", "9:16": "9/16" };
            return (
              <div className="relative" style={{ background: "#0A0A0C" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: drawerAspect[formatMode] ?? "1/1", maxHeight: "520px", overflow: "hidden" }}>
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  />
                  {/* Safe-zone overlay: dashed 1:1 square centered */}
                  {formatMode !== "1:1" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        // For 4:5: safe zone is the full width (square = 80% of height = 100% of width since 4:5 ratio)
                        // For 9:16: safe zone square width = same as image width (9/16 of height)
                        width: formatMode === "4:5" ? "80%" : "100%",
                        aspectRatio: "1/1",
                        border: "2px dashed rgba(99,102,241,0.5)",
                        pointerEvents: "none",
                        borderRadius: 4,
                      }}
                    />
                  )}
                </div>
                {/* Format selector strip below image */}
                <div className="flex items-center justify-center gap-1 py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {(["1:1", "4:5", "9:16"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormatMode(fmt)}
                      className="rounded px-2.5 py-1 text-[11px] font-mono transition-all"
                      style={{
                        background: formatMode === fmt ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                        color: formatMode === fmt ? "#A5B4FC" : "#6B7280",
                        border: formatMode === fmt ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.07)",
                        fontWeight: formatMode === fmt ? 700 : 400,
                      }}
                    >
                      {fmt}
                    </button>
                  ))}
                  <span className="text-[10px] font-mono ml-2" style={{ color: "#4B5563" }}>dashed = 1:1 safe zone</span>
                </div>
              </div>
            );
          })()}

          {/* Content */}
          <div className="flex flex-col gap-5 p-6 flex-1">
            <div>
              <h2 className="text-xl font-bold leading-tight mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
                {ad.title}
              </h2>
              <a
                href={ad.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono transition-opacity hover:opacity-80"
                style={{ color: "#6B7280" }}
              >
                <ExternalLink size={11} />
                {ad.sourceName}
              </a>
            </div>

            {/* Why It Works */}
            <div className="rounded-md p-4" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={13} style={{ color: "#3B82F6" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#3B82F6" }}>Why It Works</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{ad.whyItWorks}</p>
            </div>

            {/* Replication Blueprint */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers size={13} style={{ color: "#F59E0B" }} />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#F59E0B" }}>Replication Blueprint</span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: "#4B5563" }}>Hover any field to edit</span>
              </div>
              <div className="flex flex-col gap-2">
                <EditableReplicationRow label="Hook" value={hook} onChange={setHook} />
                <EditableReplicationRow label="Copy Formula" value={copyFormula} onChange={setCopyFormula} multiline />
                <EditableReplicationRow label="Trust Element" value={trustElement} onChange={setTrustElement} />
                <EditableReplicationRow label="CTA Type" value={ctaType} onChange={setCtaType} />
                <EditableReplicationRow label="Replication Prompt (Base)" value={replicationPrompt} onChange={setReplicationPrompt} multiline />
              </div>
            </div>

            {/* Brand-Injected Prompt */}
            <div className="rounded-md overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.25)" }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
                <div className="flex items-center gap-2">
                  <Wand2 size={12} style={{ color: "#818CF8" }} />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-widest" style={{ color: "#818CF8" }}>Brand-Injected Prompt</span>
                  {hasParams && (
                    <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>Brand Active</span>
                  )}
                </div>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1.5 text-[11px] font-mono rounded-md px-2.5 py-1 transition-all hover:opacity-90"
                  style={{ background: "rgba(99,102,241,0.2)", color: "#A5B4FC", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  {promptCopied ? <CheckCheck size={11} /> : <Copy size={11} />}
                  {promptCopied ? "Copied!" : "Copy Prompt"}
                </button>
              </div>
              <div className="p-4" style={{ background: "rgba(99,102,241,0.04)" }}>
                {!hasParams && (
                  <p className="text-[11px] font-mono mb-3 rounded-md px-3 py-2" style={{ color: "#F59E0B", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                    Set brand parameters (top-right → Brand) to auto-inject your logo, colors, location, and season.
                  </p>
                )}
                {/* Token-highlighted prompt: show injected values in indigo, rest in normal color */}
                <HighlightedPrompt base={replicationPrompt} injected={brandInjectedPrompt} params={params} hasParams={hasParams} />
                {hasParams && (
                  <div className="mt-3 pt-3 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {params.brandName && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8" }}>{params.brandName}</span>}
                    {params.location && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8" }}>{params.location}</span>}
                    {params.season !== "Year-round" && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8" }}>{params.season}</span>}
                    {params.language !== "English" && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8" }}>{params.language}</span>}
                    <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8" }}>{params.primaryColor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Advertiser info */}
            {ad.advertiser && (
              <div className="rounded-md px-4 py-3 flex items-center gap-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <SourceBadge sourceType={ad.sourceType} />
                <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>{ad.advertiser}</span>
              </div>
            )}

            {/* Source link */}
            <a
              href={ad.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EEE9", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <ExternalLink size={14} />
              View Source / Ad Library
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Ad Card ──────────────────────────────────────────────────
function AdCard({ ad, index, onClick, isSaved, onToggleSave, cardHeight, isDark = true, voteCount = 0, isVoted = false, onToggleVote }: { ad: AdExample; index: number; onClick: () => void; isSaved: boolean; onToggleSave: () => void; cardHeight?: number; isDark?: boolean; voteCount?: number; isVoted?: boolean; onToggleVote?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const imgHeight = cardHeight ?? 220;

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      style={{ background: isDark ? "#161618" : "#FFFFFF", border: isSaved ? "1px solid rgba(245,158,11,0.35)" : isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.015, borderColor: isSaved ? "rgba(245,158,11,0.55)" : "rgba(255,255,255,0.15)" }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ background: isDark ? "#0D0D0F" : "#F0F0F2" }}>
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full object-cover transition-transform duration-500"
          style={{
            height: `${imgHeight}px`,
            objectPosition: "center",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          loading="lazy"
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.55)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "#F0EEE9", fontFamily: "'Space Grotesk', sans-serif", border: "1px solid rgba(255,255,255,0.15)" }}>
            View Blueprint <ChevronRight size={14} />
          </div>
        </motion.div>
        {/* Angle badge top-left */}
        <div className="absolute top-2 left-2">
          <AngleBadge angle={ad.angle} small />
        </div>
        {/* Star button top-right */}
        <button
          className="absolute top-2 right-2 rounded-md p-1 transition-all"
          style={{
            background: isSaved ? "rgba(245,158,11,0.18)" : "rgba(0,0,0,0.45)",
            color: isSaved ? "#F59E0B" : "#9CA3AF",
            border: isSaved ? "1px solid rgba(245,158,11,0.35)" : "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          title={isSaved ? "Remove from saved" : "Save creative"}
        >
          <Star size={12} fill={isSaved ? "#F59E0B" : "none"} />
        </button>
      </div>

      {/* Bottom strip */}
      <div className="px-3 py-3 flex flex-col gap-1.5">
        <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#E5E3DF" : "#111113" }}>
          {ad.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono" style={{ color: "#6B7280" }}>{ad.niche}</span>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-mono transition-all"
              style={{
                background: isVoted ? "rgba(99,102,241,0.15)" : "transparent",
                color: isVoted ? "#6366F1" : "#6B7280",
                border: isVoted ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
              }}
              onClick={(e) => { e.stopPropagation(); onToggleVote?.(); }}
              title={isVoted ? "Remove vote" : "Upvote this creative"}
            >
              <ThumbsUp size={10} fill={isVoted ? "#6366F1" : "none"} />
              {voteCount > 0 && <span>{voteCount}</span>}
            </button>
            <SourceBadge sourceType={ad.sourceType} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sidebar Filter ───────────────────────────────────────────
function SidebarSection({
  title,
  icon,
  children,
  textMuted = "#6B7280",
  isDark = true,
  activeCount = 0,
  onClear,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  textMuted?: string;
  isDark?: boolean;
  activeCount?: number;
  onClear?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-1.5">
          <span style={{ color: textMuted }}>{icon}</span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: textMuted, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </span>
        </div>
        {activeCount > 0 && onClear && (
          <button
            onClick={onClear}
            className="text-[9px] font-mono rounded px-1.5 py-0.5 transition-all hover:opacity-80"
            style={{
              color: "#6366F1",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  color,
  onClick,
  count,
  isScrollTarget,
  isDark = true,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
  count?: number;
  isScrollTarget?: boolean;
  isDark?: boolean;
}) {
  const dotInactive = isDark ? "#374151" : "#D1D5DB";
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-between rounded-lg px-2.5 py-[7px] text-[12.5px] transition-all text-left"
      style={{
        background: active
          ? color
            ? `${color}18`
            : isDark ? "rgba(99,102,241,0.14)" : "rgba(99,102,241,0.09)"
          : "transparent",
        color: active
          ? color
            ? color
            : isDark ? "#A5B4FC" : "#4F46E5"
          : isDark ? "#9CA3AF" : "#6B7280",
        fontWeight: active ? 600 : 400,
        fontFamily: active ? "'Space Grotesk', sans-serif" : "inherit",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = isDark
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.04)";
          (e.currentTarget as HTMLButtonElement).style.color = isDark ? "#D1D5DB" : "#374151";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = isDark ? "#9CA3AF" : "#6B7280";
        }
      }}
    >
      {/* Active left accent bar */}
      {active && (
        <span
          className="absolute left-0 top-[6px] bottom-[6px] rounded-full"
          style={{ width: 3, background: color || "#6366F1" }}
        />
      )}
      <span
        className="flex items-center gap-2 min-w-0"
        style={{ paddingLeft: active ? 10 : 2, transition: "padding 0.15s" }}
      >
        {color && (
          <span
            className="w-[7px] h-[7px] rounded-full flex-shrink-0 transition-all"
            style={{
              background: active ? color : dotInactive,
              boxShadow: active ? `0 0 5px ${color}80` : "none",
            }}
          />
        )}
        <span className="truncate leading-none">{label}</span>
      </span>
      {count !== undefined && (
        <span
          className="text-[10.5px] font-mono flex-shrink-0 ml-1 tabular-nums"
          style={{
            color: active
              ? color
                ? `${color}CC`
                : isDark ? "#818CF8" : "#6366F1"
              : isDark ? "#4B5563" : "#9CA3AF",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Home() {
  const [selectedAd, setSelectedAd] = useState<AdExample | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAngles, setActiveAngles] = useState<Set<Angle>>(new Set());
  const [activeNiches, setActiveNiches] = useState<Set<Niche>>(new Set());
  const [activeFormats, setActiveFormats] = useState<Set<Format>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [brandParamsOpen, setBrandParamsOpen] = useState(false);
  const { hasParams: hasBrandParams } = useBrandParams();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  // Surface tokens derived from theme
  const S = {
    bg: isDark ? "#0D0D0F" : "#F8F8FA",
    card: isDark ? "#161618" : "#FFFFFF",
    panel: isDark ? "#111113" : "#FFFFFF",
    sidebar: isDark ? "#0F0F11" : "#F2F2F5",
    header: isDark ? "rgba(13,13,15,0.95)" : "rgba(248,248,250,0.97)",
    border: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    borderStrong: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    hover: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    active: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    input: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    textPrimary: isDark ? "#F0EEE9" : "#111113",
    textSecondary: isDark ? "#9CA3AF" : "#4B5563",
    textMuted: isDark ? "#6B7280" : "#6B7280",
    textFaint: isDark ? "#4B5563" : "#9CA3AF",
  };
  const [activeTab, setActiveTab] = useState<"swipe" | "competitor" | "saved">("swipe");
  const [viewMode, setViewMode] = useState<"grid" | "matrix">("grid");
  const [rowDensity, setRowDensity] = useState<number>(3);
  // formatMode: shared display format for all cards (type declared at module level)
  const [formatMode, setFormatMode] = useState<FormatMode>("1:1");

  // Image height for a card given its width — fixed heights per format
  const CARD_HEIGHTS: Record<FormatMode, number> = { "1:1": 220, "4:5": 275, "9:16": 390 };
  const MATRIX_HEIGHTS: Record<FormatMode, number> = { "1:1": 140, "4:5": 175, "9:16": 249 };
  const { saved: savedIds, toggle: toggleSave, isSaved, clearAll: clearSaved } = useSavedAds();
  const { counts: voteCounts, voted: votedIds, toggleVote } = useVotes();
  const savedAds = useMemo(() => AD_EXAMPLES.filter((a) => savedIds.has(a.id)), [savedIds]);
  const savedByNiche = useMemo(() => {
    const groups: Partial<Record<Niche, typeof savedAds>> = {};
    savedAds.forEach((ad) => {
      if (!groups[ad.niche]) groups[ad.niche] = [];
      groups[ad.niche]!.push(ad);
    });
    return groups;
  }, [savedAds]);
  const savedNiches = useMemo(() => ALL_NICHES.filter((n) => (savedByNiche[n]?.length ?? 0) > 0), [savedByNiche]);
  const [activeMatrixNiche, setActiveMatrixNiche] = useState<Niche | null>(null);
  const mainScrollRef = useRef<HTMLElement>(null);
  const nicheSectionRefs = useRef<Partial<Record<Niche, HTMLDivElement | null>>>({});

  // IntersectionObserver: track which niche section is in view during matrix scroll
  useEffect(() => {
    if (viewMode !== "matrix" || activeTab !== "swipe") {
      setActiveMatrixNiche(null);
      return;
    }
    const container = mainScrollRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];
    const visibleRatios = new Map<Niche, number>();

    ALL_NICHES.forEach((niche) => {
      const el = nicheSectionRefs.current[niche];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleRatios.set(niche, entry.intersectionRatio);
          // Pick the niche with the highest visible ratio
          let best: Niche | null = null;
          let bestRatio = 0;
          visibleRatios.forEach((ratio, n) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = n; }
          });
          if (bestRatio > 0) setActiveMatrixNiche(best);
        },
        { root: container, threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [viewMode, activeTab]);

  const scrollToNiche = useCallback((niche: Niche) => {
    const el = nicheSectionRefs.current[niche];
    const container = mainScrollRef.current;
    if (!el || !container) return;
    const offset = el.offsetTop - 16;
    container.scrollTo({ top: offset, behavior: "smooth" });
  }, []);

  const toggleAngle = (a: Angle) => {
    setActiveAngles((prev) => {
      const next = new Set(prev);
      next.has(a) ? next.delete(a) : next.add(a);
      return next;
    });
  };
  const toggleNiche = (n: Niche) => {
    setActiveNiches((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };
  const toggleFormat = (f: Format) => {
    setActiveFormats((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  };

  const clearAll = () => {
    setActiveAngles(new Set());
    setActiveNiches(new Set());
    setActiveFormats(new Set());
    setSearchQuery("");
  };

  const [sortBy, setSortBy] = useState<"default" | "votes">("default");
  const filtered = useMemo(() => {
    const results = AD_EXAMPLES.filter((ad) => {
      if (activeAngles.size > 0 && !activeAngles.has(ad.angle)) return false;
      if (activeNiches.size > 0 && !activeNiches.has(ad.niche)) return false;
      if (activeFormats.size > 0 && !activeFormats.has(ad.format)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          ad.title.toLowerCase().includes(q) ||
          ad.niche.toLowerCase().includes(q) ||
          ad.angle.toLowerCase().includes(q) ||
          ad.hook.toLowerCase().includes(q) ||
          ad.copyFormula.toLowerCase().includes(q)
        );
      }
      return true;
    });
    if (sortBy === "votes") {
      return [...results].sort((a, b) => (voteCounts[b.id] ?? 0) - (voteCounts[a.id] ?? 0));
    }
    return results;
  }, [activeAngles, activeNiches, activeFormats, searchQuery, sortBy, voteCounts]);

  const angleCounts = useMemo(() => {
    const counts: Partial<Record<Angle, number>> = {};
    AD_EXAMPLES.forEach((ad) => {
      counts[ad.angle] = (counts[ad.angle] || 0) + 1;
    });
    return counts;
  }, []);

  const nicheCounts = useMemo(() => {
    const counts: Partial<Record<Niche, number>> = {};
    AD_EXAMPLES.forEach((ad) => {
      counts[ad.niche] = (counts[ad.niche] || 0) + 1;
    });
    return counts;
  }, []);

  const hasFilters = activeAngles.size > 0 || activeNiches.size > 0 || activeFormats.size > 0 || searchQuery;

  // ── Pagination: render 30 cards at a time, load more on scroll ──
  const PAGE_SIZE = 30;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset visible count when filters/sort change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    mainScrollRef.current?.scrollTo({ top: 0 });
  }, [activeAngles, activeNiches, activeFormats, searchQuery, sortBy]);

  // IntersectionObserver: load next page when sentinel enters view
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
        }
      },
      { root: mainScrollRef.current, rootMargin: "200px" }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [filtered.length]);

  const visibleAds = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: S.bg }}>
      {/* Top Bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-0 gap-4"
        style={{
          background: S.header,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${S.border}`,
          height: 56,
          boxShadow: isDark ? "0 1px 0 rgba(255,255,255,0.04)" : "0 1px 0 rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Left: logo + sidebar toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="rounded-lg p-1.5 transition-all"
            style={{ color: S.textMuted, background: sidebarOpen ? S.active : "transparent" }}
            title="Toggle sidebar"
          >
            <Layers size={15} />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 2px 8px rgba(99,102,241,0.35)" }}
            >
              <Wand2 size={13} color="white" />
            </div>
            <div>
              <h1 className="text-[13px] font-bold leading-none tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: S.textPrimary }}>
                Ad Creative Canvas
              </h1>
              <p className="text-[10px] font-mono mt-0.5 leading-none" style={{ color: S.textMuted }}>
                {AD_EXAMPLES.length} creatives · {ALL_NICHES.length} niches · {ALL_ANGLES.length} angles
              </p>
            </div>
          </div>
        </div>

        {/* Center: search */}
        <div className="flex-1 max-w-sm relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: S.textMuted }} />
          <input
            type="text"
            placeholder="Search niche, angle, hook…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg pl-9 pr-4 py-2 text-sm outline-none transition-all"
            style={{
              background: S.input,
              border: `1px solid ${S.border}`,
              color: S.textPrimary,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
            }}
          />
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Count badge */}
          {activeTab === "swipe" && (
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded-full"
              style={{ color: S.textMuted, background: S.hover, border: `1px solid ${S.border}` }}
            >
              {viewMode === "grid" ? `${filtered.length}` : "110"} / {AD_EXAMPLES.length}
            </span>
          )}

          {/* View controls — only on swipe tab */}
          {activeTab === "swipe" && (
            <div className="flex items-center gap-1.5">
              {/* Row density */}
              <div
                className="flex items-center gap-0.5 rounded-lg px-2 py-1"
                style={{ background: S.hover, border: `1px solid ${S.border}` }}
              >
                <Columns size={10} style={{ color: S.textMuted, marginRight: 3 }} />
                {[2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRowDensity(n)}
                    className="rounded px-1.5 py-0.5 text-[11px] font-mono transition-all"
                    style={{
                      background: rowDensity === n ? "rgba(99,102,241,0.2)" : "transparent",
                      color: rowDensity === n ? "#818CF8" : S.textMuted,
                      fontWeight: rowDensity === n ? 700 : 400,
                    }}
                    title={`${n} per row`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {/* Grid / Matrix toggle */}
              <div
                className="flex items-center rounded-lg p-0.5"
                style={{ background: S.hover, border: `1px solid ${S.border}` }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className="flex items-center gap-1 rounded-md px-2 py-1 transition-all"
                  style={{ background: viewMode === "grid" ? S.active : "transparent", color: viewMode === "grid" ? S.textPrimary : S.textMuted }}
                  title="Card Grid"
                >
                  <LayoutGrid size={12} />
                </button>
                <button
                  onClick={() => setViewMode("matrix")}
                  className="flex items-center gap-1 rounded-md px-2 py-1 transition-all"
                  style={{ background: viewMode === "matrix" ? S.active : "transparent", color: viewMode === "matrix" ? S.textPrimary : S.textMuted }}
                  title="Matrix View"
                >
                  <Table2 size={12} />
                </button>
              </div>
              {/* Sort by votes */}
              <button
                onClick={() => setSortBy(sortBy === "votes" ? "default" : "votes")}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-mono transition-all"
                style={{
                  background: sortBy === "votes" ? "rgba(99,102,241,0.15)" : S.hover,
                  color: sortBy === "votes" ? "#818CF8" : S.textMuted,
                  border: sortBy === "votes" ? "1px solid rgba(99,102,241,0.35)" : `1px solid ${S.border}`,
                }}
                title={sortBy === "votes" ? "Sort: Most Voted" : "Sort: Default"}
              >
                <ThumbsUp size={11} fill={sortBy === "votes" ? "#818CF8" : "none"} />
                {sortBy === "votes" ? "Top Voted" : "Sort"}
              </button>
            </div>
          )}
          {/* Clear filters */}
          {hasFilters && viewMode === "grid" && activeTab === "swipe" && (
            <button
              onClick={clearAll}
              className="text-[11px] font-mono rounded-lg px-2.5 py-1 transition-all"
              style={{ color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}
            >
              Clear
            </button>
          )}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: S.border }} />

          {/* Tab switcher */}
          <div
            className="flex items-center rounded-lg p-0.5"
            style={{ background: S.hover, border: `1px solid ${S.border}` }}
          >
            <button
              onClick={() => setActiveTab("swipe")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "swipe" ? S.active : "transparent",
                color: activeTab === "swipe" ? S.textPrimary : S.textMuted,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
              }}
            >
              <Database size={11} />
              Swipe File
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "saved" ? "rgba(245,158,11,0.12)" : "transparent",
                color: activeTab === "saved" ? "#F59E0B" : S.textMuted,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
              }}
            >
              <Star size={11} fill={activeTab === "saved" ? "#F59E0B" : "none"} />
              Saved
              {savedIds.size > 0 && (
                <span
                  className="ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none"
                  style={{ background: "rgba(245,158,11,0.2)", color: "#F59E0B" }}
                >
                  {savedIds.size}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("competitor")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "competitor" ? S.active : "transparent",
                color: activeTab === "competitor" ? S.textPrimary : S.textMuted,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
              }}
            >
              <Target size={11} />
              Intel
            </button>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: S.border }} />

          {/* Brand button */}
          <button
            onClick={() => setBrandParamsOpen(true)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-90"
            style={{
              background: hasBrandParams ? "rgba(99,102,241,0.1)" : S.hover,
              color: hasBrandParams ? "#818CF8" : S.textSecondary,
              border: hasBrandParams ? "1px solid rgba(99,102,241,0.25)" : `1px solid ${S.border}`,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
            }}
            title="Set brand parameters"
          >
            <Building2 size={12} />
            Brand
            {hasBrandParams && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
            )}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 transition-all"
            style={{
              background: S.hover,
              color: S.textSecondary,
              border: `1px solid ${S.border}`,
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          {/* Generate CTA */}
          <button
            onClick={() => setGenerateOpen(true)}
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              boxShadow: "0 2px 10px rgba(99,102,241,0.35)",
              letterSpacing: "0.01em",
            }}
          >
            <Wand2 size={12} />
            Generate
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar — only show on swipe file tab */}
        <AnimatePresence>
          {sidebarOpen && activeTab === "swipe" && (
            <motion.aside
              className="flex-shrink-0 flex flex-col h-full"
              style={{
                width: 232,
                background: S.sidebar,
                borderRight: `1px solid ${S.border}`,
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 232, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {/* Sidebar header */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ borderBottom: `1px solid ${S.border}` }}
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                  style={{ color: S.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Filters
                </span>
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-[10px] font-mono rounded-md px-2 py-0.5 transition-all hover:opacity-80"
                    style={{
                      color: "#EF4444",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.18)",
                    }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Scrollable filter list */}
              <div className="flex-1 overflow-y-auto flex flex-col py-2 px-2">
                {/* Angles */}
                <div className="py-3">
                  <SidebarSection
                    title="Angle"
                    icon={<Tag size={11} />}
                    textMuted={S.textMuted}
                    isDark={isDark}
                    activeCount={activeAngles.size}
                    onClear={() => setActiveAngles(new Set())}
                  >
                    {ALL_ANGLES.map((a) => (
                      <FilterPill
                        key={a}
                        label={a}
                        active={activeAngles.has(a)}
                        color={ANGLE_COLORS[a]}
                        onClick={() => toggleAngle(a)}
                        count={angleCounts[a] || 0}
                        isDark={isDark}
                      />
                    ))}
                  </SidebarSection>
                </div>

                {/* Divider */}
                <div className="mx-2" style={{ height: 1, background: S.border }} />

                {/* Niches */}
                <div className="py-3">
                  <SidebarSection
                    title="Niche"
                    icon={<Layers size={11} />}
                    textMuted={S.textMuted}
                    isDark={isDark}
                    activeCount={activeNiches.size}
                    onClear={() => setActiveNiches(new Set())}
                  >
                    {ALL_NICHES.map((n) => (
                      <FilterPill
                        key={n}
                        label={n}
                        active={viewMode === "matrix" ? n === activeMatrixNiche : activeNiches.has(n)}
                        onClick={() => {
                          if (viewMode === "matrix") {
                            scrollToNiche(n);
                          } else {
                            toggleNiche(n);
                          }
                        }}
                        count={nicheCounts[n] || 0}
                        isScrollTarget={viewMode === "matrix" && n !== activeMatrixNiche}
                        isDark={isDark}
                      />
                    ))}
                  </SidebarSection>
                </div>

                {/* Divider */}
                <div className="mx-2" style={{ height: 1, background: S.border }} />

                {/* Formats */}
                <div className="py-3">
                  <SidebarSection
                    title="Format"
                    icon={<Zap size={11} />}
                    textMuted={S.textMuted}
                    isDark={isDark}
                    activeCount={activeFormats.size}
                    onClear={() => setActiveFormats(new Set())}
                  >
                    {ALL_FORMATS.map((f) => (
                      <FilterPill
                        key={f}
                        label={f}
                        active={activeFormats.has(f)}
                        onClick={() => toggleFormat(f)}
                        isDark={isDark}
                      />
                    ))}
                  </SidebarSection>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Competitor Intel tab */}
        {activeTab === "competitor" && (
          <div className="flex-1 overflow-y-auto">
            <CompetitorIntel />
          </div>
        )}

        {/* Saved tab */}
        {activeTab === "saved" && (
          <div className="flex-1 overflow-y-auto p-5">
            {savedAds.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="rounded-full p-4" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                  <Star size={28} style={{ color: "#F59E0B" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E5E3DF" }}>No saved creatives yet</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "#6B7280" }}>Star any creative to save it here for quick access</p>
                </div>
                <button
                  onClick={() => setActiveTab("swipe")}
                  className="text-xs font-mono rounded-md px-3 py-1.5 transition-all hover:opacity-80"
                  style={{ color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}
                >
                  Browse Swipe File →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Global header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>Saved Creatives</span>
                    <span className="text-[11px] font-mono" style={{ color: "#6B7280" }}>{savedAds.length} saved &middot; {savedNiches.length} {savedNiches.length === 1 ? "niche" : "niches"}</span>
                  </div>
                  <button
                    onClick={clearSaved}
                    className="text-xs font-mono rounded-md px-2.5 py-1 transition-colors hover:bg-white/8"
                    style={{ color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}
                  >
                    Clear all
                  </button>
                </div>

                {/* Niche sections */}
                {savedNiches.map((niche) => {
                  const ads = savedByNiche[niche] ?? [];
                  return (
                    <div key={niche} className="flex flex-col gap-3">
                      {/* Niche header */}
                      <div className="flex items-center justify-between pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>{niche}</span>
                          <span className="text-[11px] font-mono rounded-full px-2 py-0.5" style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.2)" }}>
                            {ads.length} saved
                          </span>
                        </div>
                        <button
                          onClick={() => ads.forEach((a) => toggleSave(a.id))}
                          className="text-[11px] font-mono rounded-md px-2 py-0.5 transition-colors hover:bg-white/8"
                          style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          Remove all
                        </button>
                      </div>
                      {/* Cards */}
                      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
                        {ads.map((ad, i) => (
                          <AdCard
                            key={ad.id}
                            ad={ad}
                            index={i}
                            onClick={() => setSelectedAd(ad)}
                            isSaved={true}
                            onToggleSave={() => toggleSave(ad.id)}
                            isDark={isDark}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Main grid — Swipe File tab */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-8" style={{ display: activeTab === "swipe" ? "flex" : "none" }}>

          {/* Matrix View — niche × angle grid */}
          {viewMode === "matrix" && (
            <div className="flex flex-col gap-10">
              {ALL_NICHES.map((niche) => (
                <div key={niche} ref={(el) => { nicheSectionRefs.current[niche] = el; }}>
                  {/* Niche header */}
                  <div className="flex items-center gap-3 mb-4 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>{niche}</span>
                    <span className="text-[11px] font-mono" style={{ color: "#4B5563" }}>11 angles</span>
                  </div>
                  {/* Angle row grid */}
                  <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${rowDensity}, 1fr)` }}>
                    {ALL_ANGLES.map((angle) => {
                      const ad = AD_EXAMPLES.find((a) => a.niche === niche && a.angle === angle);
                      if (!ad) return null;
                      return (
                        <motion.div
                          key={ad.id}
                          className="relative rounded-lg overflow-hidden cursor-pointer group"
                          style={{ background: S.card, border: isSaved(ad.id) ? "1px solid rgba(245,158,11,0.35)" : `1px solid ${S.border}`, boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)" }}
                          whileHover={{ scale: 1.015, borderColor: isSaved(ad.id) ? "rgba(245,158,11,0.55)" : "rgba(255,255,255,0.15)" }}
                          onClick={() => setSelectedAd(ad)}
                        >
                          <div className="relative overflow-hidden" style={{ background: "#0D0D0F" }}>
                            <img
                              src={ad.imageUrl}
                              alt={ad.title}
                              className="w-full object-cover"
                              style={{ height: `${MATRIX_HEIGHTS[formatMode]}px`, objectPosition: "center" }}
                              loading="lazy"
                            />
                            <div className="absolute top-1.5 left-1.5">
                              <AngleBadge angle={ad.angle} small />
                            </div>
                            <button
                              className="absolute top-1.5 right-1.5 rounded-md p-0.5 transition-all"
                              style={{
                                background: isSaved(ad.id) ? "rgba(245,158,11,0.18)" : "rgba(0,0,0,0.45)",
                                color: isSaved(ad.id) ? "#F59E0B" : "#9CA3AF",
                                border: isSaved(ad.id) ? "1px solid rgba(245,158,11,0.35)" : "1px solid rgba(255,255,255,0.1)",
                                backdropFilter: "blur(4px)",
                              }}
                              onClick={(e) => { e.stopPropagation(); toggleSave(ad.id); }}
                              title={isSaved(ad.id) ? "Remove from saved" : "Save creative"}
                            >
                              <Star size={10} fill={isSaved(ad.id) ? "#F59E0B" : "none"} />
                            </button>
                          </div>
                          <div className="px-2.5 py-2">
                            <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: S.textPrimary }}>
                              {ad.hook}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Card Grid View */}
          {viewMode === "grid" && (
          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <Search size={32} style={{ color: S.textFaint }} />
                <p className="text-sm font-mono" style={{ color: S.textMuted }}>No examples match your filters.</p>
                <button onClick={clearAll} className="text-xs font-mono underline" style={{ color: "#6366F1" }}>Clear all filters</button>
              </div>
            ) : (
              <>
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${rowDensity}, 1fr)`,
                }}
              >
                {visibleAds.map((ad, i) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    index={i % PAGE_SIZE}
                    onClick={() => setSelectedAd(ad)}
                    isSaved={isSaved(ad.id)}
                    onToggleSave={() => toggleSave(ad.id)}
                    cardHeight={CARD_HEIGHTS[formatMode]}
                    isDark={isDark}
                    voteCount={voteCounts[ad.id] ?? 0}
                    isVoted={votedIds.has(ad.id)}
                    onToggleVote={() => toggleVote(ad.id)}
                  />
                ))}
              </div>
              {/* Scroll sentinel — triggers next page load */}
              {visibleCount < filtered.length && (
                <div ref={sentinelRef} className="flex items-center justify-center py-6">
                  <span className="text-xs font-mono" style={{ color: S.textFaint }}>Loading more…</span>
                </div>
              )}
              {visibleCount >= filtered.length && filtered.length > PAGE_SIZE && (
                <div className="flex items-center justify-center py-4">
                  <span className="text-xs font-mono" style={{ color: S.textFaint }}>All {filtered.length} creatives loaded</span>
                </div>
              )}
              </>
            )}
          </div>
          )}

          {/* Ad Intelligence Sources */}
          <div className="rounded-xl p-6" style={{ background: S.panel, border: `1px solid ${S.border}` }}>
            <div className="flex items-center gap-2 mb-5">
              <Database size={14} style={{ color: "#6B7280" }} />
              <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>Ad Intelligence Sources</span>
              <span className="text-[10px] font-mono rounded px-1.5 py-0.5 ml-1" style={{ color: "#4B5563", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>Where to find real winning ads</span>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {AD_INTELLIGENCE_SOURCES.map((src) => (
                <a
                  key={src.name}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 rounded-lg p-4 transition-all hover:border-white/15 group"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E5E3DF" }}>{src.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ color: src.tier === "Free" ? "#10B981" : "#F59E0B", background: src.tier === "Free" ? "#10B98118" : "#F59E0B18", border: `1px solid ${src.tier === "Free" ? "#10B98130" : "#F59E0B30"}` }}>{src.tier}</span>
                      <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#6B7280" }} />
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{src.description}</p>
                  <div className="flex items-start gap-1.5 mt-1">
                    <BookOpen size={10} className="flex-shrink-0 mt-0.5" style={{ color: "#4B5563" }} />
                    <span className="text-[11px] font-mono" style={{ color: "#4B5563" }}>{src.bestFor}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Detail Drawer */}
      {selectedAd && (
        <AdDetailDrawer
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
          isSaved={isSaved(selectedAd.id)}
          onToggleSave={() => toggleSave(selectedAd.id)}
          formatMode={formatMode}
          setFormatMode={setFormatMode}
          voteCount={voteCounts[selectedAd.id] ?? 0}
          isVoted={votedIds.has(selectedAd.id)}
          onToggleVote={() => toggleVote(selectedAd.id)}
        />
      )}

      {/* Generate Ad Panel */}
      <AnimatePresence>
        {generateOpen && (
          <GenerateAdPanel onClose={() => setGenerateOpen(false)} />
        )}
      </AnimatePresence>

      {/* Brand Parameters Panel */}
      <BrandParamsPanel open={brandParamsOpen} onClose={() => setBrandParamsOpen(false)} />
    </div>
  );
}

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
      className={`inline-flex items-center  font-mono font-medium tracking-tight ${small ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"}`}
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
    "Agency Curated": { color: "#FF5C1F", label: "Agency Curated" },
    "AI Generated": { color: "#0284C7", label: "AI Generated" },
  };
  const { color, label } = map[sourceType];
  return (
    <span
      className="inline-flex items-center  font-mono text-[10px] px-1.5 py-0.5 font-medium"
      style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}

function FormatBadge({ format }: { format: Format }) {
  const map: Record<Format, string> = {
    "Static Image": "#FF5C1F",
    Carousel: "#0284C7",
    Video: "#EF4444",
    "Lead Form": "#FF5C1F",
  };
  return (
    <span
      className="inline-flex items-center  font-mono text-[10px] px-1.5 py-0.5 font-medium"
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
    border: "1px solid rgba(255,92,31,0.4)",
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
      className="group flex flex-col gap-1.5  p-3"
      style={{
        background: highlight ? "rgba(255,92,31,0.06)" : "rgba(255,255,255,0.04)",
        border: highlight ? "1px solid rgba(255,92,31,0.2)" : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-mono uppercase tracking-widest"
          style={{ color: highlight ? "#FF5C1F" : "#6B7280" }}
        >
          {label}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing((v) => !v)}
            className="flex items-center gap-1 text-[10px] rounded px-1.5 py-0.5"
            style={{ color: editing ? "#FF5C1F" : "#9CA3AF", background: editing ? "rgba(255,92,31,0.12)" : "rgba(255,255,255,0.06)" }}
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
    return <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "#6B6B75" }}>{injected}</p>;
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
    return <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "#6B6B75" }}>{injected}</p>;
  }

  return (
    <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "#4A4A52" }}>
      {segments.map((seg, i) =>
        seg.isToken ? (
          <span
            key={i}
            className="rounded px-0.5"
            style={{ background: "rgba(255,92,31,0.15)", color: "#FF5C1F", border: "1px solid rgba(255,92,31,0.3)" }}
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
            background: "#E3E0D9",
            borderLeft: "1px solid rgba(22,22,26,0.12)",
          }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: "#E8E5DF", borderBottom: "1px solid rgba(22,22,26,0.1)" }}>
            <div className="flex items-center gap-2 flex-wrap">
              <AngleBadge angle={ad.angle} />
              <FormatBadge format={ad.format} />
              <span className="text-xs font-mono" style={{ color: "#6B7280" }}>{ad.niche}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleVote?.(); }}
                className="flex items-center gap-1.5  px-2 py-1.5 transition-all hover:bg-white/10"
                style={{ color: isVoted ? "#FF5C1F" : "#6B7280" }}
                title={isVoted ? "Remove vote" : "Upvote this creative"}
              >
                <ThumbsUp size={15} fill={isVoted ? "#FF5C1F" : "none"} />
                {voteCount > 0 && <span className="text-xs font-mono">{voteCount}</span>}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
                className=" p-1.5 transition-all hover:bg-black/5"
                style={{ color: isSaved ? "#FF5C1F" : "#6B7280" }}
                title={isSaved ? "Remove from saved" : "Save creative"}
              >
                <Star size={16} fill={isSaved ? "#FF5C1F" : "none"} />
              </button>
              <button
                onClick={onClose}
                className=" p-1.5 transition-colors hover:bg-black/5"
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
              <div className="relative" style={{ background: "#D8D4CC" }}>
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
                        border: "2px dashed rgba(255,92,31,0.5)",
                        pointerEvents: "none",
                        borderRadius: 4,
                      }}
                    />
                  )}
                </div>
                {/* Format selector strip below image */}
                <div className="flex items-center justify-center gap-1 py-2" style={{ borderTop: "1px solid rgba(22,22,26,0.08)", background: "#E8E5DF" }}>
                  {(["1:1", "4:5", "9:16"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormatMode(fmt)}
                      className="rounded px-2.5 py-1 text-[11px] font-mono transition-all"
                      style={{
                        background: formatMode === fmt ? "rgba(255,92,31,0.15)" : "rgba(22,22,26,0.05)",
                        color: formatMode === fmt ? "#FF5C1F" : "#6B6B75",
                        border: formatMode === fmt ? "1px solid rgba(255,92,31,0.4)" : "1px solid rgba(22,22,26,0.1)",
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
              <h2 className="text-xl font-bold leading-tight mb-1" style={{ fontFamily: "'Archivo Black', sans-serif", color: "#16161A", letterSpacing: "-0.02em" }}>
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
            <div className=" p-4" style={{ background: "rgba(255,92,31,0.07)", border: "1px solid rgba(255,92,31,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={13} style={{ color: "#FF5C1F" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#FF5C1F" }}>Why It Works</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#4A4A52" }}>{ad.whyItWorks}</p>
            </div>

            {/* Replication Blueprint */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers size={13} style={{ color: "#FF5C1F" }} />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#FF5C1F" }}>Replication Blueprint</span>
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
            <div className=" overflow-hidden" style={{ border: "1px solid rgba(255,92,31,0.25)" }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(255,92,31,0.08)", borderBottom: "1px solid rgba(255,92,31,0.15)" }}>
                <div className="flex items-center gap-2">
                  <Wand2 size={12} style={{ color: "#FF5C1F" }} />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-widest" style={{ color: "#FF5C1F" }}>Brand-Injected Prompt</span>
                  {hasParams && (
                    <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(255,92,31,0.12)", color: "#FF5C1F", border: "1px solid rgba(255,92,31,0.2)" }}>Brand Active</span>
                  )}
                </div>
                <button
                  onClick={copyPrompt}
                  className="flex items-center gap-1.5 text-[11px] font-mono  px-2.5 py-1 transition-all hover:opacity-90"
                  style={{ background: "rgba(255,92,31,0.15)", color: "#FF5C1F", border: "1px solid rgba(255,92,31,0.3)" }}
                >
                  {promptCopied ? <CheckCheck size={11} /> : <Copy size={11} />}
                  {promptCopied ? "Copied!" : "Copy Prompt"}
                </button>
              </div>
              <div className="p-4" style={{ background: "rgba(255,92,31,0.03)" }}>
                {!hasParams && (
                  <p className="text-[11px] font-mono mb-3  px-3 py-2" style={{ color: "#FF5C1F", background: "rgba(255,92,31,0.08)", border: "1px solid rgba(255,92,31,0.2)" }}>
                    Set brand parameters (top-right → Brand) to auto-inject your logo, colors, location, and season.
                  </p>
                )}
                {/* Token-highlighted prompt: show injected values in indigo, rest in normal color */}
                <HighlightedPrompt base={replicationPrompt} injected={brandInjectedPrompt} params={params} hasParams={hasParams} />
                {hasParams && (
                  <div className="mt-3 pt-3 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid rgba(22,22,26,0.1)" }}>
                    {params.brandName && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(255,92,31,0.1)", color: "#FF5C1F" }}>{params.brandName}</span>}
                    {params.location && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(255,92,31,0.1)", color: "#FF5C1F" }}>{params.location}</span>}
                    {params.season !== "Year-round" && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(255,92,31,0.1)", color: "#FF5C1F" }}>{params.season}</span>}
                    {params.language !== "English" && <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(255,92,31,0.1)", color: "#FF5C1F" }}>{params.language}</span>}
                    <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(255,92,31,0.1)", color: "#FF5C1F" }}>{params.primaryColor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Advertiser info */}
            {ad.advertiser && (
              <div className=" px-4 py-3 flex items-center gap-2" style={{ background: "rgba(22,22,26,0.04)", border: "1px solid rgba(22,22,26,0.1)" }}>
                <SourceBadge sourceType={ad.sourceType} />
                <span className="text-xs font-mono" style={{ color: "#6B6B75" }}>{ad.advertiser}</span>
              </div>
            )}

            {/* Source link */}
            <a
              href={ad.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2  py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#16161A", border: "1px solid #16161A", color: "#FFFFFF", fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}
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
      className="relative  overflow-hidden cursor-pointer group"
      style={{ background: isDark ? "#161618" : "#EEEAE3", border: isSaved ? "1px solid rgba(255,92,31,0.35)" : isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(22,22,26,0.1)", boxShadow: isDark ? "none" : "0 1px 4px rgba(22,22,26,0.06)" }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.015, borderColor: isSaved ? "rgba(255,92,31,0.55)" : isDark ? "rgba(255,255,255,0.15)" : "rgba(255,92,31,0.4)" }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
        <div className="relative overflow-hidden" style={{ background: isDark ? "#0D0D0F" : "#D8D4CC" }}>
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
          <div className="flex items-center gap-2 px-4 py-2 text-sm font-bold" style={{ background: "#FF5C1F", backdropFilter: "blur(8px)", color: "#FFFFFF", fontFamily: "'Archivo Black', sans-serif", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            View Blueprint <ChevronRight size={14} />
          </div>
        </motion.div>
        {/* Angle badge top-left */}
        <div className="absolute top-2 left-2">
          <AngleBadge angle={ad.angle} small />
        </div>
        {/* Star button top-right */}
        <button
          className="absolute top-2 right-2  p-1 transition-all"
          style={{
            background: isSaved ? "rgba(255,92,31,0.18)" : "rgba(0,0,0,0.45)",
            color: isSaved ? "#FF5C1F" : "#9CA3AF",
            border: isSaved ? "1px solid rgba(255,92,31,0.35)" : "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          title={isSaved ? "Remove from saved" : "Save creative"}
        >
          <Star size={12} fill={isSaved ? "#FF5C1F" : "none"} />
        </button>
      </div>

      {/* Bottom strip */}
      <div className="px-3 py-3 flex flex-col gap-1.5">
        <p className="text-sm font-bold leading-tight line-clamp-2" style={{ fontFamily: "'Archivo Black', sans-serif", color: isDark ? "#E5E3DF" : "#16161A", letterSpacing: "-0.01em", fontSize: 12 }}>
          {ad.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono" style={{ color: "#6B7280" }}>{ad.niche}</span>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1  px-1.5 py-0.5 text-[11px] font-mono transition-all"
              style={{
                background: isVoted ? "rgba(255,92,31,0.12)" : "transparent",
                color: isVoted ? "#FF5C1F" : "#6B7280",
                border: isVoted ? "1px solid rgba(255,92,31,0.3)" : "1px solid transparent",
              }}
              onClick={(e) => { e.stopPropagation(); onToggleVote?.(); }}
              title={isVoted ? "Remove vote" : "Upvote this creative"}
            >
              <ThumbsUp size={10} fill={isVoted ? "#FF5C1F" : "none"} />
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
            className="text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "#16161A", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {title}
          </span>
        </div>
        {activeCount > 0 && onClear && (
          <button
            onClick={onClear}
            className="text-[9px] font-mono rounded px-1.5 py-0.5 transition-all hover:opacity-80"
            style={{
              color: "#FF5C1F",
              background: "rgba(255,92,31,0.12)",
              border: "1px solid rgba(255,92,31,0.3)",
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
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-between px-2.5 py-[6px] text-[11px] transition-all text-left"
      style={{
        background: active ? "rgba(255,92,31,0.1)" : "transparent",
        color: active ? "#FF5C1F" : "#4A4A52",
        fontWeight: active ? 600 : 400,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.04em",
        border: active ? "1px solid rgba(255,92,31,0.35)" : "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(22,22,26,0.05)";
          (e.currentTarget as HTMLButtonElement).style.color = "#16161A";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#4A4A52";
        }
      }}
    >
      {/* Active left accent bar */}
      {active && (
        <span
          className="absolute left-0 top-[6px] bottom-[6px] "
          style={{ width: 3, background: color || "#FF5C1F" }}
        />
      )}
      <span
        className="flex items-center gap-2 min-w-0"
        style={{ paddingLeft: active ? 10 : 2, transition: "padding 0.15s" }}
      >
        {color && (
          <span
            className="w-[7px] h-[7px] flex-shrink-0 transition-all"
            style={{
              background: active ? color : "#C8C4BC",
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
            color: active ? (color ? `${color}CC` : "#FF5C1F") : "#9CA3AF",
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
    bg: isDark ? "#0D0D0F" : "#E8E5DF",
    card: isDark ? "#161618" : "#EEEAE3",
    panel: isDark ? "#111113" : "#E3E0D9",
    sidebar: isDark ? "#0F0F11" : "#DEDAD3",
    header: isDark ? "rgba(13,13,15,0.97)" : "rgba(232,229,223,0.97)",
    border: isDark ? "rgba(255,255,255,0.07)" : "rgba(22,22,26,0.1)",
    borderStrong: isDark ? "rgba(255,255,255,0.12)" : "rgba(22,22,26,0.2)",
    hover: isDark ? "rgba(255,255,255,0.05)" : "rgba(22,22,26,0.05)",
    active: isDark ? "rgba(255,255,255,0.1)" : "rgba(22,22,26,0.1)",
    input: isDark ? "rgba(255,255,255,0.05)" : "rgba(22,22,26,0.06)",
    textPrimary: isDark ? "#F0EEE9" : "#16161A",
    textSecondary: isDark ? "#9CA3AF" : "#4A4A52",
    textMuted: isDark ? "#6B7280" : "#6B6B75",
    textFaint: isDark ? "#4B5563" : "#9B9BA5",
    orange: "#FF5C1F",
    orangeHover: "#E84E14",
    orangeMuted: "rgba(255,92,31,0.12)",
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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#E8E5DF" }}>
      {/* Ticker Bar */}
      <div className="flex-shrink-0 overflow-hidden" style={{ background: "#16161A", height: 28 }}>
        <div className="ticker-track h-full flex items-center">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-0 flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "#FF5C1F", letterSpacing: "0.12em", textTransform: "uppercase", paddingRight: 0 }}>
              &nbsp;▸ LIVE IN:&nbsp;<span style={{ color: "#E8E5DF" }}>ROOFING · HVAC · EPOXY FLOORS · PLUMBING · ELECTRICAL · LANDSCAPING · PAINTING · PEST CONTROL · WINDOWS · SOLAR · CONCRETE · FENCING · GUTTERS · PRESSURE WASHING · JUNK REMOVAL</span>&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Top Bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-0 gap-4"
        style={{
          background: "rgba(232,229,223,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #16161A",
          height: 56,
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        {/* Left: logo + sidebar toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className=" p-1.5 transition-all"
            style={{ color: S.textMuted, background: sidebarOpen ? S.active : "transparent" }}
            title="Toggle sidebar"
          >
            <Layers size={15} />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 flex items-center justify-center flex-shrink-0"
              style={{ background: S.orange, boxShadow: `0 2px 8px ${S.orangeMuted}` }}
            >
              <span style={{ color: "#fff", fontFamily: "'Archivo Black', sans-serif", fontSize: 13, fontWeight: 900, letterSpacing: "-0.02em" }}>D</span>
            </div>
            <div>
              <h1 className="text-[13px] font-bold leading-none tracking-tight" style={{ fontFamily: "'Archivo Black', sans-serif", color: S.textPrimary, letterSpacing: "-0.02em" }}>
                DEALS TO GROW
              </h1>
              <p className="text-[10px] font-mono mt-0.5 leading-none uppercase tracking-widest" style={{ color: S.textMuted }}>
                AD CREATIVE CANVAS
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
            className="w-full  pl-9 pr-4 py-2 text-sm outline-none transition-all"
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
              className="text-[11px] font-mono px-2 py-0.5 "
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
                className="flex items-center gap-0.5  px-2 py-1"
                style={{ background: S.hover, border: `1px solid ${S.border}` }}
              >
                <Columns size={10} style={{ color: S.textMuted, marginRight: 3 }} />
                {[2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRowDensity(n)}
                    className="rounded px-1.5 py-0.5 text-[11px] font-mono transition-all"
                    style={{
                      background: rowDensity === n ? "rgba(255,92,31,0.2)" : "transparent",
                      color: rowDensity === n ? "#FF5C1F" : S.textMuted,
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
                className="flex items-center  p-0.5"
                style={{ background: S.hover, border: `1px solid ${S.border}` }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className="flex items-center gap-1  px-2 py-1 transition-all"
                  style={{ background: viewMode === "grid" ? S.active : "transparent", color: viewMode === "grid" ? S.textPrimary : S.textMuted }}
                  title="Card Grid"
                >
                  <LayoutGrid size={12} />
                </button>
                <button
                  onClick={() => setViewMode("matrix")}
                  className="flex items-center gap-1  px-2 py-1 transition-all"
                  style={{ background: viewMode === "matrix" ? S.active : "transparent", color: viewMode === "matrix" ? S.textPrimary : S.textMuted }}
                  title="Matrix View"
                >
                  <Table2 size={12} />
                </button>
              </div>
          {/* Sort by votes */}
          <button
            onClick={() => setSortBy(sortBy === "votes" ? "default" : "votes")}
            className="flex items-center gap-1  px-2 py-1 text-[11px] font-mono transition-all"
            style={{
              background: sortBy === "votes" ? S.orangeMuted : S.hover,
              color: sortBy === "votes" ? S.orange : S.textMuted,
              border: sortBy === "votes" ? `1px solid ${S.orange}40` : `1px solid ${S.border}`,
            }}
                title={sortBy === "votes" ? "Sort: Most Voted" : "Sort: Default"}
              >
                <ThumbsUp size={11} fill={sortBy === "votes" ? "#FF5C1F" : "none"} />
                {sortBy === "votes" ? "Top Voted" : "Sort"}
              </button>
            </div>
          )}
          {/* Clear filters */}
          {hasFilters && viewMode === "grid" && activeTab === "swipe" && (
            <button
              onClick={clearAll}
              className="text-[11px] font-mono  px-2.5 py-1 transition-all"
              style={{ color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)" }}
            >
              Clear
            </button>
          )}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: S.border }} />

          {/* Tab switcher */}
          <div
            className="flex items-center  p-0.5"
            style={{ background: S.hover, border: `1px solid ${S.border}` }}
          >
            <button
              onClick={() => setActiveTab("swipe")}
              className="flex items-center gap-1.5  px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "swipe" ? S.active : "transparent",
                color: activeTab === "swipe" ? S.textPrimary : S.textMuted,
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 12,
              }}
            >
              <Database size={11} />
              Swipe File
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className="flex items-center gap-1.5  px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "saved" ? "rgba(255,92,31,0.12)" : "transparent",
                color: activeTab === "saved" ? "#FF5C1F" : S.textMuted,
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 12,
              }}
            >
              <Star size={11} fill={activeTab === "saved" ? "#FF5C1F" : "none"} />
              Saved
              {savedIds.size > 0 && (
                <span
                  className="ml-0.5  px-1.5 py-0.5 text-[10px] font-bold leading-none"
                  style={{ background: "rgba(255,92,31,0.2)", color: "#FF5C1F" }}
                >
                  {savedIds.size}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("competitor")}
              className="flex items-center gap-1.5  px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "competitor" ? S.active : "transparent",
                color: activeTab === "competitor" ? S.textPrimary : S.textMuted,
                fontFamily: "'Archivo Black', sans-serif",
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
            className="flex items-center gap-1.5  px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-90"
            style={{
              background: hasBrandParams ? S.orangeMuted : S.hover,
              color: hasBrandParams ? S.orange : S.textSecondary,
              border: hasBrandParams ? `1px solid ${S.orange}40` : `1px solid ${S.border}`,
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 11,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
            title="Set brand parameters"
          >
            <Building2 size={12} />
            Brand
            {hasBrandParams && (
              <span className="w-1.5 h-1.5 " style={{ background: "#FF5C1F" }} />
            )}
          </button>

          {/* Generate CTA */}
          <button
            onClick={() => setGenerateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: S.orange,
              color: "#FFFFFF",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 11,
              boxShadow: `0 2px 10px ${S.orangeMuted}`,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: 0,
            }}
          >
            <Wand2 size={12} />
            GENERATE
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
                width: 240,
                background: "#DEDAD3",
                borderRight: "1px solid #16161A",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 232, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {/* Sidebar header */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ borderBottom: "1px solid #16161A" }}
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: "#16161A", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Filters
                </span>
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-[10px] font-mono  px-2 py-0.5 transition-all hover:opacity-80"
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
                <div className=" p-4" style={{ background: "rgba(255,92,31,0.08)", border: "1px solid rgba(255,92,31,0.15)" }}>
                  <Star size={28} style={{ color: "#FF5C1F" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Archivo Black', sans-serif", color: "#16161A" }}>No saved creatives yet</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "#6B7280" }}>Star any creative to save it here for quick access</p>
                </div>
                <button
                  onClick={() => setActiveTab("swipe")}
                  className="text-xs font-mono  px-3 py-1.5 transition-all hover:opacity-80"
                  style={{ color: "#FF5C1F", border: "1px solid rgba(255,92,31,0.3)", background: "rgba(255,92,31,0.08)" }}
                >
                  Browse Swipe File →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Global header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={14} fill="#FF5C1F" style={{ color: "#FF5C1F" }} />
                    <span className="text-sm font-bold" style={{ fontFamily: "'Archivo Black', sans-serif", color: "#16161A" }}>Saved Creatives</span>
                    <span className="text-[11px] font-mono" style={{ color: "#6B7280" }}>{savedAds.length} saved &middot; {savedNiches.length} {savedNiches.length === 1 ? "niche" : "niches"}</span>
                  </div>
                  <button
                    onClick={clearSaved}
                    className="text-xs font-mono  px-2.5 py-1 transition-colors hover:bg-white/8"
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
                      <div className="flex items-center justify-between pb-2" style={{ borderBottom: "1px solid rgba(22,22,26,0.15)" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ fontFamily: "'Archivo Black', sans-serif", color: "#16161A" }}>{niche}</span>
                          <span className="text-[11px] font-mono  px-2 py-0.5" style={{ background: "rgba(255,92,31,0.12)", color: "#FF5C1F", border: "1px solid rgba(255,92,31,0.2)" }}>
                            {ads.length} saved
                          </span>
                        </div>
                        <button
                          onClick={() => ads.forEach((a) => toggleSave(a.id))}
                          className="text-[11px] font-mono px-2 py-0.5 transition-colors"
                          style={{ color: "#6B7280", border: "1px solid rgba(22,22,26,0.15)" }}
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
                  <div className="flex items-center gap-3 mb-4 pb-2" style={{ borderBottom: "1px solid rgba(22,22,26,0.15)" }}>
                    <span className="text-sm font-bold" style={{ fontFamily: "'Archivo Black', sans-serif", color: "#16161A" }}>{niche}</span>
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
                          className="relative  overflow-hidden cursor-pointer group"
                          style={{ background: "#EEEAE3", border: isSaved(ad.id) ? "1px solid rgba(255,92,31,0.35)" : "1px solid rgba(22,22,26,0.12)", boxShadow: "0 1px 4px rgba(22,22,26,0.06)" }}
                          whileHover={{ scale: 1.015, borderColor: isSaved(ad.id) ? "rgba(255,92,31,0.55)" : "rgba(255,92,31,0.3)" }}
                          onClick={() => setSelectedAd(ad)}
                        >
                          <div className="relative overflow-hidden" style={{ background: "#D8D4CC" }}>
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
                              className="absolute top-1.5 right-1.5  p-0.5 transition-all"
                              style={{
                                background: isSaved(ad.id) ? "rgba(255,92,31,0.18)" : "rgba(0,0,0,0.45)",
                                color: isSaved(ad.id) ? "#FF5C1F" : "#9CA3AF",
                                border: isSaved(ad.id) ? "1px solid rgba(255,92,31,0.35)" : "1px solid rgba(255,255,255,0.1)",
                                backdropFilter: "blur(4px)",
                              }}
                              onClick={(e) => { e.stopPropagation(); toggleSave(ad.id); }}
                              title={isSaved(ad.id) ? "Remove from saved" : "Save creative"}
                            >
                              <Star size={10} fill={isSaved(ad.id) ? "#FF5C1F" : "none"} />
                            </button>
                          </div>
                          <div className="px-2.5 py-2">
                            <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ fontFamily: "'Archivo Black', sans-serif", color: S.textPrimary }}>
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
                <button onClick={clearAll} className="text-xs font-mono underline" style={{ color: "#FF5C1F" }}>Clear all filters</button>
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
          <div className="p-6" style={{ background: "#DEDAD3", border: "1px solid rgba(22,22,26,0.2)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Database size={14} style={{ color: "#6B7280" }} />
              <span className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: "#16161A" }}>Ad Intelligence Sources</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 ml-1" style={{ color: "#6B7280", background: "rgba(22,22,26,0.06)", border: "1px solid rgba(22,22,26,0.12)" }}>Where to find real winning ads</span>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {AD_INTELLIGENCE_SOURCES.map((src) => (
                <a
                  key={src.name}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 p-4 transition-all group"
                  style={{ background: "#E8E5DF", border: "1px solid rgba(22,22,26,0.12)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,92,31,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(22,22,26,0.12)"; }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ fontFamily: "'Archivo Black', sans-serif", color: "#16161A" }}>{src.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono rounded px-1.5 py-0.5" style={{ color: src.tier === "Free" ? "#FF5C1F" : "#FF5C1F", background: src.tier === "Free" ? "#FF5C1F18" : "#FF5C1F18", border: `1px solid ${src.tier === "Free" ? "#FF5C1F30" : "#FF5C1F30"}` }}>{src.tier}</span>
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

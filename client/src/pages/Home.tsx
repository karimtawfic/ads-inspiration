// ============================================================
// Meta Ad Creative Canvas — Home Page
// Design: Dark Intelligence Board
// Space Grotesk display, Inter body, JetBrains Mono metadata
// Color-coded angle taxonomy, masonry grid, lightbox drawer
// ============================================================

import { useState, useMemo } from "react";
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
import { X, ExternalLink, Search, ChevronRight, Layers, Tag, Zap, Copy, CheckCheck, BookOpen, Database, Wand2, Target, LayoutGrid, Table2 } from "lucide-react";
import { GenerateAdPanel } from "@/components/GenerateAdPanel";
import CompetitorIntel from "@/pages/CompetitorIntel";

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

// ─── Replication Row ──────────────────────────────────────────
function ReplicationRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="group flex flex-col gap-1 rounded-md p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>{label}</span>
        <button
          onClick={copy}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] rounded px-1.5 py-0.5"
          style={{ color: "#9CA3AF", background: "rgba(255,255,255,0.06)" }}
        >
          {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{value}</p>
    </div>
  );
}

// ─── Lightbox / Detail Drawer ─────────────────────────────────
function AdDetailDrawer({ ad, onClose }: { ad: AdExample; onClose: () => void }) {
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
            <button
              onClick={onClose}
              className="rounded-md p-1.5 transition-colors hover:bg-white/10"
              style={{ color: "#9CA3AF" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Image */}
          <div className="relative" style={{ background: "#0A0A0C" }}>
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full object-contain"
              style={{ maxHeight: "420px" }}
            />
          </div>

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
              <div className="flex items-center gap-2 mb-3">
                <Layers size={13} style={{ color: "#F59E0B" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#F59E0B" }}>Replication Blueprint</span>
              </div>
              <div className="flex flex-col gap-2">
                <ReplicationRow label="Hook" value={ad.hook} />
                <ReplicationRow label="Copy Formula" value={ad.copyFormula} />
                <ReplicationRow label="Trust Element" value={ad.trustElement} />
                <ReplicationRow label="CTA Type" value={ad.ctaType} />
                <ReplicationRow label="Replication Prompt" value={ad.replicationPrompt} />
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
function AdCard({ ad, index, onClick }: { ad: AdExample; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.015, borderColor: "rgba(255,255,255,0.15)" }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ background: "#0D0D0F" }}>
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-full object-cover transition-transform duration-500"
          style={{
            height: "220px",
            objectPosition: "top",
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
        {/* Format badge top-right */}
        <div className="absolute top-2 right-2">
          <FormatBadge format={ad.format} />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-3 py-3 flex flex-col gap-1.5">
        <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E5E3DF" }}>
          {ad.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono" style={{ color: "#6B7280" }}>{ad.niche}</span>
          <SourceBadge sourceType={ad.sourceType} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sidebar Filter ───────────────────────────────────────────
function SidebarSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <span style={{ color: "#6B7280" }}>{icon}</span>
        <span className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>{title}</span>
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  color,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-all text-left"
      style={{
        background: active ? (color ? `${color}18` : "rgba(255,255,255,0.08)") : "transparent",
        color: active ? (color || "#F0EEE9") : "#9CA3AF",
        border: active ? `1px solid ${color ? `${color}40` : "rgba(255,255,255,0.15)"}` : "1px solid transparent",
        fontFamily: active ? "'Space Grotesk', sans-serif" : "inherit",
        fontWeight: active ? 600 : 400,
      }}
    >
      <span className="flex items-center gap-2">
        {color && (
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: active ? color : "#374151" }} />
        )}
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[11px] font-mono" style={{ color: active ? (color || "#9CA3AF") : "#4B5563" }}>
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
  const [activeTab, setActiveTab] = useState<"swipe" | "competitor">("swipe");
  const [viewMode, setViewMode] = useState<"grid" | "matrix">("grid");

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

  const filtered = useMemo(() => {
    return AD_EXAMPLES.filter((ad) => {
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
  }, [activeAngles, activeNiches, activeFormats, searchQuery]);

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0D0D0F" }}>
      {/* Top Bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 gap-4"
        style={{ background: "rgba(13,13,15,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="rounded-md p-1.5 transition-colors hover:bg-white/8"
            style={{ color: "#6B7280" }}
          >
            <Layers size={16} />
          </button>
          <div>
            <h1 className="text-base font-bold leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
              Meta Ad Creative Canvas
            </h1>
            <p className="text-[11px] font-mono mt-0.5" style={{ color: "#6B7280" }}>
              Service Business Lead Gen — North America
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6B7280" }} />
          <input
            type="text"
            placeholder="Search by niche, angle, hook, formula…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md pl-9 pr-4 py-2 text-sm outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E5E3DF",
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-mono" style={{ color: "#6B7280" }}>
            {viewMode === "grid" ? `${filtered.length} / ${AD_EXAMPLES.length}` : "110 / 110"} examples
          </span>
          {/* View mode toggle */}
          {activeTab === "swipe" && (
            <div className="flex items-center rounded-md p-0.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono transition-all"
                style={{ background: viewMode === "grid" ? "rgba(255,255,255,0.1)" : "transparent", color: viewMode === "grid" ? "#F0EEE9" : "#6B7280" }}
                title="Card Grid"
              >
                <LayoutGrid size={12} />
              </button>
              <button
                onClick={() => setViewMode("matrix")}
                className="flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono transition-all"
                style={{ background: viewMode === "matrix" ? "rgba(255,255,255,0.1)" : "transparent", color: viewMode === "matrix" ? "#F0EEE9" : "#6B7280" }}
                title="Matrix View"
              >
                <Table2 size={12} />
              </button>
            </div>
          )}
          {hasFilters && viewMode === "grid" && (
            <button
              onClick={clearAll}
              className="text-xs font-mono rounded-md px-2.5 py-1 transition-colors hover:bg-white/8"
              style={{ color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}
            >
              Clear filters
            </button>
          )}
          {/* Tab switcher */}
          <div className="flex items-center rounded-lg p-0.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setActiveTab("swipe")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "swipe" ? "rgba(255,255,255,0.1)" : "transparent",
                color: activeTab === "swipe" ? "#F0EEE9" : "#6B7280",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Database size={12} />
              Swipe File
            </button>
            <button
              onClick={() => setActiveTab("competitor")}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background: activeTab === "competitor" ? "rgba(255,255,255,0.1)" : "transparent",
                color: activeTab === "competitor" ? "#F0EEE9" : "#6B7280",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <Target size={12} />
              Competitor Intel
            </button>
          </div>

          <button
            onClick={() => setGenerateOpen(true)}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 2px 12px rgba(99,102,241,0.4)",
            }}
          >
            <Wand2 size={14} />
            Generate
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar — only show on swipe file tab */}
        <AnimatePresence>
          {sidebarOpen && activeTab === "swipe" && (
            <motion.aside
              className="flex-shrink-0 overflow-y-auto flex flex-col gap-6 py-5 px-3"
              style={{
                width: 220,
                background: "#0F0F11",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {/* Angles */}
              <SidebarSection title="Angle" icon={<Tag size={12} />}>
                {ALL_ANGLES.map((a) => (
                  <FilterPill
                    key={a}
                    label={a}
                    active={activeAngles.has(a)}
                    color={ANGLE_COLORS[a]}
                    onClick={() => toggleAngle(a)}
                    count={angleCounts[a] || 0}
                  />
                ))}
              </SidebarSection>

              {/* Niches */}
              <SidebarSection title="Niche" icon={<Layers size={12} />}>
                {ALL_NICHES.map((n) => (
                  <FilterPill
                    key={n}
                    label={n}
                    active={activeNiches.has(n)}
                    onClick={() => toggleNiche(n)}
                    count={nicheCounts[n] || 0}
                  />
                ))}
              </SidebarSection>

              {/* Formats */}
              <SidebarSection title="Format" icon={<Zap size={12} />}>
                {ALL_FORMATS.map((f) => (
                  <FilterPill
                    key={f}
                    label={f}
                    active={activeFormats.has(f)}
                    onClick={() => toggleFormat(f)}
                  />
                ))}
              </SidebarSection>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Competitor Intel tab */}
        {activeTab === "competitor" && (
          <div className="flex-1 overflow-y-auto">
            <CompetitorIntel />
          </div>
        )}

        {/* Main grid — Swipe File tab */}
        <main className="flex-1 overflow-y-auto p-5 flex flex-col gap-8" style={{ display: activeTab === "swipe" ? "flex" : "none" }}>

          {/* Matrix View — niche × angle grid */}
          {viewMode === "matrix" && (
            <div className="flex flex-col gap-10">
              {ALL_NICHES.map((niche) => (
                <div key={niche}>
                  {/* Niche header */}
                  <div className="flex items-center gap-3 mb-4 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>{niche}</span>
                    <span className="text-[11px] font-mono" style={{ color: "#4B5563" }}>11 angles</span>
                  </div>
                  {/* Angle row grid */}
                  <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                    {ALL_ANGLES.map((angle) => {
                      const ad = AD_EXAMPLES.find((a) => a.niche === niche && a.angle === angle);
                      if (!ad) return null;
                      return (
                        <motion.div
                          key={ad.id}
                          className="relative rounded-lg overflow-hidden cursor-pointer group"
                          style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.07)" }}
                          whileHover={{ scale: 1.015, borderColor: "rgba(255,255,255,0.15)" }}
                          onClick={() => setSelectedAd(ad)}
                        >
                          <div className="relative overflow-hidden" style={{ background: "#0D0D0F" }}>
                            <img
                              src={ad.imageUrl}
                              alt={ad.title}
                              className="w-full object-cover"
                              style={{ height: "140px", objectPosition: "top" }}
                              loading="lazy"
                            />
                            <div className="absolute top-1.5 left-1.5">
                              <AngleBadge angle={ad.angle} small />
                            </div>
                          </div>
                          <div className="px-2.5 py-2">
                            <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E5E3DF" }}>
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
                <Search size={32} style={{ color: "#374151" }} />
                <p className="text-sm font-mono" style={{ color: "#6B7280" }}>No examples match your filters.</p>
                <button onClick={clearAll} className="text-xs font-mono underline" style={{ color: "#3B82F6" }}>Clear all filters</button>
              </div>
            ) : (
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                }}
              >
                {filtered.map((ad, i) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    index={i}
                    onClick={() => setSelectedAd(ad)}
                  />
                ))}
              </div>
            )}
          </div>
          )}

          {/* Ad Intelligence Sources */}
          <div className="rounded-xl p-6" style={{ background: "#111113", border: "1px solid rgba(255,255,255,0.07)" }}>
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
        <AdDetailDrawer ad={selectedAd} onClose={() => setSelectedAd(null)} />
      )}

      {/* Generate Ad Panel */}
      <AnimatePresence>
        {generateOpen && (
          <GenerateAdPanel onClose={() => setGenerateOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

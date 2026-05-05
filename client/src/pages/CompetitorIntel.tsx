// ============================================================
// Competitor Intelligence Tab
// Pull active ads from any competitor's Facebook page
// via Meta Ad Library API + AI replication prompts
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import {
  Search,
  ExternalLink,
  Copy,
  CheckCheck,
  X,
  Zap,
  Layers,
  AlertCircle,
  ChevronRight,
  Eye,
  TrendingUp,
  Calendar,
  Monitor,
} from "lucide-react";

interface CompetitorAd {
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

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-1 text-[10px] rounded px-2 py-1 transition-all hover:opacity-80"
      style={{ color: copied ? "#10B981" : "#9CA3AF", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {copied ? <CheckCheck size={10} /> : <Copy size={10} />}
      {copied ? "Copied!" : (label || "Copy")}
    </button>
  );
}

function AdDetailDrawer({ ad, onClose }: { ad: CompetitorAd; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        />
        <motion.div
          className="relative ml-auto h-full overflow-y-auto flex flex-col"
          style={{ width: "min(680px, 95vw)", background: "#111113", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4" style={{ background: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-1 rounded-sm" style={{ color: "#EC4899", background: "#EC489915", border: "1px solid #EC489930" }}>
                {ad.angle}
              </span>
              <span className="text-xs font-mono" style={{ color: "#6B7280" }}>{ad.pageName}</span>
            </div>
            <button onClick={onClose} className="rounded-md p-1.5 transition-colors hover:bg-white/10" style={{ color: "#9CA3AF" }}>
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-5 p-6">
            {/* Hook */}
            <div className="rounded-md p-4" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={13} style={{ color: "#3B82F6" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#3B82F6" }}>Hook</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{ad.hook}</p>
            </div>

            {/* Ad Copy */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Layers size={13} style={{ color: "#F59E0B" }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#F59E0B" }}>Ad Copy</span>
              </div>
              {ad.headline && (
                <div className="rounded-md p-3 flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Headline</span>
                    <CopyButton text={ad.headline} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#F0EEE9" }}>{ad.headline}</p>
                </div>
              )}
              {ad.body && (
                <div className="rounded-md p-3 flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Body</span>
                    <CopyButton text={ad.body} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{ad.body}</p>
                </div>
              )}
              {ad.description && (
                <div className="rounded-md p-3 flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Description</span>
                    <CopyButton text={ad.description} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{ad.description}</p>
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye size={11} style={{ color: "#6B7280" }} />
                  <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Impressions</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#E5E3DF" }}>
                  {ad.impressionsLow === "N/A" ? "N/A" : `${Number(ad.impressionsLow).toLocaleString()}–${Number(ad.impressionsHigh).toLocaleString()}`}
                </p>
              </div>
              <div className="rounded-md p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={11} style={{ color: "#6B7280" }} />
                  <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Est. Spend</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#E5E3DF" }}>
                  {ad.spendLow === "N/A" ? "N/A" : `$${Number(ad.spendLow).toLocaleString()}–$${Number(ad.spendHigh).toLocaleString()}`}
                </p>
              </div>
              <div className="rounded-md p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar size={11} style={{ color: "#6B7280" }} />
                  <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Running Since</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#E5E3DF" }}>
                  {ad.startDate ? new Date(ad.startDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="rounded-md p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Monitor size={11} style={{ color: "#6B7280" }} />
                  <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>Platforms</span>
                </div>
                <p className="text-sm font-semibold capitalize" style={{ color: "#E5E3DF" }}>
                  {ad.platforms.join(", ") || "N/A"}
                </p>
              </div>
            </div>

            {/* Replication Prompt */}
            <div className="p-4" style={{ background: "rgba(255,92,31,0.06)", border: "1px solid rgba(255,92,31,0.2)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap size={13} style={{ color: "#FF5C1F" }} />
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "#FF5C1F" }}>Replication Prompt</span>
                </div>
                <CopyButton text={ad.replicationPrompt} label="Copy Prompt" />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{ad.replicationPrompt}</p>
            </div>

            {/* View on Meta */}
            {ad.snapshotUrl && (
              <a
                href={ad.snapshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "rgba(24,119,242,0.12)", border: "1px solid rgba(24,119,242,0.3)", color: "#60A5FA" }}
              >
                <ExternalLink size={14} />
                View on Meta Ad Library
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AdCard({ ad, index, onClick }: { ad: CompetitorAd; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="rounded-lg overflow-hidden cursor-pointer"
      style={{ background: "#161618", border: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.15)" }}
      onClick={onClick}
    >
      <div className="p-4 flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded-sm" style={{ color: "#EC4899", background: "#EC489915", border: "1px solid #EC489930" }}>
            {ad.angle}
          </span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {ad.platforms.slice(0, 2).map((p) => (
              <span key={p} className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm capitalize" style={{ color: "#6B7280", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Headline */}
        {ad.headline && (
          <p className="text-sm font-bold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
            {ad.headline}
          </p>
        )}

        {/* Body preview */}
        {ad.body && (
          <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "#9CA3AF" }}>
            {ad.body}
          </p>
        )}

        {/* Hook */}
        <div className="rounded-md px-3 py-2" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}>
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#3B82F6" }}>Hook: </span>
          <span className="text-xs" style={{ color: "#93C5FD" }}>{ad.hook}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-1.5">
            <Eye size={10} style={{ color: "#4B5563" }} />
            <span className="text-[10px] font-mono" style={{ color: "#4B5563" }}>
              {ad.impressionsLow === "N/A" ? "N/A" : `${Number(ad.impressionsLow).toLocaleString()}+ impressions`}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "#6B7280" }}>
            View Blueprint <ChevronRight size={10} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CompetitorIntel() {
  const [pageUrl, setPageUrl] = useState("");
  const [country, setCountry] = useState("US");
  const [selectedAd, setSelectedAd] = useState<CompetitorAd | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMutation = trpc.competitor.searchByPage.useMutation();

  const handleSearch = () => {
    if (!pageUrl.trim()) return;
    setHasSearched(true);
    searchMutation.mutate({
      pageIdentifier: pageUrl.trim(),
      country,
      limit: 12,
    });
  };

  const result = searchMutation.data;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
          Competitor Intelligence
        </h2>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Pull any competitor's active Meta ads. Get their copy, estimated spend, and a replication prompt for each ad.
        </p>
      </div>

      {/* Search Input */}
      <div className="rounded-xl p-5 flex flex-col gap-4" style={{ background: "#111113", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-widest" style={{ color: "#6B7280" }}>
            Facebook Page URL or Page ID
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6B7280" }} />
              <input
                type="text"
                placeholder="https://www.facebook.com/CompanyName or Page ID"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-md pl-9 pr-4 py-2.5 text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#E5E3DF" }}
              />
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-md px-3 py-2.5 text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#E5E3DF" }}
            >
              <option value="US">🇺🇸 US</option>
              <option value="CA">🇨🇦 CA</option>
              <option value="GB">🇬🇧 UK</option>
              <option value="AU">🇦🇺 AU</option>
            </select>
            <button
              onClick={handleSearch}
              disabled={searchMutation.isPending || !pageUrl.trim()}
              className="rounded-md px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50"
              style={{ background: "#1877F2", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {searchMutation.isPending ? "Pulling ads..." : "Pull Ads →"}
            </button>
          </div>
        </div>

        {/* Examples */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono" style={{ color: "#4B5563" }}>Try:</span>
          {[
            { label: "Angi", url: "https://www.facebook.com/Angi" },
            { label: "HomeAdvisor", url: "https://www.facebook.com/HomeAdvisor" },
            { label: "Thumbtack", url: "https://www.facebook.com/Thumbtack" },
          ].map((ex) => (
            <button
              key={ex.label}
              onClick={() => setPageUrl(ex.url)}
              className="text-[11px] font-mono rounded px-2 py-0.5 transition-colors hover:bg-white/8"
              style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {searchMutation.isError && (
        <div className="rounded-lg p-4 flex items-start gap-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <AlertCircle size={16} style={{ color: "#EF4444", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: "#EF4444" }}>Error pulling ads</p>
            <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{searchMutation.error.message}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4">
          {/* Summary bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
                {result.pageName}
              </span>
              <span className="text-xs font-mono ml-2" style={{ color: "#6B7280" }}>
                {result.totalFound} active ads found
              </span>
            </div>
            <a
              href={`https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${country}&search_type=page&view_all_page_id=${result.pageId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono transition-opacity hover:opacity-80"
              style={{ color: "#1877F2" }}
            >
              <ExternalLink size={11} />
              View in Meta Ad Library
            </a>
          </div>

          {/* Token required notice */}
          {result.requiresToken && (
            <div className="rounded-lg p-4" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <div className="flex items-start gap-3">
                <AlertCircle size={16} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 2 }} />
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold" style={{ color: "#F59E0B" }}>Demo Mode — Real ads require a Meta API token</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                    The cards below show example data. To pull real competitor ads, add your Meta User Access Token (with <code className="px-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#D1D5DB" }}>ads_read</code> permission) as <code className="px-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#D1D5DB" }}>META_ACCESS_TOKEN</code> in your environment secrets.
                  </p>
                  <a
                    href="https://developers.facebook.com/tools/explorer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono"
                    style={{ color: "#F59E0B" }}
                  >
                    <ExternalLink size={10} />
                    Get token from Meta Graph API Explorer
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Ad grid */}
          {result.ads.length > 0 ? (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
              {result.ads.map((ad, i) => (
                <AdCard key={ad.id} ad={ad} index={i} onClick={() => setSelectedAd(ad)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Search size={32} style={{ color: "#374151" }} />
              <p className="text-sm font-mono" style={{ color: "#6B7280" }}>No active ads found for this page.</p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!hasSearched && (
        <div className="flex flex-col items-center justify-center py-16 gap-4" style={{ border: "1px dashed rgba(255,255,255,0.07)", borderRadius: "12px" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(24,119,242,0.1)" }}>
            <Search size={20} style={{ color: "#1877F2" }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E5E3DF" }}>
              Enter any competitor's Facebook page URL
            </p>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              Pull their active ads, see estimated spend, and get AI replication prompts for each creative.
            </p>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedAd && <AdDetailDrawer ad={selectedAd} onClose={() => setSelectedAd(null)} />}
    </div>
  );
}

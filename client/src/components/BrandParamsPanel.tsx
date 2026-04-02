import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Palette, Globe, MapPin, Sun, Phone, Link2, Tag, Building2, CheckCircle2 } from "lucide-react";
import { useBrandParams, type BrandParams } from "@/hooks/useBrandParams";

const LANGUAGES = ["English", "French", "Spanish", "Portuguese", "Italian", "German", "Arabic", "Mandarin"];
const SEASONS = ["Year-round", "Spring", "Summer", "Fall", "Winter", "Holiday Season", "Back to School", "New Year"];

interface Props {
  open: boolean;
  onClose: () => void;
}

// Shared input class — explicit block display, no inherited stacking issues
const INPUT_BASE = "w-full rounded-md px-3 py-2 text-sm outline-none transition-colors";
const INPUT_STYLE: React.CSSProperties = {
  display: "block",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#E5E3DF",
  fontFamily: "'Inter', sans-serif",
};

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-lg p-4"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#4B5563" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function FieldRow({
  label,
  icon,
  token,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  token: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span style={{ color: "#6B7280", display: "flex" }}>{icon}</span>
          <span className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>
            {label}
          </span>
        </div>
        <span className="text-[10px] font-mono" style={{ color: "#374151" }}>
          {token}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function BrandParamsPanel({ open, onClose }: Props) {
  const { params, update, reset, hasParams } = useBrandParams();

  const handleChange =
    (key: keyof BrandParams) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      update({ [key]: e.target.value });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Panel — isolated stacking context */}
          <motion.div
            className="relative ml-auto flex flex-col"
            style={{
              width: "min(460px, 95vw)",
              height: "100%",
              background: "#111113",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              overflowY: "auto",
              overflowX: "hidden",
              isolation: "isolate",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* ── Header ── */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{ background: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-md p-1.5"
                  style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
                >
                  <Building2 size={14} style={{ color: "#6366F1" }} />
                </div>
                <div>
                  <h2
                    className="text-sm font-bold leading-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}
                  >
                    Brand Parameters
                  </h2>
                  <p className="text-[11px] font-mono mt-0.5" style={{ color: "#6B7280" }}>
                    Injected into every replication prompt
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  className="rounded-md p-1.5 transition-colors hover:bg-white/10"
                  style={{ color: "#6B7280" }}
                  title="Reset to defaults"
                >
                  <RotateCcw size={14} />
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

            {/* ── Body ── */}
            <div className="flex flex-col gap-4 p-5">

              {/* Active indicator */}
              {hasParams && (
                <div
                  className="flex items-center gap-2 rounded-md px-3 py-2"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <CheckCircle2 size={12} style={{ color: "#10B981" }} />
                  <span className="text-[11px] font-mono" style={{ color: "#10B981" }}>
                    Brand params active — auto-saved to browser
                  </span>
                </div>
              )}

              {/* Identity */}
              <SectionCard title="Identity">
                <FieldRow label="Brand Name" icon={<Building2 size={11} />} token="{BRAND}">
                  <input
                    className={INPUT_BASE}
                    style={INPUT_STYLE}
                    value={params.brandName}
                    onChange={handleChange("brandName")}
                    placeholder="e.g. ProClean Services"
                  />
                </FieldRow>

                <FieldRow label="Tagline" icon={<Tag size={11} />} token="{TAGLINE}">
                  <input
                    className={INPUT_BASE}
                    style={INPUT_STYLE}
                    value={params.tagline}
                    onChange={handleChange("tagline")}
                    placeholder="e.g. Montreal's Most Trusted Cleaners"
                  />
                </FieldRow>

                <FieldRow label="Logo URL" icon={<Link2 size={11} />} token="{LOGO}">
                  <input
                    className={INPUT_BASE}
                    style={INPUT_STYLE}
                    value={params.logoUrl}
                    onChange={handleChange("logoUrl")}
                    placeholder="https://..."
                  />
                  {params.logoUrl && (
                    <div className="mt-2">
                      <img
                        src={params.logoUrl}
                        alt="Logo preview"
                        className="rounded-md object-contain"
                        style={{ height: 36, maxWidth: 100, background: "rgba(255,255,255,0.06)", padding: 4 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  )}
                </FieldRow>
              </SectionCard>

              {/* Colors */}
              <SectionCard title="Colors">
                <div className="grid grid-cols-2 gap-4">
                  <FieldRow label="Primary" icon={<Palette size={11} />} token="{PRIMARY_COLOR}">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={params.primaryColor}
                        onChange={handleChange("primaryColor")}
                        className="rounded cursor-pointer flex-shrink-0"
                        style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", padding: 2 }}
                      />
                      <input
                        className={INPUT_BASE}
                        style={{ ...INPUT_STYLE, flex: 1 }}
                        value={params.primaryColor}
                        onChange={handleChange("primaryColor")}
                        placeholder="#6366F1"
                      />
                    </div>
                  </FieldRow>

                  <FieldRow label="Secondary" icon={<Palette size={11} />} token="{SECONDARY_COLOR}">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={params.secondaryColor}
                        onChange={handleChange("secondaryColor")}
                        className="rounded cursor-pointer flex-shrink-0"
                        style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", padding: 2 }}
                      />
                      <input
                        className={INPUT_BASE}
                        style={{ ...INPUT_STYLE, flex: 1 }}
                        value={params.secondaryColor}
                        onChange={handleChange("secondaryColor")}
                        placeholder="#F59E0B"
                      />
                    </div>
                  </FieldRow>
                </div>
              </SectionCard>

              {/* Campaign Context */}
              <SectionCard title="Campaign Context">
                <FieldRow label="Language" icon={<Globe size={11} />} token="{LANGUAGE}">
                  <select
                    className={INPUT_BASE}
                    style={{ ...INPUT_STYLE, cursor: "pointer" }}
                    value={params.language}
                    onChange={handleChange("language")}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l} style={{ background: "#1a1a1c" }}>{l}</option>
                    ))}
                  </select>
                </FieldRow>

                <FieldRow label="Location / Market" icon={<MapPin size={11} />} token="{LOCATION}">
                  <input
                    className={INPUT_BASE}
                    style={INPUT_STYLE}
                    value={params.location}
                    onChange={handleChange("location")}
                    placeholder="e.g. Montreal, QC"
                  />
                </FieldRow>

                <FieldRow label="Season / Timing" icon={<Sun size={11} />} token="{SEASON}">
                  <select
                    className={INPUT_BASE}
                    style={{ ...INPUT_STYLE, cursor: "pointer" }}
                    value={params.season}
                    onChange={handleChange("season")}
                  >
                    {SEASONS.map((s) => (
                      <option key={s} value={s} style={{ background: "#1a1a1c" }}>{s}</option>
                    ))}
                  </select>
                </FieldRow>
              </SectionCard>

              {/* Contact / CTA */}
              <SectionCard title="Contact / CTA">
                <FieldRow label="Phone" icon={<Phone size={11} />} token="{PHONE}">
                  <input
                    className={INPUT_BASE}
                    style={INPUT_STYLE}
                    value={params.phone}
                    onChange={handleChange("phone")}
                    placeholder="e.g. (514) 555-0123"
                  />
                </FieldRow>

                <FieldRow label="Website" icon={<Link2 size={11} />} token="{WEBSITE}">
                  <input
                    className={INPUT_BASE}
                    style={INPUT_STYLE}
                    value={params.website}
                    onChange={handleChange("website")}
                    placeholder="e.g. proclean.ca"
                  />
                </FieldRow>
              </SectionCard>

              {/* Token reference */}
              <div
                className="rounded-lg p-4"
                style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
              >
                <p
                  className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-3"
                  style={{ color: "#6366F1" }}
                >
                  Available Tokens
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {["{BRAND}", "{TAGLINE}", "{LOGO}", "{PRIMARY_COLOR}", "{SECONDARY_COLOR}", "{LANGUAGE}", "{LOCATION}", "{SEASON}", "{PHONE}", "{WEBSITE}"].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono rounded px-2 py-1 text-center"
                      style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] font-mono mt-3" style={{ color: "#4B5563" }}>
                  Use these tokens in any replication prompt — they'll be replaced with your brand values.
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

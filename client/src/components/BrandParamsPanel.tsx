import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Palette, Globe, MapPin, Sun, Phone, Link2, Tag, Building2, CheckCircle2 } from "lucide-react";
import { useBrandParams, type BrandParams } from "@/hooks/useBrandParams";

const LANGUAGES = ["English", "French", "Spanish", "Portuguese", "Italian", "German", "Arabic", "Mandarin"];
const SEASONS = ["Year-round", "Spring", "Summer", "Fall", "Winter", "Holiday Season", "Back to School", "New Year"];

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, icon, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <span style={{ color: "#6B7280" }}>{icon}</span>
        <label className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#6B7280" }}>
          {label}
        </label>
      </div>
      {children}
      {hint && <p className="text-[10px] font-mono" style={{ color: "#4B5563" }}>{hint}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#E5E3DF",
  borderRadius: 6,
  padding: "8px 12px",
  fontSize: 13,
  width: "100%",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BrandParamsPanel({ open, onClose }: Props) {
  const { params, update, reset, hasParams } = useBrandParams();

  const set = (key: keyof BrandParams) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    update({ [key]: e.target.value });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Panel */}
          <motion.div
            className="relative ml-auto h-full overflow-y-auto flex flex-col"
            style={{
              width: "min(480px, 95vw)",
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
              className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
              style={{ background: "#111113", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-md p-1.5" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
                  <Building2 size={14} style={{ color: "#6366F1" }} />
                </div>
                <div>
                  <h2 className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0EEE9" }}>
                    Brand Parameters
                  </h2>
                  <p className="text-[11px] font-mono" style={{ color: "#6B7280" }}>
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

            {/* Saved indicator */}
            {hasParams && (
              <div className="mx-5 mt-4 flex items-center gap-2 rounded-md px-3 py-2" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <CheckCircle2 size={12} style={{ color: "#10B981" }} />
                <span className="text-[11px] font-mono" style={{ color: "#10B981" }}>
                  Brand params active — auto-saved to browser
                </span>
              </div>
            )}

            {/* Fields */}
            <div className="flex flex-col gap-5 p-5">

              {/* Identity */}
              <div className="flex flex-col gap-4 rounded-lg p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#4B5563" }}>Identity</p>

                <Field label="Brand Name" icon={<Building2 size={11} />} hint="Token: {BRAND}">
                  <input style={inputStyle} value={params.brandName} onChange={set("brandName")} placeholder="e.g. ProClean Services" />
                </Field>

                <Field label="Tagline" icon={<Tag size={11} />} hint="Token: {TAGLINE}">
                  <input style={inputStyle} value={params.tagline} onChange={set("tagline")} placeholder="e.g. Montreal's Most Trusted Cleaners" />
                </Field>

                <Field label="Logo URL" icon={<Link2 size={11} />} hint="Token: {LOGO}">
                  <input style={inputStyle} value={params.logoUrl} onChange={set("logoUrl")} placeholder="https://..." />
                  {params.logoUrl && (
                    <img
                      src={params.logoUrl}
                      alt="Logo preview"
                      className="mt-1 rounded-md object-contain"
                      style={{ height: 40, maxWidth: 120, background: "rgba(255,255,255,0.06)", padding: 4 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  )}
                </Field>
              </div>

              {/* Colors */}
              <div className="flex flex-col gap-4 rounded-lg p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#4B5563" }}>Colors</p>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Primary Color" icon={<Palette size={11} />} hint="Token: {PRIMARY_COLOR}">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={params.primaryColor}
                        onChange={set("primaryColor")}
                        className="rounded cursor-pointer"
                        style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", padding: 2 }}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        value={params.primaryColor}
                        onChange={set("primaryColor")}
                        placeholder="#6366F1"
                      />
                    </div>
                  </Field>

                  <Field label="Secondary Color" icon={<Palette size={11} />} hint="Token: {SECONDARY_COLOR}">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={params.secondaryColor}
                        onChange={set("secondaryColor")}
                        className="rounded cursor-pointer"
                        style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", padding: 2 }}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        value={params.secondaryColor}
                        onChange={set("secondaryColor")}
                        placeholder="#F59E0B"
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* Context */}
              <div className="flex flex-col gap-4 rounded-lg p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#4B5563" }}>Campaign Context</p>

                <Field label="Language" icon={<Globe size={11} />} hint="Token: {LANGUAGE}">
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={params.language} onChange={set("language")}>
                    {LANGUAGES.map((l) => <option key={l} value={l} style={{ background: "#1a1a1c" }}>{l}</option>)}
                  </select>
                </Field>

                <Field label="Location / Market" icon={<MapPin size={11} />} hint="Token: {LOCATION}">
                  <input style={inputStyle} value={params.location} onChange={set("location")} placeholder="e.g. Montreal, QC" />
                </Field>

                <Field label="Season / Timing" icon={<Sun size={11} />} hint="Token: {SEASON}">
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={params.season} onChange={set("season")}>
                    {SEASONS.map((s) => <option key={s} value={s} style={{ background: "#1a1a1c" }}>{s}</option>)}
                  </select>
                </Field>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-4 rounded-lg p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: "#4B5563" }}>Contact / CTA</p>

                <Field label="Phone" icon={<Phone size={11} />} hint="Token: {PHONE}">
                  <input style={inputStyle} value={params.phone} onChange={set("phone")} placeholder="e.g. (514) 555-0123" />
                </Field>

                <Field label="Website" icon={<Link2 size={11} />} hint="Token: {WEBSITE}">
                  <input style={inputStyle} value={params.website} onChange={set("website")} placeholder="e.g. proclean.ca" />
                </Field>
              </div>

              {/* Token reference */}
              <div className="rounded-lg p-4" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <p className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-2" style={{ color: "#6366F1" }}>Available Tokens</p>
                <div className="grid grid-cols-2 gap-1">
                  {["{BRAND}", "{TAGLINE}", "{LOGO}", "{PRIMARY_COLOR}", "{SECONDARY_COLOR}", "{LANGUAGE}", "{LOCATION}", "{SEASON}", "{PHONE}", "{WEBSITE}"].map((t) => (
                    <span key={t} className="text-[11px] font-mono rounded px-1.5 py-0.5" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] font-mono mt-2" style={{ color: "#4B5563" }}>
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

import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Palette, Globe, MapPin, Sun, Phone, Link2, Tag, Building2, CheckCircle2 } from "lucide-react";
import { useBrandParams, type BrandParams } from "@/hooks/useBrandParams";

const LANGUAGES = ["English", "French", "Spanish", "Portuguese", "Italian", "German", "Arabic", "Mandarin"];
const SEASONS = ["Year-round", "Spring", "Summer", "Fall", "Winter", "Holiday Season", "Back to School", "New Year"];

// ── Shared style objects ──────────────────────────────────────

const panelStyle: React.CSSProperties = {
  position: "relative",
  marginLeft: "auto",
  width: "min(460px, 95vw)",
  height: "100%",
  background: "#111113",
  borderLeft: "1px solid rgba(255,255,255,0.08)",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
};

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  background: "#111113",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
  flexShrink: 0,
};

const bodyStyle: React.CSSProperties = {
  padding: 20,
  display: "block", // NOT flex — plain block so children stack naturally
};

const sectionStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
};

const sectionTitleStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 600,
  color: "#4B5563",
  marginBottom: 16,
};

const fieldStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 14,
};

const fieldHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 6,
};

const fieldLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: 11,
  fontFamily: "monospace",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 600,
  color: "#6B7280",
};

const tokenBadgeStyle: React.CSSProperties = {
  fontSize: 10,
  fontFamily: "monospace",
  color: "#374151",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 6,
  padding: "8px 12px",
  fontSize: 13,
  color: "#E5E3DF",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "auto",
};

interface Props {
  open: boolean;
  onClose: () => void;
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
          style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Panel */}
          <motion.div
            style={panelStyle}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* ── Header ── */}
            <div style={headerStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 6, padding: 6, display: "flex" }}>
                  <Building2 size={14} style={{ color: "#6366F1" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#F0EEE9", lineHeight: 1 }}>
                    Brand Parameters
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#6B7280", marginTop: 3 }}>
                    Injected into every replication prompt
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  onClick={reset}
                  title="Reset to defaults"
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: "#6B7280", display: "flex" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={onClose}
                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: "#9CA3AF", display: "flex" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div style={bodyStyle}>

              {/* Active indicator */}
              {hasParams && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 6, padding: "8px 12px", marginBottom: 16 }}>
                  <CheckCircle2 size={12} style={{ color: "#10B981", flexShrink: 0 }} />
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "#10B981" }}>
                    Brand params active — auto-saved to browser
                  </span>
                </div>
              )}

              {/* ── IDENTITY ── */}
              <div style={sectionStyle}>
                <span style={sectionTitleStyle}>Identity</span>

                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Building2 size={11} />Brand Name</div>
                    <span style={tokenBadgeStyle}>{"{BRAND}"}</span>
                  </div>
                  <input style={inputStyle} value={params.brandName} onChange={handleChange("brandName")} placeholder="e.g. ProClean Services" />
                </div>

                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Tag size={11} />Tagline</div>
                    <span style={tokenBadgeStyle}>{"{TAGLINE}"}</span>
                  </div>
                  <input style={inputStyle} value={params.tagline} onChange={handleChange("tagline")} placeholder="e.g. Montreal's Most Trusted Cleaners" />
                </div>

                <div style={{ ...fieldStyle, marginBottom: 0 }}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Link2 size={11} />Logo URL</div>
                    <span style={tokenBadgeStyle}>{"{LOGO}"}</span>
                  </div>
                  <input style={inputStyle} value={params.logoUrl} onChange={handleChange("logoUrl")} placeholder="https://..." />
                  {params.logoUrl && (
                    <div style={{ marginTop: 8 }}>
                      <img
                        src={params.logoUrl}
                        alt="Logo preview"
                        style={{ height: 36, maxWidth: 100, background: "rgba(255,255,255,0.06)", padding: 4, borderRadius: 4, objectFit: "contain" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ── COLORS ── */}
              <div style={sectionStyle}>
                <span style={sectionTitleStyle}>Colors</span>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <div style={fieldHeaderStyle}>
                      <div style={fieldLabelStyle}><Palette size={11} />Primary</div>
                      <span style={tokenBadgeStyle}>{"{PRIMARY_COLOR}"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="color"
                        value={params.primaryColor}
                        onChange={handleChange("primaryColor")}
                        style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", padding: 2, borderRadius: 4, cursor: "pointer", flexShrink: 0 }}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                        value={params.primaryColor}
                        onChange={handleChange("primaryColor")}
                        placeholder="#6366F1"
                      />
                    </div>
                  </div>

                  <div>
                    <div style={fieldHeaderStyle}>
                      <div style={fieldLabelStyle}><Palette size={11} />Secondary</div>
                      <span style={tokenBadgeStyle}>{"{SECONDARY_COLOR}"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="color"
                        value={params.secondaryColor}
                        onChange={handleChange("secondaryColor")}
                        style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", padding: 2, borderRadius: 4, cursor: "pointer", flexShrink: 0 }}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                        value={params.secondaryColor}
                        onChange={handleChange("secondaryColor")}
                        placeholder="#F59E0B"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CAMPAIGN CONTEXT ── */}
              <div style={sectionStyle}>
                <span style={sectionTitleStyle}>Campaign Context</span>

                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Globe size={11} />Language</div>
                    <span style={tokenBadgeStyle}>{"{LANGUAGE}"}</span>
                  </div>
                  <select style={selectStyle} value={params.language} onChange={handleChange("language")}>
                    {LANGUAGES.map((l) => <option key={l} value={l} style={{ background: "#1a1a1c" }}>{l}</option>)}
                  </select>
                </div>

                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><MapPin size={11} />Location / Market</div>
                    <span style={tokenBadgeStyle}>{"{LOCATION}"}</span>
                  </div>
                  <input style={inputStyle} value={params.location} onChange={handleChange("location")} placeholder="e.g. Montreal, QC" />
                </div>

                <div style={{ ...fieldStyle, marginBottom: 0 }}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Sun size={11} />Season / Timing</div>
                    <span style={tokenBadgeStyle}>{"{SEASON}"}</span>
                  </div>
                  <select style={selectStyle} value={params.season} onChange={handleChange("season")}>
                    {SEASONS.map((s) => <option key={s} value={s} style={{ background: "#1a1a1c" }}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* ── CONTACT / CTA ── */}
              <div style={sectionStyle}>
                <span style={sectionTitleStyle}>Contact / CTA</span>

                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Phone size={11} />Phone</div>
                    <span style={tokenBadgeStyle}>{"{PHONE}"}</span>
                  </div>
                  <input style={inputStyle} value={params.phone} onChange={handleChange("phone")} placeholder="e.g. (514) 555-0123" />
                </div>

                <div style={{ ...fieldStyle, marginBottom: 0 }}>
                  <div style={fieldHeaderStyle}>
                    <div style={fieldLabelStyle}><Link2 size={11} />Website</div>
                    <span style={tokenBadgeStyle}>{"{WEBSITE}"}</span>
                  </div>
                  <input style={inputStyle} value={params.website} onChange={handleChange("website")} placeholder="e.g. proclean.ca" />
                </div>
              </div>

              {/* ── TOKEN REFERENCE ── */}
              <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "#6366F1", marginBottom: 12 }}>
                  Available Tokens
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["{BRAND}", "{TAGLINE}", "{LOGO}", "{PRIMARY_COLOR}", "{SECONDARY_COLOR}", "{LANGUAGE}", "{LOCATION}", "{SEASON}", "{PHONE}", "{WEBSITE}"].map((t) => (
                    <div
                      key={t}
                      style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 4, padding: "4px 8px", fontFamily: "monospace", fontSize: 11, color: "#818CF8", textAlign: "center" }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4B5563", marginTop: 12 }}>
                  Use these tokens in any replication prompt — they'll be replaced with your brand values.
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

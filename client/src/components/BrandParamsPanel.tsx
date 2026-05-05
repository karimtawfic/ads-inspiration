import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCcw, Palette, Globe, MapPin, Sun, Phone, Link2, Tag, Building2, CheckCircle2, Plus, Pencil, Trash2, ChevronDown, Users, Check } from "lucide-react";
import { useBrandParams, type BrandParams } from "@/hooks/useBrandParams";
import { useClientProfiles } from "@/hooks/useClientProfiles";

const LANGUAGES = ["English", "French", "Spanish", "Portuguese", "Italian", "German", "Arabic", "Mandarin"];
const SEASONS = ["Year-round", "Spring", "Summer", "Fall", "Winter", "Holiday Season", "Back to School", "New Year"];

// ── Shared style objects ──────────────────────────────────────

const panelStyle: React.CSSProperties = {
  position: "relative",
  marginLeft: "auto",
  width: "min(480px, 95vw)",
  height: "100%",
  background: "#E8E5DF",
  borderLeft: "1px solid rgba(22,22,26,0.1)",
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
  background: "#E8E5DF",
  borderBottom: "1px solid rgba(22,22,26,0.08)",
  flexShrink: 0,
};

const bodyStyle: React.CSSProperties = {
  padding: 20,
  display: "block",
};

const sectionStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(22,22,26,0.08)",
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
  color: "#6B6B75",
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
  color: "#6B6B75",
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
  background: "rgba(22,22,26,0.05)",
  border: "1px solid rgba(22,22,26,0.1)",
  borderRadius: 6,
  padding: "8px 12px",
  fontSize: 13,
  color: "#16161A",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "auto",
};

const btnBase: React.CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 6,
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BrandParamsPanel({ open, onClose }: Props) {
  const { params, update, loadProfile, reset, hasParams } = useBrandParams();
  const {
    profiles,
    activeId,
    activeProfile,
    createProfile,
    renameProfile,
    deleteProfile,
    switchProfile,
    syncActiveProfile,
  } = useClientProfiles();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [newProfileName, setNewProfileName] = useState("");
  const [addingNew, setAddingNew] = useState(false);

  // When a brand field changes: update the singleton store AND sync to active profile
  const handleChange = useCallback(
    (key: keyof BrandParams) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const patch = { [key]: e.target.value };
        update(patch);
        syncActiveProfile({ ...params, ...patch });
      },
    [update, syncActiveProfile, params]
  );

  // Switch to a profile: full replace (not merge) to avoid stale fields
  const handleSwitchProfile = useCallback(
    (id: string) => {
      const loaded = switchProfile(id);
      if (loaded) {
        loadProfile(loaded); // full replace — clears stale fields from previous profile
      }
      setProfileDropdownOpen(false);
    },
    [switchProfile, loadProfile]
  );

  // Save current params as a new profile
  const handleCreateProfile = useCallback(() => {
    const name = newProfileName.trim() || "New Client";
    createProfile(name, params);
    setNewProfileName("");
    setAddingNew(false);
  }, [createProfile, params, newProfileName]);

  // Rename commit
  const handleRenameCommit = useCallback(
    (id: string) => {
      if (renameValue.trim()) renameProfile(id, renameValue.trim());
      setRenamingId(null);
      setRenameValue("");
    },
    [renameProfile, renameValue]
  );

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
                <div style={{ background: "rgba(255,92,31,0.15)", border: "1px solid rgba(255,92,31,0.25)", borderRadius: 6, padding: 6, display: "flex" }}>
                  <Building2 size={14} style={{ color: "#FF5C1F" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#16161A", lineHeight: 1 }}>
                    Brand Parameters
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B75", marginTop: 3 }}>
                    Injected into every replication prompt
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  onClick={reset}
                  title="Reset to defaults"
                  style={{ ...btnBase, color: "#6B6B75" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(22,22,26,0.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={onClose}
                  style={{ ...btnBase, color: "#6B6B75" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(22,22,26,0.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div style={bodyStyle}>

              {/* ── CLIENT PROFILES ── */}
              <div style={{ ...sectionStyle, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Users size={12} style={{ color: "#6B6B75" }} />
                    <span style={sectionTitleStyle as React.CSSProperties & { marginBottom: 0 }}>Client Profiles</span>
                  </div>
                  <button
                    onClick={() => setAddingNew((v) => !v)}
                    title="Save current params as new profile"
                    style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,92,31,0.12)", border: "1px solid rgba(255,92,31,0.25)", borderRadius: 5, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontFamily: "monospace", color: "#FF5C1F" }}
                  >
                    <Plus size={11} />
                    Save as Profile
                  </button>
                </div>

                {/* New profile input */}
                {addingNew && (
                  <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                    <input
                      autoFocus
                      style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder="Client name (e.g. ProClean Montreal)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreateProfile();
                        if (e.key === "Escape") setAddingNew(false);
                      }}
                    />
                    <button
                      onClick={handleCreateProfile}
                      style={{ background: "#FF5C1F", border: "none", borderRadius: 6, padding: "0 12px", cursor: "pointer", color: "#fff", fontSize: 12, fontFamily: "monospace", fontWeight: 600, flexShrink: 0 }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setAddingNew(false)}
                      style={{ ...btnBase, color: "#6B6B75", border: "1px solid rgba(22,22,26,0.1)", flexShrink: 0 }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}

                {/* Profile list */}
                {profiles.length === 0 ? (
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B75", textAlign: "center", padding: "12px 0" }}>
                    No profiles yet — fill in your brand details and click "Save as Profile"
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: profile.id === activeId ? "rgba(255,92,31,0.1)" : "rgba(22,22,26,0.03)",
                          border: `1px solid ${profile.id === activeId ? "rgba(255,92,31,0.35)" : "rgba(22,22,26,0.08)"}`,
                          borderRadius: 6,
                          padding: "8px 10px",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                        onClick={() => handleSwitchProfile(profile.id)}
                      >
                        {/* Active indicator */}
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: profile.id === activeId ? "#FF5C1F" : "rgba(22,22,26,0.15)", flexShrink: 0 }} />

                        {/* Name (or rename input) */}
                        {renamingId === profile.id ? (
                          <input
                            autoFocus
                            style={{ ...inputStyle, flex: 1, minWidth: 0, padding: "4px 8px", fontSize: 12 }}
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              if (e.key === "Enter") handleRenameCommit(profile.id);
                              if (e.key === "Escape") { setRenamingId(null); setRenameValue(""); }
                            }}
                          />
                        ) : (
                          <span style={{ flex: 1, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: profile.id === activeId ? 600 : 400, color: profile.id === activeId ? "#16161A" : "#6B6B75", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {profile.name}
                          </span>
                        )}

                        {/* Active check */}
                        {profile.id === activeId && renamingId !== profile.id && (
                          <Check size={12} style={{ color: "#FF5C1F", flexShrink: 0 }} />
                        )}

                        {/* Rename commit button */}
                        {renamingId === profile.id && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleRenameCommit(profile.id); }}
                            style={{ ...btnBase, background: "#FF5C1F", color: "#fff", padding: "3px 8px", fontSize: 11, fontFamily: "monospace", borderRadius: 4, flexShrink: 0 }}
                          >
                            OK
                          </button>
                        )}

                        {/* Action buttons (rename / delete) */}
                        {renamingId !== profile.id && (
                          <div style={{ display: "flex", gap: 2, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                            <button
                              title="Rename"
                              onClick={(e) => { e.stopPropagation(); setRenamingId(profile.id); setRenameValue(profile.name); }}
                              style={{ ...btnBase, color: "#6B6B75", padding: 4 }}
                              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(22,22,26,0.1)")}
                              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              <Pencil size={11} />
                            </button>
                            <button
                              title="Delete"
                              onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }}
                              style={{ ...btnBase, color: "#6B6B75", padding: 4 }}
                              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#EF4444"; }}
                              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6B6B75"; }}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Active profile indicator */}
                {activeProfile && (
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 10, color: "#FF5C1F" }}>
                    <CheckCircle2 size={10} />
                    Editing: <strong>{activeProfile.name}</strong>
                  </div>
                )}
              </div>

              {/* Active params indicator */}
              {hasParams && !activeProfile && (
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
                        style={{ height: 36, maxWidth: 100, background: "rgba(22,22,26,0.06)", padding: 4, borderRadius: 4, objectFit: "contain" }}
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
                        style={{ width: 34, height: 34, border: "1px solid rgba(22,22,26,0.1)", background: "transparent", padding: 2, borderRadius: 4, cursor: "pointer", flexShrink: 0 }}
                      />
                      <input
                        style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                        value={params.primaryColor}
                        onChange={handleChange("primaryColor")}
                        placeholder="#FF5C1F"
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
                        style={{ width: 34, height: 34, border: "1px solid rgba(22,22,26,0.1)", background: "transparent", padding: 2, borderRadius: 4, cursor: "pointer", flexShrink: 0 }}
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
              <div style={{ background: "rgba(255,92,31,0.06)", border: "1px solid rgba(255,92,31,0.15)", borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "#FF5C1F", marginBottom: 12 }}>
                  Available Tokens
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["{BRAND}", "{TAGLINE}", "{LOGO}", "{PRIMARY_COLOR}", "{SECONDARY_COLOR}", "{LANGUAGE}", "{LOCATION}", "{SEASON}", "{PHONE}", "{WEBSITE}"].map((t) => (
                    <div
                      key={t}
                      style={{ background: "rgba(255,92,31,0.1)", border: "1px solid rgba(255,92,31,0.2)", borderRadius: 4, padding: "4px 8px", fontFamily: "monospace", fontSize: 11, color: "#FF5C1F", textAlign: "center" }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B75", marginTop: 12 }}>
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

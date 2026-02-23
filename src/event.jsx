import { useState } from "react";

const TABS = ["Corporate Event", "Club Gigs", "Inbase Concerts"];

const FEATURED = {
  date: "24 Jan • 2024",
  title: "Siempre Son Flores™ Musica Cubana Salsa Jazz adipi",
  location: "138 W. 46nd Street, New York",
  badge: "Upcoming Event",
  gradient: "linear-gradient(135deg, #0a0f3c 0%, #1a0a3c 40%, #0d1f5c 100%)",
};

const EVENTS = [
  {
    id: 1,
    date: "24 Jan • 2024",
    time: "10:00 AM — 2:00 PM",
    title: "Siempre Son Flores™ Musica Cubana Salsa Jazz adipi scing elit. Nullam",
    location: "138 W. 46nd Street, New York",
    color: "#00d4ff",
  },
  {
    id: 2,
    date: "24 Jan • 2024",
    time: "01:00 AM — 2:00 PM",
    title: "Siempre Son Flores™ Musica Cubana Salsa Jazz adipi scing elit. Nullam",
    location: "138 W. 46nd Street, New York",
    color: "#a855f7",
  },
  {
    id: 3,
    date: "24 Jan • 2024",
    time: "10:00 AM — 2:00 PM",
    title: "Siempre Son Flores™ Musica Cubana Salsa Jazz adipi scing elit. Nullam",
    location: "138 W. 46nd Street, New York",
    color: "#00d4ff",
  },
];

// Sci-fi grid background
function GridBg() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0,
    }}>
      {/* Grid lines */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#0a1aff", filter: "blur(120px)", opacity: 0.12, top: "10%", left: "-10%", animation: "orb1 12s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "#7c3aed", filter: "blur(100px)", opacity: 0.1, top: "40%", right: "-5%", animation: "orb2 15s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "#00d4ff", filter: "blur(100px)", opacity: 0.08, bottom: "10%", left: "40%", animation: "orb1 10s ease-in-out infinite 3s" }} />
    </div>
  );
}

// Scanline overlay
function Scanlines() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)",
    }} />
  );
}

function FeaturedCard({ featuredIndex, onPrev, onNext }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      background: FEATURED.gradient,
      border: "1px solid rgba(0,212,255,0.25)",
      boxShadow: "0 0 40px rgba(0,212,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
      marginBottom: "32px",
      minHeight: "220px",
    }}>
      {/* Sci-fi circuit lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 600 220" preserveAspectRatio="none">
        <path d="M0 110 L100 110 L120 90 L300 90 L320 110 L600 110" stroke="#00d4ff" strokeWidth="1" fill="none" />
        <path d="M0 150 L80 150 L100 130 L200 130" stroke="#7c3aed" strokeWidth="0.8" fill="none" />
        <circle cx="320" cy="110" r="4" fill="#00d4ff" opacity="0.6" />
        <circle cx="120" cy="90" r="3" fill="#7c3aed" opacity="0.6" />
        <path d="M500 0 L500 50 L550 50" stroke="#00d4ff" strokeWidth="0.7" fill="none" />
        <path d="M450 220 L450 180 L600 180" stroke="#7c3aed" strokeWidth="0.7" fill="none" />
      </svg>

      {/* Corner brackets */}
      {[["top:8px","left:8px","borderTop","borderLeft"],["top:8px","right:8px","borderTop","borderRight"],["bottom:8px","left:8px","borderBottom","borderLeft"],["bottom:8px","right:8px","borderBottom","borderRight"]].map((c, i) => {
        const pos = {};
        c[0].split(":").reduce((_, v, idx, arr) => idx === 0 ? (pos[arr[0]] = arr[1]) : null, null);
        c.slice(0,2).forEach(s => { const [k,v] = s.split(":"); pos[k] = v; });
        return (
          <div key={i} style={{
            position: "absolute",
            [c[0].split(":")[0]]: c[0].split(":")[1],
            [c[1].split(":")[0]]: c[1].split(":")[1],
            width: 20, height: 20,
            [c[2]]: "1.5px solid rgba(0,212,255,0.8)",
            [c[3]]: "1.5px solid rgba(0,212,255,0.8)",
          }} />
        );
      })}

      {/* Badge */}
      <div style={{
        position: "absolute", top: 20, left: 20,
        background: "rgba(0,212,255,0.15)",
        border: "1px solid rgba(0,212,255,0.4)",
        borderRadius: "20px",
        padding: "4px 12px",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", color: "#00d4ff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Upcoming Event
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "60px 24px 24px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="10" height="10" rx="1" stroke="#00d4ff" strokeWidth="1" />
            <line x1="1" y1="4" x2="11" y2="4" stroke="#00d4ff" strokeWidth="1" />
            <line x1="4" y1="1" x2="4" y2="4" stroke="#00d4ff" strokeWidth="1" />
            <line x1="8" y1="1" x2="8" y2="4" stroke="#00d4ff" strokeWidth="1" />
          </svg>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.72rem", color: "rgba(0,212,255,0.8)", letterSpacing: "0.08em" }}>
            {FEATURED.date}
          </span>
        </div>

        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          fontWeight: 700, color: "#fff",
          margin: "0 0 12px",
          lineHeight: 1.4,
          textShadow: "0 0 20px rgba(0,212,255,0.3)",
          maxWidth: "400px",
        }}>
          {FEATURED.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 0C2.24 0 0 2.24 0 5C0 8.75 5 12 5 12C5 12 10 8.75 10 5C10 2.24 7.76 0 5 0ZM5 6.5C4.17 6.5 3.5 5.83 3.5 5C3.5 4.17 4.17 3.5 5 3.5C5.83 3.5 6.5 4.17 6.5 5C6.5 5.83 5.83 6.5 5 6.5Z" fill="rgba(0,212,255,0.6)" />
          </svg>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
            {FEATURED.location}
          </span>
        </div>
      </div>

      {/* Nav arrows */}
      <div style={{ display: "flex", gap: "8px", position: "absolute", bottom: 20, right: 20, zIndex: 2 }}>
        {["←", "→"].map((arrow, i) => (
          <button key={i} onClick={i === 0 ? onPrev : onNext} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff", fontSize: "0.85rem",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; }}
          >{arrow}</button>
        ))}
      </div>
    </div>
  );
}

function EventRow({ event }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: "16px", alignItems: "center",
        padding: "14px 16px",
        borderRadius: "12px",
        background: hov ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.06)"}`,
        marginBottom: "12px",
        transition: "all 0.25s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left glow accent */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px",
        background: `linear-gradient(to bottom, transparent, ${event.color}, transparent)`,
        opacity: hov ? 1 : 0.4,
        transition: "opacity 0.25s",
      }} />

      {/* Image placeholder */}
      <div style={{
        width: 90, height: 68, borderRadius: "8px", flexShrink: 0,
        background: `linear-gradient(135deg, #0d1f4c, #1a0a3c)`,
        border: `1px solid rgba(0,212,255,0.15)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", position: "relative",
      }}>
        {/* Sci-fi placeholder pattern */}
        <svg width="100%" height="100%" viewBox="0 0 90 68" style={{ opacity: 0.4 }}>
          <rect width="90" height="68" fill="url(#imgGrid)" />
          <defs>
            <pattern id="imgGrid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M 15 0 L 0 0 0 15" fill="none" stroke={event.color} strokeWidth="0.4" />
            </pattern>
          </defs>
          <circle cx="45" cy="34" r="14" stroke={event.color} strokeWidth="1" fill="none" opacity="0.6" />
          <line x1="31" y1="34" x2="59" y2="34" stroke={event.color} strokeWidth="0.8" opacity="0.4" />
          <line x1="45" y1="20" x2="45" y2="48" stroke={event.color} strokeWidth="0.8" opacity="0.4" />
        </svg>
        <span style={{ position: "absolute", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.5rem", color: event.color, letterSpacing: "0.1em", opacity: 0.7 }}>IMG</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", color: "rgba(0,212,255,0.7)", letterSpacing: "0.08em" }}>
            📅 {event.date}
          </span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            🕙 {event.time}
          </span>
        </div>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.72rem", fontWeight: 600,
          color: hov ? "#fff" : "rgba(255,255,255,0.82)",
          margin: "0 0 6px", lineHeight: 1.5,
          transition: "color 0.2s",
        }}>
          {event.title}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>📍</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
            {event.location}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", flexShrink: 0 }}>
        <button style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.65rem", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "6px 14px",
          background: hov ? `rgba(0,212,255,0.2)` : "transparent",
          border: `1px solid ${event.color}`,
          borderRadius: "6px",
          color: event.color,
          cursor: "pointer",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
        }}>
          Buy Tickets
        </button>
        {/* Speaker avatars */}
        <div style={{ display: "flex" }}>
          {[0,1,2].map(j => (
            <div key={j} style={{
              width: 22, height: 22, borderRadius: "50%",
              background: `hsl(${200 + j * 40}, 60%, 35%)`,
              border: "1.5px solid #0a0f1e",
              marginLeft: j === 0 ? 0 : -6,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.45rem", color: "rgba(255,255,255,0.7)",
              fontFamily: "'Cinzel', serif",
            }}>
              {String.fromCharCode(65 + j)}
            </div>
          ))}
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", marginLeft: "6px", alignSelf: "center" }}>
            Speakers
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 30% 20%, #060d1f 0%, #03050a 100%)",
      position: "relative",
      overflow: "hidden",
      padding: "60px 0",
    }}>
      <GridBg />
      <Scanlines />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── TITLE ── */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          {/* Sci-fi title decoration */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "8px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.4))" }} />
            <div style={{ width: 6, height: 6, background: "#00d4ff", transform: "rotate(45deg)", boxShadow: "0 0 8px #00d4ff" }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.4))" }} />
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900, color: "#fff",
            margin: 0, letterSpacing: "0.35em",
            textShadow: "0 0 30px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)",
            position: "relative",
          }}>
            EVENTS
            {/* Glitch underline */}
            <div style={{
              position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)",
              width: "60%", height: "1px",
              background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
              boxShadow: "0 0 8px #00d4ff",
            }} />
          </h1>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "8px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2))" }} />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.6rem", color: "rgba(0,212,255,0.4)", letterSpacing: "0.3em" }}>SYS.EVENTS</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.2))" }} />
          </div>
        </div>

        {/* ── FEATURED CARD ── */}
        <FeaturedCard
          featuredIndex={featuredIndex}
          onPrev={() => setFeaturedIndex(i => (i - 1 + EVENTS.length) % EVENTS.length)}
          onNext={() => setFeaturedIndex(i => (i + 1) % EVENTS.length)}
        />

        {/* ── TABS ── */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid rgba(0,212,255,0.1)", paddingBottom: "0" }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.75rem", fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "8px 16px",
              background: "none", border: "none",
              borderBottom: activeTab === i ? "2px solid #00d4ff" : "2px solid transparent",
              color: activeTab === i ? "#00d4ff" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.2s",
              textTransform: "uppercase",
              marginBottom: "-1px",
            }}
              onMouseEnter={e => { if (activeTab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { if (activeTab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >{tab}</button>
          ))}
        </div>

        {/* ── EVENT LIST ── */}
        <div>
          {EVENTS.map(event => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>

        {/* ── VIEW ALL ── */}
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <button style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "10px 28px",
            background: "transparent",
            border: "1px solid rgba(0,212,255,0.35)",
            borderRadius: "6px",
            color: "rgba(0,212,255,0.8)",
            cursor: "pointer",
            transition: "all 0.25s",
            boxShadow: "0 0 12px rgba(0,212,255,0.08)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.08)"; }}
          >
            View All Events
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes orb1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-30px) scale(1.1); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(25px) scale(1.08); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
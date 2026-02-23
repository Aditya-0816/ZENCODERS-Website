import { useState } from "react";

const CARDS_ROW1 = [
  { id: "r1a", label: "Conference",    emoji: "🎤", color: "#1a2a4a", wide: false },
  { id: "r1b", label: "Workshop",      emoji: "💡", color: "#2a1a4a", wide: false },
  { id: "r1c", label: "Networking",    emoji: "🤝", color: "#1a3a2a", wide: false },
  { id: "r1d", label: "Summit",        emoji: "🏆", color: "#3a2a1a", wide: false },
  { id: "r1e", label: "Panel",         emoji: "🎯", color: "#1a1a4a", wide: false },
  { id: "r1f", label: "Gala Night",    emoji: "🌟", color: "#3a1a1a", wide: false },
  { id: "r1a2", label: "Conference",   emoji: "🎤", color: "#1a2a4a", wide: false },
  { id: "r1b2", label: "Workshop",     emoji: "💡", color: "#2a1a4a", wide: false },
  { id: "r1c2", label: "Networking",   emoji: "🤝", color: "#1a3a2a", wide: false },
  { id: "r1d2", label: "Summit",       emoji: "🏆", color: "#3a2a1a", wide: false },
  { id: "r1e2", label: "Panel",        emoji: "🎯", color: "#1a1a4a", wide: false },
  { id: "r1f2", label: "Gala Night",   emoji: "🌟", color: "#3a1a1a", wide: false },
];

const CARDS_ROW2 = [
  { id: "r2a", label: "Grand Assembly", emoji: "🎭", color: "#0a1a3a", wide: true  },
  { id: "r2b", label: "Meetup",         emoji: "👥", color: "#2a1a3a", wide: false },
  { id: "r2c", label: "Seminar",        emoji: "📚", color: "#1a3a3a", wide: false },
  { id: "r2d", label: "Expo",           emoji: "🚀", color: "#3a3a1a", wide: false },
  { id: "r2e", label: "Keynote",        emoji: "🎵", color: "#1a2a3a", wide: false },
  { id: "r2a2", label: "Grand Assembly",emoji: "🎭", color: "#0a1a3a", wide: true  },
  { id: "r2b2", label: "Meetup",        emoji: "👥", color: "#2a1a3a", wide: false },
  { id: "r2c2", label: "Seminar",       emoji: "📚", color: "#1a3a3a", wide: false },
  { id: "r2d2", label: "Expo",          emoji: "🚀", color: "#3a3a1a", wide: false },
  { id: "r2e2", label: "Keynote",       emoji: "🎵", color: "#1a2a3a", wide: false },
];

export default function Gallery() {
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#03050a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 0 80px",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* Background glow */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #0a1aff22 0%, transparent 70%)", top: "0%", left: "20%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #7c3aed18 0%, transparent 70%)", bottom: "0%", right: "10%", pointerEvents: "none" }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "48px", position: "relative", zIndex: 2, padding: "0 20px" }}>
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 800,
          color: "#ffffff",
          margin: "0 0 12px",
          letterSpacing: "0.08em",
          textShadow: "0 0 40px rgba(0,212,255,0.3)",
        }}>
          Event Gallery
        </h2>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "1rem",
          color: "rgba(255,255,255,0.4)",
          margin: 0,
          letterSpacing: "0.05em",
        }}>
          A glimpse into our past events and collaborations.
        </p>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div
        style={{ overflow: "hidden", width: "100%", marginBottom: "14px" }}
        onMouseEnter={() => setRow1Paused(true)}
        onMouseLeave={() => setRow1Paused(false)}
      >
        <div style={{
          display: "flex",
          gap: "14px",
          width: "max-content",
          animationName: "scrollLeft",
          animationDuration: "40s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: row1Paused ? "paused" : "running",
        }}>
          {CARDS_ROW1.map((card) => (
            <div
              key={card.id}
              style={{
                flexShrink: 0,
                width: card.wide ? 300 : 190,
                height: 155,
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${card.color}dd, ${card.color}88)`,
                border: "1px solid rgba(0,212,255,0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
              }}
            >
              <div style={{ fontSize: "1.8rem" }}>{card.emoji}</div>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>{card.label}</span>
              {/* Shine overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
                borderRadius: "14px",
                pointerEvents: "none",
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT */}
      <div
        style={{ overflow: "hidden", width: "100%" }}
        onMouseEnter={() => setRow2Paused(true)}
        onMouseLeave={() => setRow2Paused(false)}
      >
        <div style={{
          display: "flex",
          gap: "14px",
          width: "max-content",
          animationName: "scrollRight",
          animationDuration: "45s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: row2Paused ? "paused" : "running",
        }}>
          {CARDS_ROW2.map((card) => (
            <div
              key={card.id}
              style={{
                flexShrink: 0,
                width: card.wide ? 300 : 190,
                height: 155,
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${card.color}dd, ${card.color}88)`,
                border: "1px solid rgba(168,85,247,0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(168,85,247,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.12)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
              }}
            >
              <div style={{ fontSize: "1.8rem" }}>{card.emoji}</div>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}>{card.label}</span>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
                borderRadius: "14px",
                pointerEvents: "none",
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Edge fades */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #03050a, transparent)", pointerEvents: "none", zIndex: 3 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 80, background: "linear-gradient(to left, #03050a, transparent)", pointerEvents: "none", zIndex: 3 }} />

      {/* View All button */}
      <div style={{ marginTop: "48px", position: "relative", zIndex: 2 }}>
        <button
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.85rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "12px 40px", borderRadius: "8px",
            background: "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.4)",
            color: "#00d4ff", cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,212,255,0.22)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.25)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,212,255,0.12)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          View All
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Rajdhani:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";

const TABS = ["Corporate Event", "Club Gigs", "Inbase Concerts"];

const EVENTS = [
  {
    id: 1,
    date: "24 Jan • 2024",
    time: "10:00 AM — 2:00 PM",
    title: "Siempre Son Flores™ Musica Cubana Salsa Jazz",
    location: "138 W. 46nd Street, New York",
    accent: "#00d4ff",
    tag: "LIVE",
  },
  {
    id: 2,
    date: "24 Jan • 2024",
    time: "01:00 AM — 2:00 PM",
    title: "Interstellar Sound Wave — Electronic Fusion Night",
    location: "138 W. 46nd Street, New York",
    accent: "#a855f7",
    tag: "VIP",
  },
  {
    id: 3,
    date: "24 Jan • 2024",
    time: "10:00 AM — 2:00 PM",
    title: "Quantum Beats — Deep House & Techno Showcase",
    location: "138 W. 46nd Street, New York",
    accent: "#f59e0b",
    tag: "HOT",
  },
];

const FEATURED = [
  {
    title: "Siempre Son Flores™ Musica Cubana Salsa Jazz adipi",
    date: "24 Jan • 2024",
    location: "138 W. 46nd Street, New York",
    gradient: "linear-gradient(135deg, #060d28 0%, #0d1840 50%, #0a0d30 100%)",
  },
  {
    title: "Interstellar Sound Wave — Electronic Fusion Night",
    date: "18 Feb • 2024",
    location: "99 Hudson Street, New York",
    gradient: "linear-gradient(135deg, #0d0620 0%, #180a38 50%, #0d0628 100%)",
  },
  {
    title: "Quantum Beats — Deep House & Techno Showcase",
    date: "05 Mar • 2024",
    location: "200 Fifth Avenue, New York",
    gradient: "linear-gradient(135deg, #1a0a06 0%, #2a1008 50%, #180a04 100%)",
  },
];

// Particle canvas
function ParticleField() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6 ? "#00d4ff" : Math.random() > 0.5 ? "#a855f7" : "#ffffff",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#00d4ff";
            ctx.globalAlpha = (1 - d / 100) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
    }} />
  );
}

function HoloBadge({ text, color = "#00d4ff" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: `rgba(${color === "#00d4ff" ? "0,212,255" : color === "#a855f7" ? "168,85,247" : "245,158,11"},0.12)`,
      border: `1px solid ${color}40`,
      borderRadius: 20, padding: "3px 10px",
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, animation: "pulse 2s infinite" }} />
      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.6rem", color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

function FeaturedSlider() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIdx(i => (i + dir + FEATURED.length) % FEATURED.length);
      setAnimating(false);
    }, 300);
  };

  const f = FEATURED[idx];

  return (
    <div style={{
      position: "relative", borderRadius: "20px", overflow: "hidden",
      background: f.gradient,
      border: "1px solid rgba(0,212,255,0.18)",
      boxShadow: "0 0 60px rgba(0,212,255,0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      marginBottom: "32px", minHeight: "240px",
      transition: "background 0.4s ease",
    }}>
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent 0%, #00d4ff 30%, #a855f7 70%, transparent 100%)",
        opacity: 0.6,
      }} />

      {/* Circuit decoration */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }} viewBox="0 0 700 240" preserveAspectRatio="none">
        <path d="M0 120 L80 120 L100 100 L250 100 L270 120 L700 120" stroke="#00d4ff" strokeWidth="0.8" fill="none" />
        <path d="M700 60 L600 60 L580 80 L480 80 L460 60 L400 60" stroke="#a855f7" strokeWidth="0.6" fill="none" />
        <path d="M0 180 L60 180 L80 160 L140 160" stroke="#00d4ff" strokeWidth="0.6" fill="none" />
        <circle cx="270" cy="120" r="3" fill="#00d4ff" opacity="0.8" />
        <circle cx="100" cy="100" r="2" fill="#a855f7" opacity="0.8" />
        <circle cx="460" cy="60" r="2.5" fill="#a855f7" opacity="0.6" />
        <path d="M580 0 L580 30 L620 30 L620 60" stroke="#00d4ff" strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M120 240 L120 200 L160 200 L160 180" stroke="#a855f7" strokeWidth="0.6" fill="none" opacity="0.5" />
      </svg>

      {/* Corner HUD brackets */}
      {[
        { top: 12, left: 12 }, { top: 12, right: 12 },
        { bottom: 12, left: 12 }, { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos,
          width: 18, height: 18,
          borderTop: i < 2 ? "1.5px solid rgba(0,212,255,0.7)" : "none",
          borderBottom: i >= 2 ? "1.5px solid rgba(0,212,255,0.7)" : "none",
          borderLeft: i % 2 === 0 ? "1.5px solid rgba(0,212,255,0.7)" : "none",
          borderRight: i % 2 === 1 ? "1.5px solid rgba(0,212,255,0.7)" : "none",
        }} />
      ))}

      {/* Slide indicator dots */}
      <div style={{ position: "absolute", top: 18, right: 52, display: "flex", gap: 5 }}>
        {FEATURED.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 16 : 5, height: 5, borderRadius: 3,
            background: i === idx ? "#00d4ff" : "rgba(255,255,255,0.2)",
            transition: "all 0.3s", cursor: "pointer",
            boxShadow: i === idx ? "0 0 8px #00d4ff" : "none",
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        padding: "28px 28px 28px",
        position: "relative", zIndex: 2,
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.3s, transform 0.3s",
      }}>
        <HoloBadge text="Upcoming Event" color="#00d4ff" />

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, marginBottom: 12 }}>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, #00d4ff, transparent)" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", color: "rgba(0,212,255,0.7)", letterSpacing: "0.1em" }}>📅 {f.date}</span>
            </div>
            <h3 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(0.95rem, 2.2vw, 1.3rem)",
              fontWeight: 700, color: "#fff",
              margin: 0, lineHeight: 1.45,
              textShadow: "0 0 30px rgba(0,212,255,0.2)",
              maxWidth: 420,
            }}>{f.title}</h3>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: "0.65rem" }}>📍</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{f.location}</span>
        </div>
      </div>

      {/* Nav arrows */}
      <div style={{ position: "absolute", bottom: 22, right: 22, display: "flex", gap: 8, zIndex: 3 }}>
        {[{ label: "←", dir: -1 }, { label: "→", dir: 1 }].map(({ label, dir }) => (
          <button key={dir} onClick={() => go(dir)} style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff", fontSize: "0.9rem",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            backdropFilter: "blur(4px)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.2)"; e.currentTarget.style.boxShadow = "0 0 14px rgba(0,212,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
          >{label}</button>
        ))}
      </div>
    </div>
  );
}

function EventRow({ event, index }) {
  const [hov, setHov] = useState(false);
  const accentRGB = event.accent === "#00d4ff" ? "0,212,255" : event.accent === "#a855f7" ? "168,85,247" : "245,158,11";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: "14px", alignItems: "stretch",
        padding: "0",
        borderRadius: "14px",
        background: hov
          ? `rgba(${accentRGB},0.06)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? `rgba(${accentRGB},0.3)` : "rgba(255,255,255,0.05)"}`,
        marginBottom: "10px",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: hov ? `0 8px 32px rgba(${accentRGB},0.1), 0 0 0 1px rgba(${accentRGB},0.1)` : "none",
        animation: `fadeUp 0.5s ease both`,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Left accent bar */}
      <div style={{
        width: "3px", flexShrink: 0,
        background: `linear-gradient(to bottom, transparent, ${event.accent}, transparent)`,
        opacity: hov ? 1 : 0.5,
        transition: "opacity 0.3s",
        borderRadius: "14px 0 0 14px",
      }} />

      {/* Image */}
      <div style={{
        width: 88, height: 76, borderRadius: "10px", flexShrink: 0,
        margin: "12px 0 12px",
        background: `linear-gradient(135deg, rgba(${accentRGB},0.15) 0%, rgba(0,0,0,0.3) 100%)`,
        border: `1px solid rgba(${accentRGB},0.15)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", position: "relative",
      }}>
        <svg width="88" height="76" viewBox="0 0 88 76" style={{ position: "absolute", opacity: 0.3 }}>
          <defs>
            <pattern id={`pg${event.id}`} width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke={event.accent} strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="88" height="76" fill={`url(#pg${event.id})`} />
        </svg>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${event.accent}`, margin: "0 auto 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: event.accent, boxShadow: `0 0 8px ${event.accent}` }} />
          </div>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.48rem", color: event.accent, letterSpacing: "0.1em", opacity: 0.8 }}>EVENT</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, padding: "12px 0 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
          <HoloBadge text={event.tag} color={event.accent} />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
            {event.date} &nbsp;·&nbsp; {event.time}
          </span>
        </div>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.72rem", fontWeight: 600,
          color: hov ? "#fff" : "rgba(255,255,255,0.78)",
          margin: "0 0 6px", lineHeight: 1.55,
          transition: "color 0.2s",
        }}>{event.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)" }}>📍</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>{event.location}</span>
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: 10, padding: "12px 16px 12px 0", flexShrink: 0 }}>
        <button style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em",
          padding: "7px 14px", borderRadius: "8px",
          background: hov ? `rgba(${accentRGB},0.18)` : "transparent",
          border: `1px solid ${event.accent}`,
          color: event.accent, cursor: "pointer",
          transition: "all 0.2s",
          textTransform: "uppercase",
          boxShadow: hov ? `0 0 16px rgba(${accentRGB},0.3)` : "none",
          whiteSpace: "nowrap",
        }}>Buy Tickets</button>

        {/* Avatar stack */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {["#4f8ef7", "#a855f7", "#00d4ff"].map((c, j) => (
            <div key={j} style={{
              width: 20, height: 20, borderRadius: "50%",
              background: c, border: "1.5px solid #03050a",
              marginLeft: j === 0 ? 0 : -6,
              boxShadow: `0 0 6px ${c}60`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.42rem", color: "#fff", fontWeight: 700,
              fontFamily: "'Rajdhani', sans-serif",
            }}>
              {String.fromCharCode(65 + j)}
            </div>
          ))}
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.3)", marginLeft: 6, letterSpacing: "0.05em" }}>+4</span>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 10%, #060e24 0%, #030509 60%, #020307 100%)",
      position: "relative", overflow: "hidden", padding: "64px 0 80px",
    }}>
      {/* Particle field */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ParticleField />
      </div>

      {/* Grid */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, zIndex: 0 }} >
        <defs>
          <pattern id="maingrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d4ff" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#maingrid)" />
      </svg>

      {/* Horizontal glow lines */}
      <div style={{ position: "absolute", top: "25%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.08) 30%, rgba(168,85,247,0.08) 70%, transparent 100%)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "75%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.06) 50%, transparent 100%)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── TITLE ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.5))" }} />
            <div style={{ display: "flex", gap: 4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 4, height: 4, background: i === 1 ? "#00d4ff" : "rgba(0,212,255,0.3)", transform: "rotate(45deg)", boxShadow: i === 1 ? "0 0 8px #00d4ff" : "none" }} />
              ))}
            </div>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.5))" }} />
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 900, color: "#fff",
              margin: 0, letterSpacing: "0.5em",
              textShadow: "0 0 40px rgba(0,212,255,0.35), 0 0 80px rgba(0,212,255,0.1)",
            }}>EVENTS</h1>
            {/* Glitch layers */}
            <h1 aria-hidden style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 900,
              margin: 0, letterSpacing: "0.5em",
              position: "absolute", top: 0, left: 0,
              color: "#00d4ff", opacity: 0.04,
              transform: "translateX(2px)",
              pointerEvents: "none",
            }}>EVENTS</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10 }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2))" }} />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.58rem", color: "rgba(0,212,255,0.4)", letterSpacing: "0.35em" }}>TRANSMISSION::ACTIVE</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.2))" }} />
          </div>
        </div>

        {/* ── FEATURED ── */}
        <FeaturedSlider />

        {/* ── TABS ── */}
        <div style={{
          display: "flex", gap: 2, marginBottom: 20,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px", padding: "4px",
        }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} style={{
              flex: 1,
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em",
              padding: "8px 12px", borderRadius: "7px",
              background: activeTab === i
                ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.1))"
                : "transparent",
              border: activeTab === i ? "1px solid rgba(0,212,255,0.25)" : "1px solid transparent",
              color: activeTab === i ? "#00d4ff" : "rgba(255,255,255,0.35)",
              cursor: "pointer", transition: "all 0.25s",
              textTransform: "uppercase",
              boxShadow: activeTab === i ? "0 0 16px rgba(0,212,255,0.1)" : "none",
            }}
              onMouseEnter={e => { if (activeTab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={e => { if (activeTab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >{tab}</button>
          ))}
        </div>

        {/* ── EVENT LIST ── */}
        <div>
          {EVENTS.map((event, i) => (
            <EventRow key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* ── VIEW ALL ── */}
        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <button style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "12px 36px", borderRadius: "8px",
            background: "transparent",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "rgba(0,212,255,0.8)",
            cursor: "pointer", transition: "all 0.3s",
            position: "relative", overflow: "hidden",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(0,212,255,0.08)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
            }}
          >
            View All Events
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}
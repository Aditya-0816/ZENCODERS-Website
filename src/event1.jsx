import { useState, useEffect, useRef } from "react";

const TABS = ["All Events", "Orientation", "Workshops", "Fest Events"];

const EVENTS = [
  {
    id: 1,
    date: "11 September • 2024",
    time: "05:00 PM — 06:00 PM",
    title: "Orientation 2024 – Welcome to ZenCoders",
    location: "LT-1, JIIT Sector 62, Noida",
    accent: "#00d4ff",
    tag: "PAST",
    category: "Orientation",
    sortDate: "2024-09-11",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=560&fit=crop",
    description: "Our annual orientation welcomed new students to ZenCoders — JIIT's premier coding club. The session covered club vision, upcoming events, membership, and how to get involved in competitions and workshops.",
    prize: null,
    winners: [],
    pics: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop",
    ],
    regLink: null,
    regQR: null,
  },
  {
    id: 2,
    date: "03 Oct – 05 Oct • 2024",
    time: "05:00 PM — 07:00 PM",
    title: "Code Craft – 3-Day Workshop: Master C Language",
    location: "G-3, JIIT Sector 62, Noida",
    accent: "#a855f7",
    tag: "PAST",
    category: "Workshops",
    sortDate: "2024-10-03",
    poster: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=560&fit=crop",
    description: "A 3-day intensive workshop on C programming covering fundamentals, pointers, memory management, file handling, and problem solving. Designed for freshers looking to build a strong foundation.",
    prize: null,
    winners: [],
    pics: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
    ],
    regLink: null,
    regQR: null,
  },
  {
    id: 3,
    date: "19 September • 2025",
    time: "12:00 PM — 01:00 PM",
    title: "Orientation 2025 – Welcome to ZenCoders",
    location: "Room 259, JIIT 128 Campus, Noida",
    accent: "#00d4ff",
    tag: "PAST",
    category: "Orientation",
    sortDate: "2025-09-19",
    poster: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=560&fit=crop",
    description: "The 2025 orientation introduced the new batch to ZenCoders, highlighting the club's achievements, team structure, and the exciting lineup of events planned for the academic year.",
    prize: null,
    winners: [],
    pics: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop",
    ],
    regLink: null,
    regQR: null,
  },
  {
    id: 4,
    date: "25 Sep – 27 Sep • 2025",
    time: "01:00 PM — 03:00 PM",
    title: "Code Craft 2.0 – 3-Day C Language Workshop",
    location: "Room 153, JIIT 128 Campus, Noida",
    accent: "#f59e0b",
    tag: "PAST",
    category: "Workshops",
    sortDate: "2025-09-25",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=560&fit=crop",
    description: "The second edition of Code Craft returned with deeper content — advanced C concepts, data structures in C, and hands-on coding challenges. Students solved real problems under mentorship.",
    prize: null,
    winners: [],
    pics: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    ],
    regLink: null,
    regQR: null,
  },
  {
    id: 5,
    date: "28 February • 2025",
    time: "11:00 AM — 12:30 PM",
    title: "Synergy'25 – Sketch To Site",
    location: "CL 3, JIIT 128 Campus, Noida",
    accent: "#f472b6",
    tag: "PAST",
    category: "Fest Events",
    sortDate: "2025-02-28",
    poster: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=560&fit=crop",
    description: "Sketch To Site challenged participants to design a full website from a hand-drawn wireframe within 90 minutes. Teams were judged on creativity, UI quality, and responsiveness.",
    prize: "🥇 1st Place: ₹2000  |  🥈 2nd Place: ₹1000",
    winners: ["🥇 Team Wireframe Warriors", "🥈 Team PixelPusher"],
    pics: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop",
    ],
    regLink: "https://forms.google.com",
    regQR: "https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://forms.google.com&color=f472b6&bgcolor=0d0a1e",
  },
  {
    id: 6,
    date: "1 March • 2025",
    time: "04:00 PM — 05:30 PM",
    title: "Synergy'25 – Sketch To Site",
    location: "CL 2, JIIT Sector 62, Noida",
    accent: "#f472b6",
    tag: "PAST",
    category: "Fest Events",
    sortDate: "2025-03-01",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&fit=crop",
    description: "The Sector 62 edition of Sketch To Site brought together design-minded developers in a fast-paced UI challenge. Participants converted wireframes into working, styled web pages.",
    prize: "🥇 1st Place: ₹2000  |  🥈 2nd Place: ₹1000",
    winners: ["🥇 Team CodeCanvas", "🥈 Team DevDraft"],
    pics: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop",
    ],
    regLink: "https://forms.google.com",
    regQR: "https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://forms.google.com&color=f472b6&bgcolor=0d0a1e",
  },
  {
    id: 7,
    date: "15 March • 2026",
    time: "02:00 PM — 03:00 PM",
    title: "Converge'26 – Sketch To Site 2.0",
    location: "CL-4, JIIT 128 Campus, Noida",
    accent: "#f472b6",
    tag: "PAST",
    category: "Fest Events",
    sortDate: "2026-03-15",
    poster: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=560&fit=crop",
    description: "Sketch To Site 2.0 raised the bar — participants were given more complex wireframes and a stricter judging rubric covering accessibility, animation, and mobile responsiveness.",
    prize: "🥇 1st Place: ₹3000  |  🥈 2nd Place: ₹1500  |  🥉 3rd Place: ₹500",
    winners: ["🥇 Team GridMasters", "🥈 Team LayerUp", "🥉 Team ResponsiVe"],
    pics: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop",
    ],
    regLink: "https://forms.google.com",
    regQR: "https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://forms.google.com&color=f472b6&bgcolor=0d0a1e",
  },
  {
    id: 8,
    date: "11 April • 2026",
    time: "TBD",
    title: "Impressions'26 – Build-Chella",
    location: "JIIT Sector 62, Noida",
    accent: "#10b981",
    tag: "UPCOMING",
    category: "Fest Events",
    sortDate: "2026-04-11",
    poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=560&fit=crop",
    description: "Build-Chella is a major fest event where teams build full-stack projects from scratch in a high-energy festival atmosphere. Expect intense coding, live demos, and big prizes!",
    prize: "To be announced",
    winners: [],
    pics: [],
    regLink: "https://forms.google.com",
    regQR: "https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://forms.google.com&color=10b981&bgcolor=051a10",
  },
  {
    id: 9,
    date: "12 April • 2026",
    time: "TBD",
    title: "Impressions'26 – Blind Founders",
    location: "JIIT Sector 62, Noida",
    accent: "#a855f7",
    tag: "UPCOMING",
    category: "Fest Events",
    sortDate: "2026-04-12",
    poster: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=560&fit=crop",
    description: "Blind Founders is a unique pitch competition where participants receive a random startup idea and must pitch a product solution on the spot — no preparation allowed!",
    prize: "To be announced",
    winners: [],
    pics: [],
    regLink: "https://forms.google.com",
    regQR: "https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://forms.google.com&color=a855f7&bgcolor=0d0a1e",
  },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingFeatured = EVENTS
  .filter(e => new Date(e.sortDate) >= today)
  .sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));

const pastFeatured = EVENTS
  .filter(e => new Date(e.sortDate) < today)
  .sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

const FEATURED = [...upcomingFeatured, ...pastFeatured].map(e => ({
  title: e.title,
  date: e.date,
  time: e.time,
  location: e.location,
  tag: e.tag,
  accent: e.accent,
  gradient: e.tag === "UPCOMING"
    ? "linear-gradient(135deg, #051a10 0%, #0a2818 50%, #051a10 100%)"
    : e.category === "Orientation"
    ? "linear-gradient(135deg, #060d28 0%, #0d1840 50%, #0a0d30 100%)"
    : e.category === "Workshops"
    ? "linear-gradient(135deg, #0d0620 0%, #180a38 50%, #0d0628 100%)"
    : "linear-gradient(135deg, #1a0620 0%, #2a0838 50%, #1a0620 100%)",
}));

function ParticleField() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

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
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
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
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
  );
}

function HoloBadge({ text, color }) {
  const c = color || "#00d4ff";
  const rgbMap = {
    "#00d4ff": "0,212,255",
    "#a855f7": "168,85,247",
    "#f59e0b": "245,158,11",
    "#f472b6": "244,114,182",
    "#10b981": "16,185,129",
  };
  const rgb = rgbMap[c] || "0,212,255";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "rgba(" + rgb + ",0.12)",
      border: "1px solid " + c + "40",
      borderRadius: 20, padding: "3px 10px",
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, boxShadow: "0 0 6px " + c, animation: "pulse 2s infinite" }} />
      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.6rem", color: c, letterSpacing: "0.15em", textTransform: "uppercase" }}>{text}</span>
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
  const isUpcoming = f.tag === "UPCOMING";
  const accentColor = isUpcoming ? "#10b981" : "#00d4ff";
  const accentRGB = isUpcoming ? "16,185,129" : "0,212,255";

  return (
    <div style={{
      position: "relative", borderRadius: "20px", overflow: "hidden",
      background: f.gradient,
      border: "1px solid rgba(" + accentRGB + ",0.22)",
      boxShadow: "0 0 60px rgba(" + accentRGB + ",0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      marginBottom: "32px", minHeight: "240px",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: isUpcoming
          ? "linear-gradient(90deg, transparent 0%, #10b981 30%, #00d4ff 70%, transparent 100%)"
          : "linear-gradient(90deg, transparent 0%, #00d4ff 30%, #a855f7 70%, transparent 100%)",
        opacity: 0.7,
      }} />

      {isUpcoming && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
          animation: "glowPulse 3s ease-in-out infinite",
        }} />
      )}

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }} viewBox="0 0 700 240" preserveAspectRatio="none">
        <path d="M0 120 L80 120 L100 100 L250 100 L270 120 L700 120" stroke={accentColor} strokeWidth="0.8" fill="none" />
        <path d="M700 60 L600 60 L580 80 L480 80 L460 60 L400 60" stroke="#a855f7" strokeWidth="0.6" fill="none" />
        <path d="M0 180 L60 180 L80 160 L140 160" stroke={accentColor} strokeWidth="0.6" fill="none" />
        <circle cx="270" cy="120" r="3" fill={accentColor} opacity="0.8" />
        <circle cx="100" cy="100" r="2" fill="#a855f7" opacity="0.8" />
        <circle cx="460" cy="60" r="2.5" fill="#a855f7" opacity="0.6" />
      </svg>

      {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos, width: 18, height: 18,
          borderTop: i < 2 ? "1.5px solid " + accentColor + "b0" : "none",
          borderBottom: i >= 2 ? "1.5px solid " + accentColor + "b0" : "none",
          borderLeft: i % 2 === 0 ? "1.5px solid " + accentColor + "b0" : "none",
          borderRight: i % 2 === 1 ? "1.5px solid " + accentColor + "b0" : "none",
        }} />
      ))}

      <div style={{ position: "absolute", top: 18, right: 16, display: "flex", gap: 5 }}>
        {Array.from({ length: 4 }).map((_, i) => {
          const pageStart = Math.floor(idx / 4) * 4;
          const dotIdx = pageStart + i;
          const isValid = dotIdx < FEATURED.length;
          const isActive = dotIdx === idx;
          const dotColor = isValid && FEATURED[dotIdx].tag === "UPCOMING" ? "#10b981" : "#00d4ff";
          return (
            <div key={i} onClick={() => isValid && setIdx(dotIdx)} style={{
              width: isActive ? 16 : 5, height: 5, borderRadius: 3,
              background: isActive ? dotColor : isValid ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
              transition: "all 0.3s", cursor: isValid ? "pointer" : "default",
              boxShadow: isActive ? "0 0 8px " + dotColor : "none",
            }} />
          );
        })}
      </div>

      <div style={{
        padding: "28px", position: "relative", zIndex: 2,
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.3s, transform 0.3s",
      }}>
        <HoloBadge text={isUpcoming ? "Upcoming Event" : "Past Event"} color={accentColor} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, marginBottom: 12 }}>
          <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, " + accentColor + ", transparent)" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", color: accentColor + "b0", letterSpacing: "0.1em" }}>
                {"📅 " + f.date + " · 🕐 " + f.time}
              </span>
            </div>
            <h3 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(0.95rem, 2.2vw, 1.3rem)",
              fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.45,
              textShadow: "0 0 30px " + accentColor + "40", maxWidth: 420,
            }}>
              {f.title.split("–")[0].trim()}
            </h3>
            {f.title.includes("–") && (
              <h3 style={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(0.95rem, 2.2vw, 1.3rem)",
                fontWeight: 700, color: "#fff", margin: "4px 0 0", lineHeight: 1.45,
                textShadow: "0 0 30px " + accentColor + "40", maxWidth: 420,
              }}>
                {f.title.split("–")[1].trim()}
              </h3>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: "0.65rem" }}>📍</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{f.location}</span>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 22, right: 22, display: "flex", gap: 8, zIndex: 3 }}>
        {[{ label: "←", dir: -1 }, { label: "→", dir: 1 }].map(({ label, dir }) => (
          <button key={dir} onClick={() => go(dir)} style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(" + accentRGB + ",0.08)",
            border: "1px solid " + accentColor + "50",
            color: accentColor, fontSize: "0.9rem",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", backdropFilter: "blur(4px)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(" + accentRGB + ",0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(" + accentRGB + ",0.08)"; }}
          >{label}</button>
        ))}
      </div>
    </div>
  );
}

function EventModal({ event, onClose }) {
  const rgbMap = {
    "#00d4ff": "0,212,255",
    "#a855f7": "168,85,247",
    "#f59e0b": "245,158,11",
    "#f472b6": "244,114,182",
    "#10b981": "16,185,129",
  };
  const accentRGB = rgbMap[event.accent] || "0,212,255";
  const isUpcoming = event.tag === "UPCOMING";

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 3, height: 14, background: event.accent, borderRadius: 2 }} />
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.62rem", color: event.accent, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>{title}</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, " + event.accent + "40, transparent)" }} />
      </div>
      {children}
    </div>
  );

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 860, maxHeight: "90vh",
        background: "linear-gradient(135deg, #080d1e 0%, #0d0a1e 100%)",
        border: "1px solid rgba(" + accentRGB + ",0.3)",
        borderRadius: 20, overflow: "hidden",
        boxShadow: "0 0 80px rgba(" + accentRGB + ",0.15), 0 40px 80px rgba(0,0,0,0.8)",
        display: "flex", flexDirection: "column", position: "relative",
      }}>
        <div style={{ height: 2, background: "linear-gradient(90deg, transparent, " + event.accent + ", rgba(" + accentRGB + ",0.4), transparent)", flexShrink: 0 }} />

        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14, zIndex: 10,
          width: 30, height: 30, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.7)", fontSize: "0.9rem",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(" + accentRGB + ",0.2)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        >✕</button>

        <div style={{ overflowY: "auto", flex: 1, padding: "24px" }}>

          <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{
              width: 200, flexShrink: 0, borderRadius: 12,
              background: "linear-gradient(135deg, rgba(" + accentRGB + ",0.15), rgba(0,0,0,0.4))",
              border: "1px solid rgba(" + accentRGB + ",0.2)",
              overflow: "hidden", minHeight: 260,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {event.poster ? (
                <img src={event.poster} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.58rem", color: "rgba(" + accentRGB + ",0.4)", letterSpacing: "0.1em" }}>EVENT POSTER</span>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.2)", marginTop: 6 }}>Add poster path to event data</p>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 200 }}>
              <HoloBadge text={event.tag} color={event.accent} />
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                fontWeight: 700, color: "#fff",
                margin: "12px 0 16px", lineHeight: 1.4,
              }}>
                {event.title.split("–")[0].trim()}
                {event.title.includes("–") && (
                  <span style={{ display: "block", color: "rgba(" + accentRGB + ",0.9)" }}>
                    {event.title.split("–")[1].trim()}
                  </span>
                )}
              </h2>
              {[
                { icon: "📅", label: "Date", value: event.date },
                { icon: "🕐", label: "Time", value: event.time },
                { icon: "📍", label: "Venue", value: event.location },
                { icon: "🏷️", label: "Category", value: event.category },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.72rem", flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.58rem", color: "rgba(" + accentRGB + ",0.6)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block" }}>{label}</span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Section title="About the Event">
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, letterSpacing: "0.03em" }}>
              {event.description || "Description coming soon."}
            </p>
          </Section>

          {event.prize && (
            <Section title="Prize Pool">
              <div style={{
                background: "rgba(" + accentRGB + ",0.06)",
                border: "1px solid rgba(" + accentRGB + ",0.2)",
                borderRadius: 10, padding: "12px 16px",
              }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", color: "#fff", margin: 0, lineHeight: 1.8 }}>
                  {event.prize}
                </p>
              </div>
            </Section>
          )}

          {event.winners && event.winners.length > 0 && (
            <Section title="Winners">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {event.winners.map((w, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8, padding: "8px 14px",
                  }}>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", letterSpacing: "0.04em" }}>{w}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {(event.regLink || event.regQR || isUpcoming) && (
            <Section title="Registration">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{
                  width: 110, height: 110, borderRadius: 10, flexShrink: 0,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px dashed rgba(" + accentRGB + ",0.3)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 6,
                  overflow: "hidden",
                }}>
                  {event.regQR ? (
                    <img src={event.regQR} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.48rem", color: "rgba(" + accentRGB + ",0.4)", letterSpacing: "0.08em", textAlign: "center" }}>QR CODE{"\n"}COMING SOON</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Registration Link</p>
                  {event.regLink ? (
                    <a href={event.regLink} target="_blank" rel="noopener noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontFamily: "'Rajdhani', sans-serif", fontSize: "0.72rem",
                      color: event.accent, textDecoration: "none",
                      border: "1px solid rgba(" + accentRGB + ",0.3)",
                      borderRadius: 8, padding: "8px 14px",
                      background: "rgba(" + accentRGB + ",0.08)",
                      letterSpacing: "0.06em",
                    }}>
                      🔗 Register Now
                    </a>
                  ) : (
                    <div style={{
                      fontFamily: "'Rajdhani', sans-serif", fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em",
                      border: "1px dashed rgba(255,255,255,0.08)",
                      borderRadius: 8, padding: "8px 14px",
                    }}>
                      {isUpcoming ? "Link will be added soon" : "Registration closed"}
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}

          <Section title="Event Gallery">
            {event.pics && event.pics.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                {event.pics.map((pic, i) => (
                  <div key={i} style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}>
                    <img src={pic} alt={"pic-" + i} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                border: "1px dashed rgba(255,255,255,0.08)",
                borderRadius: 10, padding: "24px",
                textAlign: "center", background: "rgba(255,255,255,0.01)",
              }}>
                <span style={{ fontSize: "1.4rem", display: "block", marginBottom: 6, opacity: 0.3 }}>🖼️</span>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                  {isUpcoming ? "Photos will be added after the event" : "No photos added yet"}
                </p>
              </div>
            )}
          </Section>

        </div>
      </div>
    </div>
  );
}

function EventRow({ event, index }) {
  const [hov, setHov] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const rgbMap = {
    "#00d4ff": "0,212,255",
    "#a855f7": "168,85,247",
    "#f59e0b": "245,158,11",
    "#f472b6": "244,114,182",
    "#10b981": "16,185,129",
  };
  const accentRGB = rgbMap[event.accent] || "0,212,255";

  return (
    <>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "flex", gap: "14px", alignItems: "stretch",
          borderRadius: "14px",
          background: hov ? "rgba(" + accentRGB + ",0.06)" : "rgba(255,255,255,0.02)",
          border: "1px solid " + (hov ? "rgba(" + accentRGB + ",0.3)" : "rgba(255,255,255,0.05)"),
          marginBottom: "10px",
          transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
          cursor: "pointer", overflow: "hidden",
          boxShadow: hov ? "0 8px 32px rgba(" + accentRGB + ",0.1)" : "none",
          animation: "fadeUp 0.5s ease both",
          animationDelay: index * 80 + "ms",
        }}
      >
        <div style={{
          width: "3px", flexShrink: 0,
          background: "linear-gradient(to bottom, transparent, " + event.accent + ", transparent)",
          opacity: hov ? 1 : 0.5, transition: "opacity 0.3s",
          borderRadius: "14px 0 0 14px",
        }} />

        <div style={{
          width: 88, height: 76, borderRadius: "10px", flexShrink: 0,
          margin: "12px 0",
          background: "linear-gradient(135deg, rgba(" + accentRGB + ",0.15) 0%, rgba(0,0,0,0.3) 100%)",
          border: "1px solid rgba(" + accentRGB + ",0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", position: "relative",
        }}>
          {event.poster ? (
            <img src={event.poster} alt="event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid " + event.accent, margin: "0 auto 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: event.accent }} />
              </div>
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.48rem", color: event.accent, letterSpacing: "0.1em", opacity: 0.8 }}>EVENT</span>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0, padding: "12px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
            <HoloBadge text={event.tag} color={event.accent} />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
              {event.date} · {event.time}
            </span>
          </div>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: "0.72rem", fontWeight: 600,
            color: hov ? "#fff" : "rgba(255,255,255,0.78)",
            margin: "0 0 6px", lineHeight: 1.55, transition: "color 0.2s",
          }}>{event.title}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)" }}>📍</span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>{event.location}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: 10, padding: "12px 16px 12px 0", flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em",
              padding: "7px 14px", borderRadius: "8px",
              background: hov ? "rgba(" + accentRGB + ",0.18)" : "transparent",
              border: "1px solid " + event.accent,
              color: event.accent, cursor: "pointer",
              transition: "all 0.2s", textTransform: "uppercase",
              boxShadow: hov ? "0 0 16px rgba(" + accentRGB + ",0.3)" : "none",
              whiteSpace: "nowrap",
            }}
          >View Details</button>

          <div style={{ display: "flex", alignItems: "center" }}>
            {["#4f8ef7", "#a855f7", "#00d4ff"].map((c, j) => (
              <div key={j} style={{
                width: 20, height: 20, borderRadius: "50%",
                background: c, border: "1.5px solid #03050a",
                marginLeft: j === 0 ? 0 : -6,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.42rem", color: "#fff", fontWeight: 700,
                fontFamily: "'Rajdhani', sans-serif",
              }}>
                {String.fromCharCode(65 + j)}
              </div>
            ))}
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.52rem", color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>+4</span>
          </div>
        </div>
      </div>

      {showModal && <EventModal event={event} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 10%, #060e24 0%, #030509 60%, #020307 100%)",
      position: "relative", overflow: "hidden", padding: "64px 0 80px",
    }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ParticleField />
      </div>

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, zIndex: 0 }}>
        <defs>
          <pattern id="maingrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00d4ff" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#maingrid)" />
      </svg>

      <div style={{ position: "absolute", top: "25%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.08) 30%, rgba(168,85,247,0.08) 70%, transparent 100%)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "75%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.06) 50%, transparent 100%)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.5))" }} />
            <div style={{ display: "flex", gap: 4 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 4, height: 4, background: i === 1 ? "#00d4ff" : "rgba(0,212,255,0.3)", transform: "rotate(45deg)", boxShadow: i === 1 ? "0 0 8px #00d4ff" : "none" }} />
              ))}
            </div>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.5))" }} />
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.5em",
              textShadow: "0 0 40px rgba(0,212,255,0.35), 0 0 80px rgba(0,212,255,0.1)",
            }}>EVENTS</h1>
            <h1 aria-hidden style={{
              fontFamily: "'Cinzel', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 900, margin: 0, letterSpacing: "0.5em",
              position: "absolute", top: 0, left: 0,
              color: "#00d4ff", opacity: 0.04, transform: "translateX(2px)", pointerEvents: "none",
            }}>EVENTS</h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10 }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,212,255,0.2))" }} />
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.58rem", color: "rgba(0,212,255,0.4)", letterSpacing: "0.35em" }}>TRANSMISSION::ACTIVE</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,212,255,0.2))" }} />
          </div>
        </div>

        <FeaturedSlider />

        <div style={{
          display: "flex", gap: 2, marginBottom: 20,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px", padding: "4px",
        }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => { setActiveTab(i); setShowAll(false); }} style={{
              flex: 1, fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em",
              padding: "8px 12px", borderRadius: "7px",
              background: activeTab === i
                ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.1))"
                : "transparent",
              border: activeTab === i ? "1px solid rgba(0,212,255,0.25)" : "1px solid transparent",
              color: activeTab === i ? "#00d4ff" : "rgba(255,255,255,0.35)",
              cursor: "pointer", transition: "all 0.25s", textTransform: "uppercase",
              boxShadow: activeTab === i ? "0 0 16px rgba(0,212,255,0.1)" : "none",
            }}
              onMouseEnter={e => { if (activeTab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={e => { if (activeTab !== i) e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >{tab}</button>
          ))}
        </div>

        <div>
          {(() => {
            const filtered = TABS[activeTab] === "All Events"
              ? [...EVENTS]
              : EVENTS.filter(e => e.category === TABS[activeTab]);
            const sorted = filtered.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
            const displayed = showAll ? sorted : sorted.slice(0, 4);

            if (sorted.length === 0) {
              return (
                <div style={{
                  textAlign: "center", padding: "48px 24px",
                  border: "1px dashed rgba(0,212,255,0.15)",
                  borderRadius: "14px", background: "rgba(0,212,255,0.02)",
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: 12 }}>🛸</div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", color: "rgba(0,212,255,0.5)", letterSpacing: "0.08em" }}>
                    {"Stay tuned for " + TABS[activeTab] + " events."}
                  </p>
                </div>
              );
            }
            return displayed.map((event, i) => (
              <EventRow key={event.id} event={event} index={i} />
            ));
          })()}
        </div>

        {(() => {
          const filtered = TABS[activeTab] === "All Events"
            ? EVENTS
            : EVENTS.filter(e => e.category === TABS[activeTab]);
          if (filtered.length <= 4) return null;
          return (
            <div style={{ textAlign: "center", marginTop: "36px" }}>
              <button
                onClick={() => setShowAll(s => !s)}
                style={{
                  fontFamily: "'Cinzel', serif", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  padding: "12px 36px", borderRadius: "8px", background: "transparent",
                  border: "1px solid rgba(0,212,255,0.3)", color: "rgba(0,212,255,0.8)",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(0,212,255,0.08)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.6)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
                }}
              >
                {showAll ? "Show Less" : "View All Events (" + filtered.length + ")"}
              </button>
            </div>
          );
        })()}
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
        @keyframes glowPulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.3; }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>
    </div>
  );
}
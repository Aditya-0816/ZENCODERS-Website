import { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["Home", "Academic", "FAQ", "About", "Contact Us"];

function HamburgerIcon({ open }) {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer" style={{ width: 32, height: 32 }}>
      <span style={{
        display: "block", width: "22px", height: "2px", background: "#C9A84C", marginBottom: "5px",
        transform: open ? "translateY(7px) rotate(45deg)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }} />
      <span style={{
        display: "block", width: "22px", height: "2px", background: "#C9A84C", marginBottom: "5px",
        opacity: open ? 0 : 1,
        transition: "opacity 0.2s ease",
      }} />
      <span style={{
        display: "block", width: "22px", height: "2px", background: "#C9A84C",
        transform: open ? "translateY(-7px) rotate(-45deg)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }} />
    </div>
  );
}

function ZenLogo({ size = 120, goldColor = "#C9A84C" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const inner = 28, outer = i % 3 === 0 ? 52 : 42;
        return (
          <line key={i}
            x1={60 + inner * Math.cos(angle - Math.PI / 2)} y1={60 + inner * Math.sin(angle - Math.PI / 2)}
            x2={60 + outer * Math.cos(angle - Math.PI / 2)} y2={60 + outer * Math.sin(angle - Math.PI / 2)}
            stroke={goldColor} strokeWidth={i % 3 === 0 ? 1.5 : 0.8} strokeLinecap="round"
          />
        );
      })}
      <path d="M30 72 Q30 38 60 38 Q90 38 90 72" stroke={goldColor} strokeWidth="2" fill="none" />
      <line x1="30" y1="72" x2="30" y2="88" stroke={goldColor} strokeWidth="2" />
      <line x1="90" y1="72" x2="90" y2="88" stroke={goldColor} strokeWidth="2" />
      <path d="M40 72 Q40 50 60 50 Q80 50 80 72" stroke={goldColor} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="60" cy="38" r="8" stroke={goldColor} strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="38" r="3" fill={goldColor} opacity="0.8" />
      <path d="M22 84 Q35 78 48 82 Q55 80 60 82 Q65 80 72 82 Q85 78 98 84" stroke={goldColor} strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M28 90 Q42 84 55 87 Q60 85 65 87 Q78 84 92 90" stroke={goldColor} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

function StarField() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.25 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.twinkle += s.twinkleSpeed;
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

export default function Hero() {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [winHeight, setWinHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (winHeight * 0.6), 1);
      setScrollProgress(progress);
      if (progress > 0.05) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [winHeight]);

  const isMobile = winWidth < 768;
  const heroLogoSize = isMobile ? 100 : 120;
  const navLogoSize = 36;
  const logoSize = heroLogoSize + (navLogoSize - heroLogoSize) * scrollProgress;

  const heroTop = winHeight * 0.22;
  const heroCenterX = winWidth / 2;
  const navTop = 12;
  const navLeft = 32;

  const logoTop = heroTop + (navTop - heroTop) * scrollProgress;
  const logoLeft = heroCenterX + (navLeft - heroCenterX) * scrollProgress;
  const translateX = `${-50 * (1 - scrollProgress)}%`;
  const textOpacity = 1 - scrollProgress * 2;

  return (
    <div className="relative" style={{ background: "radial-gradient(ellipse at 50% 40%, #0a0f1e 0%, #030508 100%)", minHeight: "200vh" }}>
      <StarField />

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "32px",
          paddingRight: "32px",
          background: scrollProgress > 0.1 ? `rgba(3,5,8,${scrollProgress * 0.88})` : "transparent",
          backdropFilter: scrollProgress > 0.1 ? "blur(10px)" : "none",
          transition: "background 0.3s",
          borderBottom: scrollProgress > 0.5 ? `1px solid rgba(201,168,76,${(scrollProgress - 0.5) * 0.4})` : "1px solid transparent",
        }}
      >
        {/* Left: logo placeholder */}
        <div style={{ width: navLogoSize, height: navLogoSize, flexShrink: 0 }} />

        {/* Right: desktop nav links */}
        <ul
          className="hidden md:flex items-center"
          style={{ fontFamily: "'Cinzel', serif", listStyle: "none", margin: 0, padding: 0, gap: "2.5rem" }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "#C9A84C"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.92)"}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: hamburger on mobile only */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* ── MOBILE BACKDROP ── */}
      <div
        className="md:hidden fixed inset-0"
        style={{
          zIndex: 45,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className="md:hidden fixed top-0 right-0 flex flex-col"
        style={{
          zIndex: 50,
          width: "72vw",
          maxWidth: "290px",
          height: "100vh",
          background: "linear-gradient(160deg, #07101f 0%, #020508 100%)",
          borderLeft: "1px solid rgba(201,168,76,0.2)",
          boxShadow: menuOpen ? "-8px 0 40px rgba(0,0,0,0.6)" : "none",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingTop: "70px",
          paddingLeft: "28px",
          paddingRight: "28px",
          paddingBottom: "36px",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: "18px", right: "20px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(201,168,76,0.65)", fontSize: "1.2rem", lineHeight: 1, padding: 4,
          }}
          aria-label="Close menu"
        >✕</button>

        <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #C9A84C 0%, transparent 100%)", marginBottom: "1.8rem" }} />

        <nav>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.92rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.82)",
                padding: "0.9rem 0",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                textDecoration: "none",
                transition: `color 0.2s ease, padding-left 0.2s ease, opacity 0.35s ease ${i * 55 + 80}ms, transform 0.35s ease ${i * 55 + 80}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.paddingLeft = "10px"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.82)"; e.currentTarget.style.paddingLeft = "0"; }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)" }} />
          <ZenLogo size={42} goldColor="rgba(201,168,76,0.45)" />
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.58rem", letterSpacing: "0.28em", color: "rgba(201,168,76,0.4)", margin: 0 }}>
            CODE YOUR DREAMS
          </p>
        </div>
      </div>

      {/* ── FLOATING LOGO ── */}
      <div
        style={{
          position: "fixed",
          zIndex: 50,
          top: `${logoTop}px`,
          left: `${logoLeft}px`,
          transform: `translateX(${translateX})`,
          pointerEvents: "none",
          filter: `drop-shadow(0 0 ${12 - scrollProgress * 8}px rgba(201,168,76,0.6))`,
        }}
      >
        <ZenLogo size={logoSize} />
      </div>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative flex flex-col items-center justify-center"
        style={{ minHeight: "100vh", zIndex: 10, pointerEvents: "none" }}
      >
        <div style={{ height: heroLogoSize + 20 }} />

        <h1 className="text-center mt-4" style={{
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
          fontSize: "clamp(2rem, 6vw, 5rem)",
          fontWeight: 700, color: "#fff", letterSpacing: "0.25em",
          opacity: Math.max(textOpacity, 0),
          textShadow: "0 0 40px rgba(201,168,76,0.25), 0 2px 8px rgba(0,0,0,0.8)",
          lineHeight: 1.1,
        }}>
          ZENCODERS
        </h1>

        <p className="text-center mt-4 uppercase font-bold" style={{
          fontFamily: "'Rajdhani', sans-serif", color: "#C9A84C",
          letterSpacing: "0.35em", fontSize: "0.85rem",
          opacity: Math.max(textOpacity, 0),
          textShadow: "0 0 20px rgba(201,168,76,0.5)",
        }}>
          Code Your Dreams
        </p>

        <div style={{
          marginTop: "2rem", width: "120px", height: "1px",
          background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
          opacity: Math.max(textOpacity, 0),
        }} />

        <div className="mt-16 flex flex-col items-center gap-2" style={{ opacity: Math.max(textOpacity, 0) * 0.6 }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "#C9A84C", letterSpacing: "0.2em" }}>SCROLL</span>
          <svg viewBox="0 0 20 20" fill="none" style={{ width: 20, height: 20, animation: "bounce 1.5s infinite" }}>
            <path d="M5 7l5 5 5-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700&family=Rajdhani:wght@600&display=swap');
        body { margin: 0; overflow-x: hidden; }
        * { box-sizing: border-box; }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </div>
  );
}
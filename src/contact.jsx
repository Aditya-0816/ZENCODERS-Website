import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Home", "Academic", "FAQ", "About", "Contact Us"];

function HamburgerIcon({ open }) {
  return (
    <div style={{ width: 32, height: 32, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
      <span style={{ display: "block", width: "22px", height: "2px", background: "#C9A84C", marginBottom: "5px", transform: open ? "translateY(7px) rotate(45deg)" : "translateY(0)", transition: "transform 0.3s ease" }} />
      <span style={{ display: "block", width: "22px", height: "2px", background: "#C9A84C", marginBottom: "5px", opacity: open ? 0 : 1, transition: "opacity 0.2s ease" }} />
      <span style={{ display: "block", width: "22px", height: "2px", background: "#C9A84C", transform: open ? "translateY(-7px) rotate(-45deg)" : "translateY(0)", transition: "transform 0.3s ease" }} />
    </div>
  );
}

function StarField() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.twinkle += s.speed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

export default function Contact() {
  const [form, setForm]       = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [focused, setFocused] = useState(null);
  const [btnHov, setBtnHov]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const fields = [
    { name: "name",    placeholder: "Your name" },
    { name: "phone",   placeholder: "Your phone" },
    { name: "email",   placeholder: "Your e-mail" },
    { name: "message", placeholder: "Message", multiline: true },
  ];

  const linkHref = (link) => {
    if (link === "Contact Us") return "/contact";
    if (link === "Home") return "/";
    return "#";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 60%, #0d0d1a 0%, #07070f 40%, #030308 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <StarField />

      {/* Nebula blobs */}
      <div style={{ position: "fixed", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(60,30,120,0.15) 0%, transparent 70%)", top: "10%", left: "5%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 400, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,60,120,0.1) 0%, transparent 70%)", bottom: "5%", right: "10%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(80,20,100,0.08) 0%, transparent 70%)", top: "50%", right: "30%", pointerEvents: "none", zIndex: 0 }} />

      {/* Grid */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.025, pointerEvents: "none", zIndex: 0 }}>
        <defs><pattern id="cgrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#cgrid)" />
      </svg>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingLeft: "28px", paddingRight: "32px",
        background: "rgba(3,5,8,0.88)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, overflow: "hidden", flexShrink: 0 }}>
            <img src="/assets/Zenlogo.png" alt="ZenCoders" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.currentTarget.style.display = "none"; }} />
          </div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.95rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.22em", whiteSpace: "nowrap", textShadow: "0 0 16px rgba(201,168,76,0.4)" }}>ZENCODERS</span>
        </div>
        <ul style={{ display: winWidth >= 768 ? "flex" : "none", alignItems: "center", fontFamily: "'Cinzel', serif", listStyle: "none", margin: 0, padding: 0, gap: "2.5rem" }}>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              {link === "Contact Us" || link === "Home" ? (
                <Link to={linkHref(link)} style={{ color: link === "Contact Us" ? "#C9A84C" : "rgba(255,255,255,0.92)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.14em", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C9A84C"}
                  onMouseLeave={e => e.currentTarget.style.color = link === "Contact Us" ? "#C9A84C" : "rgba(255,255,255,0.92)"}
                >{link}</Link>
              ) : (
                <a href="#" style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.14em", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C9A84C"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.92)"}
                >{link}</a>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: winWidth >= 768 ? "none" : "flex", alignItems: "center" }} aria-label="Toggle menu">
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile backdrop */}
      {winWidth < 768 && (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 45, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none", transition: "opacity 0.3s ease" }} />
      )}

      {/* Mobile drawer */}
      {winWidth < 768 && (
        <div style={{ position: "fixed", top: 0, right: 0, zIndex: 50, width: "72vw", maxWidth: "290px", height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(160deg, #07101f 0%, #020508 100%)", borderLeft: "1px solid rgba(201,168,76,0.2)", transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)", paddingTop: "70px", paddingLeft: "28px", paddingRight: "28px", paddingBottom: "36px" }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "18px", right: "20px", background: "none", border: "none", cursor: "pointer", color: "rgba(201,168,76,0.65)", fontSize: "1.2rem", lineHeight: 1, padding: 4 }}>✕</button>
          <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #C9A84C 0%, transparent 100%)", marginBottom: "1.8rem" }} />
          <nav>
            {NAV_LINKS.map((link, i) => (
              link === "Contact Us" || link === "Home" ? (
                <Link key={link} to={linkHref(link)} onClick={() => setMenuOpen(false)} style={{ display: "block", fontFamily: "'Cinzel', serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.15em", color: link === "Contact Us" ? "#C9A84C" : "rgba(255,255,255,0.82)", padding: "0.9rem 0", borderBottom: "1px solid rgba(201,168,76,0.1)", textDecoration: "none", opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(20px)", transition: `color 0.2s ease, opacity 0.35s ease ${i * 55 + 80}ms, transform 0.35s ease ${i * 55 + 80}ms` }}>{link}</Link>
              ) : (
                <a key={link} href="#" onClick={() => setMenuOpen(false)} style={{ display: "block", fontFamily: "'Cinzel', serif", fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.82)", padding: "0.9rem 0", borderBottom: "1px solid rgba(201,168,76,0.1)", textDecoration: "none", opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(20px)", transition: `color 0.2s ease, opacity 0.35s ease ${i * 55 + 80}ms, transform 0.35s ease ${i * 55 + 80}ms` }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.82)"; }}
                >{link}</a>
              )
            ))}
          </nav>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "stretch", padding: "80px 48px 60px", gap: 0, position: "relative", zIndex: 10 }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ flex: "0 0 42%", paddingRight: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 28px", lineHeight: 1.1 }}>CONTACT</h1>

          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", color: "rgb(255,255,255)", lineHeight: 1.85, letterSpacing: "0.02em", margin: "0 0 48px", maxWidth: 360 }}>
            Have an idea, a question, or want to collaborate? ZenCoders is always open to new conversations. Reach out and we'll get back to you as soon as possible.
          </p>

          {/* FIX 1: Both campuses under one Address label, no gap between them */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 4px" }}>Address</p>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem", color: "hsl(0,0%,100%)", margin: "0 0 2px", letterSpacing: "0.04em" }}>JIIT Campus, Sector 62, Noida</p>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem", color: "hsl(0,0%,100%)", margin: 0, letterSpacing: "0.04em" }}>JIIT Campus, Sector 128, Noida</p>
            </div>
            {[
              { label: "Email",     value: "zencodersmanagement@gmail.com" },
              { label: "Instagram", value: "@zencodersjiit" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem", color: "hsl(0,0%,100%)", margin: 0, letterSpacing: "0.04em" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
            {[
              { label: "LinkedIn",  href: "https://linkedin.com",  svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(208,170,65,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 016 0v4"/></svg> },
              { label: "GitHub",    href: "https://github.com",    svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(201,168,76,0.6)"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.73 1.04A9.3 9.3 0 0112 7.43c.84 0 1.69.12 2.48.34 1.9-1.31 2.73-1.04 2.73-1.04.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.27 10.27 0 0022 12.26C22 6.58 17.52 2 12 2z"/></svg> },
              { label: "Instagram", href: "https://instagram.com", svg: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="rgba(201,168,76,0.6)" stroke="none"/></svg> },
            ].map(({ label, href, svg }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
              >{svg}</a>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.18) 20%, rgba(201,168,76,0.18) 80%, transparent)", alignSelf: "stretch", flexShrink: 0 }} />

        {/* ── RIGHT PANEL ── */}
        <div style={{ flex: 1, paddingLeft: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 32px", lineHeight: 1.1 }}>CONTACT FORM</h2>

          {/* FIX 2: Card with no extra right space — form fields full width, button inside card bounds */}
          <div style={{
            background: "linear-gradient(145deg, rgba(18,18,34,0.96) 0%, rgba(11,11,22,0.98) 100%)",
            border: "1px solid rgba(201,168,76,0.12)",
            borderRadius: 4,
            padding: "32px 32px 0 32px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.06)",
            position: "relative",
            overflow: "visible",
          }}>
            {/* Shimmer top edge */}
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
              {/* FIX 2a: fields full width, centered within card */}
              {fields.map(({ name, placeholder, multiline }) => (
                <div key={name} style={{ marginBottom: 6 }}>
                  {multiline ? (
                    <textarea
                      name={name} value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      placeholder={placeholder} rows={1}
                      style={{
                        width: "100%", background: "transparent", border: "none",
                        borderBottom: `1px solid ${focused === name ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.5)"}`,
                        color: "#fff", fontSize: "0.78rem", letterSpacing: "0.04em",
                        padding: "14px 0 10px", outline: "none", resize: "none",
                        fontFamily: "'Rajdhani', sans-serif",
                        transition: "border-color 0.25s", boxSizing: "border-box",
                      }}
                    />
                  ) : (
                    <input
                      type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
                      name={name} value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused(null)}
                      placeholder={placeholder}
                      style={{
                        width: "100%", background: "transparent", border: "none",
                        borderBottom: `1px solid ${focused === name ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.5)"}`,
                        color: "#fff", fontSize: "0.78rem", letterSpacing: "0.04em",
                        padding: "14px 0 10px", outline: "none",
                        fontFamily: "'Rajdhani', sans-serif",
                        transition: "border-color 0.25s", boxSizing: "border-box",
                      }}
                    />
                  )}
                </div>
              ))}

              {/* FIX 3: Button stays inside card, protrudes DOWN on hover */}
              <div style={{
                marginTop: 28,
                transform: btnHov ? "translateY(8px)" : "translateY(0px)",
                transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}>
                <button
                  type="submit"
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  style={{
                    width: "50%",
                    background: btnHov ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderTop: "none",
                    color: btnHov ? "#C9A84C" : "rgba(255,255,255,0.75)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 700, padding: "16px 0",
                    cursor: "pointer",
                    fontFamily: "'Cinzel', serif",
                    transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                    borderRadius: "0 0 4px 4px",
                    boxShadow: btnHov
                      ? "0 20px 50px rgba(0,0,0,0.7), 0 6px 20px rgba(0,0,0,0.5)"
                      : "0 4px 16px rgba(0,0,0,0.3)",
                    textShadow: btnHov ? "0 0 16px rgba(201,168,76,0.4)" : "none",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {sent ? "MESSAGE SENT ✓" : "SEND MESSAGE +"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%) rotate(90deg)", display: "flex", alignItems: "center", gap: 10, zIndex: 10 }}>
        <div style={{ width: 32, height: "1px", background: "rgba(201,168,76,0.2)" }} />
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.52rem", color: "rgba(201,168,76,0.25)", letterSpacing: "0.25em", textTransform: "uppercase" }}>SCROLL</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
        input::placeholder, textarea::placeholder {
          color: rgb(255,255,255,0.5);
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          font-family: 'Rajdhani', sans-serif;
        }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #0b0b16 inset;
          -webkit-text-fill-color: #fff;
        }
      `}</style>
    </div>
  );
}
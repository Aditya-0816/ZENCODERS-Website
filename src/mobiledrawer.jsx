// ── MobileDrawer.jsx ──────────────────────────────────────────────────────────
// Save this separately. When ready, import and add back into contact.jsx inside
// the main return, right after the Mobile backdrop block.
//
// Usage in contact.jsx:
//   import MobileDrawer from "./MobileDrawer";
//   ...
//   <MobileDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} winWidth={winWidth} NAV_LINKS={NAV_LINKS} linkHref={linkHref} />

import { Link } from "react-router-dom";

export default function MobileDrawer({ menuOpen, setMenuOpen, winWidth, NAV_LINKS, linkHref }) {
  return (
    <>
      {/* Mobile backdrop */}
      {winWidth < 768 && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 45,
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "all" : "none",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Mobile drawer */}
      {winWidth < 768 && (
        <div style={{
          position: "fixed", top: 0, right: 0, zIndex: 50,
          width: "72vw", maxWidth: "290px", height: "100vh",
          display: "flex", flexDirection: "column",
          background: "linear-gradient(160deg, #07101f 0%, #020508 100%)",
          borderLeft: "1px solid rgba(201,168,76,0.2)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
          paddingTop: "70px", paddingLeft: "28px", paddingRight: "28px", paddingBottom: "36px",
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", top: "18px", right: "20px",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(201,168,76,0.65)", fontSize: "1.2rem", lineHeight: 1, padding: 4,
            }}
          >✕</button>

          <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #C9A84C 0%, transparent 100%)", marginBottom: "1.8rem" }} />

          <nav>
            {NAV_LINKS.map((link, i) => (
              link === "Contact Us" || link === "Home" ? (
                <Link
                  key={link}
                  to={linkHref(link)}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block", fontFamily: "'Cinzel', serif",
                    fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.15em",
                    color: link === "Contact Us" ? "#C9A84C" : "rgba(255,255,255,0.82)",
                    padding: "0.9rem 0",
                    borderBottom: "1px solid rgba(201,168,76,0.1)", textDecoration: "none",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                    transition: `color 0.2s ease, opacity 0.35s ease ${i * 55 + 80}ms, transform 0.35s ease ${i * 55 + 80}ms`,
                  }}
                >{link}</Link>
              ) : (
                <a
                  key={link}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block", fontFamily: "'Cinzel', serif",
                    fontSize: "0.92rem", fontWeight: 700, letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.82)", padding: "0.9rem 0",
                    borderBottom: "1px solid rgba(201,168,76,0.1)", textDecoration: "none",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                    transition: `color 0.2s ease, opacity 0.35s ease ${i * 55 + 80}ms, transform 0.35s ease ${i * 55 + 80}ms`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.82)"; }}
                >{link}</a>
              )
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
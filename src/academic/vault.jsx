import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/* ─── Google Fonts injected once ─────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.head.querySelector("[href*='Orbitron']")) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Exo+2:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const PYQ_DATA = [
  { title: "Data Structures & Algorithms", subject: "CS301", type: "PYQ", year: "2023", size: "2.4 MB" },
  { title: "Operating Systems", subject: "CS401", type: "PYQ", year: "2023", size: "1.8 MB" },
  { title: "Database Management Systems", subject: "CS302", type: "PYQ", year: "2022", size: "3.1 MB" },
  { title: "Computer Networks", subject: "CS403", type: "PYQ", year: "2023", size: "2.0 MB" },
  { title: "Theory of Computation", subject: "CS501", type: "PYQ", year: "2022", size: "1.5 MB" },
  { title: "Software Engineering", subject: "CS304", type: "PYQ", year: "2021", size: "2.7 MB" },
];

const PPT_DATA = [
  { title: "Introduction to Machine Learning", subject: "AI/ML Elective", type: "LECTURE PPT", year: "Sem 6", size: "8.2 MB" },
  { title: "Web Development Fundamentals", subject: "CS Lab", type: "LECTURE PPT", year: "Sem 4", size: "5.4 MB" },
  { title: "Cloud Computing Architecture", subject: "CS Elective", type: "LECTURE PPT", year: "Sem 7", size: "6.8 MB" },
  { title: "Compiler Design", subject: "CS502", type: "LECTURE PPT", year: "Sem 5", size: "4.1 MB" },
  { title: "Discrete Mathematics", subject: "MA201", type: "LECTURE PPT", year: "Sem 2", size: "3.9 MB" },
  { title: "Computer Architecture", subject: "CS201", type: "LECTURE PPT", year: "Sem 3", size: "7.3 MB" },
];

const EVENT_DATA = [
  { title: "HackZen 2024 – Problem Statements", subject: "Annual Hackathon", type: "EVENT PPT", year: "2024", size: "12.4 MB" },
  { title: "CodeQuest Workshop Slides", subject: "Competitive Programming", type: "WORKSHOP", year: "Mar 2024", size: "5.6 MB" },
  { title: "Web Dev Bootcamp Materials", subject: "React + Node.js", type: "BOOTCAMP", year: "Jan 2024", size: "18.1 MB" },
  { title: "Tech Talk: AI & Future of Code", subject: "Guest Lecture", type: "SEMINAR", year: "Nov 2023", size: "3.3 MB" },
  { title: "Open Source Contribution Guide", subject: "GitHub Workshop", type: "WORKSHOP", year: "Sep 2023", size: "2.1 MB" },
  { title: "Placement Prep Series – DSA", subject: "Career Track", type: "EVENT PPT", year: "2024", size: "9.7 MB" },
];

const CARD_COLORS = {
  "PYQ": "#7c3aed",
  "LECTURE PPT": "#3b82f6",
  "EVENT PPT": "#f472b6",
  "WORKSHOP": "#f59e0b",
  "BOOTCAMP": "#10b981",
  "SEMINAR": "#06b6d4",
};

/* ─── Starfield Canvas ────────────────────────────────────────────────────── */
function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random(),
      delta: (Math.random() * 0.012 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.delta;
        if (s.alpha >= 1 || s.alpha <= 0) s.delta *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${Math.max(0, Math.min(1, s.alpha))})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 0,
        pointerEvents: "none", width: "100vw", height: "100vh",
      }}
    />
  );
}

/* ─── Nebula Orbs ─────────────────────────────────────────────────────────── */
function NebulaOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[
        { style: { top: "-15%", left: "-10%" }, color: "rgba(99,60,180,0.22)", size: 500 },
        { style: { top: "40%", right: "-15%" }, color: "rgba(20,100,200,0.18)", size: 600 },
        { style: { bottom: "-10%", left: "30%" }, color: "rgba(160,40,120,0.15)", size: 450 },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: o.size, height: o.size, borderRadius: "50%",
            background: `radial-gradient(circle,${o.color} 0%,transparent 70%)`,
            ...o.style,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Header ──────────────────────────────────────────────────────── */
function SectionHeader({ icon, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      style={{ textAlign: "center", marginBottom: 44 }}
    >
      <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>
      <h2 style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "clamp(1.5rem,4vw,2.2rem)",
        background: "linear-gradient(135deg,#a78bfa,#60a5fa,#f472b6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: 2, margin: 0,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: "'Exo 2',sans-serif", color: "#94a3b8", marginTop: 8, fontSize: "0.9rem" }}>
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          height: 2, marginTop: 16,
          background: "linear-gradient(90deg,transparent,#7c3aed,#3b82f6,transparent)",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

/* ─── Resource Card ───────────────────────────────────────────────────────── */
function ResourceCard({ title, subject, type, year, size, delay = 0 }) {
  const color = CARD_COLORS[type] || "#7c3aed";
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? color : "rgba(255,255,255,0.09)"}`,
        borderRadius: 16,
        padding: "22px 20px",
        cursor: "pointer",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 0 28px ${color}44` : "none",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, right: 0, width: 80, height: 80,
        background: `radial-gradient(circle at top right,${color}20,transparent 70%)`,
        borderRadius: "0 16px 0 0", pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "'Orbitron',sans-serif", fontSize: "0.6rem", letterSpacing: 1,
          padding: "3px 10px", borderRadius: 20,
          background: `${color}22`, color, border: `1px solid ${color}44`,
        }}>
          {type}
        </span>
        {year && (
          <span style={{ color: "#64748b", fontSize: "0.74rem", fontFamily: "'Exo 2',sans-serif" }}>
            {year}
          </span>
        )}
      </div>

      <h3 style={{
        fontFamily: "'Orbitron',sans-serif",
        fontSize: "0.86rem", color: "#e2e8f0", margin: "0 0 4px", lineHeight: 1.5,
      }}>
        {title}
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.78rem", fontFamily: "'Exo 2',sans-serif", margin: 0 }}>
        {subject}
      </p>
      {size && (
        <p style={{ color: "#475569", fontSize: "0.72rem", marginTop: 6, fontFamily: "'Exo 2',sans-serif" }}>
          📦 {size}
        </p>
      )}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.2 }}
        style={{
          marginTop: 14, color, fontSize: "0.78rem",
          fontFamily: "'Exo 2',sans-serif", fontWeight: 600,
        }}
      >
        ↓ Download
      </motion.div>
    </motion.div>
  );
}

/* ─── Filter Pills ────────────────────────────────────────────────────────── */
function FilterPills({ options, active, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
      {options.map((o) => (
        <motion.button
          key={o}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(o)}
          style={{
            fontFamily: "'Orbitron',sans-serif", fontSize: "0.68rem", letterSpacing: 1,
            padding: "8px 18px", borderRadius: 30, cursor: "pointer",
            border: `1px solid ${active === o ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
            background: active === o ? "linear-gradient(135deg,#7c3aed,#3b82f6)" : "rgba(255,255,255,0.04)",
            color: active === o ? "#fff" : "#94a3b8",
            transition: "all 0.25s ease",
          }}
        >
          {o}
        </motion.button>
      ))}
    </div>
  );
}

/* ─── Orbital Divider ─────────────────────────────────────────────────────── */
function OrbitalDivider({ color = "#7c3aed", rtl = false }) {
  return (
    <div style={{ position: "relative", height: 56, overflow: "hidden", margin: "20px 0 50px" }}>
      <div style={{
        position: "absolute", top: "50%", left: "12%", right: "12%", height: 1,
        background: `linear-gradient(90deg,transparent,${color}55,transparent)`,
        transform: "translateY(-50%)",
      }} />
      <motion.div
        animate={{ x: rtl ? ["80vw", "-5vw"] : ["-5vw", "80vw"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", top: "50%",
          width: 7, height: 7, borderRadius: "50%",
          background: color, boxShadow: `0 0 14px ${color}`,
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      style={{
        y, opacity,
        minHeight: "88vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 1, padding: "0 24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Planet */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 36 }}>
          {/* Floating planet */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 110, height: 110, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%,#a78bfa,#4c1d95 55%,#0f0728)",
              boxShadow: "0 0 60px rgba(124,58,237,0.6), inset -15px -15px 30px rgba(0,0,0,0.6)",
              margin: "0 auto", position: "relative",
            }}
          >
            <div style={{
              position: "absolute", top: "22%", left: "18%",
              width: "32%", height: "18%", borderRadius: "50%",
              background: "rgba(255,255,255,0.14)", transform: "rotate(-20deg)",
            }} />
          </motion.div>
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: 170, height: 36,
              border: "2px solid rgba(167,139,250,0.35)",
              borderRadius: "50%",
              transform: "translate(-50%,-50%) rotateX(72deg)",
              pointerEvents: "none",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p style={{
            fontFamily: "'Orbitron',sans-serif",
            color: "#7c3aed", letterSpacing: 5, fontSize: "0.72rem", marginBottom: 14,
          }}>
            ✦ ZENCODERS KNOWLEDGE VAULT ✦
          </p>

          <h1 style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: "clamp(2.4rem,8vw,5.5rem)",
            lineHeight: 1.08, marginBottom: 20, margin: "0 0 20px",
            background: "linear-gradient(135deg,#e2e8f0 0%,#a78bfa 40%,#60a5fa 70%,#f472b6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            ACADEMIC<br />UNIVERSE
          </h1>

          <p style={{
            fontFamily: "'Exo 2',sans-serif",
            color: "#94a3b8", maxWidth: 460, margin: "0 auto 38px",
            fontSize: "1rem", lineHeight: 1.75,
          }}>
            Navigate the cosmos of knowledge. Past papers, lecture slides, and event materials — all orbiting in one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          {[
            { label: "📄 PYQ Papers", href: "#pyq", color: "#7c3aed" },
            { label: "📊 Lecture PPTs", href: "#ppts", color: "#3b82f6" },
            { label: "🚀 Event Material", href: "#events", color: "#f472b6" },
          ].map((btn) => (
            <a key={btn.href} href={btn.href} style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 26px ${btn.color}55` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "'Orbitron',sans-serif", fontSize: "0.7rem", letterSpacing: 1,
                  padding: "12px 26px", borderRadius: 30, cursor: "pointer",
                  border: `1px solid ${btn.color}`,
                  background: `${btn.color}18`, color: "#e2e8f0",
                  transition: "box-shadow 0.3s",
                }}
              >
                {btn.label}
              </motion.button>
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── Stats ───────────────────────────────────────────────────────────────── */
function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const items = [
    { value: "120+", label: "PYQ Papers", icon: "📄" },
    { value: "80+", label: "Lecture Slides", icon: "📊" },
    { value: "25+", label: "Event Materials", icon: "🚀" },
    { value: "500+", label: "Students Helped", icon: "🌌" },
  ];
  return (
    <section ref={ref} style={{ position: "relative", zIndex: 1, padding: "0 24px 60px" }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16,
      }}>
        {items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
              textAlign: "center", padding: "24px 12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.7rem", color: "#a78bfa" }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "'Exo 2',sans-serif", color: "#64748b", fontSize: "0.78rem", marginTop: 4 }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contribute CTA ──────────────────────────────────────────────────────── */
function ContributeCTA() {
  return (
    <section style={{ padding: "60px 24px", maxWidth: 700, margin: "0 auto 80px", textAlign: "center", position: "relative", zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(59,130,246,0.08))",
          border: "1px solid rgba(124,58,237,0.25)",
          borderRadius: 24, padding: "48px 32px",
        }}
      >
        <div style={{ fontSize: 46, marginBottom: 14 }}>🛸</div>
        <h2 style={{
          fontFamily: "'Orbitron',sans-serif", fontSize: "1.4rem",
          background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", marginBottom: 14,
        }}>
          Contribute to the Universe
        </h2>
        <p style={{
          color: "#94a3b8", lineHeight: 1.75, marginBottom: 28,
          fontSize: "0.92rem", fontFamily: "'Exo 2',sans-serif",
        }}>
          Have notes, slides, or PYQs that could help fellow coders?
          Upload your materials and expand our galactic library!
        </p>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'Orbitron',sans-serif", fontSize: "0.72rem", letterSpacing: 1,
            padding: "14px 38px", borderRadius: 30, cursor: "pointer", border: "none",
            background: "linear-gradient(135deg,#7c3aed,#3b82f6)", color: "#fff",
          }}
        >
          ⬡ UPLOAD RESOURCES
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      background: "rgba(255,255,255,0.015)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "60px 40px 40px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 44, marginBottom: 50,
        }}>
          <div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, fontSize: "1.2rem", marginBottom: 12 }}>
              <span style={{ color: "#a78bfa" }}>ZEN</span>
              <span style={{ color: "#60a5fa" }}>CODERS</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.7, fontFamily: "'Exo 2',sans-serif" }}>
              The coding club that launched into the void and brought back knowledge for everyone.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {["𝕏", "in", "GH", "YT"].map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#64748b", fontSize: "0.72rem", cursor: "pointer",
                  }}
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </div>

          {[
            { title: "Academic", links: ["PYQ Papers", "Lecture PPTs", "Event Materials", "Lab Manuals"] },
            { title: "Club", links: ["About Us", "Team", "Events", "Join ZenCoders"] },
            { title: "Contact", links: ["Discord Server", "Email Us", "Instagram", "College Portal"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: "'Orbitron',sans-serif", fontSize: "0.7rem",
                color: "#a78bfa", letterSpacing: 2, marginBottom: 16, margin: "0 0 16px",
              }}>
                {col.title}
              </h4>
              {col.links.map((l) => (
                <a
                  key={l} href="#"
                  style={{
                    display: "block", color: "#64748b", textDecoration: "none",
                    fontSize: "0.83rem", marginBottom: 10,
                    fontFamily: "'Exo 2',sans-serif", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#94a3b8")}
                  onMouseLeave={(e) => (e.target.style.color = "#64748b")}
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 26,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
        }}>
          <p style={{ color: "#374151", fontSize: "0.76rem", fontFamily: "'Exo 2',sans-serif", margin: 0 }}>
            © 2024 ZenCoders. Crafted somewhere in the cosmos. 🌌
          </p>
          <p style={{ color: "#374151", fontSize: "0.76rem", fontFamily: "'Exo 2',sans-serif", margin: 0 }}>
            Built with React · Framer Motion · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────────── */
export default function AcademicPage() {
  const [pyqFilter, setPyqFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");

  const pyqYears = ["All", "2023", "2022", "2021"];
  const eventTypes = ["All", "EVENT PPT", "WORKSHOP", "BOOTCAMP", "SEMINAR"];

  const filteredPYQ = pyqFilter === "All" ? PYQ_DATA : PYQ_DATA.filter((d) => d.year === pyqFilter);
  const filteredEvents = eventFilter === "All" ? EVENT_DATA : EVENT_DATA.filter((d) => d.type === eventFilter);

  return (
    <div
      style={{
        background: "#030712",
        minHeight: "100vh",
        color: "#e2e8f0",
        fontFamily: "'Exo 2', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Starfield />
      <NebulaOrbs />

      <div style={{ paddingTop: 80, position: "relative", zIndex: 1 }}>
        <Hero />
        <Stats />

        {/* PYQ */}
        <section id="pyq" style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader
            icon="📄"
            title="PAST YEAR QUESTIONS"
            subtitle="Explore the asteroid belt of previous exam papers — your best prep launchpad"
          />
          <FilterPills options={pyqYears} active={pyqFilter} onChange={setPyqFilter} />
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}
            >
              {filteredPYQ.map((d, i) => (
                <motion.div
                  key={d.title} layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ResourceCard {...d} delay={i * 0.06} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        <OrbitalDivider color="#7c3aed" />

        {/* PPTs */}
        <section id="ppts" style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader
            icon="📊"
            title="COLLEGE LECTURE PPTs"
            subtitle="Beam down the lecture slides from across the academic galaxy"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}>
            {PPT_DATA.map((d, i) => (
              <ResourceCard key={d.title} {...d} delay={i * 0.07} />
            ))}
          </div>
        </section>

        <OrbitalDivider color="#f472b6" rtl />

        {/* Events */}
        <section id="events" style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader
            icon="🚀"
            title="EVENT MATERIAL"
            subtitle="Launch into hackathons, workshops & seminars — all mission files archived here"
          />
          <FilterPills options={eventTypes} active={eventFilter} onChange={setEventFilter} />
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 18 }}
            >
              {filteredEvents.map((d, i) => (
                <motion.div
                  key={d.title} layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ResourceCard {...d} delay={i * 0.07} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        <ContributeCTA />
        <Footer />
      </div>
    </div>
  );
}
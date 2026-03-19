import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform,
  useSpring, useInView, useMotionValue, useMotionTemplate,
  animate, stagger,
} from "framer-motion";

/* ── Google Fonts ── */
if (typeof document !== "undefined" && !document.head.querySelector("[href*='Orbitron']")) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap";
  document.head.appendChild(link);
}

/* ── DATA ── */
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

const TYPE_META = {
  "PYQ":         { color: "#7c3aed", glow: "#7c3aed55", icon: "📄" },
  "LECTURE PPT": { color: "#3b82f6", glow: "#3b82f655", icon: "📊" },
  "EVENT PPT":   { color: "#f472b6", glow: "#f472b655", icon: "🚀" },
  "WORKSHOP":    { color: "#f59e0b", glow: "#f59e0b55", icon: "🔧" },
  "BOOTCAMP":    { color: "#10b981", glow: "#10b98155", icon: "💻" },
  "SEMINAR":     { color: "#06b6d4", glow: "#06b6d455", icon: "🎤" },
};

/* ─────────────────────────────────── STARFIELD ─────── */
function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random(), delta: (Math.random() * 0.008 + 0.002) * (Math.random() > .5 ? 1 : -1),
      speed: Math.random() * 0.05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.delta; s.y += s.speed;
        if (s.alpha >= 1 || s.alpha <= 0) s.delta *= -1;
        if (s.y > canvas.height) s.y = 0;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${Math.max(0, Math.min(1, s.alpha))})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed",top:0,left:0,zIndex:0,pointerEvents:"none",width:"100vw",height:"100vh" }} />;
}

/* ─────────────────────────────────── NEBULA ─────── */
function NebulaOrbs() {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden" }}>
      {[
        { pos:{ top:"-20%",left:"-15%" }, color:"rgba(99,60,180,0.28)", size:700 },
        { pos:{ top:"35%",right:"-20%" }, color:"rgba(20,100,200,0.22)", size:800 },
        { pos:{ bottom:"-15%",left:"25%" }, color:"rgba(160,40,120,0.18)", size:600 },
        { pos:{ top:"60%",left:"-5%" }, color:"rgba(6,182,212,0.12)", size:500 },
      ].map((o,i) => (
        <motion.div key={i}
          animate={{ scale:[1,1.15,1],opacity:[0.65,1,0.65],x:[0,10,0],y:[0,-10,0] }}
          transition={{ duration:9+i*2.5,repeat:Infinity,ease:"easeInOut",delay:i*1.5 }}
          style={{ position:"absolute",width:o.size,height:o.size,borderRadius:"50%",
            background:`radial-gradient(circle,${o.color} 0%,transparent 70%)`, ...o.pos }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────── 3D TILT CARD ─────── */
function TiltCard3D({ children, style, glowColor = "#7c3aed" }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  return (
    <motion.div ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle:"preserve-3d", transformPerspective:800, position:"relative", ...style }}
    >
      {/* Dynamic glow layer */}
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",zIndex:0,
          background:`radial-gradient(ellipse 60% 60% at ${glowX} ${glowY}, ${glowColor}30, transparent 70%)` }} />
      <div style={{ position:"relative", zIndex:1, height:"100%" }}>{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────── FLIP CARD ─────── */
function FlipCard({ data }) {
  const [flipped, setFlipped] = useState(false);
  const meta = TYPE_META[data.type] || TYPE_META["PYQ"];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:50, rotateX:-15 }}
      animate={inView ? { opacity:1, y:0, rotateX:0 } : {}}
      transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
      style={{ perspective:1000, height:200, cursor:"pointer" }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{ position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d" }}
      >
        {/* FRONT */}
        <TiltCard3D glowColor={meta.color}
          style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",
            background:"rgba(255,255,255,0.03)",
            border:`1px solid ${meta.color}44`,borderRadius:16,padding:"20px 18px",
            boxShadow:`0 0 0 1px ${meta.color}22, inset 0 1px 0 rgba(255,255,255,0.06)` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
            <span style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.58rem",letterSpacing:1.5,
              padding:"3px 10px",borderRadius:20,background:`${meta.color}22`,color:meta.color,
              border:`1px solid ${meta.color}44` }}>
              {data.type}
            </span>
            <span style={{ fontSize:20 }}>{meta.icon}</span>
          </div>
          <h3 style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.82rem",color:"#e2e8f0",
            margin:"0 0 6px",lineHeight:1.45 }}>{data.title}</h3>
          <p style={{ color:"#94a3b8",fontSize:"0.76rem",fontFamily:"'Exo 2',sans-serif",margin:"0 0 8px" }}>
            {data.subject}
          </p>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"auto" }}>
            <span style={{ color:"#475569",fontSize:"0.7rem",fontFamily:"'Exo 2',sans-serif" }}>📦 {data.size}</span>
            <span style={{ color:meta.color,fontSize:"0.65rem",fontFamily:"'Orbitron',sans-serif",letterSpacing:1 }}>
              TAP TO FLIP →
            </span>
          </div>
          {/* Holographic shimmer bar */}
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:2,borderRadius:"0 0 16px 16px",
            background:`linear-gradient(90deg,transparent,${meta.color},transparent)`,opacity:0.6 }} />
        </TiltCard3D>

        {/* BACK */}
        <div style={{ position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",
          background:`linear-gradient(135deg,${meta.color}22,${meta.color}08)`,
          border:`1px solid ${meta.color}66`,borderRadius:16,padding:"20px 18px",
          display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
          <div>
            <p style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.62rem",color:meta.color,letterSpacing:2,margin:"0 0 10px" }}>
              RESOURCE INFO
            </p>
            {[["Subject",data.subject],["Year",data.year],["Size",data.size],["Type",data.type]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",justifyContent:"space-between",marginBottom:6,
                borderBottom:"1px solid rgba(255,255,255,0.05)",paddingBottom:5 }}>
                <span style={{ color:"#64748b",fontSize:"0.73rem",fontFamily:"'Exo 2',sans-serif" }}>{k}</span>
                <span style={{ color:"#e2e8f0",fontSize:"0.73rem",fontFamily:"'Exo 2',sans-serif" }}>{v}</span>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.65rem",letterSpacing:1.5,
              padding:"10px 0",borderRadius:10,border:`1px solid ${meta.color}`,
              background:`${meta.color}22`,color:meta.color,cursor:"pointer",width:"100%" }}>
            ↓ DOWNLOAD
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────── PARALLAX SECTION WRAPPER ─────── */
function ParallaxSection({ children, id, depth = 0.15 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60 * depth * 10, -60 * depth * 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.97]);

  return (
    <motion.section id={id} ref={ref} style={{ y, opacity, scale, position:"relative", zIndex:1 }}>
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────── SECTION HEADER ─────── */
function SectionHeader({ icon, title, subtitle, accent = "#7c3aed" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref} style={{ textAlign:"center",marginBottom:52 }}>
      <motion.div initial={{ scale:0,rotate:-30 }} animate={inView ? { scale:1,rotate:0 } : {}}
        transition={{ type:"spring",stiffness:200,damping:18,delay:0.1 }}
        style={{ fontSize:48,marginBottom:14,display:"inline-block" }}>
        {icon}
      </motion.div>

      <div style={{ overflow:"hidden" }}>
        <motion.h2 initial={{ y:60 }} animate={inView ? { y:0 } : {}}
          transition={{ duration:0.7,ease:[0.22,1,0.36,1],delay:0.15 }}
          style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(1.5rem,4vw,2.4rem)",
            background:`linear-gradient(135deg,#e2e8f0,${accent},#60a5fa)`,
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            letterSpacing:3,margin:"0 0 10px" }}>
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p initial={{ opacity:0,y:20 }} animate={inView ? { opacity:1,y:0 } : {}}
          transition={{ delay:0.3,duration:0.6 }}
          style={{ fontFamily:"'Exo 2',sans-serif",color:"#94a3b8",fontSize:"0.88rem",lineHeight:1.7,maxWidth:480,margin:"0 auto 20px" }}>
          {subtitle}
        </motion.p>
      )}

      {/* Animated divider with orbiting dot */}
      <div style={{ position:"relative",height:24,maxWidth:600,margin:"0 auto" }}>
        <motion.div initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}}
          transition={{ delay:0.4,duration:0.8,ease:[0.22,1,0.36,1] }}
          style={{ position:"absolute",top:"50%",left:0,right:0,height:1,
            background:`linear-gradient(90deg,transparent,${accent},#3b82f6,transparent)`,
            transformOrigin:"left center" }} />
        <motion.div animate={{ x:["-10%","110%"] }} transition={{ duration:2,repeat:Infinity,ease:"linear",delay:0.8 }}
          style={{ position:"absolute",top:"50%",width:6,height:6,borderRadius:"50%",
            background:accent,boxShadow:`0 0 12px ${accent}`,transform:"translateY(-50%)" }} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────── FILTER PILLS ─────── */
function FilterPills({ options, active, onChange }) {
  return (
    <div style={{ display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:36 }}>
      {options.map((o, i) => (
        <motion.button key={o} initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
          transition={{ delay:i*0.05 }}
          whileHover={{ scale:1.06, y:-2 }} whileTap={{ scale:0.95 }}
          onClick={() => onChange(o)}
          style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.65rem",letterSpacing:1.5,
            padding:"8px 20px",borderRadius:30,cursor:"pointer",
            border:active===o ? "1px solid #7c3aed" : "1px solid rgba(255,255,255,0.09)",
            background:active===o ? "linear-gradient(135deg,#7c3aed,#3b82f6)" : "rgba(255,255,255,0.04)",
            color:active===o ? "#fff" : "#94a3b8",
            boxShadow:active===o ? "0 0 20px #7c3aed44" : "none",
            transition:"all 0.3s" }} >
          {o}
        </motion.button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────── SPARKLE (Aceternity-style) ─────── */
function SparkleInstance({ style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ duration: Math.random() * 1.5 + 1, repeat: Infinity, delay: Math.random() * 3 }}
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0 C8 4 8 4 8 8 C8 4 8 4 8 0Z" fill="white" opacity="0.9"/>
        <path d="M0 8 C4 8 4 8 8 8 C4 8 4 8 0 8Z" fill="white" opacity="0.9"/>
        <path d="M2.3 2.3 C4.8 4.8 4.8 4.8 8 8 C4.8 4.8 4.8 4.8 2.3 2.3Z" fill="white" opacity="0.6"/>
        <path d="M13.7 2.3 C11.2 4.8 11.2 4.8 8 8 C11.2 4.8 11.2 4.8 13.7 2.3Z" fill="white" opacity="0.6"/>
      </svg>
    </motion.div>
  );
}

function Sparkles({ count = 20, area = { w: 500, h: 300 } }) {
  const sparks = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 12 + 8,
    color: ["#a78bfa","#60a5fa","#f472b6","#fde68a","#ffffff"][Math.floor(Math.random()*5)],
  }));
  return (
    <div style={{ position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden" }}>
      {sparks.map(s => (
        <motion.div key={s.id}
          initial={{ opacity:0, scale:0, rotate:0 }}
          animate={{ opacity:[0,1,0], scale:[0,1,0], rotate:[0,90,180] }}
          transition={{ duration:Math.random()*2+1.2, repeat:Infinity, delay:Math.random()*4, ease:"easeInOut" }}
          style={{ position:"absolute", top:s.top, left:s.left, pointerEvents:"none" }}>
          <svg width={s.size} height={s.size} viewBox="0 0 16 16" fill="none">
            <path d="M8 0C8 3.5 8 3.5 8 8C8 3.5 8 3.5 8 0Z" stroke={s.color} strokeWidth="1.5" fill={s.color}/>
            <path d="M0 8C3.5 8 3.5 8 8 8C3.5 8 3.5 8 0 8Z" stroke={s.color} strokeWidth="1.5" fill={s.color}/>
            <path d="M2.3 2.3C4.8 4.8 4.8 4.8 8 8C4.8 4.8 4.8 4.8 2.3 2.3Z" stroke={s.color} strokeWidth="1" fill={s.color} opacity="0.5"/>
            <path d="M13.7 2.3C11.2 4.8 11.2 4.8 8 8C11.2 4.8 11.2 4.8 13.7 2.3Z" stroke={s.color} strokeWidth="1" fill={s.color} opacity="0.5"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────── SHOOTING STARS ─────── */
function ShootingStars({ count = 8 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: Math.random() * 80,
    startY: Math.random() * 40,
    angle: 30 + Math.random() * 20,
    length: 80 + Math.random() * 120,
    duration: 1.5 + Math.random() * 2,
    delay: Math.random() * 8,
    color: ["#a78bfa","#60a5fa","#ffffff","#f472b6"][Math.floor(Math.random()*4)],
  }));

  return (
    <div style={{ position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0 }}>
      {stars.map(s => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.length;
        const dy = Math.sin(rad) * s.length;
        return (
          <motion.div key={s.id}
            initial={{ opacity:0, x:`${s.startX}vw`, y:`${s.startY}vh` }}
            animate={{ opacity:[0,1,1,0], x:[`${s.startX}vw`,`${s.startX + dx*0.01*100}vw`], y:[`${s.startY}vh`,`${s.startY + dy*0.01*100}vh`] }}
            transition={{ duration:s.duration, repeat:Infinity, delay:s.delay, ease:"easeOut" }}
            style={{ position:"absolute", width:s.length, height:1.5, borderRadius:2,
              background:`linear-gradient(90deg,transparent,${s.color},white)`,
              transformOrigin:"left center", rotate:`${s.angle}deg` }}
          />
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────── LAMP EFFECT (Aceternity) ─────── */
function LampEffect() {
  return (
    <div style={{ position:"absolute",top:0,left:0,right:0,height:"70%",pointerEvents:"none",overflow:"hidden",zIndex:0 }}>
      {/* Lamp cone beam */}
      <motion.div
        initial={{ opacity:0.3, width:"30%" }}
        animate={{ opacity:[0.5,0.8,0.5], width:["35%","55%","35%"] }}
        transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          height:"60%", background:"conic-gradient(from 270deg at 50% 0%, transparent 60deg, rgba(124,58,237,0.25) 90deg, rgba(167,139,250,0.35) 180deg, rgba(96,165,250,0.25) 270deg, transparent 300deg)",
          borderRadius:"0 0 50% 50%", filter:"blur(2px)" }}
      />
      {/* Central beam core */}
      <motion.div
        animate={{ opacity:[0.6,1,0.6], scaleX:[0.8,1.1,0.8] }}
        transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          width:3, height:"55%",
          background:"linear-gradient(to bottom, #a78bfa, rgba(167,139,250,0.4), transparent)",
          borderRadius:"0 0 3px 3px", filter:"blur(1px)" }}
      />
      {/* Wide glow pool at bottom of lamp */}
      <motion.div
        animate={{ opacity:[0.4,0.7,0.4], scaleX:[0.9,1.1,0.9] }}
        transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"52%", left:"50%", transform:"translate(-50%,-50%)",
          width:"60%", height:120,
          background:"radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.4), rgba(96,165,250,0.15), transparent 70%)",
          filter:"blur(20px)" }}
      />
      {/* Lamp head fixture */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center" }}>
        <motion.div
          animate={{ boxShadow:["0 0 20px #a78bfa88","0 0 40px #a78bfacc","0 0 20px #a78bfa88"] }}
          transition={{ duration:2, repeat:Infinity }}
          style={{ width:80, height:4, background:"linear-gradient(90deg,transparent,#a78bfa,#60a5fa,#a78bfa,transparent)",
            borderRadius:2 }}
        />
        <div style={{ width:2, height:24, background:"linear-gradient(to bottom,#7c3aed,transparent)" }} />
      </div>
      {/* Side flares */}
      {[-1,1].map(dir=>(
        <motion.div key={dir}
          animate={{ opacity:[0.2,0.5,0.2], x:[0, dir*8, 0] }}
          transition={{ duration:4+dir, repeat:Infinity, ease:"easeInOut" }}
          style={{ position:"absolute", top:"8%", left:`calc(50% + ${dir*14}%)`,
            width:"20%", height:"45%",
            background:`linear-gradient(${dir>0?"to right":"to left"}, transparent, rgba(124,58,237,0.15), transparent)`,
            filter:"blur(8px)", borderRadius:"50%" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────── TYPEWRITER ─────── */
function Typewriter({ words = [], speed = 80 }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx] || "";
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return (
    <span style={{ color:"#a78bfa" }}>
      {display}
      <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }}
        style={{ display:"inline-block", width:2, height:"0.9em", background:"#a78bfa",
          verticalAlign:"middle", marginLeft:2, borderRadius:1 }} />
    </span>
  );
}

/* ─────────────────────────────────── HERO ─────── */
function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const y = useTransform(scrollYProgress, [0,1], [0,-200]);
  const opacity = useTransform(scrollYProgress, [0,0.6], [1,0]);
  const scale = useTransform(scrollYProgress, [0,0.6], [1,0.88]);

  // Mouse spotlight
  const mouseX = useMotionValue(0.5), mouseY = useMotionValue(0.5);
  const spotX = useSpring(useTransform(mouseX,[0,1],["0%","100%"]),{stiffness:60,damping:20});
  const spotY = useSpring(useTransform(mouseY,[0,1],["0%","100%"]),{stiffness:60,damping:20});
  const pX = useSpring(useTransform(mouseX,[0,1],[-18,18]),{stiffness:80,damping:30});
  const pY = useSpring(useTransform(mouseY,[0,1],[-10,10]),{stiffness:80,damping:30});

  useEffect(() => {
    const handle = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <motion.section ref={heroRef}
      style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", zIndex:1, padding:"0 24px", y, opacity, scale, overflow:"hidden" }}
    >
      {/* ── Aceternity Lamp Effect ── */}
      <LampEffect />

      {/* ── Shooting Stars ── */}
      <ShootingStars count={10} />

      {/* ── Sparkles field ── */}
      <div style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
        <Sparkles count={28} />
      </div>

      {/* ── Mouse spotlight (Aceternity Spotlight) ── */}
      <motion.div
        style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
          background: useMotionTemplate`radial-gradient(500px circle at ${spotX} ${spotY}, rgba(124,58,237,0.12), transparent 60%)` }}
      />

      {/* ── Dot grid (Aceternity Grid+Dot BG) ── */}
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
        backgroundImage:"radial-gradient(rgba(167,139,250,0.15) 1px, transparent 1px)",
        backgroundSize:"32px 32px",
        maskImage:"radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)" }} />

      {/* ── Content ── */}
      <motion.div style={{ textAlign:"center", position:"relative", zIndex:2, x:pX, y:pY }}>

        {/* Badge pill — Aceternity style */}
        <motion.div
          initial={{ opacity:0, y:20, scale:0.9 }}
          animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.7, delay:0.2, ease:[0.22,1,0.36,1] }}
          style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:28,
            padding:"6px 18px 6px 8px", borderRadius:40,
            background:"rgba(124,58,237,0.08)", border:"1px solid rgba(167,139,250,0.25)",
            backdropFilter:"blur(12px)" }}>
          <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
            width:22, height:22, borderRadius:"50%",
            background:"linear-gradient(135deg,#7c3aed,#3b82f6)", fontSize:11 }}>✦</span>
          <span style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"0.6rem", letterSpacing:3,
            color:"#a78bfa" }}>ZENCODERS KNOWLEDGE VAULT</span>
          <motion.div animate={{ rotate:360 }} transition={{ duration:6,repeat:Infinity,ease:"linear" }}
            style={{ width:14,height:14,borderRadius:"50%",
              border:"1.5px solid rgba(167,139,250,0.5)",borderTopColor:"#a78bfa" }} />
        </motion.div>

        {/* Main heading — Aceternity Text Generate Effect style */}
        <div style={{ overflow:"hidden", marginBottom:8 }}>
          <motion.h1
            initial={{ y:120, opacity:0 }}
            animate={{ y:0, opacity:1 }}
            transition={{ duration:1, ease:[0.22,1,0.36,1], delay:0.35 }}
            style={{ fontFamily:"'Orbitron',sans-serif",
              fontSize:"clamp(2.8rem,9.5vw,6.5rem)", lineHeight:0.98, margin:0,
              background:"linear-gradient(180deg, #ffffff 0%, #e2e8f0 30%, #a78bfa 65%, #60a5fa 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              letterSpacing:-1 }}>
            ACADEMIC
          </motion.h1>
        </div>
        <div style={{ overflow:"hidden", marginBottom:32 }}>
          <motion.h1
            initial={{ y:120, opacity:0 }}
            animate={{ y:0, opacity:1 }}
            transition={{ duration:1, ease:[0.22,1,0.36,1], delay:0.48 }}
            style={{ fontFamily:"'Orbitron',sans-serif",
              fontSize:"clamp(2.8rem,9.5vw,6.5rem)", lineHeight:0.98, margin:0,
              background:"linear-gradient(180deg,#f472b6 0%,#a78bfa 50%,#60a5fa 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              letterSpacing:-1, filter:"drop-shadow(0 0 60px rgba(167,139,250,0.5))" }}>
            UNIVERSE
          </motion.h1>
        </div>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.7, duration:0.7 }}
          style={{ fontFamily:"'Exo 2',sans-serif", color:"#64748b", fontSize:"1.05rem",
            lineHeight:1.75, maxWidth:520, margin:"0 auto 14px" }}>
          Navigate the cosmos of knowledge —
        </motion.p>
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.9 }}
          style={{ fontFamily:"'Exo 2',sans-serif", fontSize:"1.05rem",
            lineHeight:1.75, marginBottom:44, minHeight:"1.75em" }}>
          <Typewriter
            words={["Past Year Questions","Lecture Slides","Event Materials","Workshop Notes","Hackathon Files"]}
            speed={70}
          />
        </motion.div>

        {/* CTA Buttons — Aceternity Moving Border style */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:1.0, duration:0.7 }}
          style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { label:"📄 PYQ Papers", href:"#pyq", color:"#7c3aed", glow:"rgba(124,58,237,0.5)" },
            { label:"📊 Lecture PPTs", href:"#ppts", color:"#3b82f6", glow:"rgba(59,130,246,0.5)" },
            { label:"🚀 Event Material", href:"#events", color:"#f472b6", glow:"rgba(244,114,182,0.5)" },
          ].map((btn,i) => (
            <a key={btn.href} href={btn.href} style={{ textDecoration:"none" }}>
              <motion.button
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:1.1+i*0.1 }}
                whileHover={{ scale:1.07, y:-4,
                  boxShadow:`0 0 0 1px ${btn.color}88, 0 0 30px ${btn.glow}, 0 10px 30px rgba(0,0,0,0.4)` }}
                whileTap={{ scale:0.96 }}
                style={{ position:"relative", fontFamily:"'Orbitron',sans-serif",
                  fontSize:"0.67rem", letterSpacing:1.5, padding:"13px 28px", borderRadius:30,
                  cursor:"pointer", border:`1px solid ${btn.color}55`,
                  background:`linear-gradient(135deg,${btn.color}14,${btn.color}08)`,
                  color:"#e2e8f0", backdropFilter:"blur(16px)", overflow:"hidden" }}>
                {/* Shimmer sweep */}
                <motion.div
                  animate={{ x:["-100%","200%"] }}
                  transition={{ duration:2.5, repeat:Infinity, delay:i*0.8, ease:"linear" }}
                  style={{ position:"absolute", inset:0, pointerEvents:"none",
                    background:`linear-gradient(90deg,transparent,${btn.color}22,transparent)`,
                    transform:"skewX(-20deg)" }}
                />
                {btn.label}
              </motion.button>
            </a>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}
          style={{ marginTop:64, display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut" }}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <span style={{ fontFamily:"'Orbitron',sans-serif", color:"#334155", fontSize:"0.55rem", letterSpacing:4 }}>
              SCROLL
            </span>
            <div style={{ width:1, height:36, background:"linear-gradient(to bottom,#7c3aed88,transparent)" }} />
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#7c3aed",
              boxShadow:"0 0 10px #7c3aed" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ─────────────────────────────────── STATS ─────── */
function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const items = [
    { value:"120+",label:"PYQ Papers",icon:"📄",color:"#7c3aed" },
    { value:"80+",label:"Lecture Slides",icon:"📊",color:"#3b82f6" },
    { value:"25+",label:"Event Materials",icon:"🚀",color:"#f472b6" },
    { value:"500+",label:"Students Helped",icon:"🌌",color:"#10b981" },
  ];

  return (
    <section ref={ref} style={{ position:"relative",zIndex:1,padding:"0 24px 80px" }}>
      <div style={{ maxWidth:920,margin:"0 auto",
        display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:20 }}>
        {items.map((s,i) => (
          <motion.div key={i}
            initial={{ opacity:0,y:40,rotateX:-20 }}
            animate={inView ? { opacity:1,y:0,rotateX:0 } : {}}
            transition={{ delay:i*0.12,duration:0.6,ease:[0.22,1,0.36,1] }}
            whileHover={{ scale:1.06,y:-6,boxShadow:`0 20px 40px rgba(0,0,0,0.4),0 0 30px ${s.color}33` }}
            style={{ textAlign:"center",padding:"28px 16px",
              background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:18,position:"relative",overflow:"hidden",cursor:"default" }}>
            {/* Corner accent */}
            <div style={{ position:"absolute",top:0,right:0,width:60,height:60,
              background:`radial-gradient(circle at top right,${s.color}30,transparent 70%)`,
              borderRadius:"0 18px 0 0" }} />
            <div style={{ fontSize:30,marginBottom:10 }}>{s.icon}</div>
            <motion.div
              initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
              transition={{ delay:0.3+i*0.12, duration:0.8 }}
              style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"2rem",
                color:s.color,filter:`drop-shadow(0 0 12px ${s.color}88)` }}>
              {s.value}
            </motion.div>
            <div style={{ fontFamily:"'Exo 2',sans-serif",color:"#64748b",fontSize:"0.78rem",marginTop:6 }}>
              {s.label}
            </div>
            {/* Animated underline */}
            <motion.div initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}}
              transition={{ delay:0.5+i*0.12,duration:0.6 }}
              style={{ position:"absolute",bottom:0,left:"20%",right:"20%",height:1,
                background:`linear-gradient(90deg,transparent,${s.color},transparent)`,transformOrigin:"left" }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────── ORBITAL DIVIDER ─────── */
function OrbitalDivider({ color="#7c3aed", rtl=false, label="" }) {
  return (
    <div style={{ position:"relative",height:80,overflow:"hidden",margin:"10px 0 30px" }}>
      <div style={{ position:"absolute",top:"50%",left:"8%",right:"8%",height:1,
        background:`linear-gradient(90deg,transparent,${color}44,${color}77,${color}44,transparent)`,
        transform:"translateY(-50%)" }} />
      {/* Multiple speed dots */}
      {[1,0.6,0.35].map((speed,i)=>(
        <motion.div key={i}
          animate={{ x: rtl ? ["85vw","-5vw"] : ["-5vw","85vw"] }}
          transition={{ duration:6+i*3,repeat:Infinity,ease:"linear",delay:i*2 }}
          style={{ position:"absolute",top:"50%",
            width:i===0?8:i===1?5:3, height:i===0?8:i===1?5:3,
            borderRadius:"50%",background:color,
            boxShadow:`0 0 ${12+i*4}px ${color}`,transform:"translateY(-50%)",
            opacity:1-i*0.25 }} />
      ))}
      {label && (
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
          background:"#030712",padding:"4px 16px",borderRadius:20,
          fontFamily:"'Orbitron',sans-serif",fontSize:"0.58rem",letterSpacing:3,color:color,
          border:`1px solid ${color}33` }}>
          {label}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────── CONTRIBUTE CTA ─────── */
function ContributeCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  const mouseX = useMotionValue(0.5), mouseY = useMotionValue(0.5);
  const bgX = useTransform(mouseX,[0,1],["0%","100%"]);
  const bgY = useTransform(mouseY,[0,1],["0%","100%"]);

  return (
    <ParallaxSection>
      <section style={{ padding:"80px 24px",maxWidth:720,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1 }}>
        <motion.div ref={ref}
          initial={{ opacity:0,scale:0.92,y:40 }}
          animate={inView ? { opacity:1,scale:1,y:0 } : {}}
          transition={{ duration:0.8,ease:[0.22,1,0.36,1] }}
          onMouseMove={e => {
            const r=ref.current?.getBoundingClientRect();
            if(r){ mouseX.set((e.clientX-r.left)/r.width); mouseY.set((e.clientY-r.top)/r.height); }
          }}
          style={{ position:"relative",
            background:"linear-gradient(135deg,rgba(124,58,237,0.1),rgba(59,130,246,0.07))",
            border:"1px solid rgba(124,58,237,0.3)",borderRadius:28,padding:"56px 40px",
            overflow:"hidden" }}>

          {/* Dynamic highlight */}
          <motion.div style={{ position:"absolute",inset:0,pointerEvents:"none",
            background:`radial-gradient(ellipse 50% 50% at ${bgX} ${bgY},rgba(124,58,237,0.15),transparent 70%)` }} />

          {/* Floating particles */}
          {Array.from({length:8}).map((_,i)=>(
            <motion.div key={i}
              animate={{ y:[-10,10,-10],x:[-5,5,-5],opacity:[0.3,0.7,0.3] }}
              transition={{ duration:3+i*0.5,repeat:Infinity,delay:i*0.4,ease:"easeInOut" }}
              style={{ position:"absolute",width:3,height:3,borderRadius:"50%",
                background:"#7c3aed",left:`${15+i*10}%`,top:`${20+i*8}%`,pointerEvents:"none" }} />
          ))}

          <motion.div animate={{ y:[0,-8,0],rotate:[0,360] }} transition={{ y:{duration:3,repeat:Infinity},rotate:{duration:20,repeat:Infinity,ease:"linear"} }}
            style={{ fontSize:54,marginBottom:18,display:"inline-block" }}>🛸</motion.div>
          <h2 style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"1.5rem",
            background:"linear-gradient(135deg,#a78bfa,#60a5fa)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:14 }}>
            Contribute to the Universe
          </h2>
          <p style={{ color:"#94a3b8",lineHeight:1.8,marginBottom:34,fontSize:"0.92rem",fontFamily:"'Exo 2',sans-serif" }}>
            Have notes, slides, or PYQs that could help fellow coders?
            Upload your materials and expand our galactic library!
          </p>
          <motion.button
            whileHover={{ scale:1.06,boxShadow:"0 0 40px rgba(124,58,237,0.6),0 12px 30px rgba(0,0,0,0.4)" }}
            whileTap={{ scale:0.97 }}
            style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.7rem",letterSpacing:2,
              padding:"16px 44px",borderRadius:30,cursor:"pointer",border:"none",
              background:"linear-gradient(135deg,#7c3aed,#3b82f6,#7c3aed)",backgroundSize:"200% 200%",
              color:"#fff",backgroundPosition:"left" }}>
            ⬡ UPLOAD RESOURCES
          </motion.button>
        </motion.div>
      </section>
    </ParallaxSection>
  );
}

/* ─────────────────────────────────── FOOTER ─────── */
function Footer() {
  return (
    <footer style={{ position:"relative",zIndex:1,
      background:"rgba(255,255,255,0.015)",borderTop:"1px solid rgba(255,255,255,0.06)",
      padding:"60px 40px 40px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:44,marginBottom:50 }}>
          <div>
            <div style={{ fontFamily:"'Orbitron',sans-serif",fontWeight:800,fontSize:"1.3rem",marginBottom:14 }}>
              <span style={{ color:"#a78bfa" }}>ZEN</span><span style={{ color:"#60a5fa" }}>CODERS</span>
            </div>
            <p style={{ color:"#64748b",fontSize:"0.82rem",lineHeight:1.8,fontFamily:"'Exo 2',sans-serif" }}>
              The coding club that launched into the void and brought back knowledge for everyone.
            </p>
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              {["𝕏","in","GH","YT"].map(s=>(
                <motion.div key={s} whileHover={{ scale:1.2,y:-2,borderColor:"#7c3aed" }}
                  style={{ width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",
                    justifyContent:"center",border:"1px solid rgba(255,255,255,0.1)",
                    color:"#64748b",fontSize:"0.72rem",cursor:"pointer" }}>
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
          {[
            { title:"Academic", links:["PYQ Papers","Lecture PPTs","Event Materials","Lab Manuals"] },
            { title:"Club", links:["About Us","Team","Events","Join ZenCoders"] },
            { title:"Contact", links:["Discord Server","Email Us","Instagram","College Portal"] },
          ].map(col=>(
            <div key={col.title}>
              <h4 style={{ fontFamily:"'Orbitron',sans-serif",fontSize:"0.66rem",color:"#a78bfa",
                letterSpacing:2.5,marginBottom:18,margin:"0 0 18px" }}>{col.title}</h4>
              {col.links.map(l=>(
                <motion.a key={l} href="#" whileHover={{ x:4,color:"#94a3b8" }}
                  style={{ display:"block",color:"#64748b",textDecoration:"none",fontSize:"0.83rem",
                    marginBottom:12,fontFamily:"'Exo 2',sans-serif" }}>
                  {l}
                </motion.a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:26,
          display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10 }}>
          <p style={{ color:"#374151",fontSize:"0.76rem",fontFamily:"'Exo 2',sans-serif",margin:0 }}>
            © 2024 ZenCoders. Crafted somewhere in the cosmos. 🌌
          </p>
          <p style={{ color:"#374151",fontSize:"0.76rem",fontFamily:"'Exo 2',sans-serif",margin:0 }}>
            Built with React · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────── SCROLLBAR CSS ─────── */
const scrollbarCSS = `
  * { scrollbar-width: thin; scrollbar-color: #7c3aed33 transparent; }
  *::-webkit-scrollbar { width: 4px; }
  *::-webkit-scrollbar-track { background: transparent; }
  *::-webkit-scrollbar-thumb { background: linear-gradient(#7c3aed,#3b82f6); border-radius: 4px; }
  html { scroll-behavior: smooth; }
`;

/* ─────────────────────────────────── MAIN ─────── */
export default function AcademicPage() {
  const [pyqFilter, setPyqFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");
  const pyqYears = ["All","2023","2022","2021"];
  const eventTypes = ["All","EVENT PPT","WORKSHOP","BOOTCAMP","SEMINAR"];
  const filteredPYQ = pyqFilter === "All" ? PYQ_DATA : PYQ_DATA.filter(d => d.year === pyqFilter);
  const filteredEvents = eventFilter === "All" ? EVENT_DATA : EVENT_DATA.filter(d => d.type === eventFilter);

  /* Scroll-driven perspective wrapper */
  const containerRef = useRef(null);
  const { scrollYProgress: globalProgress } = useScroll({ container: containerRef });
  const globalRotateX = useTransform(globalProgress, [0,1], [0,2]);

  return (
    <div style={{ background:"#030712",minHeight:"100vh",color:"#e2e8f0",
      fontFamily:"'Exo 2',sans-serif",position:"relative",overflowX:"hidden" }}>
      <style>{scrollbarCSS}</style>
      <Starfield />
      <NebulaOrbs />

      <motion.div style={{ paddingTop:0,position:"relative",zIndex:1,
        transformStyle:"preserve-3d",transformPerspective:1400 }}>

        <Hero />
        <Stats />

        {/* ─── PYQ SECTION ─── */}
        <ParallaxSection id="pyq">
          <div style={{ padding:"80px 24px",maxWidth:1140,margin:"0 auto" }}>
            <SectionHeader icon="📄" title="PAST YEAR QUESTIONS" accent="#7c3aed"
              subtitle="Explore the asteroid belt of previous exam papers — your best prep launchpad" />
            <FilterPills options={pyqYears} active={pyqFilter} onChange={setPyqFilter} />
            <AnimatePresence mode="popLayout">
              <motion.div layout
                style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20 }}>
                {filteredPYQ.map((d,i) => (
                  <motion.div key={d.title} layout
                    initial={{ opacity:0,scale:0.9,y:20 }}
                    animate={{ opacity:1,scale:1,y:0 }}
                    exit={{ opacity:0,scale:0.9,y:-10 }}
                    transition={{ delay:i*0.07,duration:0.4 }}>
                    <FlipCard data={d} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </ParallaxSection>

        <OrbitalDivider color="#7c3aed" label="SCANNING RESOURCES" />

        {/* ─── PPTs SECTION ─── */}
        <ParallaxSection id="ppts" depth={0.2}>
          <div style={{ padding:"80px 24px",maxWidth:1140,margin:"0 auto" }}>
            <SectionHeader icon="📊" title="COLLEGE LECTURE PPTs" accent="#3b82f6"
              subtitle="Beam down the lecture slides from across the academic galaxy" />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20 }}>
              {PPT_DATA.map((d,i) => (
                <FlipCard key={d.title} data={d} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        <OrbitalDivider color="#f472b6" rtl label="TRANSMITTING DATA" />

        {/* ─── EVENTS SECTION ─── */}
        <ParallaxSection id="events" depth={0.25}>
          <div style={{ padding:"80px 24px",maxWidth:1140,margin:"0 auto" }}>
            <SectionHeader icon="🚀" title="EVENT MATERIAL" accent="#f472b6"
              subtitle="Launch into hackathons, workshops & seminars — all mission files archived here" />
            <FilterPills options={eventTypes} active={eventFilter} onChange={setEventFilter} />
            <AnimatePresence mode="popLayout">
              <motion.div layout
                style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20 }}>
                {filteredEvents.map((d,i) => (
                  <motion.div key={d.title} layout
                    initial={{ opacity:0,scale:0.9,y:20 }}
                    animate={{ opacity:1,scale:1,y:0 }}
                    exit={{ opacity:0,scale:0.9,y:-10 }}
                    transition={{ delay:i*0.07,duration:0.4 }}>
                    <FlipCard data={d} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </ParallaxSection>

        <ContributeCTA />
        <Footer />
      </motion.div>
    </div>
  );
}
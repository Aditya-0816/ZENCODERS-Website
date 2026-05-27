import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION BANK
// Each question: { id, type, question, options?, placeholder?, getNext(answer) }
// getNext returns the next question id, or "submit" to end the form
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "q_name",
    type: "text",
    question: "What's your full name?",
    placeholder: "Enter your full name",
    getNext: () => "q_year",
  },
  {
    id: "q_year",
    type: "dropdown",
    question: "What year are you currently in?",
    options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    getNext: (ans) => {
      if (ans === "1st Year") return "q_why_first";
      return "q_domain";
    },
  },
  // Branch for 1st years — softer path
  {
    id: "q_why_first",
    type: "textarea",
    question: "You're in 1st year — that's great! Tell us what excites you most about joining ZenCoders.",
    placeholder: "What drew you to ZenCoders?",
    getNext: () => "q_domain",
  },
  {
    id: "q_domain",
    type: "mcq",
    question: "Which domain are you applying for?",
    options: ["Technical", "Design / Creative", "Marketing", "Management", "Public Relations"],
    getNext: (ans) => {
      if (ans === "Technical") return "q_tech_skills";
      if (ans === "Design / Creative") return "q_design_skills";
      if (ans === "Marketing") return "q_marketing_skills";
      return "q_general_skills";
    },
  },

  // ── Technical path ──
  {
    id: "q_tech_skills",
    type: "checkbox",
    question: "Which of these technologies are you comfortable with?",
    options: ["C / C++", "Python", "JavaScript", "React", "DSA", "Competitive Programming", "Web Dev (HTML/CSS)", "Other"],
    getNext: () => "q_tech_project",
  },
  {
    id: "q_tech_project",
    type: "textarea",
    question: "Tell us about a project or problem you've worked on. What did you build and what did you learn?",
    placeholder: "Describe a project, hackathon entry, or interesting problem you've solved...",
    getNext: () => "q_availability",
  },

  // ── Design path ──
  {
    id: "q_design_skills",
    type: "checkbox",
    question: "Which design tools or skills do you have experience with?",
    options: ["Figma", "Canva", "Adobe XD", "Illustrator / Photoshop", "UI/UX Research", "Motion Design", "Frontend (HTML/CSS)", "Other"],
    getNext: () => "q_design_portfolio",
  },
  {
    id: "q_design_portfolio",
    type: "text",
    question: "Share a link to your portfolio or any design work (Behance, Dribbble, Figma, etc.)",
    placeholder: "https://...",
    getNext: () => "q_availability",
  },

  // ── Marketing path ──
  {
    id: "q_marketing_skills",
    type: "checkbox",
    question: "Which areas of marketing are you experienced or interested in?",
    options: ["Social Media", "Content Writing", "Branding", "Analytics", "Campaign Strategy", "Graphic Design", "Video Editing", "Other"],
    getNext: () => "q_marketing_example",
  },
  {
    id: "q_marketing_example",
    type: "textarea",
    question: "Describe a campaign, post, or marketing idea you've executed or would love to run for ZenCoders.",
    placeholder: "Your idea or past work...",
    getNext: () => "q_availability",
  },

  // ── General path (Management / PR) ──
  {
    id: "q_general_skills",
    type: "textarea",
    question: "What skills or experiences make you the right fit for this role at ZenCoders?",
    placeholder: "Leadership, event coordination, communication — tell us what you bring...",
    getNext: () => "q_availability",
  },

  // ── Shared final questions ──
  {
    id: "q_availability",
    type: "mcq",
    question: "How many hours per week can you dedicate to ZenCoders?",
    options: ["Less than 2 hours", "2–4 hours", "4–6 hours", "6+ hours"],
    getNext: (ans) => {
      if (ans === "Less than 2 hours") return "q_low_availability";
      return "q_why_zencoders";
    },
  },
  {
    id: "q_low_availability",
    type: "textarea",
    question: "That's alright! Tell us how you'd make those hours count and what you'd prioritise.",
    placeholder: "Quality over quantity — how would you approach it?",
    getNext: () => "q_why_zencoders",
  },
  {
    id: "q_why_zencoders",
    type: "textarea",
    question: "Why ZenCoders? What do you want to give to the club and what do you hope to take away?",
    placeholder: "Be honest — we value genuine answers over polished ones.",
    getNext: () => "q_contact",
  },
  {
    id: "q_contact",
    type: "text",
    question: "Last one — what's your email or phone number so we can reach you?",
    placeholder: "email@example.com or +91 XXXXXXXXXX",
    getNext: () => "submit",
  },
];

const Q_MAP = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

// ─────────────────────────────────────────────────────────────────────────────
// Progress bar component
// ─────────────────────────────────────────────────────────────────────────────
function ProgressBar({ visited, total }) {
  const pct = Math.min((visited / total) * 100, 100);
  return (
    <div style={{ width: "100%", height: 2, background: "rgba(201,168,76,0.12)", borderRadius: 2, marginBottom: 40 }}>
      <div style={{
        height: "100%", width: pct + "%",
        background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.5))",
        borderRadius: 2,
        transition: "width 0.5s ease",
        boxShadow: "0 0 8px rgba(201,168,76,0.4)",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Single question renderer
// ─────────────────────────────────────────────────────────────────────────────
function QuestionCard({ question, answer, onChange, onNext, onBack, canBack, isLast }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [question.id]);

  const canProceed = () => {
    if (question.type === "checkbox") return answer && answer.length > 0;
    return answer && answer.toString().trim() !== "";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && question.type !== "textarea" && canProceed()) onNext();
  };

  const inputStyle = {
    width: "100%", background: "transparent",
    border: "none", borderBottom: "1px solid rgba(201,168,76,0.35)",
    color: "#fff", fontSize: "1rem",
    fontFamily: "'Rajdhani', sans-serif", fontWeight: 500,
    letterSpacing: "0.04em", padding: "12px 0 10px",
    outline: "none", transition: "border-color 0.25s",
    boxSizing: "border-box",
  };

  return (
    <div style={{ animation: "slideIn 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      {/* Question number */}
      <p style={{
        fontFamily: "'Cinzel', serif", fontSize: "0.6rem",
        color: "rgba(201,168,76,0.5)", letterSpacing: "0.3em",
        textTransform: "uppercase", marginBottom: 16,
      }}>
        Question
      </p>

      {/* Question text */}
      <h2 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
        fontWeight: 700, color: "#fff",
        lineHeight: 1.4, marginBottom: 32,
        textShadow: "0 0 30px rgba(201,168,76,0.15)",
      }}>
        {question.question}
      </h2>

      {/* Input rendering by type */}
      {question.type === "text" && (
        <input
          ref={inputRef}
          type="text"
          value={answer || ""}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={question.placeholder}
          style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = "rgba(201,168,76,0.8)"}
          onBlur={e => e.target.style.borderBottomColor = "rgba(201,168,76,0.35)"}
        />
      )}

      {question.type === "textarea" && (
        <textarea
          ref={inputRef}
          value={answer || ""}
          onChange={e => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          style={{ ...inputStyle, resize: "none", lineHeight: 1.7 }}
          onFocus={e => e.target.style.borderBottomColor = "rgba(201,168,76,0.8)"}
          onBlur={e => e.target.style.borderBottomColor = "rgba(201,168,76,0.35)"}
        />
      )}

      {question.type === "dropdown" && (
        <select
          ref={inputRef}
          value={answer || ""}
          onChange={e => onChange(e.target.value)}
          style={{
            ...inputStyle,
            cursor: "pointer",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23C9A84C'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 4px center",
            paddingRight: 28,
          }}
        >
          <option value="" disabled style={{ background: "#0a0a14" }}>Select one...</option>
          {question.options.map(opt => (
            <option key={opt} value={opt} style={{ background: "#0a0a14", color: "#fff" }}>{opt}</option>
          ))}
        </select>
      )}

      {question.type === "mcq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setTimeout(onNext, 280); }}
              style={{
                textAlign: "left", padding: "14px 20px",
                background: answer === opt ? "rgba(201,168,76,0.14)" : "rgba(255,255,255,0.03)",
                border: answer === opt ? "1px solid rgba(201,168,76,0.6)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, color: answer === opt ? "#C9A84C" : "rgba(255,255,255,0.7)",
                fontFamily: "'Rajdhani', sans-serif", fontSize: "0.92rem",
                fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: answer === opt ? "0 0 16px rgba(201,168,76,0.12)" : "none",
              }}
              onMouseEnter={e => { if (answer !== opt) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}}
              onMouseLeave={e => { if (answer !== opt) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}}
            >
              <span style={{ color: "rgba(201,168,76,0.5)", marginRight: 10, fontSize: "0.75rem" }}>→</span>
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === "checkbox" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {question.options.map(opt => {
            const checked = Array.isArray(answer) && answer.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => {
                  const cur = Array.isArray(answer) ? answer : [];
                  onChange(checked ? cur.filter(x => x !== opt) : [...cur, opt]);
                }}
                style={{
                  textAlign: "left", padding: "12px 16px",
                  background: checked ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                  border: checked ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 7, color: checked ? "#C9A84C" : "rgba(255,255,255,0.6)",
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "0.82rem",
                  fontWeight: 600, letterSpacing: "0.03em", cursor: "pointer",
                  transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <span style={{
                  width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                  border: checked ? "none" : "1px solid rgba(255,255,255,0.2)",
                  background: checked ? "#C9A84C" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.55rem", color: "#000",
                }}>{checked ? "✓" : ""}</span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 36, alignItems: "center" }}>
        {canBack && (
          <button onClick={onBack} style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 7, padding: "11px 20px",
            color: "rgba(255,255,255,0.4)", fontFamily: "'Cinzel', serif",
            fontSize: "0.7rem", letterSpacing: "0.15em", cursor: "pointer",
            transition: "all 0.2s", textTransform: "uppercase",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          >← Back</button>
        )}

        {question.type !== "mcq" && (
          <button
            onClick={onNext}
            disabled={!canProceed()}
            style={{
              background: canProceed() ? "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))" : "rgba(255,255,255,0.03)",
              border: canProceed() ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7, padding: "11px 28px",
              color: canProceed() ? "#C9A84C" : "rgba(255,255,255,0.2)",
              fontFamily: "'Cinzel', serif", fontSize: "0.72rem",
              letterSpacing: "0.2em", cursor: canProceed() ? "pointer" : "default",
              transition: "all 0.25s", textTransform: "uppercase",
              boxShadow: canProceed() ? "0 0 20px rgba(201,168,76,0.1)" : "none",
            }}
          >
            {isLast ? "Submit →" : "Next →"}
          </button>
        )}

        {question.type === "checkbox" && canProceed() && (
          <button onClick={onNext} style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))",
            border: "1px solid rgba(201,168,76,0.5)",
            borderRadius: 7, padding: "11px 28px",
            color: "#C9A84C", fontFamily: "'Cinzel', serif",
            fontSize: "0.72rem", letterSpacing: "0.2em", cursor: "pointer",
            transition: "all 0.25s", textTransform: "uppercase",
          }}>Next →</button>
        )}
      </div>

      {question.type === "text" && (
        <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", marginTop: 12, letterSpacing: "0.1em" }}>
          Press Enter to continue
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Hiring() {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState("q_name");
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState(["q_name"]);
  const [submitted, setSubmitted] = useState(false);
  const [visitedCount, setVisitedCount] = useState(1);

  const current = Q_MAP[currentId];

  const handleNext = () => {
    const ans = answers[currentId];
    const nextId = current.getNext(ans);
    if (nextId === "submit") {
      setSubmitted(true);
      return;
    }
    setHistory(h => [...h, nextId]);
    setCurrentId(nextId);
    setVisitedCount(v => v + 1);
  };

  const handleBack = () => {
    if (history.length <= 1) return;
    const prev = history[history.length - 2];
    setHistory(h => h.slice(0, -1));
    setCurrentId(prev);
    setVisitedCount(v => Math.max(1, v - 1));
  };

  const handleChange = (val) => {
    setAnswers(a => ({ ...a, [currentId]: val }));
  };

  // Estimate total steps for progress bar (rough max path)
  const TOTAL_ESTIMATE = 9;

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 30% 40%, #0d0d1a 0%, #07070f 50%, #030308 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Cinzel', serif",
        position: "relative", overflow: "hidden",
      }}>
        {/* Stars */}
        <div style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              borderRadius: "50%",
              background: "rgba(255,255,255," + (Math.random() * 0.5 + 0.1) + ")",
            }} />
          ))}
        </div>

        <div style={{ textAlign: "center", position: "relative", zIndex: 2, padding: "0 24px", animation: "slideIn 0.6s ease" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.5)",
            background: "rgba(201,168,76,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 0 40px rgba(201,168,76,0.2)",
            fontSize: "2rem",
          }}>✦</div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "0.15em", margin: "0 0 16px" }}>
            APPLICATION RECEIVED
          </h1>
          <div style={{ width: 60, height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 24px" }} />
          <p style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em",
            lineHeight: 1.8, maxWidth: 420, margin: "0 auto 40px",
          }}>
            Thank you for applying to ZenCoders. We've received your responses and will be in touch soon. Good luck!
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/")} style={{
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 7, padding: "12px 28px",
              color: "#C9A84C", fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem", letterSpacing: "0.2em",
              cursor: "pointer", textTransform: "uppercase",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >← Back to Home</button>
            <button onClick={() => { setSubmitted(false); setAnswers({}); setHistory(["q_name"]); setCurrentId("q_name"); setVisitedCount(1); }} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 7, padding: "12px 28px",
              color: "rgba(255,255,255,0.4)", fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem", letterSpacing: "0.2em",
              cursor: "pointer", textTransform: "uppercase",
              transition: "all 0.2s",
            }}>Apply Again</button>
          </div>
        </div>

        <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 60%, #0d0d1a 0%, #07070f 40%, #030308 100%)",
      display: "flex", flexDirection: "column",
      fontFamily: "'Cinzel', serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Space background */}
      <div style={{ position: "fixed", width: 500, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(60,30,120,0.12) 0%, transparent 70%)", top: "10%", left: "5%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 400, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,60,120,0.08) 0%, transparent 70%)", bottom: "5%", right: "10%", pointerEvents: "none", zIndex: 0 }} />

      {/* Grid */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.02, pointerEvents: "none", zIndex: 0 }}>
        <defs><pattern id="hgrid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#hgrid)" />
      </svg>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingLeft: "28px", paddingRight: "32px",
        background: "rgba(3,5,8,0.88)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(201,168,76,0.18)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, overflow: "hidden", flexShrink: 0 }}>
            <img src="/assets/Zenlogo.png" alt="ZenCoders" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.currentTarget.style.display = "none"; }} />
          </div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.95rem", fontWeight: 700, color: "#C9A84C", letterSpacing: "0.22em", textShadow: "0 0 16px rgba(201,168,76,0.4)" }}>ZENCODERS</span>
        </div>
        <button onClick={() => navigate("/")} style={{
          background: "transparent", border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 6, padding: "7px 16px",
          color: "rgba(201,168,76,0.7)", fontFamily: "'Cinzel', serif",
          fontSize: "0.65rem", letterSpacing: "0.15em", cursor: "pointer",
          textTransform: "uppercase", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(201,168,76,0.7)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; }}
        >← Home</button>
      </nav>

      {/* Main content */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px", position: "relative", zIndex: 10,
      }}>
        <div style={{ width: "100%", maxWidth: 640 }}>

          {/* Header */}
          <div style={{ marginBottom: 40, textAlign: "center" }}>
            <p style={{ fontSize: "0.58rem", color: "rgba(201,168,76,0.45)", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 12 }}>
              ZenCoders · Open Recruitment
            </p>
            <h1 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700,
              color: "#fff", letterSpacing: "0.1em", margin: "0 0 8px",
              textShadow: "0 0 40px rgba(201,168,76,0.15)",
            }}>JOIN THE TEAM</h1>
            <div style={{ width: 50, height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto" }} />
          </div>

          {/* Progress bar */}
          <ProgressBar visited={visitedCount} total={TOTAL_ESTIMATE} />

          {/* Question card */}
          <QuestionCard
            key={currentId}
            question={current}
            answer={answers[currentId]}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
            canBack={history.length > 1}
            isLast={current.getNext(answers[currentId]) === "submit"}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        select option { background: #0a0a14; color: #fff; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.2);
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}
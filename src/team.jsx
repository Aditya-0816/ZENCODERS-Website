import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TEAM = [
    {
        id: 8, name: "Tanishq Srivastava", role: "Public Relations",
        img: "/assets/Tanishq.png", bg: ["#5A4A2B", "#3A2A0B"], accent: "#fb923c",
        year: "BBA • 3rd Year",
        quote: "Every conversation is an opportunity to build something lasting.",
        about: "Tanishq is ZenCoders' face to the broader world as Public Relations Head. He actively builds and nurtures partnerships with other student clubs, corporate sponsors, and industry contacts — bringing in resources, speakers, and collaboration opportunities that elevate every event. His natural charisma and strong communication skills make him highly effective at representing the club and forging relationships that last beyond a single event.",
        skills: ["PR & Outreach", "Networking", "Content Writing", "Negotiations", "Social Media"],
        linkedin: "https://linkedin.com/in/tanishq-srivastava",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 9, name: "Priyansh Bhardwaj", role: "Marketing Head",
        img: "/assets/Priyansh.png", bg: ["#4B6B2B", "#2B4B0B"], accent: "#a3e635",
        year: "BBA • 3rd Year",
        quote: "Make it so good they cannot scroll past it.",
        about: "Priyansh heads ZenCoders' marketing with a creative, data-informed approach that has significantly grown the club's visibility across campus and social media. From designing event campaigns to crafting captions that actually get engagement, he understands what resonates with the student community. He's behind most of the branding decisions you see across ZenCoders' digital touchpoints — and his work has played a big role in making the club feel polished and credible.",
        skills: ["Digital Marketing", "Branding", "Canva", "Content Creation", "Analytics"],
        linkedin: "https://linkedin.com/in/priyansh-bhardwaj",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 10, name: "Tanya Jain", role: "Digital Head",
        img: "/assets/Tanya.png", bg: ["#6B4A2B", "#4B2A0B"], accent: "#c084fc",
        year: "B.Tech IT • 3rd Year",
        quote: "The internet is only as good as the people who shape it.",
        about: "Tanya leads everything digital at ZenCoders — from maintaining the website and managing social media handles to coordinating online event experiences. She combines a strong sense of visual design with technical know-how, ensuring that ZenCoders' digital presence is always sharp, consistent, and engaging. Whether it's a last-minute Instagram story for an event or a complete website update, Tanya gets it done with precision and style.",
        skills: ["Web Management", "WordPress", "SEO", "Social Media", "Graphic Design"],
        linkedin: "https://linkedin.com/in/tanya-jain",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 7, name: "Saumya Sharma", role: "Management Head",
        img: "/assets/Saumya.png", bg: ["#2B4A6B", "#0B2A4B"], accent: "#38bdf8",
        year: "B.Tech ECE • 3rd Year",
        quote: "Organisation is not about perfection — it is about making space for people to thrive.",
        about: "Saumya is the glue that holds ZenCoders' internal operations together as Management Head. She oversees member onboarding, handles team documentation, and ensures that every department is aligned and functioning efficiently. Known for her approachability and organisational clarity, Saumya has built systems within the club that make it easier for new members to find their footing and for the core team to collaborate without friction.",
        skills: ["Management", "Documentation", "Google Workspace", "HR Coordination", "Planning"],
        linkedin: "https://linkedin.com/in/saumya-sharma",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 6, name: "Ananya Agrawal", role: "Technical Head",
        img: "/assets/Ananya.png", bg: ["#6B2B2B", "#4B0B0B"], accent: "#f87171",
        year: "B.Tech CSE • 3rd Year",
        quote: "Good design is the bridge between what something is and what it feels like.",
        about: "Ananya co-leads the technical division of ZenCoders with a sharp focus on design-driven development. He has spearheaded the UI/UX design of multiple club projects, developed workshop curricula for front-end technologies, and consistently advocates for accessibility and clean design within the team. His ability to blend aesthetic sensibility with solid engineering makes him a rare and valued presence in the club.",
        skills: ["UI/UX Design", "Figma", "JavaScript", "CSS", "React"],
        linkedin: "https://linkedin.com/in/ananya-agrawal",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 5, name: "Aditya Garg", role: "Technical Head",
        img: "/assets/Aditya.png", bg: ["#2B6B4A", "#0B4B2A"], accent: "#34d399",
        year: "BCA • 3rd Year",
        quote: "Clean code is not written, it is rewritten.",
        about: "Aditya leads ZenCoders' technical wing with a hands-on approach to everything code. He architected and built the club's website, has organised multiple workshops on DSA and systems programming, and actively contributes to open-source projects. Passionate about writing clean, efficient code, Aditya is also the go-to person when any member needs technical guidance — whether it's debugging a tricky problem or reviewing a project idea.",
        skills: ["React", "System Design", "C++", "Open Source", "DSA"],
        linkedin: "https://linkedin.com/in/aditya-garg",
        github: "https://github.com/Aditya-0816",
        instagram: "https://instagram.com",
    },
    {
        id: 4, name: "Shivansh Gupta", role: "Organising Secretary",
        img: "/assets/Shivansh.png", bg: ["#8B5A2B", "#6B3A0B"], accent: "#fbbf24",
        year: "BCA • 3rd Year",
        quote: "Behind every great event is a thousand small decisions made right.",
        about: "Shivansh is the operational engine that keeps ZenCoders running smoothly as Organising Secretary. From coordinating venues and schedules to managing volunteer teams and post-event documentation, he handles the end-to-end logistics of every event the club runs. His meticulous planning and calm under pressure have made him indispensable — if ZenCoders pulls off a seamless event, Shivansh is the reason why.",
        skills: ["Event Management", "Operations", "Communication", "MS Office", "Team Coordination"],
        linkedin: "https://linkedin.com/in/shivansh-gupta",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 3, name: "Soumil Mittal", role: "Founder & President",
        img: "/assets/Soumil.png", bg: ["#3a3a5a", "#1a1a3a"], accent: "#60a5fa",
        year: "BCA • 3rd Year",
        quote: "A community that codes together, grows together.",
        about: "Soumil is the Founder and President of ZenCoders, having built the club from the ground up with a singular vision — to create a space where every JIIT student can explore, learn, and grow as a developer. He leads the club's strategic direction, champions a culture of collaboration over competition, and ensures that both technical and non-technical students find their place in the community. Under his leadership, ZenCoders has grown into one of JIIT's most active and respected student clubs.",
        skills: ["Entrepreneurship", "Web Dev", "Python", "Community Building", "Public Speaking"],
        linkedin: "https://linkedin.com/in/soumil-mittal",
        github: "https://github.com/Soumilmittal",
        instagram: "https://instagram.com",
    },
    {
        id: 2, name: "Amritanshu", role: "Senior Advisor",
        img: "/assets/Amritanshu.png", bg: ["#6B4A8B", "#4B2A6B"], accent: "#a78bfa",
        year: "Integrated B.Tech ECE • 5th Year",
        quote: "The best way to learn is to build something you care about.",
        about: "Amritanshu is a seasoned Senior Advisor who bridges the gap between academics and club operations at ZenCoders. With deep expertise in full-stack development and a track record of representing JIIT at national-level coding competitions, he advises the team on event strategy, technical workshops, and student engagement. His ability to connect people and ideas has helped expand ZenCoders' reach across campus.",
        skills: ["Full-Stack Dev", "React", "Node.js", "Event Strategy", "Algorithms"],
        linkedin: "https://linkedin.com/in/amritanshu",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
    {
        id: 1, name: "Aryesh Srivastava", role: "Senior Advisor",
        img: "/assets/Aryesh.png", bg: ["#8B4A6B", "#6B2A4B"], accent: "#e879a0",
        year: "Integrated B.Tech CSE • 5th Year",
        quote: "Great code is written twice — once to make it work, once to make it right.",
        about: "Aryesh brings years of strategic insight to ZenCoders as a Senior Advisor, having mentored multiple generations of club leadership. With a strong foundation in software engineering and competitive programming, he has guided the team through key decisions on technical direction, event curation, and long-term club vision. His calm, analytical approach has been instrumental in shaping ZenCoders into the community it is today.",
        skills: ["Strategic Planning", "Mentorship", "C++", "Competitive Programming", "Team Leadership"],
        linkedin: "https://linkedin.com/in/aryesh-srivastava",
        github: "https://github.com",
        instagram: "https://instagram.com",
    },
];

const CARD_W = 155;
const CARD_H = 200;
const RX = 500;
const RY = 85;

// ── CMD-style typewriter hook ─────────────────────────────────────────────────
function useTypewriter(text, isActive) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    const idxRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (!isActive) {
            setDisplayed("");
            setDone(false);
            idxRef.current = 0;
            return;
        }
        idxRef.current = 0;
        setDisplayed("");
        setDone(false);

        const getDelay = (char) => {
            if ([".", "!", "?"].includes(char)) return 420 + Math.random() * 180;
            if ([",", ";", "—", "–"].includes(char)) return 180 + Math.random() * 80;
            if (char === " " && Math.random() < 0.18) return 90 + Math.random() * 60;
            if (Math.random() < 0.04) return 120 + Math.random() * 80;
            return 38 + Math.random() * 34;
        };

        const tick = () => {
            const char = text[idxRef.current];
            idxRef.current += 1;
            setDisplayed(text.slice(0, idxRef.current));
            if (idxRef.current < text.length) {
                timerRef.current = setTimeout(tick, getDelay(char));
            } else {
                setDone(true);
            }
        };
        timerRef.current = setTimeout(tick, 300);
        return () => clearTimeout(timerRef.current);
    }, [isActive, text]);

    return { displayed, done };
}

// ── Social icon SVGs ─────────────────────────────────────────────────────────
function LinkedInIcon({ color }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="4" />
            <path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 016 0v4" />
        </svg>
    );
}

function GitHubIcon({ color }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.73 1.04A9.3 9.3 0 0112 7.43c.84 0 1.69.12 2.48.34 1.9-1.31 2.73-1.04 2.73-1.04.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.27 10.27 0 0022 12.26C22 6.58 17.52 2 12 2z" />
        </svg>
    );
}

function InstagramIcon({ color }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill={color} stroke="none" />
        </svg>
    );
}

// ── Section heading inside modal ─────────────────────────────────────────────
function ModalSection({ title, accent, children }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                <div style={{ width: 3, height: 12, background: accent, borderRadius: 2 }} />
                <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    color: accent, letterSpacing: "0.22em", textTransform: "uppercase",
                }}>{title}</span>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${accent}44, transparent)` }} />
            </div>
            {children}
        </div>
    );
}

// ── Team Member Modal ─────────────────────────────────────────────────────────
function TeamModal({ member, onClose }) {
    const initials = member.name.split(" ").map(n => n[0]).join("");
    const typedAbout = useTypewriter(member.about, true);
    const { displayed, done } = typedAbout;

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const socials = [
        { label: "LinkedIn",  url: member.linkedin,  Icon: LinkedInIcon },
        { label: "GitHub",    url: member.github,    Icon: GitHubIcon },
        { label: "Instagram", url: member.instagram, Icon: InstagramIcon },
    ];

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                background: "rgba(3,5,10,0.42)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px",
                animation: "fadeInBackdrop 0.25s ease",
            }}
        >
            {/* Modal box */}
            <div style={{
                width: "100%", maxWidth: 720,
                maxHeight: "90vh",
                background: "linear-gradient(135deg, #0c1228 0%, #0d0a22 100%)",
                border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: 20, overflow: "hidden",
                boxShadow: `0 0 60px ${member.accent}22, 0 40px 80px rgba(0,0,0,0.8)`,
                display: "flex", flexDirection: "column",
                position: "relative",
                animation: "popIn 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}>
                {/* Top accent line */}
                <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`, flexShrink: 0 }} />

                {/* Close */}
                <button onClick={onClose} style={{
                    position: "absolute", top: 14, right: 14, zIndex: 10,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)", fontSize: "0.85rem",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${member.accent}33`; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >✕</button>

                {/* Scrollable body */}
                <div style={{ overflowY: "auto", flex: 1 }}>

                    {/* ── TOP SECTION: portrait card (left) + name/role/year/quote (right) ── */}
                    <div style={{
                        display: "flex", gap: 20, padding: "22px 22px 18px",
                        borderBottom: `1px solid rgba(255,255,255,0.07)`,
                        alignItems: "flex-start",
                    }}>
                        {/* Portrait — separate contained card, exactly like events modal */}
                        <div style={{
                            width: 150, flexShrink: 0,
                            borderRadius: 12,
                            background: `linear-gradient(145deg, ${member.bg[0]}, ${member.bg[1]})`,
                            border: `1px solid ${member.accent}33`,
                            overflow: "hidden",
                            height: 200,
                            boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 20px ${member.accent}18`,
                            display: "flex", flexDirection: "column",
                        }}>
                            {/* Image area */}
                            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                                    onError={e => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.nextSibling.style.display = "flex";
                                    }}
                                />
                                <div style={{
                                    display: "none", position: "absolute", inset: 0,
                                    alignItems: "center", justifyContent: "center",
                                    fontSize: "2.2rem", fontWeight: 800,
                                    color: "rgba(255,255,255,0.9)", fontFamily: "'Cinzel', serif",
                                }}>{initials}</div>
                                {/* Bottom fade */}
                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)", pointerEvents: "none" }} />
                            </div>

                        </div>

                        {/* Right: role, year, quote */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {/* Badge */}
                            <div style={{ marginBottom: 10 }}>
                                <span style={{
                                    display: "inline-flex", alignItems: "center", gap: 5,
                                    padding: "3px 10px", borderRadius: 20,
                                    background: `${member.accent}18`,
                                    border: `1px solid ${member.accent}44`,
                                    color: member.accent,
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontSize: "0.6rem", fontWeight: 700,
                                    letterSpacing: "0.14em", textTransform: "uppercase",
                                }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: member.accent, display: "inline-block", boxShadow: `0 0 6px ${member.accent}` }} />
                                    {member.role}
                                </span>
                            </div>

                            {/* Full name */}
                            <h2 style={{
                                fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700,
                                color: "#fff", margin: "0 0 4px", lineHeight: 1.35,
                            }}>{member.name}</h2>

                            {/* Year */}
                            <p style={{
                                fontFamily: "'Rajdhani', sans-serif", fontSize: "0.68rem",
                                color: `${member.accent}bb`, margin: "0 0 14px",
                                letterSpacing: "0.06em",
                            }}>{member.year}</p>

                            {/* Quote inline */}
                            <div style={{
                                borderLeft: `3px solid ${member.accent}77`,
                                paddingLeft: 10,
                            }}>
                                <p style={{
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontSize: "0.74rem", fontStyle: "italic",
                                    color: "rgba(255,255,255,0.45)", lineHeight: 1.65,
                                    margin: 0, letterSpacing: "0.02em",
                                }}>"{member.quote}"</p>
                            </div>
                        </div>
                    </div>

                    {/* ── SECTIONS BELOW ── */}
                    <div style={{ padding: "18px 22px 24px" }}>

                        {/* About — CMD typewriter */}
                        <ModalSection title="About" accent={member.accent}>
                            <div style={{
                                background: "rgba(0,0,0,0.35)",
                                border: `1px solid ${member.accent}22`,
                                borderRadius: 8, padding: "10px 12px",
                                fontFamily: "'Courier New', Courier, monospace",
                                fontSize: "0.74rem", color: "rgba(255,255,255,0.75)",
                                lineHeight: 1.8, letterSpacing: "0.01em",
                                minHeight: "5rem",
                            }}>
                                {displayed}
                                <span style={{
                                    display: "inline-block",
                                    width: "0.55em", height: "1em",
                                    background: member.accent,
                                    marginLeft: 2,
                                    verticalAlign: "text-bottom",
                                    animation: "blink 1.1s step-end infinite",
                                    opacity: done ? 0 : 1,
                                }} />
                            </div>
                        </ModalSection>

                        {/* Skills */}
                        <ModalSection title="Skills" accent={member.accent}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                                {member.skills.map(skill => (
                                    <span key={skill} style={{
                                        padding: "4px 12px", borderRadius: 20,
                                        background: `${member.accent}18`,
                                        border: `1px solid ${member.accent}44`,
                                        color: member.accent,
                                        fontFamily: "'Rajdhani', sans-serif",
                                        fontSize: "0.65rem", fontWeight: 600,
                                        letterSpacing: "0.08em",
                                    }}>{skill}</span>
                                ))}
                            </div>
                        </ModalSection>

                        {/* Connect */}
                        <ModalSection title="Connect" accent={member.accent}>
                            <div style={{ display: "flex", gap: 10 }}>
                                {socials.map(({ label, url, Icon }) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={label}
                                        style={{
                                            width: 42, height: 42, borderRadius: 10,
                                            background: `${member.accent}12`,
                                            border: `1px solid ${member.accent}33`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            textDecoration: "none", transition: "all 0.2s", cursor: "pointer",
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = `${member.accent}28`;
                                            e.currentTarget.style.borderColor = `${member.accent}88`;
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = `${member.accent}12`;
                                            e.currentTarget.style.borderColor = `${member.accent}33`;
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }}
                                    >
                                        <Icon color={member.accent} />
                                    </a>
                                ))}
                            </div>
                        </ModalSection>

                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Avatar card ───────────────────────────────────────────────────────────────
function Avatar({ name, img, bg }) {
    const initials = name.split(" ").map((n) => n[0]).join("");
    const [imgError, setImgError] = useState(false);

    return (
        <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(145deg, ${bg[0]}, ${bg[1]})`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
        }}>
            {!imgError ? (
                <img
                    src={img} alt={name}
                    onError={() => setImgError(true)}
                    style={{
                        position: "absolute", top: 0, left: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "top center", display: "block",
                    }}
                />
            ) : (
                <>
                    <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "rgba(255,255,255,0.13)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.4rem", fontWeight: 800,
                        color: "rgba(255,255,255,0.92)",
                        fontFamily: "'Cinzel', serif",
                        border: "1px solid rgba(255,255,255,0.22)",
                        letterSpacing: "0.05em",
                    }}>{initials}</div>
                    <p style={{
                        fontFamily: "'Cinzel', serif", fontSize: "0.6rem", fontWeight: 700,
                        color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em",
                        textAlign: "center", padding: "0 10px", margin: "10px 0 0", lineHeight: 1.4,
                    }}>{name}</p>
                </>
            )}
            {!imgError && (
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                    pointerEvents: "none",
                }} />
            )}
        </div>
    );
}

// ── Main Team component ───────────────────────────────────────────────────────
export default function Team() {
    const angleRef = useRef(0);
    const rafRef = useRef(null);
    const hoveredRef = useRef(null);
    const [cards, setCards] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

    useEffect(() => {
        const compute = () => TEAM.map((member, i) => {
            const angle = angleRef.current + (i / TEAM.length) * Math.PI * 2;
            const x = Math.cos(angle) * RX;
            const y = Math.sin(angle) * RY;
            const sinA = Math.sin(angle);
            const t = (sinA + 1) / 2;
            const scale = 0.52 + 0.55 * t;
            const zIndex = Math.round(50 + sinA * 50);
            const opacity = 0.3 + 0.7 * t;
            const rotateY = -Math.cos(angle) * 30;
            const rotateZ = Math.cos(angle) * -18;
            const brightness = 0.4 + 0.65 * t;
            return { ...member, x, y, scale, zIndex, opacity, rotateY, rotateZ, brightness, angle };
        });

        const animate = () => {
            if (!hoveredRef.current) angleRef.current += 0.004;
            setCards(compute());
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: "radial-gradient(ellipse at 50% 40%, #0d1020 0%, #050709 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden", position: "relative", padding: "40px 0",
        }}>
            {/* Atmosphere blobs */}
            <div style={{ position: "absolute", width: 400, height: 300, borderRadius: "50%", background: "#3b1d6e", filter: "blur(90px)", opacity: 0.4, top: "5%", left: "0", pointerEvents: "none", animation: "blob1 10s ease-in-out infinite" }} />
            <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "#1a3060", filter: "blur(90px)", opacity: 0.4, top: "50%", right: "0", pointerEvents: "none", animation: "blob2 12s ease-in-out infinite" }} />
            <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "#1a4020", filter: "blur(80px)", opacity: 0.35, top: "20%", right: "15%", pointerEvents: "none", animation: "blob1 9s ease-in-out infinite 2s" }} />
            <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: "3px", background: "linear-gradient(to bottom, transparent, #22c55e 40%, #22c55e 60%, transparent)", borderRadius: "2px" }} />

            {/* Header */}
            <div style={{ textAlign: "center", zIndex: 100, position: "relative", marginBottom: "10px" }}>
                <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "0.04em", textShadow: "0 2px 40px rgba(255,255,255,0.15)" }}>
                    Meet our Team
                </h2>
                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "clamp(0.82rem, 1.8vw, 0.98rem)", color: "rgba(255,255,255,0.48)", marginTop: "10px", maxWidth: "480px", lineHeight: 1.7, letterSpacing: "0.02em", margin: "10px auto 0" }}>
                    A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
                </p>
            </div>

            {/* Carousel stage */}
            <div style={{ position: "relative", width: "min(1100px, 98vw)", height: "430px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                {cards.map((member) => {
                    const isHov = hovered === member.id;
                    return (
                        <div
                            key={member.id}
                            onMouseEnter={() => setHovered(member.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setSelectedMember(member)}
                            style={{
                                position: "absolute", left: "50%", top: "50%",
                                width: CARD_W, height: CARD_H,
                                marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2,
                                zIndex: isHov ? 200 : member.zIndex,
                                opacity: isHov ? 1 : member.opacity,
                                cursor: "pointer",
                                transform: isHov
                                    ? `translate(${member.x}px, ${member.y}px) scale(${member.scale * 1.2})`
                                    : `translate(${member.x}px, ${member.y}px) scale(${member.scale}) rotateY(${member.rotateY}deg) rotateZ(${member.rotateZ}deg)`,
                                filter: isHov
                                    ? "brightness(1.4) drop-shadow(0 24px 48px rgba(0,0,0,0.95))"
                                    : `brightness(${member.brightness}) drop-shadow(0 8px 24px rgba(0,0,0,0.7))`,
                                transition: isHov
                                    ? "transform 0.38s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease, filter 0.3s ease"
                                    : "opacity 0.08s linear, filter 0.08s linear",
                                willChange: "transform, opacity, filter",
                                borderRadius: "18px",
                            }}
                        >
                            <div style={{
                                width: "100%", height: "100%", borderRadius: "18px", overflow: "hidden",
                                border: isHov ? `1px solid ${member.accent}88` : "1px solid rgba(255,255,255,0.07)",
                                boxShadow: isHov
                                    ? `0 32px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px ${member.accent}22`
                                    : "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                            }}>
                                <Avatar name={member.name} img={member.img} bg={member.bg} />
                            </div>

                            <div style={{
                                position: "absolute", bottom: "-42px", left: "50%",
                                transform: "translateX(-50%)", textAlign: "center",
                                whiteSpace: "nowrap",
                                opacity: isHov ? 1 : Math.max(0, (member.opacity - 0.7) * 3.5),
                                transition: "opacity 0.3s ease", pointerEvents: "none",
                            }}>
                                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "0.07em", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>{member.name}</p>
                                <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.63rem", color: "rgba(201,168,76,0.95)", margin: "2px 0 0", letterSpacing: "0.1em", textTransform: "uppercase", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>{member.role}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedMember && (
                <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
            )}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Rajdhani:wght@400;600;700&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                @keyframes blob1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.08)} }
                @keyframes blob2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(1.06)} }
                @keyframes fadeInBackdrop { from{opacity:0} to{opacity:1} }
                @keyframes popIn { from{opacity:0;transform:scale(0.92) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
            `}</style>
        </div>
    );
}
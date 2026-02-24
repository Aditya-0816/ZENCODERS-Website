import { useEffect, useRef, useState } from "react";

const TEAM = [
    { id: 1, name: "Aryesh Srivastava", role: "Senior Advisor", bg: ["#8B4A6B", "#6B2A4B"] },
    { id: 2, name: "Amritanshu", role: "Senior Advisor", bg: ["#6B4A8B", "#4B2A6B"] },
    { id: 3, name: "Soumil Mittal", role: "Founder & President", bg: ["#3a3a5a", "#1a1a3a"] },
    { id: 4, name: "Shivansh Gupta", role: "Organising Secretrary", bg: ["#8B5A2B", "#6B3A0B"] },
    { id: 5, name: "Aditya Garg", role: "Technical Head", bg: ["#2B6B4A", "#0B4B2A"] },
    { id: 6, name: "Ananya Agrawal", role: "Technical Head", bg: ["#6B2B2B", "#4B0B0B"] },
    { id: 7, name: "Saumya Sharma", role: "Management Head", bg: ["#2B4A6B", "#0B2A4B"] },
    { id: 8, name: "Tanishq Srivastava", role: "Public Relations", bg: ["#5A4A2B", "#3A2A0B"] },
    { id: 9, name: "Priyansh Bhardwaj", role: "Marketing Head", bg: ["#4B6B2B", "#2B4B0B"] },
    { id: 10, name: "Tanya Jain", role: "Digital Head", bg: ["#6B4A2B", "#4B2A0B"] },
];

const CARD_W = 155;
const CARD_H = 195;
const RX = 500;
const RY = 85;

function Avatar({ name, bg }) {
    const initials = name.split(" ").map((n) => n[0]).join("");
    return (
        <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(145deg, ${bg[0]}, ${bg[1]})`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "10px",
        }}>
            <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.13)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
                fontFamily: "'Cinzel', serif",
                border: "1px solid rgba(255,255,255,0.22)",
                letterSpacing: "0.05em",
            }}>
                {initials}
            </div>
            <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem", fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.06em",
                textAlign: "center",
                padding: "0 10px", margin: 0,
                lineHeight: 1.4,
            }}>{name}</p>
        </div>
    );
}

export default function Team() {
    const angleRef = useRef(0);
    const rafRef = useRef(null);
    const hoveredRef = useRef(null);
    const [cards, setCards] = useState([]);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        hoveredRef.current = hovered;
    }, [hovered]);

    useEffect(() => {
        const compute = () => {
            return TEAM.map((member, i) => {
                const angle = angleRef.current + (i / TEAM.length) * Math.PI * 2;
                const x = Math.cos(angle) * RX;
                const y = Math.sin(angle) * RY;
                const sinA = Math.sin(angle);
                const t = (sinA + 1) / 2; // 0 = back, 1 = front
                const scale = 0.52 + 0.55 * t;
                const zIndex = Math.round(50 + sinA * 50);
                const opacity = 0.3 + 0.7 * t;
                const rotateY = -Math.cos(angle) * 30;
                const rotateZ = Math.cos(angle) * -18;
                const brightness = 0.4 + 0.65 * t;
                return { ...member, x, y, scale, zIndex, opacity, rotateY, rotateZ, brightness, angle };
            });
        };

        const animate = () => {
            if (!hoveredRef.current) {
                angleRef.current += 0.004;
            }
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
            overflow: "hidden", position: "relative",
            padding: "40px 0",
        }}>

            {/* Atmosphere blobs */}
            <div style={{
                position: "absolute", width: 400, height: 300,
                borderRadius: "50%", background: "#3b1d6e",
                filter: "blur(90px)", opacity: 0.4,
                top: "5%", left: "0", pointerEvents: "none",
                animation: "blob1 10s ease-in-out infinite",
            }} />
            <div style={{
                position: "absolute", width: 300, height: 300,
                borderRadius: "50%", background: "#1a3060",
                filter: "blur(90px)", opacity: 0.4,
                top: "50%", right: "0", pointerEvents: "none",
                animation: "blob2 12s ease-in-out infinite",
            }} />
            <div style={{
                position: "absolute", width: 200, height: 200,
                borderRadius: "50%", background: "#1a4020",
                filter: "blur(80px)", opacity: 0.35,
                top: "20%", right: "15%", pointerEvents: "none",
                animation: "blob1 9s ease-in-out infinite 2s",
            }} />

            {/* Green left accent */}
            <div style={{
                position: "absolute", left: 0, top: "15%", bottom: "15%", width: "3px",
                background: "linear-gradient(to bottom, transparent, #22c55e 40%, #22c55e 60%, transparent)",
                borderRadius: "2px",
            }} />

            {/* Header */}
            <div style={{ textAlign: "center", zIndex: 100, position: "relative", marginBottom: "10px" }}>
                <h2 style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontWeight: 800, color: "#fff", margin: 0,
                    letterSpacing: "0.04em",
                    textShadow: "0 2px 40px rgba(255,255,255,0.15)",
                }}>
                    Meet our Team
                </h2>
                <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(0.82rem, 1.8vw, 0.98rem)",
                    color: "rgba(255,255,255,0.48)",
                    marginTop: "10px", maxWidth: "480px",
                    lineHeight: 1.7, letterSpacing: "0.02em",
                    margin: "10px auto 0",
                }}>
                    A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
                </p>
            </div>

            {/* Carousel stage */}
            <div style={{
                position: "relative",
                width: "min(1100px, 98vw)",
                height: "430px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
            }}>
                {cards.map((member) => {
                    const isHov = hovered === member.id;
                    return (
                        <div
                            key={member.id}
                            onMouseEnter={() => setHovered(member.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: CARD_W,
                                height: CARD_H,
                                marginLeft: -CARD_W / 2,
                                marginTop: -CARD_H / 2,
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
                            {/* Card */}
                            <div style={{
                                width: "100%", height: "100%",
                                borderRadius: "18px",
                                overflow: "hidden",
                                border: isHov
                                    ? "1px solid rgba(255,255,255,0.3)"
                                    : "1px solid rgba(255,255,255,0.07)",
                                boxShadow: isHov
                                    ? "0 32px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.2)"
                                    : "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                            }}>
                                <Avatar name={member.name} bg={member.bg} />
                            </div>

                            {/* Role tag */}
                            <div style={{
                                position: "absolute",
                                bottom: "-42px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                opacity: isHov ? 1 : Math.max(0, (member.opacity - 0.7) * 3.5),
                                transition: "opacity 0.3s ease",
                                pointerEvents: "none",
                            }}>
                                <p style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: "0.72rem", fontWeight: 700,
                                    color: "#fff", margin: 0,
                                    letterSpacing: "0.07em",
                                    textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                                }}>{member.name}</p>
                                <p style={{
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontSize: "0.63rem",
                                    color: "rgba(201,168,76,0.95)",
                                    margin: "2px 0 0",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                                }}>{member.role}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;800&family=Rajdhani:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blob1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-20px) scale(1.08); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(20px) scale(1.06); }
        }
      `}</style>
        </div>
    );
}
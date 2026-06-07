import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─── Icon Components ────────────────────────────────────────────────────────
const IconBox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconBot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V3"/><circle cx="12" cy="3" r="1"/>
    <path d="M8 15h.01M16 15h.01"/>
  </svg>
);
const IconBrain = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ─── Floating Orbs Background ────────────────────────────────────────────────
const FloatingOrbs = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    <div style={{
      position: "absolute", width: 600, height: 600, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
      top: -100, right: -100, animation: "float1 8s ease-in-out infinite"
    }} />
    <div style={{
      position: "absolute", width: 400, height: 400, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
      bottom: 100, left: -50, animation: "float2 10s ease-in-out infinite"
    }} />
    <div style={{
      position: "absolute", width: 300, height: 300, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
      top: "50%", left: "40%", animation: "float3 12s ease-in-out infinite"
    }} />
    <style>{`
      @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
      @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
      @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes spin { to{transform:rotate(360deg)} }
      .fade-up { animation: fadeUp 0.7s ease forwards; opacity: 0; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }
      .delay-5 { animation-delay: 0.5s; }
      .delay-6 { animation-delay: 0.6s; }
      .feature-card:hover { transform: translateY(-4px); border-color: rgba(6,182,212,0.4) !important; }
      .feature-card { transition: transform 0.3s ease, border-color 0.3s ease; }
      .stat-card:hover { border-color: rgba(6,182,212,0.3) !important; }
      .stat-card { transition: border-color 0.3s ease; }
      .btn-primary:hover { background: rgb(8,212,237) !important; box-shadow: 0 0 24px rgba(6,182,212,0.4) !important; }
      .btn-primary { transition: background 0.2s, box-shadow 0.2s; }
      .btn-secondary:hover { background: rgba(255,255,255,0.08) !important; }
      .btn-secondary { transition: background 0.2s; }
      .step-card:hover .step-num { color: rgb(6,182,212) !important; }
      .step-card { transition: all 0.2s; }
      .nav-link { transition: color 0.2s; }
      .nav-link:hover { color: rgb(6,182,212) !important; }
    `}</style>
  </div>
);

// ─── Navbar ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Pricing", id: "cta" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 32px",
      background: scrolled ? "rgba(2,8,20,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: "linear-gradient(135deg, rgb(6,182,212), rgb(139,92,246))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "white"
        }}>🗃️</div>
        <span style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>
          Inventra<span style={{ color: "rgb(6,182,212)" }}>AI</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {NAV_LINKS.map(({ label, id }) => (
          <button key={id} onClick={() => scrollTo(id)} className="nav-link"
            style={{
              color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500,
              background: "none", border: "none", cursor: "pointer", padding: 0
            }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Link to="/login" style={{
          padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500,
          border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)",
          textDecoration: "none", background: "transparent"
        }} className="btn-secondary">Login</Link>
        <Link to="/register" style={{
          padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600,
          background: "rgb(6,182,212)", color: "#021014",
          textDecoration: "none", boxShadow: "0 0 16px rgba(6,182,212,0.3)"
        }} className="btn-primary">Get Started</Link>
      </div>
    </nav>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────
const Hero = ({ heroImage }) => (
  <section style={{
    minHeight: "100vh", display: "flex", alignItems: "center",
    position: "relative", padding: "100px 32px 60px",
    maxWidth: 1200, margin: "0 auto"
  }}>
    <FloatingOrbs />
    <div style={{
      position: "relative", zIndex: 1,
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 60, alignItems: "center", width: "100%"
    }}>
      {/* Left */}
      <div>
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)",
          borderRadius: 100, padding: "5px 14px", marginBottom: 24
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "rgb(6,182,212)", animation: "pulse 2s infinite"
          }} />
          <span style={{ color: "rgb(6,182,212)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
            AI-POWERED PLATFORM
          </span>
        </div>
        <h1 className="fade-up delay-1" style={{
          fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.1,
          color: "white", margin: "0 0 20px", letterSpacing: "-1.5px"
        }}>
          Smart Inventory<br />
          <span style={{
            backgroundImage: "linear-gradient(90deg, rgb(6,182,212), rgb(139,92,246))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Management
          </span>
        </h1>
        <p className="fade-up delay-2" style={{
          fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.7,
          margin: "0 0 36px", maxWidth: 460
        }}>
          Manage products, track sales, forecast demand and get
          AI-powered business insights — all in one unified platform.
        </p>

        {/* Social proof */}
        <div className="fade-up delay-2" style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 32
        }}>
          <div style={{ display: "flex" }}>
            {["#06b6d4","#8b5cf6","#06b6d4","#f59e0b"].map((c, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: "50%",
                background: c, border: "2px solid rgb(2,8,20)",
                marginLeft: i ? -8 : 0
              }} />
            ))}
          </div>
          <div>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: "#f59e0b" }}><IconStar /></span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
              Trusted by 500+ businesses
            </span>
          </div>
        </div>

        <div className="fade-up delay-3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/register" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 12, fontWeight: 700,
            background: "rgb(6,182,212)", color: "#021014", textDecoration: "none",
            fontSize: 15, boxShadow: "0 0 32px rgba(6,182,212,0.35)"
          }} className="btn-primary">
            Start Free Trial <IconArrow />
          </Link>
          <Link to="/login" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 12, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)",
            textDecoration: "none", fontSize: 15, background: "rgba(255,255,255,0.03)"
          }} className="btn-secondary">
            Sign In
          </Link>
        </div>
      </div>

      {/* Right — Image Card */}
      <div className="fade-up delay-4" style={{ position: "relative" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24, padding: 12,
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}>
          {/* Fake browser bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 8
          }}>
            {["#ef4444","#f59e0b","#22c55e"].map(c => (
              <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <div style={{
              flex: 1, height: 22, borderRadius: 6,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginLeft: 8
            }} />
          </div>
          <img
            src={heroImage}
            alt="Inventory Management"
            style={{ width: "100%", borderRadius: 16, display: "block" }}
          />
        </div>
        {/* Floating stat badge */}
        <div style={{
          position: "absolute", bottom: -16, left: -20,
          background: "rgba(2,8,20,0.9)", border: "1px solid rgba(6,182,212,0.3)",
          borderRadius: 14, padding: "12px 18px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>Accuracy</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "rgb(6,182,212)" }}>98.7%</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>AI Forecast Precision</div>
        </div>
        <div style={{
          position: "absolute", top: -16, right: -20,
          background: "rgba(2,8,20,0.9)", border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: 14, padding: "12px 18px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>Saved Today</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "rgb(139,92,246)" }}>₹2.4L</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Waste Prevented</div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Stats Bar ───────────────────────────────────────────────────────────────
const StatsBar = () => (
  <section style={{
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "28px 32px",
    background: "rgba(255,255,255,0.02)"
  }}>
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0
    }}>
      {[
        { num: "500+", label: "Businesses" },
        { num: "50M+", label: "Products Tracked" },
        { num: "98.7%", label: "Forecast Accuracy" },
        { num: "10x", label: "Faster Decisions" },
      ].map(({ num, label }, i) => (
        <div key={i} className="stat-card" style={{
          textAlign: "center", padding: "12px 0",
          borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none"
        }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>{num}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{label}</div>
        </div>
      ))}
    </div>
  </section>
);

// ─── Features ────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <IconBox />, color: "rgb(6,182,212)", bg: "rgba(6,182,212,0.1)",
    title: "Product Management",
    desc: "Add, categorize and manage your entire inventory with real-time stock tracking and low-stock alerts.",
    tags: ["Bulk Upload", "Categories", "Stock Alerts"]
  },
  {
    icon: <IconChart />, color: "rgb(139,92,246)", bg: "rgba(139,92,246,0.1)",
    title: "Sales Analytics",
    desc: "Monitor sales performance with beautiful real-time dashboards. Spot trends before they happen.",
    tags: ["Live Dashboard", "Trend Reports", "Export CSV"]
  },
  {
    icon: <IconBot />, color: "rgb(251,146,60)", bg: "rgba(251,146,60,0.1)",
    title: "AI Assistant",
    desc: "Ask natural language questions about your inventory and get intelligent, data-driven answers instantly.",
    tags: ["Natural Language", "Smart Answers", "24/7"]
  },
  {
    icon: <IconBrain />, color: "rgb(34,197,94)", bg: "rgba(34,197,94,0.1)",
    title: "Demand Forecasting",
    desc: "Predict future demand using advanced ML models. Never overstock or run out of products again.",
    tags: ["ML Models", "Seasonal", "Alerts"]
  },
];

const Features = () => (
  <section id="features" style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}>
    <div className="fade-up" style={{ textAlign: "center", marginBottom: 60 }}>
      <div style={{
        display: "inline-block", background: "rgba(139,92,246,0.1)",
        border: "1px solid rgba(139,92,246,0.25)", borderRadius: 100,
        padding: "5px 14px", marginBottom: 16
      }}>
        <span style={{ color: "rgb(139,92,246)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
          FEATURES
        </span>
      </div>
      <h2 style={{
        fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white",
        letterSpacing: "-1px", margin: "0 0 14px"
      }}>Everything You Need to Scale</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
        From small shops to enterprise warehouses — Inventra AI grows with you.
      </p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
      {features.map(({ icon, color, bg, title, desc, tags }, i) => (
        <div key={i} className={`feature-card fade-up delay-${i + 1}`} style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20, padding: 28, cursor: "default"
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: bg, color: color,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 18
          }}>
            {icon}
          </div>
          <h3 style={{ color: "white", fontSize: 19, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.3px" }}>
            {title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.65, margin: "0 0 18px" }}>
            {desc}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map(t => (
              <span key={t} style={{
                fontSize: 11, fontWeight: 600, padding: "3px 10px",
                borderRadius: 100, border: `1px solid ${color}33`,
                color: color, background: bg, letterSpacing: "0.03em"
              }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Add Products", desc: "Import your inventory via CSV or add products manually with detailed attributes." },
  { num: "02", title: "Record Sales", desc: "Log every transaction. The system automatically updates stock levels in real-time." },
  { num: "03", title: "Analyze Data", desc: "View rich dashboards with sales trends, top products, and inventory health scores." },
  { num: "04", title: "Get AI Forecasts", desc: "Receive predictive insights on demand, reorder points, and seasonal patterns." },
];

const HowItWorks = () => (
  <section id="how-it-works" style={{
    padding: "100px 32px",
    background: "rgba(255,255,255,0.015)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div className="fade-up" style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{
          display: "inline-block", background: "rgba(6,182,212,0.1)",
          border: "1px solid rgba(6,182,212,0.25)", borderRadius: 100,
          padding: "5px 14px", marginBottom: 16
        }}>
          <span style={{ color: "rgb(6,182,212)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>
            HOW IT WORKS
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white",
          letterSpacing: "-1px", margin: 0
        }}>
          Up and Running in Minutes
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
        {/* Connector line */}
        <div style={{
          position: "absolute", top: 28, left: "12.5%", right: "12.5%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)"
        }} />
        {steps.map(({ num, title, desc }, i) => (
          <div key={i} className={`step-card fade-up delay-${i + 1}`} style={{
            padding: "0 24px", textAlign: "center", position: "relative"
          }}>
            <div className="step-num" style={{
              fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.08)",
              lineHeight: 1, marginBottom: 16, transition: "color 0.3s",
              fontVariantNumeric: "tabular-nums"
            }}>{num}</div>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "rgb(6,182,212)", margin: "0 auto 20px",
              boxShadow: "0 0 16px rgba(6,182,212,0.5)"
            }} />
            <h3 style={{ color: "white", fontSize: 16, fontWeight: 700, margin: "0 0 10px" }}>{title}</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA ─────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section id="cta" style={{ padding: "120px 32px", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
    <div className="fade-up" style={{
      background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 28, padding: "70px 40px",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.12), transparent 60%)"
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)",
          borderRadius: 100, padding: "5px 14px", marginBottom: 20
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgb(6,182,212)", animation: "pulse 2s infinite" }} />
          <span style={{ color: "rgb(6,182,212)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em" }}>NO CREDIT CARD REQUIRED</span>
        </div>
        <h2 style={{
          fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, color: "white",
          letterSpacing: "-1.5px", margin: "0 0 16px", lineHeight: 1.1
        }}>
          Ready to Transform<br />Your Inventory?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, margin: "0 0 40px", lineHeight: 1.6 }}>
          Join 500+ businesses already using Inventra AI to run smarter operations.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "16px 36px", borderRadius: 12, fontWeight: 700,
            background: "rgb(6,182,212)", color: "#021014", textDecoration: "none",
            fontSize: 16, boxShadow: "0 0 40px rgba(6,182,212,0.4)"
          }} className="btn-primary">
            Start Free Trial <IconArrow />
          </Link>
        </div>
        <div style={{
          display: "flex", justifyContent: "center", gap: 28, marginTop: 28, flexWrap: "wrap"
        }}>
          {["14-day free trial", "No credit card", "Cancel anytime"].map(t => (
            <span key={t} style={{
              display: "flex", alignItems: "center", gap: 6,
              color: "rgba(255,255,255,0.45)", fontSize: 13
            }}>
              <span style={{ color: "rgb(6,182,212)" }}><IconCheck /></span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    maxWidth: 1200, margin: "0 auto"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 26, height: 26, borderRadius: 6,
        background: "linear-gradient(135deg, rgb(6,182,212), rgb(139,92,246))",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700, color: "white"
      }}>I</div>
      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>
        Inventra<span style={{ color: "rgb(6,182,212)" }}>AI</span>
      </span>
    </div>
    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
      © 2026 Inventra AI. All Rights Reserved.
    </span>
    <div style={{ display: "flex", gap: 20 }}>
      {["Privacy", "Terms", "Contact"].map(l => (
        <a key={l} href="#" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}
          className="nav-link">{l}</a>
      ))}
    </div>
  </footer>
);

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage({ heroImage }) {
  return (
    <div style={{
      background: "rgb(2,8,20)",
      minHeight: "100vh",
      color: "white",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      overflowX: "hidden"
    }}>
      <Navbar />
      <Hero heroImage={heroImage} />
      <StatsBar />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
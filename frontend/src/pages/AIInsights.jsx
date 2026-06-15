import { useEffect, useState } from "react";
import axios from "axios";
import { getAISummary } from "../services/aiSummaryService";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconTrophy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const IconPackage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconRevenue = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconBrain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
  </svg>
);

const Skeleton = ({ className }) => (
  <div className={`bg-white/[0.06] rounded-lg animate-pulse ${className}`} />
);

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoadingSummary(true);
      const data = await getAISummary();
      setSummary(data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    fetchInsights();
    fetchSummary();
  }, []);

  const fetchInsights = async () => {
    try {
const token = localStorage.getItem("token");

const response = await axios.get(
  "https://inventraai-ai-inventory-management-system.onrender.com/api/insights",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);      setInsights(response.data.insights);
    } catch (error) {
      console.log(error);
    }
  };

  const statCards = insights ? [
    { icon: <IconTrophy />, label: "Top Selling Product", value: insights.topSellingProduct, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", iconColor: "text-amber-400" },
    { icon: <IconPackage />, label: "Total Products Sold", value: insights.totalProductsSold, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", iconColor: "text-green-400" },
    { icon: <IconAlert />, label: "Low Stock Products", value: insights.lowStockProducts.length, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", iconColor: "text-red-400" },
    { icon: <IconRevenue />, label: "Total Revenue", value: `₹${insights.totalRevenue || 0}`, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", iconColor: "text-violet-400" },
  ] : [];

  return (
    // Same flex layout as Dashboard — no gap issue
    <div className="bg-zinc-950 min-h-screen text-white">

      <Sidebar setShowChat={setShowChat} />

      <div className="flex-1 ml-60 p-8 overflow-y-auto">

        {/* ── Page Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <IconBrain />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">AI Insights</h1>
            <p className="text-white/35 text-xs">Powered by Inventra AI</p>
          </div>
        </div>

        {/* ── Loading skeletons ── */}
        {!insights ? (
          <>
            <Skeleton className="w-full h-40 mb-6 rounded-2xl" />
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
          </>
        ) : (
          <>
            {/* ── AI Summary Card ── */}
            <div className="bg-gradient-to-br from-cyan-500/[0.07] to-violet-500/[0.07] border border-white/[0.08] rounded-2xl p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                  <IconBrain />
                </div>
                <h2 className="text-base font-bold text-white">AI Summary</h2>
                {!loadingSummary && (
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] text-green-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Generated
                  </span>
                )}
              </div>
              {loadingSummary ? (
                <div className="space-y-2.5">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-5/6 h-4" />
                  <Skeleton className="w-4/6 h-4" />
                  <p className="text-cyan-400 text-xs mt-3 flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    Generating AI insights...
                  </p>
                </div>
              ) : (
                <p className="text-white/65 text-sm leading-relaxed whitespace-pre-line">{summary}</p>
              )}
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {statCards.map(({ icon, label, value, color, bg, border, iconColor }) => (
                <div key={label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold text-white/40 tracking-widest uppercase">{label}</p>
                    <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center ${iconColor}`}>
                      {icon}
                    </div>
                  </div>
                  <p className={`text-3xl font-extrabold tracking-tight ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* ── Low Stock Details ── */}
            <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6 pb-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-red-400"><IconAlert /></span>
                <h2 className="text-base font-bold text-white">Low Stock Details</h2>
                <span className="ml-auto text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                  {insights.lowStockProducts.length} products
                </span>
              </div>
              {insights.lowStockProducts.length === 0 ? (
                <p className="text-white/25 text-sm text-center py-8">All products are well stocked ✅</p>
              ) : (
                <div className="space-y-2">
                  {insights.lowStockProducts.map((product, i) => (
                    <div key={product._id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-red-500/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-white/20 w-5">{i + 1}</span>
                        <p className="text-white text-sm font-semibold">{product.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40">Stock:</span>
                        <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg ${product.quantity <= 2 ? "bg-red-500/15 text-red-400 border border-red-500/25" : "bg-amber-400/15 text-amber-400 border border-amber-400/25"}`}>
                          {product.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* AIChatModal agar use karta hai tu */}
      {showChat && (
        <div className="fixed inset-0 z-50">
          {/* AIChatModal yahan render hoga */}
        </div>
      )}
    </div>
  );
};

export default AIInsights;
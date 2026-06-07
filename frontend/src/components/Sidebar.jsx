import { FaBox, FaChartBar, FaRobot} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bot, LogOut, User } from "lucide-react";
import botImage from "../assets/bot.png"; // teri robot image ka path
import { MdAttachMoney } from "react-icons/md";

const NAV_ITEMS = [
  { icon: <FaBox size={16} />, label: "Products",  href: "/dashboard" },
  { icon: <FaChartBar size={16} />, label: "Analytics", href: "/analytics" },
  { icon: <FaRobot size={16} />, label: "AI Insights", href: "/ai-insights" },
  { icon: <MdAttachMoney size={16} />, label: "Sales Info", href: "/sales-info" },
];

const Sidebar = ({ setShowChat }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-[rgb(4,10,24)] border-r border-white/[0.06] flex flex-col z-40">

      {/* ── Logo ── */}
      <div className="px-5 py-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-extrabold text-sm text-white shrink-0">
            🗃️
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">
            Inventra<span className="text-cyan-400">AI</span>
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="text-[10px] font-semibold text-white/25 tracking-widest px-3 mb-3">MENU</p>

        {NAV_ITEMS.map(({ icon, label, href }) => {
          const isActive = location.pathname === href || location.hash === href.split("#")[1]?.replace(/^/, "#");
          return (
            <Link
              key={label}
              to={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                ${isActive
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                }`}
            >
              <span className={`transition-colors ${isActive ? "text-cyan-400" : "text-white/30 group-hover:text-white/70"}`}>
                {icon}
              </span>
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── AI Assistant Button ── */}
      <div className="px-3 mb-3">
        <button
          onClick={() => setShowChat(true)}
          className="w-full rounded-2xl bg-gradient-to-br from-[rgb(10,20,50)] to-[rgb(20,10,60)] border border-violet-500/20 hover:border-cyan-500/40 transition-all overflow-hidden group"
        >
          {/* Robot image area */}
          <div className="flex justify-center pt-4 pb-1">
            <img
              src={botImage}
              alt="AI Bot"
              className="w-16 h-16 object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Label */}
          <div className="pb-3 px-3 text-center">
            <p className="text-white font-bold text-sm">AI Assistant</p>
            <p className="text-white/35 text-[11px] mt-0.5">Ask about your inventory</p>
          </div>
          {/* Bottom gradient bar */}
          <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* ── Profile + Logout ── */}
      <div className="px-3 pb-5 border-t border-white/[0.06] pt-4 space-y-1">

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all group"
        >
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/20 flex items-center justify-center shrink-0">
            <User size={13} className="text-violet-400" />
          </div>
          <span>Profile</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/[0.07] transition-all group"
        >
          <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center shrink-0">
            <LogOut size={13} className="text-red-400" />
          </div>
          <span>Logout</span>
        </button>

      </div>
    </div>
  );
};

export default Sidebar;
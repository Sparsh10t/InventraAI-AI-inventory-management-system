import { useEffect, useState } from "react";
import { getSales } from "../services/salesService";
import SalesHistory from "../components/SalesHistory";
import Sidebar from "../components/Sidebar";
import AIChatModal from "../components/AIChatModal";
import TopSellingProducts from "../components/TopSellingProducts";

const SalesInfo = () => {
  const [sales, setSales] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchSales();
  }, []);


  const fetchSales = async () => {
    try {
      const data = await getSales();
      setSales(data.sales);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans">
      <Sidebar setShowChat={setShowChat} />

      <div className="ml-60 p-8 overflow-y-auto">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-lg">
            📊
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Sales History</h1>
            <p className="text-white/35 text-xs">Information related to sales</p>
          </div>
        </div>


        {/* ── Sales Overview ── */}
        <h2 className="text-lg font-bold text-white mt-9 mb-4 tracking-tight">💰 Sales Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
            <p className="text-xs font-semibold text-white/40 tracking-widest mb-3">SALES HISTORY</p>
            <SalesHistory sales={sales} />
          </div>
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
            <p className="text-xs font-semibold text-white/40 tracking-widest mb-3">TOP SELLING</p>
            <TopSellingProducts sales={sales} />
          </div>
        </div>


      </div>

      <AIChatModal show={showChat} setShow={setShowChat} />
    </div>
  );
};

export default SalesInfo;
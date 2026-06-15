import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getSales } from "../services/salesService";
import ProductChart from "../components/ProductChart";
import LowStockAlert from "../components/LowStockAlert";
import Sidebar from "../components/Sidebar";
import AIChatModal from "../components/AIChatModal";
import CategoryPieChart from "../components/CategoryPieChart";
import SalesLineChart from "../components/SalesLineChart";


const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

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
            <h1 className="text-2xl font-extrabold tracking-tight">Analytics</h1>
            <p className="text-white/35 text-xs">Charts, sales & AI insights</p>
          </div>
        </div>

        {/* ── Product Chart ── */}
        <h2 className="text-lg font-bold text-white mt-2 mb-4 tracking-tight">📊 Analytics</h2>
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
          <ProductChart products={products} />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
  <CategoryPieChart products={products} />
  <SalesLineChart sales={sales} />
</div>

        {/* ── Low Stock Alerts ── */}
        <h2 className="text-lg font-bold text-white mt-9 mb-4 tracking-tight">⚠️ Low Stock Alerts</h2>
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
          <LowStockAlert products={products} />
        </div>


      </div>

      <AIChatModal show={showChat} setShow={setShowChat} />
    </div>
  );
};

export default Analytics;
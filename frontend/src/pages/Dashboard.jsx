import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../services/productService";
import AddProductForm from "../components/AddProductForm";
import ProductChart from "../components/ProductChart";
import Sidebar from "../components/Sidebar";
import LowStockAlert from "../components/LowStockAlert";
import { sellProduct, getSales } from "../services/salesService";
import AIRecommendations from "../components/AIRecommendations";
import { getForecast } from "../services/forecastService";
import ForecastCard from "../components/ForecastCard";
import AIChatModal from "../components/AIChatModal";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IconChat = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, onSell, onDelete, onStock }) => {
  const isLow = product.quantity <= 5;
  const [sellQty, setSellQty] = useState(1);

  const handleSell = () => {
    const qty = parseInt(sellQty);
    if (!qty || qty < 1) return;
    if (qty > product.quantity) return;
    onSell(product._id, qty);
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-0.5">

      {/* Name */}
      <h3 className="text-white font-bold text-base mb-3 tracking-tight">
        {product.name}
      </h3>

      {/* Category + Price badges */}
      <div className="flex justify-between mb-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
          {product.category}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
          ₹{product.price}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06] my-3" />

      {/* Stock controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-white/40">Stock</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onStock(product, -1)}
            className="w-7 h-7 rounded-lg border border-orange-400/30 bg-orange-400/10 text-orange-400 font-bold text-sm flex items-center justify-center hover:bg-orange-400/25 transition-colors"
          >−</button>
          <span className={`text-base font-bold min-w-[28px] text-center ${isLow ? "text-red-400" : "text-white"}`}>
            {product.quantity}
          </span>
          <button
            onClick={() => onStock(product, 1)}
            className="w-7 h-7 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 font-bold text-sm flex items-center justify-center hover:bg-green-500/25 transition-colors"
          >+</button>
        </div>
        {isLow && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/25">
            LOW
          </span>
        )}
      </div>

      {/* Sell qty input */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-white/40 shrink-0">Sell Qty</span>
        <div className="flex items-center flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
          <button
            onClick={() => setSellQty(q => Math.max(1, Number(q) - 1))}
            className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors font-bold text-sm"
          >−</button>
          <input
            type="number"
            min={1}
            max={product.quantity}
            value={sellQty}
            onChange={(e) => setSellQty(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm font-bold text-center outline-none w-0 min-w-0"
          />
          <button
            onClick={() => setSellQty(q => Math.min(product.quantity, Number(q) + 1))}
            className="px-3 py-2 text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors font-bold text-sm"
          >+</button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleSell}
          disabled={sellQty < 1 || sellQty > product.quantity}
          className="flex-1 py-2 rounded-xl bg-cyan-500 text-[rgb(2,8,20)] font-bold text-sm hover:bg-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Sell {sellQty} Unit{sellQty > 1 ? "s" : ""}
        </button>
        <button
          onClick={() => onDelete(product._id)}
          title="Delete product"
          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors"
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sales, setSales] = useState([]);
  const [prediction, setPrediction] = useState(0);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchForecast();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };



  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStock = async (product, value) => {
    try {
      await updateProduct(product._id, {
        quantity: product.quantity + value,
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSell = async (productId, qty = 1) => {
    try {
      await sellProduct(productId, qty);
      fetchProducts();
      fetchSales();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchForecast = async () => {
    try {
      const data = await getForecast();
      setPrediction(data.prediction);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportCSV = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      "http://localhost:8000/api/products/export-csv",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  const blob =
    await response.blob();

  const url =
    window.URL.createObjectURL(
      blob
    );

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    "products.csv";

  a.click();
};

  // Stats derived from data
  const totalProducts = products.length;
  const totalStock = products.reduce((s, p) => s + p.quantity, 0);
  const lowStockCount = products.filter((p) => p.quantity <= 5).length;
  const totalSales = sales.length;

  return (
    <div className="bg-[rgb(2,8,20)] min-h-screen text-white font-sans">

      {/* Sidebar — unchanged */}
      <Sidebar setShowChat={setShowChat} />

      <div className="flex-1 ml-60 p-8 overflow-y-auto">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-extrabold text-base text-white">
              I
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Inventra<span className="text-cyan-400">AI</span>
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 ml-1">
              Dashboard
            </span>
          </div>

          {/* Export csv button */}
          <button
  onClick={handleExportCSV}
  className="
    bg-green-600
    text-white
    px-4 py-2
    rounded-lg
  "
>
  Export CSV
</button>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-4 gap-3 mb-2">
          {[
            { label: "Total Products", value: totalProducts, color: "text-cyan-400" },
            { label: "Total Stock",    value: totalStock,    color: "text-violet-400" },
            { label: "Low Stock",      value: lowStockCount, color: "text-red-400" },
            { label: "Total Sales",    value: totalSales,    color: "text-green-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4">
              <p className="text-xs text-white/40 mb-1.5">{label}</p>
              <p className={`text-3xl font-extrabold tracking-tight ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Add Product Form ── */}
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6 mt-7">
          <p className="text-white font-bold text-sm mb-4 tracking-tight">➕ Add New Product</p>
          <AddProductForm fetchProducts={fetchProducts} />
        </div>

        {/* Search */}
          <div className="relative flex-1 max-w-sm mx-8 mt-6 ">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
              <IconSearch />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

        {/* ── Products Section ── */}
        <div className="flex items-center gap-2 text-lg font-bold text-white mt-9 mb-4 tracking-tight">
          📦 Products
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 tracking-wide">
            {filteredProducts.length} items
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSell={handleSell}
              onDelete={handleDelete}
              onStock={updateStock}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-16 text-white/20 text-sm">
              No products found
            </div>
          )}
        </div>

        {/* ── Low Stock Alerts ── */}
        <h2 className="text-lg font-bold text-white mt-9 mb-4 tracking-tight">⚠️ Low Stock Alerts</h2>
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
          <LowStockAlert products={products} />
        </div>



        {/* ── AI Insights ── */}
        <h2 className="text-lg font-bold text-white mt-9 mb-4 tracking-tight">🤖 AI Insights</h2>
        <div className="grid grid-cols-2 gap-4 pb-12">
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
            <p className="text-xs font-semibold text-white/40 tracking-widest mb-3">AI RECOMMENDATIONS</p>
            <AIRecommendations products={products} sales={sales} />
          </div>
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
            <p className="text-xs font-semibold text-white/40 tracking-widest mb-3">DEMAND FORECAST</p>
            <ForecastCard prediction={prediction} />
          </div>
        </div>

      </div>

      <AIChatModal show={showChat} setShow={setShowChat} />

    </div>
  );
};

export default Dashboard;
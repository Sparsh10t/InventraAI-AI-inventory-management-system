import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgb(4,10,24)] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white/40 text-xs mb-1">Sale #{label}</p>
        <p className="text-cyan-400 font-bold text-sm">{payload[0].value} units</p>
      </div>
    );
  }
  return null;
};

const SalesLineChart = ({ sales = [] }) => {
  const chartData = sales.map((sale, index) => ({
    saleNo: index + 1,
    quantity: sale.quantitySold,
  }));

  return (
    <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-base">📈</span>
        <h2 className="text-base font-bold text-white tracking-tight">Sales Trend</h2>
        <span className="ml-auto text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
          {sales.length} sales
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="saleNo"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            tickLine={false}
            label={{ value: "Sale #", position: "insideBottom", offset: -2, fill: "rgba(255,255,255,0.2)", fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(6,182,212,0.2)", strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="rgb(6,182,212)"
            strokeWidth={2.5}
            dot={{ fill: "rgb(6,182,212)", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "rgb(6,182,212)", stroke: "rgba(6,182,212,0.3)", strokeWidth: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesLineChart;
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "rgb(6,182,212)",
  "rgb(139,92,246)",
  "rgb(34,197,94)",
  "rgb(251,191,36)",
  "rgb(239,68,68)",
  "rgb(249,115,22)",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgb(4,10,24)] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white/40 text-xs mb-1">{payload[0].name}</p>
        <p className="font-bold text-sm" style={{ color: payload[0].payload.fill }}>
          {payload[0].value} units
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
    {payload.map((entry, i) => (
      <div key={i} className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: entry.color }} />
        <span className="text-white/50 text-xs">{entry.value}</span>
      </div>
    ))}
  </div>
);

const CategoryPieChart = ({ products = [] }) => {
  const categoryData = [];
  products.forEach((product) => {
    const existing = categoryData.find((item) => item.name === product.category);
    if (existing) {
      existing.value += Number(product.quantity);
    } else {
      categoryData.push({ name: product.category, value: Number(product.quantity) });
    }
  });

  return (
    <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-base">🎨</span>
        <h2 className="text-base font-bold text-white tracking-tight">Category Distribution</h2>
        <span className="ml-auto text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400">
          {categoryData.length} categories
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={50}
            paddingAngle={3}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
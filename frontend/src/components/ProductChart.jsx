import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductChart = ({ products }) => {
  return (
    <div className="bg-white/[0.025] p-6 rounded-2xl shadow mt-8">
      
      <h2 className="text-2xl font-bold mb-6">
        Inventory Stock Chart
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        
        <BarChart data={products}>
          
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
  dataKey="quantity"
  fill="#3B82F6"
/> 

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ProductChart;
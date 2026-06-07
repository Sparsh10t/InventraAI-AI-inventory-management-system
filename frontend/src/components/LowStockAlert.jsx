const LowStockAlert = ({ products }) => {

  const lowStockProducts = products.filter(
    (product) => product.quantity < 10
  );

  return (
    <div className="bg-white/[0.025] p-6 rounded-2xl shadow mt-8">

      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Low Stock Alerts
      </h2>

      {lowStockProducts.length === 0 ? (
        <p>All products are sufficiently stocked.</p>
      ) : (
        lowStockProducts.map((product) => (
          <div
            key={product._id}
            className="border-b py-3"
          >
            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="text-red-500">
              Only {product.quantity} left
            </p>
          </div>
        ))
      )}

    </div>
  );
};

export default LowStockAlert;
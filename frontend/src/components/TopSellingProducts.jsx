const TopSellingProducts = ({ sales }) => {

  const productMap = {};

  sales.forEach((sale) => {

    if (productMap[sale.productName]) {

      productMap[sale.productName] +=
        sale.quantitySold;

    } else {

      productMap[sale.productName] =
        sale.quantitySold;
    }
  });

  const sortedProducts = Object.entries(
    productMap
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white/[0.025] p-6 rounded-2xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Top Selling Products
      </h2>

      {sortedProducts.length === 0 ? (

        <p>No sales data yet.</p>

      ) : (

        sortedProducts.map(
          ([name, quantity], index) => (

            <div
              key={name}
              className="border-b py-3"
            >

              <h3 className="font-semibold">
                #{index + 1} {name}
              </h3>

              <p>
                Sold: {quantity}
              </p>

            </div>
          )
        )
      )}

    </div>
  );
};

export default TopSellingProducts;
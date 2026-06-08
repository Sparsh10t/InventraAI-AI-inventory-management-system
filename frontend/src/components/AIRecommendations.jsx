const AIRecommendations = ({
  products,
  sales,
}) => {

  const recommendations = [];

  products.forEach((product) => {

    let totalSold = 0;

    sales.forEach((sale) => {

      if (
        sale.productName === product.name
      ) {
        totalSold += sale.quantitySold;
      }
    });

    if (
      product.quantity < 20 &&
      totalSold >= 5
    ) {

      recommendations.push({
        name: product.name,
        quantity: product.quantity,
        sold: totalSold,
      });
    }
  });
console.log("Recommendations:", recommendations);
  return (
    <div className="bg-white/[0.025] p-6 rounded-2xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-6">
        AI Restock Recommendations
      </h2>

      {recommendations.length === 0 ? (

        <p>
          No urgent restock needed.
        </p>

      ) : (

        recommendations.map((item) => (

          <div
            key={item.name}
            className="border-b py-3"
          >

            <h3 className="font-semibold">
              {item.name}
            </h3>

            <p className="text-red-500">
              Only {item.quantity} left
            </p>

            <p className="text-blue-500">
              Sold {item.sold} units
            </p>

            <p className="font-semibold mt-2">
              Recommended to restock soon
            </p>

          </div>
        ))
      )}

    </div>
  );
};

export default AIRecommendations;
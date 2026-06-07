const SalesHistory = ({ sales }) => {

  return (
    <div className="bg-white/[0.025] p-6 rounded-2xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Sales History
      </h2>

      {sales.length === 0 ? (

        <p>No sales yet.</p>

      ) : (

        sales.map((sale) => (

          <div
            key={sale._id}
            className="border-b py-3"
          >

            <h3 className="font-semibold">
              {sale.productName}
            </h3>

            <p>
              Quantity Sold:
              {sale.quantitySold}
            </p>

            <p>
              Revenue:
              ₹{sale.totalPrice}
            </p>

          </div>
        ))
      )}

    </div>
  );
};

export default SalesHistory;
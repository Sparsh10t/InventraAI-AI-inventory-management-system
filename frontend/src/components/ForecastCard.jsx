const ForecastCard = ({ prediction }) => {
  return (
    <div className="bg-white/[0.025] p-6 rounded-2xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-4">
        AI Demand Forecast
      </h2>

      <p className="text-3xl text-blue-600">
        {prediction} Units
      </p>

      <p className="mt-2">
        Predicted future demand based on sales history
      </p>

    </div>
  );
};

export default ForecastCard;
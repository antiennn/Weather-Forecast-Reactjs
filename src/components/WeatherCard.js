const WeatherCard = ({ obj, darkMode }) => (
  <div
    className={`bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out ${
      darkMode ? "bg-gray-700 text-black" : ""
    }`}
  >
    <div className="flex items-center mb-4">
      <img
        src={obj.day.condition.icon}
        alt={obj.day.condition.text}
        className="w-12 h-12 mr-4"
      />
      <div>
        <h4 className="text-2xl font-bold">{obj.date}</h4>
        <p className="text-lg">
          <span className="font-semibold">Temperature:</span> {obj.day.avgtemp_c}
          °C
        </p>
        <p className="text-lg">
          <span className="font-semibold">Wind Speed:</span> {obj.day.maxwind_mph} m/h
        </p>
        <p className="text-lg">
          <span className="font-semibold">Humidity:</span> {obj.day.avghumidity}%
        </p>
        <p className="text-lg">
          <span className="font-semibold">Condition:</span> {obj.day.condition.text}
        </p>
      </div>
    </div>
  </div>
);

export default WeatherCard;

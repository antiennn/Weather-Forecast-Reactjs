import LoadingSpinner from "./LoadingSpinner";

const CurrentWeather = ({ isloading,weatherData, darkMode }) => (
  <>
  {weatherData?<div  className={`flex items-center justify-center bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl mb-12 ${
      darkMode ? "bg-gray-800 text-black" : ""
    }`}>
    <section>
    <h2 className="text-4xl font-bold mb-6">
      Current Weather in {weatherData.location.name}
    </h2>
    <div className="grid grid-cols-2 gap-6 text-lg">
      <p>
        <span className="font-semibold">Temperature:</span>{" "}
        {weatherData.current.temp_c}°C
      </p>
      <p>
        <span className="font-semibold">Wind Speed:</span>{" "}
        {weatherData.current.wind_mph} m/h
      </p>
      <p>
        <span className="font-semibold">Humidity:</span>{" "}
        {weatherData.current.humidity}%
      </p>
      <p>
        <span className="font-semibold">Condition:</span>{" "}
        {weatherData.current.condition.text}
      </p>
    </div>
  </section>
  <img
        src={weatherData.current.condition.icon}
        alt={weatherData.current.condition.text}
        className="w-32 h-32 mx-auto"
      />
  </div>:<>{isloading && <LoadingSpinner/>}</>}</>
);

export default CurrentWeather;

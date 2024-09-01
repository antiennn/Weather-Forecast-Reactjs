import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import WeatherCard from "./WeatherCard";
import LoadingMore from "./LoadMore";

const Forecast = ({ weatherData, visibleDays, loadMoreDays, darkMode }) => {
  const { ref, inView } = useInView({
    threshold: 0.95, 
  });

  const handleLoadMore = () => {
    if (inView && weatherData && weatherData.forecast.forecastday.length == visibleDays) {
      loadMoreDays();
    }
  };

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  return (
    <>
      {weatherData && (
        <section
          className={`bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl mb-12 ${
            darkMode ? "bg-gray-800 text-black" : ""
          }`}
        >
          <h3 className="text-3xl font-bold mb-6">
            {weatherData.forecast.forecastday.length - 1}- Day Forecast
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {weatherData.forecast.forecastday.slice(1).map((obj, index) => (
              <WeatherCard key={index} obj={obj} darkMode={darkMode} />
            ))}
          </div>
          {weatherData.forecast.forecastday.length < 11 && (
            <LoadingMore darkMode={darkMode} ref={ref} />
          )}
        </section>
      )}
    </>
  );
};

export default Forecast;

import { useEffect, useState } from "react";
import { images } from "./assets";
import WeatherInput from "./components/WeatherInput";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Header from "./Layout/Header";
import toast, { Toaster } from "react-hot-toast";
import { getToday } from "./helper/getDate";
import APIs, { endpoint } from "./config/APIs";
import Subscribe from "./components/Subscribe";

function App() {
  const [latitude, setlatitude] = useState();
  const [requestperms, setrequestperms] = useState(true);
  const [localstorage, setlocalstorage] = useState(true);
  const [isloading, setisloading] = useState(true);
  const [longitude, setlongitude] = useState();
  const [forecast, setForecast] = useState();
  const [lang, setLang] = useState("en");
  const [visibleDays, setVisibleDays] = useState();
  const [city, setCity] = useState();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const fetchWeatherData = async (lat, lon) => {
    try {
      const res = await APIs.get(
        endpoint.forecast(`${lat},${lon}`, visibleDays, lang)
      );
      setForecast(res.data);
      localStorage.setItem("data", JSON.stringify(res.data));
      localStorage.setItem("time", JSON.stringify(getToday()));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCityWeatherData = async (query) => {
    try {
      const res = await APIs.get(endpoint.forecast(query, visibleDays, lang));
      setForecast(res.data);
      localStorage.setItem("data", JSON.stringify(res.data));
      localStorage.setItem("time", JSON.stringify(getToday()));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle fetching weather data based on the user's current location.
  const handleUseCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject("Location access denied.");
        }
      );
    });
  };

  const getWeatherIcon = (description) => {
    switch (description) {
      case "Sunny":
        return images.sunny;
      case "Rainy":
        return images.Rainly;
      case "Cloudy":
        return images.Cloud;
      case "Partly Cloudy":
        return images.Cloudly;
      default:
        return images.sunny;
    }
  };

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  const loadMoreDays = () => {
    setVisibleDays((prev) => Math.min(prev + 2, 11));
    setisloading(false);
  };

  useEffect(() => {
    if (
      localstorage &&
      localStorage.getItem("time") &&
      JSON.parse(localStorage.getItem("time")) == getToday()
    ) {
      setForecast(JSON.parse(localStorage.getItem("data")));
      setlocalstorage(false);
      setrequestperms(false);
    } else {
      // Request geolocation access when the component mounts.
      if (requestperms) {
        setisloading(true);
        handleUseCurrentLocation()
          .then((position) => {
            const { latitude, longitude } = position.coords;
            setlatitude(latitude);
            setlongitude(longitude);
            setCity();
            setVisibleDays(3);
            toast.success("Weather data updated based on your location.");
          })
          .catch((error) => {
            setVisibleDays(3);
            setisloading(false);
            toast.error(error);
            setrequestperms(false);
          });
      }
    }
  }, [requestperms]);
  useEffect(() => {
    if (visibleDays) {
      if (isloading) {
        setForecast();
      }
      if (city) {
        fetchCityWeatherData(city);
      } else {
        if (latitude && longitude) {
          fetchWeatherData(latitude, longitude);
        }
      }
    }
  }, [visibleDays, city, lang, latitude, longitude]);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-start ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300 ease-in-out`}
    >
      <Toaster />
      <Header
        setisloading={setisloading}
        setLang={setLang}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <WeatherInput
        latitude={latitude}
        longitude={longitude}
        setrequestperms={setrequestperms}
        setisloading={setisloading}
        setCity={setCity}
        setVisibleDays={setVisibleDays}
        darkMode={darkMode}
      />
      <CurrentWeather
        isloading={isloading}
        weatherData={forecast}
        darkMode={darkMode}
      />
      <Subscribe darkMode={darkMode} forecast={forecast} />
      <Forecast
        weatherData={forecast}
        visibleDays={visibleDays}
        loadMoreDays={loadMoreDays}
        getWeatherIcon={getWeatherIcon}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;

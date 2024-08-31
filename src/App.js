import { useEffect, useState } from "react";
import { images } from "./assets";
import WeatherInput from "./components/WeatherInput";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Header from "./Layout/Header";
import toast, { Toaster } from "react-hot-toast";
import { getNextDays } from "./helper/getDate";
import APIs, { endpoint } from "./config/APIs";

export const fakeWeatherData = {
  current: {
    city: "Ho Chi Minh City",
    temperature: 30,
    windSpeed: 5,
    humidity: 60,
    description: "Sunny",
  },
  forecast: getNextDays(7).map((day, index) => ({
    day,
    temperature: 30 - index,
    windSpeed: 5 + index,
    humidity: 60 + index,
    description: index % 2 === 0 ? "Sunny" : "Cloudy",
  })),
};

function App() {  
  const [latitude,setlatitude] = useState()
  const [isloading,setisloading] = useState(false)
  const [longitude, setlongitude] = useState()
  const [forecast, setForecast] = useState()
  const [lang,setLang] = useState("en")
  const [visibleDays, setVisibleDays] = useState();
  const [city, setCity] = useState();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const fetchWeatherData = async (lat, lon) => {
    try{
      const res = await APIs.get(endpoint.forecast(`${lat},${lon}`,visibleDays,lang))
      setForecast(res.data)
      
    }catch(err){
      console.log(err);
    }
  };

  const fetchCityWeatherData = async (query) => {
    try{
      const res = await APIs.get(endpoint.forecast(query,visibleDays,lang))
      setForecast(res.data)      
      
    }catch(err){
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
  };

  useEffect(() => {
    // Request geolocation access when the component mounts.
    handleUseCurrentLocation()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        setlatitude(latitude)
        setlongitude(longitude)
        setVisibleDays(3)
        toast.success("Weather data updated based on your location.");
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);
  useEffect(()=>{
    if(visibleDays){
      if(isloading){
        setForecast()
        setisloading(false)
      }
      if(city){
        fetchCityWeatherData(city)
      }else{
        fetchWeatherData(latitude, longitude);
      }
    }
  }, [visibleDays,city,lang])


  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-start ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300 ease-in-out`}
    >
      <Toaster />
      <Header
        setLang = {setLang}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <WeatherInput
        latitude = {latitude}
        longitude = {longitude}
        setisloading = {setisloading}
        setCity={setCity}
        handleUseCurrentLocation={handleUseCurrentLocation}
        darkMode={darkMode}
      />
      <CurrentWeather
        weatherData={forecast}
        darkMode={darkMode}
      />
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

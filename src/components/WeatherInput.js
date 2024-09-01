import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import APIs, { endpoint } from "../config/APIs";

const WeatherInput = ({
  latitude,
  longitude,
  setrequestperms,
  setisloading,
  setCity,
  handleUseCurrentLocation,
  darkMode,
}) => {
  const [hide, sethide] = useState(true);
  const [suggest, setsuggest] = useState([]);
  const [hint, sethint] = useState();

  const handleLocation = async () => {
    if (latitude && longitude) {
      setisloading(true);
      setCity();
    } else {
      setrequestperms(true);
    }
  };
  useEffect(() => {    
    const getAPIsearch = async () => {
      try {
        const res = await APIs.get(endpoint["search"](hint));
        setsuggest(res.data);
      } catch (err) {
        toast.error("Failed to access data");
      }
    };
    if (hint && hint.trim()) {
      getAPIsearch();
    }
  }, [hint]);

  return (
    <section className="relative w-full max-w-md mb-12">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={hint}
          onFocus={() => sethide(false)}
          onBlur={() =>
            setTimeout(() => {
              sethide(true);
            }, 500)
          }
          onChange={(e) => sethint(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } focus:outline-none`}
          maxLength={40}
        />
      </div>
      {!hide && suggest.length != 0 && (
        <div
          className={`absolute w-full p-2 z-10 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } cursor-pointer`}
        >
          {suggest.length != 0 &&
            suggest.map((e, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setisloading(true);
                    sethide(true);
                    setCity(e.name);
                    sethint(e.name);
                  }}
                  className={`my-1 p-2 rounded-md flex gap-2 justify-start ${
                    !darkMode ? "hover:bg-slate-400" : "hover:bg-gray-500"
                  }`}
                >
                  {e.name && (
                    <p>
                      <b>Name: </b>
                      {e.name}
                    </p>
                  )}
                  {e.region && (
                    <p>
                      <b>Region: </b>
                      {e.region}
                    </p>
                  )}
                  {e.country && (
                    <p>
                      <b>Country: </b>
                      {e.country}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      )}
      <button
        onClick={handleLocation}
        className={`w-full text-white px-6 py-3 font-semibold rounded-lg ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600"
        } transition duration-300 ease-in-out`}
      >
        Use Current Location
      </button>
    </section>
  );
};

export default WeatherInput;

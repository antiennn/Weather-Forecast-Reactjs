import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ setisloading,setLang, darkMode, toggleDarkMode }) => {
  const [selectedValue, setselectedValue] = useState("en")
  return (
    <header className="w-full max-w-5xl flex justify-between items-center py-4 px-6 bg-opacity-80 rounded-lg shadow-md mb-8">
      <h1 className="text-4xl font-bold">Weather Dashboard</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-yellow-500 hover:bg-yellow-600"
          } transition duration-300 ease-in-out`}
        >
          {darkMode ? (
            <FaSun className="w-6 h-6" />
          ) : (
            <FaMoon className="w-6 h-6 text-white" />
          )}
        </button>
        <select
          value={selectedValue}
          className={`outline-none border-none ${darkMode?"bg-gray-900":"bg-gray-100"}`}
          onChange={(e) => {
            setselectedValue(e.target.value)
            setisloading(true)
            setLang(e.target.value);
          }}
        >
          <option value="zh">ZH</option>
          <option value="en" selected>
            EN
          </option>
          <option value="vi">VI</option>
        </select>
      </div>
    </header>
  );
};

export default Header;

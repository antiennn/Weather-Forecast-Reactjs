import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingMore = React.forwardRef(({ darkMode }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center mt-6 px-4 py-2 rounded-lg font-semibold text-center cursor-pointer transition-opacity duration-1000 ease-in-out opacity-100`}
    >
      <div className="flex items-center space-x-2">
        <FaSpinner
          className={`text-2xl ${
            darkMode ? "text-gray-300" : "text-gray-800"
          } animate-spin`}
        />
        <span>Loading more...</span>
      </div>
    </div>
  );
});

export default LoadingMore;

import React, { useState } from "react";
import APIs, { endpoint } from "../config/APIs";
import toast from "react-hot-toast";

function Subscribe({ darkMode, forecast }) {
  const [email, setemail] = useState();
  const handleSubscribe = async () => {
    if(!email){
        toast.error("please write your email in here");
        return
    }    
    try {
        var res = await APIs.post(endpoint.sendmail,{
            email:email,
            query:forecast.location.name,
        })
        if(res.status === 200){
            toast.success(res.data);
        }
    } catch (error) {
        toast.error(res.data);
    }
  };
  return (
    <>
    {forecast&&<div
      className={`flex gap-5 items-center bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl mb-12 ${
        darkMode ? "bg-gray-800 text-black" : ""
      }`}
    >
      <span className="font-semibold text-xs md:text-xl">
        Subscribe for this location:
      </span>
      <input
      value={email}
      onChange={(e)=>setemail(e.target.value)}
        type="email"
        className={`w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-800 focus:outline-none`}
      />
      <button
        onClick={handleSubscribe}
        className="rounded-md flex justify-center items-center w-28 bg-blue-500 text-white p-2 "
      >
        Subscribe
      </button>
    </div>}</>
  );
}

export default Subscribe;

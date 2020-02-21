import React from "react";

const WeatherCardSmall = () => {
  return (
    <div className="flex flex-col">
      <div className="py-4 px-4 flex flex-col items-center bg-white border border-gray-300 rounded-t-lg">
        <div className="text-gray-700">15:00</div>
        <img
          className="w-16 h-16"
          src={`http://openweathermap.org/img/wn/10d.png`}
        />
        <div className="text-xl">0 ℃</div>
      </div>
      <div className="py-4 px-4 flex flex-col items-center bg-blue-100 text-gray-700 text-sm rounded-b-lg border border-t-0 border-gray-300 leading-snug">
        <div>2.1 m/s</div>
        <div>5 %</div>
        <div>1 mm</div>
      </div>
    </div>
  );
};

export default WeatherCardSmall;

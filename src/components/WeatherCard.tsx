import React from "react";

const WeatherCard = () => {
  return (
    <div className="mb-64 pb-4 px-4 bg-white rounded-lg border border-gray-300">
      <div className="flex flex-no-wrap justify-between mb-6">
        <div className="flex flex-col justify-center">
          <div className="text-2xl leading-none">Helsinki</div>
          <div className="text-gray-700">Scattered clouds</div>
        </div>
        <div className="flex flex-no-wrap items-center">
          <img
            className="w-24 h-24"
            src={`http://openweathermap.org/img/wn/10d@2x.png`}
          />
          <div className="text-4xl">0 ℃</div>
        </div>
      </div>
      <div className="flex flex-no-wrap justify-between">
        <div className="flex flex-col justify-end">
          <div className="text-xl">May 2nd</div>
          <div className="text-gray-700">11:53</div>
        </div>
        <div className="flex flex-col text-right justify-end text-gray-700">
          <div>Wind: 5.1 m/s</div>
          <div>Humidity: 86 %</div>
          <div>Precipitation (3h): 5 mm</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

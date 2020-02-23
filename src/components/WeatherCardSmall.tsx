import React from "react";
import { format, fromUnixTime } from "date-fns";

export interface FutureWeather {
  id: string;
  date: number;
  img_url: string;
  temp: number;
  wind: number;
  humidity: number;
  precipitation: number;
}
interface WeatherCardSmallProps {
  weather: FutureWeather;
}

const WeatherCardSmall = ({ weather }: WeatherCardSmallProps) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 px-1 flex flex-col items-center bg-white border border-gray-300 rounded-t-lg text-sm">
        <div className="text-gray-700 whitespace-no-wrap text-base">
          {weather?.date ? format(fromUnixTime(weather?.date), "HH:mm") : null}
        </div>
        {weather.img_url ? (
          <img
            className="w-16 h-16"
            src={`http://openweathermap.org/img/wn/10d.png`}
          />
        ) : (
          <div className="w-16 h-16" />
        )}
        <div className="text-xl whitespace-no-wrap text-xl">
          {weather?.temp ? `${Math.round(weather?.temp)} ℃` : ""}
        </div>
      </div>
      <div className="py-4 px-4 flex flex-col items-center bg-blue-100 text-gray-700 text-sm rounded-b-lg border border-t-0 border-gray-300 leading-snug">
        <div className="whitespace-no-wrap">{weather?.wind} m/s</div>
        <div className="whitespace-no-wrap">{weather?.humidity} %</div>
        <div className="whitespace-no-wrap">
          {weather?.precipitation ? weather.precipitation : "0"} mm
        </div>
      </div>
    </div>
  );
};

export default WeatherCardSmall;

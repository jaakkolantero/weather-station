import React from "react";
import { format, fromUnixTime } from "date-fns";

export interface CurrentWeather {
  id: string;
  name: string;
  description: string;
  img_url: string;
  temp: number;
  wind: number;
  humidity: number;
  precipitation: number;
  date: number;
}
interface WeatherCardProps {
  weather: CurrentWeather;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="pb-4 px-4 bg-white rounded-lg border border-gray-300">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col justify-center py-2">
          <div className="text-2xl leading-none">{weather?.name}</div>
          <div className="text-gray-700">{weather?.description}</div>
        </div>
        <div className="flex items-center">
          {weather.img_url ? (
            <img className="w-24 h-24" src={weather.img_url} />
          ) : (
            <div className="w-24 h-24" />
          )}
          <div className="text-4xl whitespace-no-wrap">
            {weather?.temp ? `${Math.round(weather?.temp)} ℃` : "     "}
          </div>
        </div>
      </div>
      <div className="flex flex-no-wrap justify-between">
        <div className="flex flex-col justify-end">
          <div className="text-xl">
            {weather?.date
              ? format(fromUnixTime(weather?.date), "MMM do")
              : null}
          </div>
          <div className="text-gray-700">
            {weather?.date
              ? format(fromUnixTime(weather?.date), "HH:mm")
              : null}
          </div>
        </div>
        <div className="flex flex-col text-right justify-end text-gray-700">
          <div className="whitespace-no-wrap">Wind: {weather?.wind} m/s</div>
          <div className="whitespace-no-wrap">
            Humidity: {weather?.humidity} %
          </div>
          <div className="whitespace-no-wrap">
            Precipitation (3h):{" "}
            {weather?.precipitation ? weather.precipitation : "0"} mm
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

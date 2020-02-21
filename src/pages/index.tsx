import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../utils/fetch";
import { useEffect, Fragment, useState } from "react";
import { fromUnixTime, format } from "date-fns";
import WeatherCard, { CurrentWeather } from "../components/WeatherCard";
import WeatherCardSmall, {
  FutureWeather
} from "../components/WeatherCardSmall";

interface WeatherListItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{ id: number; description: string; icon: string }>;
  wind: {
    speed: number;
  };
  rain: { [key: string]: number };
}

interface WeatherData {
  city: {
    id: number;
    name: string;
  };
  list: WeatherListItem[];
}

interface Weather {
  current: CurrentWeather;
  future: FutureWeather[];
}

const Index = () => {
  const { data } = useSWR<WeatherData[]>("/api/weather", fetcher);
  const [weathers, setWeathers] = useState<Weather[]>();

  useEffect(() => {
    if (data) {
      const weatherItems = data.map(weather => {
        const current = {
          name: weather.city.name,
          description: weather.list[0].weather[0].description,
          img_url: `http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`,
          temp: weather.list[0].main.temp,
          wind: weather.list[0].wind.speed,
          humidity: weather.list[0].main.humidity,
          // TODO: implement precipitation
          precipitation: 0,
          date: fromUnixTime(weather?.list[0]?.dt)
        };
        const future = weather.list
          .slice(1)
          .slice(0, 5)
          .map(listItem => ({
            date: fromUnixTime(listItem?.dt),
            img_url: `http://openweathermap.org/img/wn/${listItem.weather[0].icon}@2x.png`,
            temp: listItem.main.temp,
            wind: listItem.wind.speed,
            humidity: listItem.main.humidity,
            // TODO: implement precipitation
            precipitation: 0
          }));
        return { current, future };
      });
      console.log("weatherItems", weatherItems);
      setWeathers(weatherItems);
    }
  }, [data]);

  return (
    <Layout>
      <div className="bg-gray-100 flex justify-center flex-wrap pt-4">
        {weathers &&
          weathers.map(weather => (
            <div className="mx-4 max-w-sm">
              <WeatherCard weather={weather?.current} />
              <div className="mb-3" />
              <div className="grid grid-cols-5 gap-2">
                {weather.future.map(futureWeather => (
                  <WeatherCardSmall weather={futureWeather} />
                ))}
              </div>
              <div className="mb-6" />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Index;

import useSWR from "swr";
import uuid from "uuid";
import Layout from "../components/Layout";
import { fetcher } from "../utils/fetch";
import { useEffect, Fragment, useState } from "react";
import { fromUnixTime, format } from "date-fns";
import WeatherCard, { CurrentWeather } from "../components/WeatherCard";
import WeatherCardSmall, {
  FutureWeather
} from "../components/WeatherCardSmall";
import Dropdown from "../components/Dropdown";

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

export interface Weather {
  current: CurrentWeather;
  future: FutureWeather[];
}

const Index = () => {
  const { data } = useSWR<WeatherData[]>("/api/weather", fetcher);
  const [weathers, setWeathers] = useState<Weather[]>();
  const [visibleWeathers, setVisibleWeathers] = useState<Weather[]>();

  useEffect(() => {
    if (data) {
      const weatherItems = data.map(weather => {
        const current = {
          id: uuid.v4(),
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
            id: uuid.v4(),
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
      setVisibleWeathers(weatherItems);
    }
  }, [data]);

  const handleWeatherChange = (newWeathers: Weather[]): void => {
    setVisibleWeathers(newWeathers);
  };

  if (!visibleWeathers || !weathers) {
    return <div>loading</div>;
  }
  return (
    <Layout>
      <div className="bg-gray-100 pt-4">
        <div className="w-full flex justify-center ">
          <div className="flex justify-center lg:justify-end lg:max-w-4xl w-full mb-3 mx-4">
            <div className="flex-1 max-w-sm">
              <Dropdown
                weathers={weathers}
                onWeatherChange={handleWeatherChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-center flex-wrap">
          {visibleWeathers &&
            visibleWeathers.map(weather => (
              <div key={weather.current.id} className="mx-4 max-w-sm">
                <WeatherCard weather={weather?.current} />
                <div className="mb-3" />
                <div className="grid grid-cols-5 gap-2">
                  {weather.future.map(futureWeather => (
                    <Fragment key={futureWeather.id}>
                      <WeatherCardSmall weather={futureWeather} />
                    </Fragment>
                  ))}
                </div>
                <div className="mb-6" />
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

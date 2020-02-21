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

export interface Weather {
  current: CurrentWeather;
  future: FutureWeather[];
}

const Index = () => {
  const { data: weathers } = useSWR<Weather[]>("/api/weather", fetcher);
  const [visibleWeathers, setVisibleWeathers] = useState<Weather[]>();

  useEffect(() => {
    if (weathers) {
      console.log("weathers", weathers);
      setVisibleWeathers(weathers);
    }
  }, [weathers]);

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

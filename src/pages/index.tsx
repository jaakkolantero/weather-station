import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../utils/fetch";
import { useEffect, Fragment } from "react";
import { fromUnixTime, format } from "date-fns";

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

const Index = () => {
  const { data } = useSWR<WeatherData[]>("/api/weather", fetcher);

  useEffect(() => {
    data && console.log("data", data);
  }, [data]);

  return (
    <Layout>
      <div className="bg-gray-100 w-full mx-auto py-4 px-4">
        <div className="mb-64 py-4 px-4 bg-white rounded border border-gray-300"></div>
        {data &&
          data.map((location: WeatherData) => (
            <Fragment key={location?.city?.id}>
              <div>{location?.city?.name}</div>
              <div>{location?.list[0]?.weather[0].description}</div>
              <div>{location?.city?.id}</div>
              <img
                src={`http://openweathermap.org/img/wn/${location.list[0].weather[0].icon}.png`}
              />
              <div>{format(fromUnixTime(location?.list[0]?.dt), "HH:mm")}</div>
              <div>{format(fromUnixTime(location?.list[0]?.dt), "MMM do")}</div>
              <div className="bg-pink-300">
                <div>
                  {location.list
                    .slice(1)
                    .slice(0, 5)
                    .map(weather => (
                      <div className="ml-3">
                        <div>time</div>
                        <div>{format(fromUnixTime(weather.dt), "HH:mm")}</div>
                        <div>temp</div>
                        <div>{weather.main.temp}</div>
                        <div>wind</div>
                        <div>{weather.wind.speed}</div>
                        <div>humidity</div>
                        <div>{weather.main.humidity}</div>
                        <div>precipitation</div>
                        <div>icon</div>
                        <img
                          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        />
                        <div>{weather.weather[0].icon}</div>
                      </div>
                    ))}
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </Layout>
  );
};

export default Index;

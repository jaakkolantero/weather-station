import uuid from "uuid";

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
  rain?: { [key: string]: number } | undefined;
}

interface WeatherData {
  city: {
    id: number;
    name: string;
  };
  list: WeatherListItem[];
}

export const toWeather = ({
  current: currentWeathers,
  future: futureWeathers
}: any) => {
  const current = currentWeathers.map((weather: any) => ({
    id: uuid.v4(),
    name: weather.name,
    description: weather.weather[0].description,
    img_url: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
    temp: weather.main.temp,
    wind: weather.wind.speed,
    humidity: weather.main.humidity,
    precipitation: weather.rain ? weather.rain["3h"] : 0,
    date: weather.dt
  }));
  const weathers = futureWeathers.map((weather: any, i: number) => ({
    current: current[i],
    future: weather.list.slice(0, 5).map((listItem: any) => ({
      id: uuid.v4(),
      date: listItem?.dt,
      img_url: `http://openweathermap.org/img/wn/${listItem.weather[0].icon}@2x.png`,
      temp: listItem.main.temp,
      wind: listItem.wind.speed,
      humidity: listItem.main.humidity,
      precipitation: listItem.rain ? listItem?.rain["3h"] : 0
    }))
  }));
  return weathers;
};

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

export const toWeather = (data: WeatherData[]) => {
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
      precipitation: weather.list[0].rain ? weather.list[0].rain["3h"] : 0,
      date: weather?.list[0]?.dt
    };
    const future = weather.list
      .slice(1)
      .slice(0, 5)
      .map(listItem => ({
        id: uuid.v4(),
        date: listItem?.dt,
        img_url: `http://openweathermap.org/img/wn/${listItem.weather[0].icon}@2x.png`,
        temp: listItem.main.temp,
        wind: listItem.wind.speed,
        humidity: listItem.main.humidity,
        // TODO: implement precipitation
        precipitation: listItem.rain ? listItem?.rain["3h"] : 0
      }));
    return { current, future };
  });

  return weatherItems;
};

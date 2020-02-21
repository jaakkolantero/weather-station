import useSWR from "swr";
import { fetcher } from "../utils/fetch";

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
};

export default Index;

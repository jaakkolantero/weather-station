import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { dummyWeathers } from "../../../utils/dummy";
import { toWeather } from "../../../utils/toWeather";

const offices = [
  { city: "tampere", id: 634964 },
  { city: "jyväskylä", id: 655195 },
  { city: "kuopio", id: 650225 },
  { city: "helsinki", id: 658225 }
];

let cacheFairy = {};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.DATA_SOURCE === "DUMMY"
  ) {
    if ("data" in cacheFairy) {
      console.log("return cache", dummyWeathers.length);
    } else {
      cacheFairy = { ...cacheFairy, data: dummyWeathers };
      console.log("save to cache");
    }
    console.log("Using dummy data!");
    return res.status(200).json(toWeather(dummyWeathers));
  }

  const weathers = await Promise.all(
    offices.map(async office =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${office.id}&appid=${process.env.OPENWEATHERMAP_API_KEY_PROD}&units=metric&lang=fi`
      ).then(data => data.json())
    )
  );
  console.log(
    "process.env.OPENWEATHERMAP_API_KEY_PROD",
    process.env.OPENWEATHERMAP_API_KEY_PROD
  );
  console.log("weathers", weathers);
  console.log("weather", toWeather(weathers));
  res.status(200).json(toWeather(weathers));
};

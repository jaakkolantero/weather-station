import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { differenceInMinutes } from "date-fns";
import { toWeather } from "../../../utils/toWeather";

const offices = [
  { city: "tampere", id: 634964 },
  { city: "jyväskylä", id: 655195 },
  { city: "kuopio", id: 650225 },
  { city: "helsinki", id: 658225 }
];

interface CacheFairy {
  last_edit?: Date | number;
  data?: any;
}

let cacheFairy: CacheFairy = {};
const updateIntervalMins = 20;

const update = (data: any) => {
  cacheFairy = {
    ...cacheFairy,
    last_edit: new Date(),
    data
  };
};

const shouldUpdate = () => {
  if (cacheFairy.data && cacheFairy.last_edit) {
    if (
      differenceInMinutes(new Date(), cacheFairy.last_edit) >=
      updateIntervalMins
    ) {
      console.log(
        "update cache. Next update in ",
        cacheFairy.last_edit &&
          updateIntervalMins -
            differenceInMinutes(new Date(), cacheFairy.last_edit),
        "mins"
      );
      return true;
    } else {
      console.log(
        "return cache. Next update in ",
        cacheFairy.last_edit &&
          updateIntervalMins -
            differenceInMinutes(new Date(), cacheFairy.last_edit),
        "mins"
      );
      return false;
    }
  }
  console.log("save to cache");
  return true;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (shouldUpdate()) {
    const current = await Promise.all(
      offices.map(async office =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${office.id}&appid=${process.env.OPENWEATHERMAP_API_KEY_PROD}&units=metric&lang=fi`
        ).then(data => data.json())
      )
    );
    const future = await Promise.all(
      offices.map(async office =>
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?id=${office.id}&appid=${process.env.OPENWEATHERMAP_API_KEY_PROD}&units=metric&lang=fi`
        ).then(data => data.json())
      )
    );
    update({ current, future });
  }
  toWeather(cacheFairy.data);
  res.status(200).json(toWeather(cacheFairy.data));
};

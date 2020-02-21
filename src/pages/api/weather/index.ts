import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import { dummyWeathers } from "../../../utils/dummy";

const offices = [
  { city: "tampere", id: 634964 },
  { city: "jyväskylä", id: 655195 },
  { city: "kuopio", id: 650225 },
  { city: "helsinki", id: 658225 }
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Using dummy data!");
    return res.status(200).json(dummyWeathers);
  }

  const weathers = await Promise.all(
    offices.map(async office =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${office.id}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric&lang=fi`
      ).then(data => data.json())
    )
  );
  res.status(200).json([...weathers]);
};

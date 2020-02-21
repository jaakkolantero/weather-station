require("dotenv").config();

module.exports = {
  target: "serverless",
  env: {
    OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
    DATA_SOURCE: process.env.DATA_SOURCE
  }
};

require("dotenv").config();

module.exports = {
  target: "serverless",
  env: {
    OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
    USE_DUMMY_DATA: process.env.USE_DUMMY_DATA
  }
};

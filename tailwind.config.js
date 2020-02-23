const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      body: ["Arial", "sans-serif"]
    },
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          "100": "#F8F9FA",
          "300": "#E6E6E6",
          "700": "#70757A"
        },
        blue: {
          "100": "#E5F6FD"
        },
        black: "#262626"
      },
      fontSize: {
        sm: "0.8333rem", //10pt 13.333px
        base: "1.0833rem", //13pt 17.333px
        xl: "1.25rem", //15pt 	20px
        "2xl": "1.5833rem", //19pt 25.333px
        "3xl": "1.9167rem", //23pt 30.667px
        "4xl": "2.1667rem" //26pt 34.667px
      }
    }
  },
  variants: {},
  plugins: []
};

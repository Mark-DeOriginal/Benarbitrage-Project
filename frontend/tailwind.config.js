/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        benBlue: {
          light: "#dbdbe1",
          lightB: "#63618b",
          lightC: "#51507c",
          lightC2: "#616189",
          lightD: "#9c9bc5",
          lightE: "#8585af",
          100: "#D9D9E3",
          "100B": "#d4d4de",
          200: "#B4B3C7",
          300: "#8E8DAA",
          400: "#434172",
        },
        benWhitishBlue: "#eeeef1",
        benBlueLight: "#54548C",
        backDropBlue: "#6a688399",
        backDropTransparent: "#33324c00",
        benSkyBlue: {
          100: "#EAF8F2",
          200: "#D5F1E5",
          300: "#BFE9D7",
          400: "#95DBBD",
        },
        navBarDarkBg: "#434172de",
        navBarLightBg: "#eeeef2e0",
        navBarBorderLight: "#e0e0e6",
        navBarBorderDark: "#565388",
        benOrange: {
          100: "#F5E9C8",
          200: "#EFDDAC",
          300: "#EAD291",
          400: "#E5C775",
        },
        benBlack: {
          100: "#DFDFDF",
          200: "#BFBFBF",
          300: "#808080",
          400: "#484848",
        },
        benWhite: "#f5f5fa",
        goldenOrange: "#e5c775",
        benDarkBlue: "#3d3c62",
        benDarkBlueLight: "#434267",
        indicatorCheckedLight: "#434172",
        indicatorUncheckedLight: "#c1c0d3",
        indicatorCheckedDark: "#E5C775",
        indicatorUncheckedDark: "#9c9bc5",
        errorColor: "#e38b5f",
        successBgColor: "#d2e7c5",
        successBgColorDark: "#a2c18e4d",
        successColor: "#7c9d65",
        successColorDark: "#a2c18e",
        failedColor: "#d17c61",
        failedColorDark: "#df8062",
        failedBgColor: "#e9d8d3",
        failedBgColorDark: "#e99a815e",
      },
    },
    boxShadow: {
      navShadow: "0 4px 11px -1px rgb(0 0 0 / 8%)",
      cardShadow: "0px 4px 11px 1px #0000000a",
    },
    screens: {
      mobile: "500px",
      mobile_lg: "690px",
      tablet: "710px",
      screen940: "940px",
      screen980: "980px",
      laptop: "1160px",
      screen1240: "1240px",
    },
    marginBottom: {
      1: "0.8rem",
      2: "1rem",
      3: "1.1rem",
      4: "1.2rem",
      5: "1.3rem",
    },
    fontFamily: {
      poppins: "poppins",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
  },
  darkMode: "class",
};

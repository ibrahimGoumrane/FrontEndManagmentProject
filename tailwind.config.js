import flowbite from "flowbite/plugin";
import withMT from "@material-tailwind/react/utils/withMT";
import forms from "@tailwindcss/forms";

// Content configuration
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
];

// Theme configuration
export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "#9c27b0", // Purple color
        light: "#ba68c8",
        dark: "#7b1fa2",
      },
      mainBackGroundColor: "rgb(241 245 249)",
      columnBackgroundColor: "#ffffff",
    },
  },
};

// Plugins configuration (including Material Tailwind)
export const plugins = [flowbite, withMT, forms];

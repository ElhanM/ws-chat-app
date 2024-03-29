import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
        "pale-text": "#9d9d9d",
        "selected-chat": "#262626",
        "chat-hover": "#121212",
        pale: "#262626",
        "send-button": "#008de9",
        "sent-message": "#3797f0",
        "incoming-message": "#262626",
        "lighter-black": "#101010",
        "modal-bg": "#262626",
        "scrollbar-thumb": "#363636",
        "modal-border": "#363636",
      },
      backgroundColor: {},
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;

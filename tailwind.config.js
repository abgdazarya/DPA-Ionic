// /** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{html,js,ts}", "./libs/**/*.{html,js,ts}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      xl: "0.625rem",
      "2xl": "0.750rem",
      "3xl": "0.875rem",
      "4xl": "1rem",
    },
    screens: {
      xs: "360px",
      sm: "640px",
      bs: "768px",
      md: "992px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "0rem",
      },
    },
    extend: {
      colors: {
        // Lazuli Blue
        lazuli: {
          50: "#E7F4FF",
          100: "#C7E5FF",
          200: "#54AFFF",
          300: "#0B8DFF",
          400: "#0074D9",
          500: "#005BAA",
          600: "#004D90",
        },

        // Havertz Yellow
        havertz: {
          50: "#FEF9EF",
          100: "#F9E1AF",
          200: "#F6CE7F",
          300: "#F4C25F",
          400: "#EFAC21",
          500: "#D9950F",
          600: "#B57D0D",
        },

        // Neutral
        neutral: {
          0: "#FEFEFE",
          50: "#FAFBFF",
          75: "#F9FAFC",
          100: "#F4F6FA",
          200: "#EDEFF5",
          300: "#E6E8F0",
          400: "#D8DAE5",
          500: "#C1C4D6",
          600: "#8F95B2",
          700: "#696F8C",
          800: "#474D66",
          900: "#101840",
        },

        // Amber
        amber: {
          50: "#FFEDB6",
          100: "#FFDF80",
          200: "#FFD65B",
          300: "#FFC824",
          400: "#FFC001",
          500: "#DBA400",
          600: "#A47B00",
        },

        // Green
        green: {
          50: "#F5FBF8",
          100: "#EEF8F4",
          200: "#DCF2EA",
          300: "#A3E6CD",
          400: "#52BD94",
          500: "#429777",
          600: "#317159",
        },

        // Red
        red: {
          50: "#FDF4F4",
          100: "#F9DADA",
          200: "#F4B6B6",
          300: "#EE9191",
          400: "#D14343",
          500: "#A73636",
          600: "#7D2828",
        },

        // Red
        error: {
          50: "#FDF4F4",
          100: "#F9DADA",
          200: "#F4B6B6",
          300: "#EE9191",
          400: "#D14343",
          500: "#A73636",
          600: "#7D2828",
        },

        // Teks
        0: "#FEFEFE",
        50: "#FAFBFF",
        75: "#F9FAFC",
        100: "#F4F6FA",
        200: "#EDEFF5",
        300: "#E6E8F0",
        400: "#D8DAE5",
        500: "#C1C4D6",
        600: "#8F95B2",
        700: "#696F8C",
        800: "#474D66",
        900: "#101840",

        teks: {
          0: "#FEFEFE",
          50: "#FAFBFF",
          75: "#F9FAFC",
          100: "#F4F6FA",
          200: "#EDEFF5",
          300: "#E6E8F0",
          400: "#D8DAE5",
          500: "#C1C4D6",
          600: "#8F95B2",
          700: "#696F8C",
          800: "#474D66",
          900: "#101840",
        },

        // Background
        bg: {
          0: "#FEFEFE",
          50: "#FAFBFF",
          75: "#F9FAFC",
          100: "#F4F6FA",
          200: "#EDEFF5",
          300: "#E6E8F0",
          400: "#D8DAE5",
          500: "#C1C4D6",
          600: "#8F95B2",
          700: "#696F8C",
          800: "#474D66",
          900: "#101840",
        },

        // Warning
        warning: {
          50: "#FFEDB6",
          100: "#FFDF80",
          200: "#FFD65B",
          300: "#FFC824",
          400: "#FFC001",
          500: "#DBA400",
          600: "#A47B00",
        },

        // Success
        success: {
          50: "#F5FBF8",
          100: "#EEF8F4",
          200: "#DCF2EA",
          300: "#A3E6CD",
          400: "#52BD94",
          500: "#429777",
          600: "#317159",
        },

        // Gradient
        gradient: {
          400: "linear-gradient(180deg, rgba(84,175,255,1) 0%, rgba(213,235,255,1) 100%)",
          500: "linear-gradient(180deg, rgba(0,116,217,1) 0%, rgba(84,175,255,1) 100%)",
          600: "linear-gradient(180deg, rgba(0,91,170,1) 0%, rgba(0,116,217,1) 100%)",
        },
      },

      fontSize: {
        "heading-1": "2.5rem",
        "heading-2": "2rem",
        "heading-3": "1.5rem",
        "heading-4": "1.125rem",
        "heading-5": "1.125rem",
        "heading-6": "1rem",
        "heading-7": "1rem",
        "body-1": "0.875rem",
        "body-2": "0.875rem",
        "body-3": "0.75rem",
        small: "0.625rem",

        h1: [
          "2.5rem",
          {
            lineHeight: "3rem",
            fontWeight: "700",
          },
        ],
        h2: [
          "2rem",
          {
            lineHeight: "2.75rem",
            fontWeight: "700",
          },
        ],
        h3: [
          "1.5rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "700",
          },
        ],
        h4: [
          "1.125rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "700",
          },
        ],
        h5: [
          "1.125rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "600",
          },
        ],
        h6: [
          "1rem",
          {
            lineHeight: "1.375rem",
            fontWeight: "700",
          },
        ],
        h7: [
          "1rem",
          {
            lineHeight: "1.375rem",
            fontWeight: "700",
          },
        ],
        body1: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
          },
        ],
        body2: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
          },
        ],
        body3: [
          "0.75rem",
          {
            lineHeight: "1rem",
          },
        ],
        small: [
          "0.625rem",
          {
            lineHeight: "0.875rem",
          },
        ],
      },

      lineHeight: {
        "heading-1": "3rem",
        "heading-2": "2.75rem",
        "heading-3": "1.75rem",
        "heading-4": "1.5rem",
        "heading-5": "1.5rem",
        "heading-6": "1.375rem",
        "heading-7": "1.375rem",
        "body-1": "1.25rem",
        "body-2": "1.25rem",
        "body-3": "1rem",
        small: "0.875rem",
      },

      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      maxHeight: {
        vh: "100vh",
        "md-modal": "calc( 100% - 76px )",
        "sm-modal": "calc( 100% - 76px )",
      },
      height: {
        "sm-header": "76px",
        "sm-modal": "calc( 100% - 76px )",
        "sm-screen": "calc( 100vh - 96px )",
        "md-header": "76px",
        "md-modal": "calc( 100% - 76px )",
        "md-screen": "calc( 100vh - 96px )",
      },
      width: {
        vh: "100vh",
        vw: "100vw",
      },
      screens: {
        "xs-max": { max: "360px" },
        "sm-max": { max: "640px" },
        "md-max": { max: "992px" },
        sm: { min: "641px" },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
        },
      }),
        addBase({
          html: { fontSize: "16px" },
        });
    }),
  ],
};

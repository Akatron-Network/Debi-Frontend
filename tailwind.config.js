/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  

  theme: {
    extend: {
      colors: {
        //* MAIN GREENS
          green_pantone: "#14B85B",
          sea_green: "#20834B",
          cadmium_green: "#1A6C3D",
          shadow_green: "#1A6C3D66",

        //* DARK COLORS
          modal_back: "#0C0C0CBF",
          black_light: "#151515",
          side_black: "#181818",
          middle_black: "#1B1B1B",
          earie_black: "#1F1F1F",
          darkest_jet: "#202020",
          darker_jet: "#232323",
          jet_shadow: "#292929d4",
          jet: "#292929",
          jet_mid: "#2E2E2E",
          jet_glass: '#2E2E2E6B',
          jet_light: "#333333",
          hr_gray: "#4950573d",
          onyx: "#3D3D3D",
          onyx_middle: "#606060",
          onyx_light: "#767676",

        //* LIGHT COLORS
          graysix: "#858585",
          grayXgray: "#B9B9B9",
          platinium: "#EBEBEB",
          cultured: "#F5F5F5",

        //* OTHER COLORS
          danger: "#631E24",
          danger_light: "#861E27",
          like_trans: "#1b151545",
          none_opacity: "#0000009e",
      },

      boxShadow: {
        'navbar': '0px 0px 10px 2px rgb(0 0 0 / 60%)',
        'filepath': '0px 0px 10px 2px rgb(0 0 0 / 20%)',
        'dropdown':'0px 5px 10px 2px rgba(0,0,0,0.7)',
        'sidelinks': 'inset 25px 0px 30px -30px #080808',
        'openclose': 'inset 10px 0px 10px -6px rgb(0 0 0 / 35%)',
        'openclosebtn': 'inset 5px 0px 10px -6px rgb(0 0 0 / 30%)',
        'openbtn' : 'rgb(0 0 0 / 30%) 0px -5px 10px 0px , rgb(0 0 0 / 30%) 0px 5px 10px 0px',
        'defaultbtn' : 'inset 10px 7px 15px -10px rgb(0 0 0 / 57%), 0px 15px 15px -10px rgb(0 0 0 / 30%)',
        'loginContainer': ' 0 14px 40px rgb(0 0 0 / 60%) , 0 10px 10px rgb(0 0 0 / 0%)',
        'card' : '5px 5px 5px rgb(0 0 0 / 20%), inset -5px -5px 15px rgb(0 0 0 / 10%), 5px 5px 15px rgb(0 0 0 / 55%), -5px -5px 15px rgb(255 255 255 / 0%);',
        'cardHover' : '5px 5px 5px rgb(0 0 0 / 20%), inset -5px -5px 15px rgb(0 0 0 / 10%), 15px 15px 15px rgb(0 0 0 / 55%), -5px -5px 15px rgb(255 255 255 / 0%);'
      },

      dropShadow: {
        'logo': '7px 7px 7px #1F1F1F',
        'logo-title': '1px 1px 3px #292929d4'
      },

      zIndex: {
        '1': '1',
        '2': '2',
      },
      
      spacing: {
        '250px': '15.625rem',
        '70px': '4.375rem',
        '30px': '1.875rem',
        '15px': '0.9375rem',
        '10px': '0.625rem',
      },

      fontFamily: {
        'righteous': ['Righteous' , 'cursive']
      },
      
    },
  },

  plugins: [
    require("daisyui"),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  

};

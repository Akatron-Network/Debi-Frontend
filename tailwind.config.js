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
          black_light: "#151515",
          side_black: "#181818",
          earie_black: "#1F1F1F",
          darkest_jet: "#202020",
          darker_jet: "#232323",
          jet: "#292929",
          jet_shadow: "#292929d4",
          jet_mid: "#2E2E2E",
          jet_light: "#333333",
          hr_gray: "#495057",
          onyx: "#3D3D3D",
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
      }
      
    },
  },

  plugins: [require("daisyui")],
  

};

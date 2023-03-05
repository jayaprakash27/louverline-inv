/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
    colors: {
      'cust-red': '#AF2925',
      'cust-white': '#E8E8E6',
      'cust-black': '#3E3E3E',
      'cust-khaki': '#C9A075',
    },},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tw-elements/dist/plugin")
  ],
}
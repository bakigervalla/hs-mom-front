module.exports = {
  content: [ "./src/**/*.{html,js}", "./public/*.html" ],
  theme: {
    extend: {
      minHeight: {
          'custom': '234',
          }
     },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
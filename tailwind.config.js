const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      boxShadow: {
        "fb": "0 1px 2px rgba(0, 0, 0, 0.2)",
        "modal": "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)"
      }
    }
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd', 'hover', 'responsive'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'hover', 'responsive'],
    textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive']
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        'body': { backgroundColor: config('theme.colors.gray.100') },
      })
    }),
    require('tailwindcss-dark-mode')()
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}

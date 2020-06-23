const {
  colors
} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        default: 0,
        md: '2rem'
      }
    },
    extend: {
      colors: {
        'gray': {
          ...colors.gray,
          default: '#F7F7F7'
        },
        'primary': '#409EFF',
        'success': '#67C23A',
        'warning': '#E6A23C',
        'danger': '#F56C6C',
        'info': '#909399'
        // 'orange': '#F08300'
      },
      textColor: {
        'primary': '#303133',
        'regular': '#606266',
        'secondary': '#909399',
        'placeholder': '#C0C4CC'
        // 'orange': '#F08300'

      },
      borderColor: {
        'base': '#DCDFE6',
        'light': '#E4E7ED',
        'lighter': '#EBEEF5',
        'lightest': '#F2F6FC'
      }
    }
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

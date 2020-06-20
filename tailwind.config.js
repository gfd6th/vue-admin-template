const {
  colors
} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    container: {
      center: true
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
      },
      textColor: {
        'primary': '#303133',
        'regular': '#606266',
        'secondary': '#909399',
        'placeholder': '#C0C4CC'
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

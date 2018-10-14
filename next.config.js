const withCSS = require('@zeit/next-css')

const devLocal = process.env.NODE_ENV !== 'production'

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: devLocal ? '[name]__[local]' : '[hash:base64:5]',
  }
})

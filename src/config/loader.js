const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const imageLoader = (path, imgName, limit) => {
  return {

  }
}

const fontLoader = (path, fontName, limit) => {
  return {

  }
}

const mediaLoader = (path, name) => {
  return {

  }
}

const jsLoader = (options, exclude) => {
  return {

  }
}

const cssLoader = options => {
  return {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  }
}

const lessLoader = options => {
  return {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader'
    ]
  }
}

const vueLoader = options => {
  return {
    test: /\.vue$/,
    loader: 'vue-loader',
    options
  }
}

const importsLoader = regExp => {
  return {

  }
}

module.exports = {
  imageLoader,
  fontLoader,
  mediaLoader,
  jsLoader,
  cssLoader,
  lessLoader,
  vueLoader,
  importsLoader
}

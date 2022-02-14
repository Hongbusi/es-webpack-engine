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
    test: /\.js[x]?$/,
    use: [
      'babel-loader'
    ]
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
    test: new RegExp(`(${regExp.join('|')})$`),
    // test: /example\.js$/,
    use: [
      {
        loader: 'imports-loader',
        options: {
          wrapper: 'window',
          additionalCode: "var myVariable = false; var define = false;",
        }
      },
    ],
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

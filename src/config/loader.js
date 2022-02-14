const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const imageLoader = (path, imgName, limit) => {
  return {
    test: /\.(png|jpe?g|gif)$/,
    type: 'asset',
    generator: {
      filename: `${path}/${imgName}/[name][ext]`
    },
    parser: {
      dataUrlCondition: {
        maxSize: limit
      }
    }
  }
};

const fontLoader = (path, fontName, limit) => {
  return {
    test: /\.(woff|woff2|eot|ttf|svg)(\?(.*))?$/,
    type: 'asset',
    generator: {
      filename: `${path}/${fontName}/[name][ext]`
    },
    parser: {
      dataUrlCondition: {
        maxSize: limit
      }
    }
  }
};

const mediaLoader = (path, name) => {
  return {
    test: /\.(swf|wav|mp3|mpeg|mp4|webm|ogv)(\?v=\d+\.\d+\.\d+)?$/,
    type: 'asset/resource',
    generator: {
      filename: `${path}/${name}/[name][ext]`
    }
  }
};

const jsLoader = (options, exclude) => {
  return {
    test: /\.js[x]?$/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: options.cpuNumber
        }
      },
      'babel-loader'
    ],
    exclude
  }
};

const cssLoader = options => {
  return {
    test: /\.css$/,
    use: [
      {
        loader:  options.__DEV__ || options.__DEBUG__  ?  'vue-style-loader' : MiniCssExtractPlugin.loader,
        // options
      },
      'css-loader'
    ]
  }
};

const lessLoader = options => {
  return {
    test: /\.less$/,
    use: [
      {
        loader:  options.__DEV__ || options.__DEBUG__  ?  'vue-style-loader' : MiniCssExtractPlugin.loader,
        // options
      },
      'css-loader',
      'less-loader'
    ]
  }
};

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
    use: [
      {
        loader: 'imports-loader',
        options: {
          additionalCode: 'var define = false; var module = false; var exports = false',
          wrapper: 'window'
        }
      }
    ]
  }
};

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

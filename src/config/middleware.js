const WebpackDevMiddleware = require('webpack-dev-middleware');

const options = require('./options');

module.exports = (compiler, publicPath) => {
  const webpackDevMiddlewareOptions = {
    publicPath,
    // quiet: false, // 是否减少控制台日志记录的数量
    // noInfo: false,
    // progress: true,
    // stats: {
    //   colors: true,
    //   hash: false,
    //   chunks: false,
    //   chunkModules: false,
    //   children: options.__VERBOSE__,
    //   errorDetails: true
    // },
    // watchOptions: {
    //   aggregateTimeout: 1000,
    //   poll: 1000
    // },
    // lazy: false
  };

  return WebpackDevMiddleware(compiler, webpackDevMiddlewareOptions);
}

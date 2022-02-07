import webpackDevMiddleware from 'webpack-dev-middleware';
import options from './options';

export default (compiler, publicPath) => {
  const webpackDevMiddlewareOptions = {
    publicPath,
    quiet: false,
    onInfo: false,
    progress: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: options.__VERBOSE__,
      errorDetails: true
    },
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    },
    lazy: false
  };

  return webpackDevMiddleware(compiler, webpackDevMiddlewareOptions);
}

const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const logger = require('./config/logger');

logger.info('building for production...');

const options = {
  mode: 'production',
  entry: './test/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'build.js'
  },
  plugins: [
    new WebpackBar()
  ]
};

const compiler = webpack(options, (err, stats) => {
  if (err) {
    logger.error(err.stack || err);
    if (err.details) {
      logger.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    logger.error(info.errors);
  }

  if (stats.hasWarnings()) {
    logger.warn(info.warnings);
  }

  logger.info('Compiled successfully!')
});

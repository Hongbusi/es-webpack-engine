const webpack = require('webpack');

const config = require('./webpack.base');

const logger =require('./config/logger');

logger.info('building for production...');

webpack(config, (err, stats) => {
  if (err) throw err;
});

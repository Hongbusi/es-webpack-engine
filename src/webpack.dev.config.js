const path = require('path');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const logger = require('./config/logger');
const options = require('./config/options');

const app = express();

const compiler = webpack({
  mode: 'development',
  entry: './test/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'build.js'
  }
});

app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

app.listen(options.__DEV_SERVER_PORT__, (err) => {
  logger.info(`Example server listening on ${options.__DEV_SERVER_PORT__} in ${app.settings.env} node.`);

  if (err) {
    logger.error(err);
  }
});

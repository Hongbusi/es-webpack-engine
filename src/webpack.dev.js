const fs = require('fs');
const path = require('path');

const express = require('express');
const webpack = require('webpack');
const chokidar = require('chokidar');

const logger =require('./config/logger');
const options = require('./config/options');
const WebpackDevMiddleware = require('./config/middleware');

const { fsExistsSync } = require('./utils');
const config = require('./webpack.base');

if (!fsExistsSync('.webpack-watch.log')) {
  logger.error('请在项目根目录下添加.webpack-watch.log文件, 否则无法监听新增入口JS文件');
}

const app = express();

const compiler = webpack(config);

app.use(WebpackDevMiddleware(compiler, options.output.publicPath));

app.listen(options.__DEV_SERVER_PORT__, '0.0.0.0', err => {
  logger.info(`Express server listening on ${options.__DEV_SERVER_PORT__} in ${app.settings.env} node`);

  if (err) {
    logger.error(err);
  }
});

let watchDir = [
  `${options.globalDir}/app`,
  options.pluginsDir,
  options.themesDir,
  options.bundlesDir,
  options.activitiesDir
]

let watcher = chokidar.watch(watchDir, {
  ignored: /[\/\\]\./,
  ignoreInitial: true
});

const isEntryFile = path => {
  return path.indexOf(`${options.entryFileName}.js`) !== -1 && path.indexOf('static-src') !== -1;
};

// 监听新增入口文件
watcher.on('add', path => {
  if(isEntryFile(path)) {
    if (fsExistsSync('.webpack-watch.log')) {
      logger.info(`入口JS文件${path}被新增`);
      fs.writeFileSync('.webpack-watch.log', `File ${path} has been added`, 'utf8');
    } else {
      logger.error("请在项目根目录下添加.webpack-watch.log文件, 否则无法监听新增入口JS文件");
    }
  }
});

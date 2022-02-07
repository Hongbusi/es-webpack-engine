import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import chokidar from 'chokidar';
import WebpackNotifierPlugin from 'es-webpack-notifier';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import logger from './config/logger';
import options from './config/options';
import webpackDevMiddleware from './config/middleware';

import { fsExistsSync } from './utils';

import baseConfig from './webpack.base';

if (!fsExistsSync('.webpack-watch.log')) {
  logger.error('请在项目根目录下添加 .webpack-watch.log 文件, 否则无法监听新增入口 JS 文件');
}

const app = express();
const compiler = webpack(baseConfig);
app.use(webpackDevMiddleware(compiler, options.output.publicPath));

new WebpackNotifierPlugin().apply(compiler);
new ProgressBarPlugin().apply(compiler);

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
  ignored: /[\/\\]\./, // 定义要忽略的文件/路径，这里是忽略点文件
  ignoreInitial: true // 如果设置为 false，add/addDir 事件在实例化观察时也会发出匹配路径的事件
});

const isEntryFile = path => {
  return path.indexOf(`${options.entryFileName}.js`) !== -1 && path.indexOf('static-src') !== -1;
};

// 监听新增入口文件
watcher.on('add', (path) => {
  if(isEntryFile(path)) {
    if (fsExistsSync('.webpack-watch.log')) {
      logger.info(`入口JS文件${path}被新增`);
      fs.writeFileSync('.webpack-watch.log', `File ${path} has been added`, 'utf8');
    } else {
      logger.error("请在项目根目录下添加 .webpack-watch.log文件, 否则无法监听新增入口JS文件");
    }
  }
});

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

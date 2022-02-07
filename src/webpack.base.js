import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import WebpackAssetsManifest from 'webpack-assets-manifest';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin  } from 'webpack-bundle-analyzer';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import TerserPlugin from 'terser-webpack-plugin';

import options from './config/options';
import * as entry from './config/entry';
import * as lodaers from './config/lodaer';

import { fsExistsSync, isEmptyObject, filterObject } from './utils';

// 基础配置
const config = {
  watch: options.__DEV__,
  watchOptions: {
    ignored: /node_modules/
  },
  mode: process.env.NODE_ENV,
  output: Object.assign(options.output, {
    filename: '[name].js'
  }),
  externals: options.externals,
  resolve: {
    alias: entry.configAlias,
    extensions: ['*', '.js', '.jsx', '.vue']
  },
  module: {
    noParse: [],
    rules: [
      loaders.vueLoader({
        hotReload: options.__DEV__ || options.__DEBUG__ ? true : false
      }),
      loaders.jsLoader({
        cpuNumber: options.cpuNumber
      }, [
        options.nodeModulesDir,
      ]),
      loaders.cssLoader({
        minimize: options.__DEV__ || options.__DEBUG__ ? false : true,
        hmr: options.__DEV__,
        reloadAll: true
      }),
      loaders.lessLoader({
        minimize: options.__DEV__ || options.__DEBUG__ ? false : true,
        hmr: options.__DEV__,
        reloadAll: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin(options.global),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn|en-gb)+\.js$/
    ),
    new VueLoaderPlugin()
  ]
};

if (!options.isWatchAllModule) {
  config.plugins.push(new webpack.WatchIgnorePlugin(options.ignoredDirs));
}

for (const key in options.noParseDeps) {
  const depPath = path.resolve(options.nodeModulesDir, options.noParseDeps[key]);
  config.resolve.alias[key] = depPath;
  config.module.noParse.push(depPath);
  config.module.rules.push(loaders.importsLoader(config.module.noParse));
}

config.plugins = config.plugins.concat(new FriendlyErrorsPlugin());

if (options.__DEV__) {
  options.isEslint ? config.module.rules.push(loaders.eslintLoader()) : '';
}

if (!options.__DEV__ && !options.__DEBUG__) {
  config.plugins = config.plugins.concat(new OptimizeCssAssetsPlugin());
} else {
  config.devtool = options.__DEVTOOL__;
}

// lib 配置
let libConfigs = [];
if (options.isBuildAllModule) {
  let libEntry = filterObject(entry.libEntry, options.baseName);
  let baseEntry = libEntry.filterObj;
  let newLibEntry = libEntry.newObj;

  // base
  let baseConfig = {};
  let newConfig = {};

  let module = {
    rules: [
      loader.imageLoader('libs', options.imgName, options.imglimit),
      loader.fontLoader('libs', options.fontName, options.fontlimit),
      loader.mediaLoader('libs', options.mediaName)
    ]
  }

  baseConfig = merge(config, {
    name: 'base',
    entry: baseEntry,
    module,
    plugins: [],
    optimization: {
      minimizer: [new TerserPlugin()]
    }
  });
  baseConfig.externals = {};
  if (options.__ANALYZER__) {
    baseConfig.plugins = baseConfig.plugins.concat(new BundleAnalyzerPlugin({
      analyzerPort: 3997
    }));
  }
  libConfigs.push(baseConfig);

  newConfig = merge(config, {
    name: 'libs',
    entry: newLibEntry,
    module,
    plugins: [
      new CopyWebpackPlugin(entry.onlyCopys)
    ],
    optimization: {
      minimizer: [new TerserPlugin()]
    }
  });
  if (options.__ANALYZER__) {
    newConfig.plugins = newConfig.plugins.concat(new BundleAnalyzerPlugin({
      analyzerPort: 3998
    }));
  };
  libConfigs.push(newConfig);
}

const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');

const logger = require('./config/logger');
const loaders = require('./config/loader');

logger.info('building for production...');

const options = {
  mode: 'production',
  entry: './test/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.(css|less)$/i,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
      loaders.cssLoader(),
      loaders.lessLoader(),
      loaders.vueLoader()
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  plugins: [
    new WebpackBar(),
    new WebpackAssetsManifest(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'test/public',
          to: '.',
          globOptions: {
            ignore: [
              '**/index.html'
            ]
          }
        }
      ]
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8000
    // }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
};

const compiler = webpack(options, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  logger.info('Compiled successfully!')
});

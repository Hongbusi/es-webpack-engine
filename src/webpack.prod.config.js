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

const logger = require('./config/logger');

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
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
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
    new CleanWebpackPlugin()
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

const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


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
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
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
    new MiniCssExtractPlugin()
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

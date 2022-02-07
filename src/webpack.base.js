import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

import WebpackAssetsManifest from 'webpack-assets-manifest';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin  } from 'webpack-bundle-analyzer';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import TerserPlugin from 'terser-webpack-plugin';

import options from './config/options';
import * as entry from './config/entry';

/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    emitOnErrors: true,
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ],
    sideEffects: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      filename: 'index.html',
      minify: true
    }),
    new CleanWebpackPlugin(),
    new UglifyjsWebpackPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    })
  ]
});

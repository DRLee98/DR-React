const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEV = 'development';
const PROD = 'production';

module.exports = (env, options) => {
  const mode = options.mode || DEV;
  const config = {
    entry: './src/index.tsx',
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.min.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        filename: './index.html'
      })
    ],
    mode
  };

  // 배포
  if (mode === PROD) {
    config.plugins = [
      ...config.plugins,
      ...[
        new CleanWebpackPlugin(),
        new UglifyjsWebpackPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
    ];
    // 개발
  } else {
    config.devtool = 'eval-source-map';
    config.devServer = {
      port: 3000,
      compress: true
    };
  }

  return config;
};

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    modules: [path.resolve(__dirname, './'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({
            before: [
              createStyledComponentsTransformer({
                minify: true
              })
            ]
          })
        }
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
    // 플러그인 인스턴스 생성
    new ImageMinimizerPlugin({
      // 제외 설정
      exclude: /node_modules/,
      // 최적화 옵션
      minimizerOptions: {
        // 사용자 정의 옵션을 사용해 무손실 최적화합니다.
        // 보다 나은 결과를 위해 여러 옵션을 테스트 하여 사용해봅니다.
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          ['svgo', { plugins: [{ removeViewBox: false }] }]
        ]
      }
    })
  ]
};

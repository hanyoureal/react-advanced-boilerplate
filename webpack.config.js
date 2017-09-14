const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: `${SRC_DIR}/app/index.js`,
  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: [
            ['import', { libraryName: 'antd', style: 'scss' }],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          },
        ],
      },
    ],
    loaders: [
      {
        test: /\.js?/,
        exclude: '/node_modules/',
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: [
            ['import', {
              libraryName: 'antd',
              style: 'scss',
            }],
          ],
        },
      },
      {
        test: /\.json?/,
        loader: 'json-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
    ],
  },
  resolve: {
    // Aliases for global imports
    // E.g. to import something from modules while in app use
    // import { Main } from 'modules/main';
    // instead of
    // import { Main } from '../modules/main';
    alias: {
      root: path.resolve('./src'),
      modules: path.resolve('./src/modules'),
      messages: path.resolve('./src/messages'),
      services: path.resolve('./src/services'),
      utils: path.resolve('./src/utils'),
      app: path.resolve('./src/app'),
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
    },
  },
  // Fixes some issues with current webpack version
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

module.exports = config;

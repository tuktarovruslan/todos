'use strict';
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: NODE_ENV == 'development' ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.pug$/,
        loader: 'vue-pug-alias',
        options: {
          alias: {
            ['@pug']: 'client/views/',
            ['@comps']: 'client/views/components/',
            ['@img']: 'static/images/',
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ],
    },
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      '@common': path.resolve(__dirname, 'common/'),
      '@api': path.resolve(__dirname, 'client/scripts/api/'),
      '@router': path.resolve(__dirname, 'client/scripts/router/'),
      '@store': path.resolve(__dirname, 'client/scripts/store/'),
      '@vuecomps': path.resolve(__dirname, 'client/scripts/components/'),
      '@styles': path.resolve(__dirname, 'client/styles/'),
      '@img': path.resolve(__dirname, 'static/images/'),
    },
  },
  entry: {
    app: path.join(__dirname, 'client/scripts/app.js')
  },
  output: {
    path: path.join(__dirname, 'static/scripts'),
    filename: '[name].js'
  },
  watch: NODE_ENV == 'development',
  devtool: NODE_ENV == 'development' ? 'source-map' : false,
  plugins: [
    new VueLoaderPlugin()
  ],
};

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var commonConfig = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },

      {
        test: /\.vue$/,
        loader: 'vue'
      },

      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = [
    merge(commonConfig, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
            filename: 'vue-pick-a-date.min.js',
            libraryTarget: 'window',
            library: 'DatePicker',
        }
    }),

    merge(commonConfig, {
        entry: path.resolve(__dirname + '/src/DatePicker.vue'),
        output: {
            filename: 'vue-pick-a-date.js',
            libraryTarget: 'umd',
            library: 'vue-pick-a-date',
            umdNamedDefine: true
        }
    })
];

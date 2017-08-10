let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://127.0.0.1:8080',
    // 'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/src/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?/,
    //     exclude: path.resolve(__dirname + '/node_modules'),
    //     loader: 'jsxhint-loader'
    //   }
    // ],
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?limit=8192'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new webpack.HotModuleReplacementPlugin()
  ]
};
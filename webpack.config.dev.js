let path = require('path');
let webpack = require('webpack');
let node_modules_dir = path.join(__dirname, 'node_modules');
let deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  // 'moment/min/moment.min.js',
  // 'underscore/underscore-min.js',
];

let config = {
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://127.0.0.1:8080',
    // 'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/src/',
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, 'src'),
    noInfo: true,
  },
  resolve: {
    alias: {},
    modules: [
      "node_modules",
    ],
    extensions: [".js", ".json", ".jsx", ".css", ".scss"],
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.(css|less|scss)$/,
        loader: 'style-loader!css-loader!less-loader!sass-loader'
      }, {
        test: /\.(png|jpg|gif|svg|woff)$/,
        loader: 'url-loader?limit=30000&name=[name].[ext]'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: path.resolve(node_modules_dir, deps[0]),
        loader: "expose?React"
      }
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     },
    // }),
  ]
};
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});
module.exports = config;
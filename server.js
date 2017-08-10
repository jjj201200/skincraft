var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.dev');
config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
//   hot: true,
  inline: true,
  historyApiFallback: true
}).listen(8080, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});
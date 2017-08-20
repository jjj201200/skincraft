/*
 * @Author: jjj201200@gmail.com 
 * @Date: 2017-08-11 22:29:25 
 * @Last Modified by: jjj201200@gmail.com
 * @Last Modified time: 2017-08-20 22:05:08
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config.dev');
config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: { colors: true },
  // proxy: [
  //   {
  //     context: [
  //       '/models/*', 
  //       '/textures/*'
  //     ],
  //     target: 'http://127.0.0.1:3000/',
  //     secure: false
  //   }
  // ],
}).listen(8080, '127.0.0.1', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8080');
});
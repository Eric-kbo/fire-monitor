const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // 配置相对路径
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // 
  productionSourceMap: false,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false, //关闭警告
            drop_debugger: true, //去除debugger
            drop_console: true, //去除console
          },
          // 删除注释，默认就是false，可以不用设置
          output: {
            comments: false
          }
        }
      })
    ]
  }


};
module.exports = {
  // webpack配置
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  productionSourceMap: false,
  filenameHashing: false,

}
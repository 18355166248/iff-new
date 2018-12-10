let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  baseUrl: './',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // 服务器端口号
  devServer: {
      port: 8088,
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('@@', resolve('src/components'))
  }
}
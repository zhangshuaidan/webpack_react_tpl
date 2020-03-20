/**
 * @name webpack.dev.js
 * @desc webpack 打包开发环境配置
 */

 const merge = require('webpack-merge')
 const baseWebpackConfig = require('./webpack.base.js')
 const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 统计打包时长等信息
 const smp = new SpeedMeasurePlugin();

const config = merge(baseWebpackConfig,{
     mode:'development',
     devtool: 'cheap-module-eval-source-map', // 源码的映射
    // 开发本地服务器配置
     devServer:{
      stats: 'errors-only',
      // quiet: true,
        // open:true,//自动打开浏览器
        port:3000,//开启的端口
        compress: true //是否启用 gzip 压缩
     }
 }) 
 
//  module.exports =  smp.wrap(config);
 module.exports =  config;
 
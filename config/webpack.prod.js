/**
 * @name webpack.prod.js
 * @desc webpack 生产环境打包配置
 */

const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const baseWebpackConfig = require('./webpack.base.js')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 统计打包时长等信息
const smp = new SpeedMeasurePlugin();

const { npm_config_production } = process.env

const config = merge(baseWebpackConfig, {
  mode: 'production',
  // devtool: 'source-map',//添加源码映射
  plugins: [
    new OptimizeCssPlugin(),// 压缩css 
    npm_config_production ? new BundleAnalyzerPlugin() : () => { }, // 代码分析插件
  ]
})

// module.exports = smp.wrap(config);
module.exports = config;
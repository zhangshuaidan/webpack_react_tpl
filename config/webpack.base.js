/**
 * @name webpack.base.js
 * @desc wbepack打包公用配置
 */
const path = require('path')
const HappyPack = require('happypack') 
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const publicPath = './'


const config = {
    resolve: {
        extensions: ['.js', '.jsx'], //当然，你还可以配置 .json, .css
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    //  打包输出配置
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/bundle.[hash:6].js',
        chunkFilename: 'js/[name].[hash:6].js',// 设置按需加载后的ch
        publicPath
    },
    module: {
        rules: [
            {
                test:/.html$/, //处理html中的图片引入问题  该插件会压缩html文档
                use:'html-withimg-loader'
            },
            {
                test: /\.jsx?$/,
                use: 'happypack/loader?id=babel', // happy 打包
                // use: [
                //     {
                //         loader: 'babel-loader',
                //         options: {
                //             cacheDirectory: true //配置打包缓存 提升打包速度
                //         }
                //     }
                // ],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    },
                    'less-loader'
                ],
                // exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false,
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            ]
        }),
        new ProgressBarPlugin({
            format: 'build [:bar] :percent (:elapsed seconds)',
            clear: false, 
            width: 30
        }),
        new CopyWebpackPlugin([{
            // from: 'public/**/*',
            from: path.resolve(__dirname, '../public/**/*'),
            to: path.resolve(__dirname, '../dist'),
            ignore: ['*.html'],
            flatten: true
        }]),
        new MiniCssExtractPlugin({
            // 单独抽离css
            filename: 'css/[name].[hash:6].css',
            publicPath
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            }
        }),
        new CleanWebpackPlugin()

    ],
    optimization: {
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //最少引入了1次
                },
                //缓存组
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 //最少引入了3次
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
}

module.exports = config;

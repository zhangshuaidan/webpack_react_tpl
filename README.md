# 基于webpack的react开发模板
## 主要配置
- 1.分割代码，抽离公共代码与第三方库。
- 2.打包模块分析，与打包时间量化
- 3.使用corejs按需加载进行polyfill,提升优化，兼容不支持js新语法的低浏览器版本
- 4.autoprefixer进行低浏览器版本css兼容



## 文件说明
- webpack 

webpack的配置目录为./config目录,分别为webpack.base.js(公共配置),webpack.dev.js(开发配置),webpack.prod.js(生产打包配置)

- babel 

babel配置文件为.babelrc,针对低浏览器环境无法解析es6的相关语法，Babel会自动按需加载引入相关polyfill,目前使用了corejs@3版本作为JavaScript标准库的polyfill,同样配置了antd 的按需加载。

- 浏览器环境

.browserslistrc文件下记录了需要适配的浏览器,针对需要适配的浏览器autoprefixer插件会自动的填充相关样式# webpack_react_tpl

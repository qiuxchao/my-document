
# Webpack 4

本文主要记录我在学习 `Webpack 4` 过程中所遇到的一些知识点，以及自己写的一些 `demo`。<br>

> 参考资料：[Webpack 官方文档](https://www.webpackjs.com/concepts/)

## 初识 Webpack

### Webpack 是什么？

本质上，`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器(module bundler)。当 `webpack` 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 `bundle`。

### Webpack 的四个概念

1. 入口 `entry`
2. 输出`output`
3. `loader`
4. 插件 `plugins`

### 在项目中安装 Webpack

1. 使用 `npm` 初始化项目：`npm init`
2. 安装 `webpack` 和 `webpack-cli`（开发环境）：`npm i webpack webpack-cli --save-dev`
3. 如果不配置任何东西，执行打包命令：`npx webpack`
4. 默认 `webpack` 会将 `src` 目录下的 `js` 文件打包到 `dist` 目录下的 `main.js` 文件，打包后的文件会合并压缩 `js` 代码，模块化的 `js` 也能被转换成浏览器能运行的 `js`。

### Webpack 配置文件

在项目根目录下创建 `webpack.config.js` 文件，即 `webpack` 的配置文件，后续所有的配置都将在此文件中编写:

```javascript
// webpack.config.js

// webpack 是 node 写出来的，是 node 的语法
// 引入 path 路径模块
const path = require('path')
// 导出配置对象
module.exports = {
 entry: './src/index.js', // 入口，要打包的文件
 output: {
  // 出口，打包后的文件
  filename: 'bundle.js', // 打包后的文件名
  path: path.resolve(__dirname, 'dist') // 打包后的目录路径，必须是一个绝对路径，使用 path.resolve() 方法将指定的目录名解析成绝对路径
 },
 mode: 'development' // 模式 默认两种 production（生产模式 压缩代码） development（开发模式 未压缩代码）
}
```

也可以不使用 `webpack.config.js` 作为 `webpack` 的配置文件，只需：

1. 创建一个 `webpack.myconfig.js` 自定义 webpack 配置文件
2. 在运行时输入 `npx webpack --config webpack.myconfig.js`

还可以在 `package.json` 中配置自定义的 `webpack` 文件：

1. 在 `scripts` 中配置：

```json
 "scripts": {
    "build": "webpack --config webpack.myconfig.js"
  }
```

2. 使用 `npm run build` 即可进行打包

## Webpack 常用 module、loader 和 plugin

### 常用 loader

- `babel` 相关
    1. `babel-loader`
    2. `@babel/core`
    3. `@babel/env`
    4. `@babel/preset-env`
    5. `@babel/preset-react`
    6. `@babel/runtime`
    7. `@babel/plugin-transform-runtime`
    8. `@babel/preset-typescript`
- `css`、`scss`、`less` 相关
    1. `css-loader`
    2. `style-loader`
    3. `sass-loader`
    4. `less-loader`
    5. `node-sass`
    6. `dark-sass`
    7. `vue-style-loader`
    8. `MiniCssExtractPlugin.loader`
- 静态资源相关
    1. `url-loader` 处理图片
    2. `file-loader` 处理其他静态资源
    3. `html-loader` 处理 html 中的图片
- `typescript` 相关
    1. `ts-loader`
    2. `awesome-typescript-loader`
- `vue` 相关
    1. `vue-loader`
    2. `vue-template-compiler`
    3. `vue`
- `react` 相关
    1. `react`
    2. `react-dom`
    3. `@babel/preset-react`
    4. `@babel/core`
    5. `babel-loader`

### 常用 module 和 plugin

1. `webpack` `webpack-cli` 总的打包模块
2. `webpack-dev-server` http 服务器
3. `html-webpack-plugin` 将 Js 打包到指定的 html 中
4. `clean-webpack-plugin` 打包前清空 dist 或者指定的目录
5. `copy-webpack-plugin` 复制指定的文件到打包后的目录中
6. `webpack.BannerPlugin` 在每个打包后的文件顶部加上版权信息（内置插件，无需安装）
7. `progress-bar-webpack-plugin` 打包进度条
8. `mini-css-extract-plugin` 将 css 从 JS 中分离出来
9. `webpack-dev-middleware` 从服务端启动 webpack，解决跨域
10. `webpack-merge` 合并 webpack 公共配置
11. `optimize-css-assets-webpack-plugin` 压缩 css
12. `happypack` 多线程打包

## Webpack 基本配置

### webpack-dev-server 开发服务器

`webpack` 的插件 `webpack-dev-server` 可以启动一个本地的 `http` 服务器，然后在打包好的目录下运行打包后的项目。<br>
安装 `webpack-dev-server` : `npm i webpack-dev-server --save-dev` <br>
在 `webpack.config.js` 配置文件中配置 `http` 服务器：

```javascript
module.exports = {
 devServer: {
  // 开发环境 http 服务器配置
  port: 4000, // 端口号
  progress: true, // 加载进度条
  contentBase: './dist' // 服务器主目录，会自动加载该目录下的 index.html 文件
 }
}
```

启动服务器方式：

1. 在终端输入 `npx webpack-dev-server` 启动服务器
2. 在 `package.json` `scripts` 中配置启动命令 `"server" : "webpack-dev-server"`
3. 终端输入 `npm run server` 启动服务器

### 打包静态资源

> tip: 下面代码中使用到的`loader`和`plugin`需要通过 `npm install -D ...` 进行安装（...为模块名）

```javascript
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
 entry: './src/main.js',
 output: {
  path: resolve(__dirname, 'dist'),
  filename: '[name].js'
 },
 module: {
  rules: [
   {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
   },
   {
    test: /\.(sass|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
   },
   {
    test: /\.(png|jpg|gif)$/,
    use: [
     {
      loader: 'url-loader',
      options: {
       limit: 10000,
       name: '[name][hash:10].[ext]',
       outputPath: 'images/'
       // esModule: false // 关闭es 模块，使用 commjs 模块
      }
     }
    ]
   },
   // 处理html中的图片
   {
    test: /\.html$/,
    use: [
     {
      loader: 'html-loader',
      options: {
       outputPath: 'images/'
      }
     }
    ]
   },
   {
    exclude: /\.(js|css|sass|scss|png|jpg|gif|html)$/,
    use: [
     {
      loader: 'file-loader',
      options: {
       outputPath: 'static/'
      }
     }
    ]
   }
  ]
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './public/index.html',
   inject: 'body'
  })
 ],
 mode: 'development',
 // 需要安装 webpack-dev-server
 devServer: {
  contentBase: 'dist', // 输入目录，（在内存中，不会实际输出）
  compress: true, // 开启gzip压缩
  port: 9000, // 端口号
  open: true // 自动打开浏览器
 }
}
```

## Webpack 进阶配置

### resolve 属性配置

这些选项能配置模块如何被解析。

```javascript
// 配置模块如何被解析
resolve: {
 // 告诉 webpack 解析模块时应该搜索的目录。
 modules: [resolve(__dirname, 'node_modules')],

 // 创建 import 或 require 的别名，来确保模块引入变得更简单
 alias: {
  bootstrap: 'bootstrap/dist/css/bootstrap.css'
 },

 // 定义找第三方模块 package.json 中入口文件的字段名，值为数组，按照从左到右的顺序寻找
 mainFields: ['style', 'main'], // 先找 package.json/style 字段，找不到再找 main 字段

 // 指定要解析的扩展名，在引入文件时便可以不加扩展名（比如vue在引入组件时通常不加扩展名）；值为数组，会按照从左到右的优先级去自动添加扩展名
 extensions: ['.js', '.css', '.json']
},
```

### 区分不同环境

#### 使用 webpack.DefinePlugin 插件定义环境变量

```javascript
/* ------- webpack.config.js -------- */

// 定义环境变量
const { DefinePlugin } = require('webpack')

module.exports = {
 plugins: [
  // 配置 ENV 环境变量
  new DefinePlugin({
   ENV: JSON.stringify('development')
  })
 ]
}
/* ------- webpack.config.js -------- */

/* ------ src/index.js ------- */

// 使用环境变量
let url = ''

if (ENV && ENV === 'development') {
 url = '开发环境地址'
} else {
 url = '生产环境地址'
}
console.log(url) // 开发环境地址

/* ------ src/index.js ------- */
```

#### 单独创建开发环境和生产环境 Webpack 配置

需要创建主配置、生产环境配置、开发环境配置三个 `webpack` 配置文件，然后使用 `webpack-merge` 模块合并主配置文件到其他两个环境文件中；最后在 `package.json/scripts` 中配置启动/打包时指定对应的配置文件即可<br>
`webpack.config.base.js` 主配置文件：

```javascript
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 entry: './src/index.js',
 output: {
  path: resolve(__dirname, 'dist'),
  filename: 'index.js'
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './src/index.html'
  })
 ]
}
```

`webpack.config.dev.js` 开发环境配置文件：

```javascript
// 开发环境配置

const { DefinePlugin } = require('webpack')
// 合并配置
const { merge } = require('webpack-merge')
// 公用配置
const base = require('./webpack.config.base')

module.exports = merge(base, {
 mode: 'development',
 plugins: [
  // 配置环境变量
  new DefinePlugin({
   ENV: JSON.stringify('development')
  })
 ]
})
```

`webpack.config.prod.js` 生产环境配置文件：

```javascript
// 生产环境配置

const { DefinePlugin } = require('webpack')
// 合并配置
const { merge } = require('webpack-merge')
// 公用配置
const base = require('./webpack.config.base')

module.exports = merge(base, {
 mode: 'production',
 plugins: [
  // 配置环境变量
  new DefinePlugin({
   ENV: JSON.stringify('production')
  })
 ]
})
```

`package.json/scripts` 脚本配置：

```javascript
 "scripts": {
  "build": "webpack --config webpack.config.prod.js",
  "start": "webpack-dev-server --config webpack.config.dev.js"
 },
```

`src/index.js` 使用环境变量：

```javascript
let url = ''

if (ENV && ENV === 'development') {
 url = '开发环境地址'
} else {
 url = '生产环境地址'
}

// 如果是通过 start 命令启动，打印 "开发环境地址"；使用 build 打包后启动则打印 "生产环境地址"
console.log(url)
```

### Webpack 跨域问题

#### 通过 webpack-dev-server 配置代理

```javascript
// webpack-dev-server 解决跨域问题
devServer: {
    // 代理
    proxy: {
     // 将 localhost:8080/api 开头的请求代理到 localhost:3000/api
     '/api': {
      target: 'http://localhost:3000/',
      pathRewrite: { '/api': '' } // 代理时将 /api 去除，去除后：localhost:8080/api/user -> localhost:3000/user
     }
    }
}

```

#### 前端模拟数据

```javascript
// webpack-dev-server 解决跨域问题
devServer: {
 open: true,
 // 2) 前端自己模拟数据
 before(app) {
  // app 就是 express 的实例
  app.get('/api/user', (req, res) => res.json({ name: 'qxc' }))
 }
}
```

#### 代理部分接口，手写部分接口

如果代理的接口后端也有，那么将有限访问本地的接口，而不会访问后端接口，就近原则

```javascript
// webpack-dev-server 解决跨域问题
devServer: {
 open: true,
 // 1) 代理
 proxy: {
  // 将 localhost:8080/api 开头的请求代理到 http://localhost:3000/api
  '/api': {
   target: 'http://localhost:3000/',
   pathRewrite: { '/api': '' } // 代理时将 /api 去除，去除后：localhost:8080/api/user -> http://localhost:3000/user
  }
 },
 // 2) 前端自己模拟数据
 before(app) {
  // app 就是 express 的实例
  app.get(
   '/api/login',
   (req, res) => res.json({ name: 'loginSuccess' }) // 如果后端也有 /login 接口，那么将不会请求后端的接口，就近原则
  )
 }
}
```

#### 服务端启动 Webpack

将 `Webpack` 和服务器同时启动，前端后在一个端口运行，理所当然不会跨域<br>
需要安装 `webpack-dev-middleware`<br>
基于 `express` 服务器启动 `webpack` + 后端服务:

```javascript
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

// 创建 express 服务器实例
const app = express()

// 引入 webpack 配置
const config = require('./webpack.config.js')

// 编译 webpack 配置
const compiler = webpack(config)

// 以 express 中间件的形式启动 webpack
app.use(webpackDevMiddleware(compiler))

// express 接口
app.get('/api/user', (req, res) => res.json({ name: 'qxc' }))
app.get('/api/login', (req, res) => res.json({ name: 'loginBackend' }))

const port = 3000
app.listen(port, () => console.log(`Example app listening on port port!`))

/*
注意：
    1. 使用 webpack 中间件后会占用 / 根路由，在根路由映射前端资源；因此不能再自己处理 / 了
    2. webpack.config.js 中的路径要使用绝对路径（path.resolve），不能使用相对路径
*/
```

### watch 实时打包

`watch` 属性用于监听，在代码做出修改时触发 `webpack` 的再次打包<br>
要使用监听功能，首先要开启 `watch: true`

```javascript
watch: true, // 开启监听
watchOptions: {
 // 监听的配置项
 poll: 500, // 每秒检查修改的次数（每秒检查500次）
 aggregateTimeout: 1000, // 防抖，将指定 ms(毫秒) 内做出的多次修改只打包一次
 ignored: /node_modules/ // 屏蔽不需要监控的文件
},
```

### 配置 source-map

`source-map` 是一种源码映射技术，作用是打包的后文件运行时如果出现报错，会将报错信息定位到源码文件中具体的行和列，便于开发人员调试<br>

> 官方文档地址: [https://www.webpackjs.com/configuration/devtool/](https://www.webpackjs.com/configuration/devtool/)

属性名为 `devtool`，有以下取值：

1. `source-map` 报错直接定位到源文件具体行和列，打包后**会**生成 `sourcemap` 文件
2. `inline-source-map` 报错直接定位到源文件具体行和列，打包后**不会**生成 `sourcemap` 文件
3. `eval-source-map` 报错直接定位到源文件具体行和列，打包后**不会**生成 `sourcemap` 文件
4. `hidden-source-map`
5. `cheap-source-map`
6. `cheap-module-source-map`
7. `eval`

```javascript
devtool: "source-map", // enum
devtool: "inline-source-map", // 嵌入到源文件中
devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
devtool: "hidden-source-map", // SourceMap 不在源文件中引用
devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。
// 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
// 牺牲了构建速度的 `source-map' 是最详细的。
```

### Webpack 打包多页应用

`webpack.config.js` 配置打包多页应用：

```javascript
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 // 多入口
 entry: {
  home: './src/index.js',
  other: './src/other.js',
  common: './src/common.js'
 },
 output: {
  path: resolve(__dirname, 'dist'),
  // 多出口 [name] home other common
  filename: '[name].js'
 },
 mode: 'development',
 plugins: [
  // new 多次，生成多个页面
  new HtmlWebpackPlugin({
   template: './src/index.html',
   inject: 'body',
   filename: 'home.html',
   // 要引入的打包后的 js，common是公共代码块
   chunks: ['home', 'common']
  }),
  new HtmlWebpackPlugin({
   template: './src/index.html',
   inject: 'body',
   filename: 'other.html',
   chunks: ['other', 'common']
  })
 ]
}
```

### Webpack 3 个小插件应用

1. `clean-webpack-plugin` 打包前先删除构建目录，保证构建后的目录是干净的
2. `copy-webpack-plugin` 将源码中指定的文件原封不动地拷贝到打包后的目录中
3. `webpack.BannerPlugin` 在打包后的每个文件头部加上指定的注释，多用于版权声明（webpack 自带，无需安装）

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BannerPlugin } = require('webpack')

module.exports = {
 plugins: [
  // 在打包前先删除 dist 目录（也可传入自己指定的目录）
  new CleanWebpackPlugin(),

  // 将源码中指定的文件原封不动地拷贝到打包后的目录中
  new CopyWebpackPlugin({
   patterns: [{ from: './src/description.txt' }]
  }),

  // 版权声明，默认打包后会将传入的字符串生成版权声明文件
  new BannerPlugin('make by qxc')
 ]
}
```

## Demos

> 下面示例的完整代码可以在这里找到：[https://gitee.com/qiuxchao/webpack-demos](https://gitee.com/qiuxchao/webpack-demos)

### 打包 Typescript

```javascript
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
 entry: './src/index.ts',
 output: {
  path: resolve(__dirname, 'dist'),
  filename: 'boundle.js'
 },
 module: {
  rules: [
   {
    test: /\.ts$/,
    use: ['ts-loader']
   }
  ]
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './public/index.html',
   inject: 'body'
  })
 ],
 mode: 'development'
}
```

### 打包 Vue

`webpack.config.js`:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressPlugin = require('progress-bar-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path')
module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        filename: 'boundle.js',
        path: resolve(__dirname, 'dist')
    },
    // loader
    module: {
        rules: [
            // es6 转 es5
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            // 处理ts
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 处理less
            {
                test: /\.less$/,
                use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            // 处理css
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            // 处理图片资源
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    outputPath: 'images/',
                    name: '[name]-[hash:10].[ext]',
                    esModule: false // 关闭es6模块化
                }
            },
            // 处理html中引入的图片资源
            {
                test: /\.(htm|html)$/,
                loader: 'html-loader'
            },
            // 处理其他静态资源
            {
                exclude: /\.(html|htm|js|css|vue|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:5].[ext]'
                }
            }
        ]
    },
    // 插件
    plugins: [
        new VueLoaderPlugin(),
        new ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        }),
    ],
    // 开发服务器
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        compress: true,
        port: 8899,
        open: true
    },
    resolve: {
        alias: {//修改vue被导入时候包的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}
```

`package.json`:

```json
{
 "name": "demo5",
 "version": "1.0.0",
 "main": "index.js",
 "license": "MIT",
 "scripts": {
  "start": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production"
 },
 "devDependencies": {
  "html-loader": "0.5.5",
  "html-webpack-plugin": "4",
  "less-loader": "5",
  "ts-loader": "8",
  "vue-loader": "15.4.1",
  "vue-template-compiler": "2.6.12",
  "webpack": "4",
  "webpack-cli": "3",
  "webpack-dev-server": "^3.11.2"
 },
 "dependencies": {
  "typescript": "^4.2.4",
  "vue": "^2.6.12"
 }
}
```

### 打包 React

`webpack.config.js`:

```javascript
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
 entry: './src/index.js',
 output: {
  path: resolve(__dirname, 'dist'),
  filename: 'js/[name].js'
 },
 module: {
  rules: [
   {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    options: {
     presets: ['@babel/preset-react'],
     plugins: ['@babel/plugin-proposal-class-properties']
    }
   },
   {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader'
   },
   {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
   }
  ]
 },
 plugins: [
  new HtmlWebpackPlugin({
   template: './src/index.html',
   inject: 'body'
  })
 ],
 mode: 'development',
 devtool: 'inline-source-map',
 devServer: {
  contentBase: resolve(__dirname, 'dist'),
  compress: true,
  port: 8089,
  open: true
 }
}
```

`package.json`:

```json
{
 "name": "build_react",
 "version": "1.0.0",
 "main": "index.js",
 "license": "MIT",
 "scripts": {
  "build": "webpack --mode=production",
  "start": "webpack-dev-server --mode=development"
 },
 "devDependencies": {
  "@babel/preset-react": "^7.13.13",
  "node-sass": "4",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "webpack": "4",
  "webpack-cli": "3"
 },
 "dependencies": {
  "awesome-typescript-loader": "^5.2.1",
  "html-webpack-plugin": "4.0.0-alpha.2",
  "sass-loader": "7",
  "webpack-dev-server": "3"
 }
}
```

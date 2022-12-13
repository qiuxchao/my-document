# Rollup

Rollup 是一个 JavaScript 模块打包器，用于将多个模块合并成单个文件。它通常用于将小型模块组合成大型文件，以便更快地加载和运行。

Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

官方文档：[rollup.js](https://rollupjs.org/guide/zh/)

## Rollup 的基本原理

Rollup 的基本原理是通过分析 JavaScript 代码中的 `import` 和 `export` 语句来构建依赖图，并将所有依赖的模块合并成一个输出文件。它还可以根据需要转换模块中的代码，例如使用 Babel 进行语法转换或使用 UglifyJS 进行压缩。

## 安装 & 使用

### 安装

要安装 Rollup，需要使用 `npm` 或 `yarn` 等包管理器。如果尚未安装 `npm` 或 `yarn`，请参考官方文档进行安装。

在终端或命令行窗口中，输入以下命令来安装 Rollup：

```
# 使用 npm
npm install --global rollup

# 使用 yarn
yarn global add rollup
```

安装完成后，可以使用以下命令来验证是否安装成功：

```
rollup --version
```

如果看到输出版本信息，则表示安装成功。


### 使用

使用 Rollup 通常需要指定一个配置文件，其中包含了打包过程中的各种设置。例如，可以使用以下配置文件来打包一个名为 `main.js` 的入口模块：

```js
// rollup.config.js

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

然后，可以使用以下命令来执行打包操作：

```
rollup --config rollup.config.js
```

打包后的文件会被输出到 `bundle.js`。


## 配置

Rollup 的配置通常被存储在一个名为 `rollup.config.js` 的文件中。该文件是一个普通的 JavaScript 模块，其中导出了一个配置对象。

下面是一个简单的配置示例：

```js
// rollup.config.js

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

上面的配置表示，Rollup 将会打包一个名为 `main.js` 的入口文件，并将打包后的文件输出为 `bundle.js`，格式为 CommonJS。

更多关于 Rollup 配置的内容，请参考[官方文档](https://rollupjs.org/guide/zh/#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6configuration-files)。
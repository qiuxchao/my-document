# Babel

Babel 是一个广泛使用的 JavaScript 编译器，它可以将最新版本的 JavaScript 代码转换为旧版本的 JavaScript 代码，以便在所有浏览器或其他环境中运行。

Babel 可以通过插件的形式来支持各种语言特性和转换，例如将 ES6+ 代码转换为 ES5，或者将 JSX 语法转换为 JavaScript。

Babel 可以在浏览器和各种 Node.js 环境中运行，通常用于编译模块化的 JavaScript 代码或者 React 等库的源码。

🧭Babel 官方手册：
- [🔗用户手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md) － 如何安装／配置 Babel 及相关内容。
- [🔗插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md) － 如何为 Babel 创建插件。

## 基本原理

Babel 的基本原理是通过语法分析器（如 Babylon）来解析 JavaScript 代码，然后通过插件的形式来转换代码中的语法结构。

例如，如果某个插件支持转换箭头函数，Babel 在解析源码时会标记箭头函数语法，然后在转换阶段，该插件会将箭头函数转换为普通的函数表达式。

除了转换语法之外，Babel 还可以通过插件来处理源码中的其他内容，例如处理源码中的注释，或者为代码添加额外的类型检查信息。

### AST 在 Babel 中的应用

AST（Abstract Syntax Tree）是抽象语法树的缩写，它是一种表示程序代码语法结构的树形数据结构。

Babel 在解析源码时，会生成源码的 AST，然后通过插件来转换 AST 中的语法结构。

例如，如果源码中有一个箭头函数，Babel 会生成一棵表示箭头函数语法的 AST，然后在转换阶段，某个插件可以操作该 AST，将箭头函数转换为普通的函数表达式。

在某些情况下，Babel 插件开发者可能需要手动操作 AST，例如添加、删除或修改 AST 中的语法结构。Babel 提供了丰富的 API 来操作 AST，并且可以通过插件系统来集成这些 API。

#### AST 的生成

通过词法分析和语法分析，可以得出一颗 AST。

1. 词法分析

词法分析的过程是将代码喂给有限状态机，结果是将代码单词转换为令牌（token），一个token包含的信息包括其的种类、属性值等。

例如将 `const a = 1 + 1` 转换为token的话，结果大概如下

```
[
  {type: 关键字, value: const}, 
  {type: 标识符, value: a},
  {type: 赋值操作符, value: =},
  {type: 常数, value: 1},
  {type: 运算符, value: +}, 
  {type: 常数, value: 1},
]
```

2. 语法分析

面对一串代码，先通过词法分析，获得第一个 token，为其建立一个 AST 节点，此时的 AST 节点的**属性**以及**子节点**都不完整。

为了补充这些缺少的部分，接下来移动到下一个单词，生成 token，并且将其转换成子节点，添加进现有的 AST 中，然后重复这个 移动&生成 的递归的过程。

让我们来看看 `const a = 1` 是怎么变成一颗 AST 的：

1. 读取 `const`，生成一个 `VariableDeclaration` 节点
2. 读取 `a`，新建 `VariableDeclarator`节点
3. 读取 `=`
4. 读取 `1`，新建 `NumericLiteral` 节点
5. 将 `NumericLiteral` 赋值给 `VariableDeclarator` 的 `init` 属性
6. 将 `VariableDeclarator` 赋值给 `VariableDeclaration` 的 `declaration` 属性

转换结果：

```json
{
	"type": "Program",
	"start": 0,	// 起始列
	"end": 11, // 结束列
	"loc": {
	  "start": {
		"line": 1,
		"column": 0,
		"index": 0
	  },
	  "end": {
		"line": 1,
		"column": 11,
		"index": 11
	  }
	}, // 位置
	"sourceType": "module",
	"interpreter": null,
	"body": [
	  {
		"type": "VariableDeclaration",
		"start": 0,
		"end": 11,
		"loc": {
		  "start": {
			"line": 1,
			"column": 0,
			"index": 0
		  },
		  "end": {
			"line": 1,
			"column": 11,
			"index": 11
		  }
		},
		"kind": "const", // 关键字
		"declarations": [
		  {
			"type": "VariableDeclarator", // 变量声明符
			"start": 6,
			"end": 11,
			"loc": {
			  "start": {
				"line": 1,
				"column": 6,
				"index": 6
			  },
			  "end": {
				"line": 1,
				"column": 11,
				"index": 11
			  }
			},
			"id": {
			  "type": "Identifier",
			  "start": 6,
			  "end": 7,
			  "loc": {
				"start": {
				  "line": 1,
				  "column": 6,
				  "index": 6
				},
				"end": {
				  "line": 1,
				  "column": 7,
				  "index": 7
				},
				"identifierName": "a"
			  },
			  "name": "a" // 变量名
			},
			"init": {
			  "type": "NumericLiteral", // 数字字面量
			  "start": 10,
			  "end": 11,
			  "loc": {
				"start": {
				  "line": 1,
				  "column": 10,
				  "index": 10
				},
				"end": {
				  "line": 1,
				  "column": 11,
				  "index": 11
				}
			  },
			  "extra": {
				"rawValue": 1,
				"raw": "1"
			  },
			  "value": 1 // 值
			}
		  }
		],
	  }
	],
	"directives": []
}
```


### 编译过程

代码编译的过程分为三步，接（parse）、化（transform）、发（generate）

- `parse` 的过程则是将代码从字符串转化为树状结构的 AST。
- `transform` 则是对 AST 节点进行遍历，遍历的过程中对 AST 进行修改。
- `generate` 则是将被修改过的 AST，重新生成为代码。

## 安装 & 使用

可以使用以下命令来安装 Babel：

```sh
npm install --save-dev @babel/core @babel/cli
```

安装完成后，就可以使用 Babel 编译 JavaScript 代码了。下面是一个例子，展示了如何使用 Babel 将 `ES6` 代码编译成 `ES5` 代码：

```js
// 原始代码（使用了 ES6 的语法）
const a = [1, 2, 3];
const b = a.map(x => x * x);
console.log(b);

// 编译后的代码（使用了 ES5 的语法）
"use strict";

var a = [1, 2, 3];
var b = a.map(function (x) {
  return x * x;
});
console.log(b);

```

要将 `ES6` 代码编译成 `ES5`，需要创建一个名为 `.babelrc` 的文件，并在这个文件中指定需要使用的预设和插件。例如，要使用 Babel 的 ES6 转换插件，可以在 `.babelrc` 文件中添加如下内容：

```json
{
	"presets": ["@babel/preset-env"]
}
```

然后，可以使用 `babel` 命令行工具来编译你的代码，例如：

```sh
npx src/script.js --out-file dist/script.js
```

这样，Babel 就会读取 `src/script.js` 文件，并将编译后的代码写入到 `dist/script.js` 文件

### Babel 的几种安装包

- [babel-cli](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#babel-cli) - Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。

- [babel-register](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#babel-register) - 只需要引入文件就可以运行 Babel，或许能更好地融入你的项目设置。

- [babel-node](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/user-handbook.md#toc-babel-node) - 用 `babel-node` 来替代 `node` 运行所有的代码，就像这样 `npx babel-node index.js`。

- [babel-core](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#babel-core) 如果你需要以编程的方式来使用 Babel，可以使用 `babel-core `这个包。

## 插件 & 预设

在 Babel 中，插件和预设都是用来扩展 Babel 的功能的小型模块。

- **插件**通常是用来做某些特定的事情的，例如将箭头函数转换成函数表达式、将扩展运算符转换成 `.apply()` 方法、将 `ES6` 的类转换成构造函数等。
- **预设**则是一组插件的集合，它通常包含了一系列相关的插件，用来实现某种特定的功能。

例如，`@babel/preset-env` 预设包含了多个插件，用来实现将 `ES6` 代码转换成 `ES5` 代码的功能。这个预设包含了许多子插件，每个子插件都可以将一种特定的 `ES6` 特性转换成 `ES5` 的代码。如果你想要使用这个预设，只需要在 `.babelrc` 文件中指定使用 `@babel/preset-env` 预设即可。

如果想要使用某个插件，可以在 `.babelrc` 文件中指定要使用的插件。例如，如果想要使用 `@babel/plugin-transform-arrow-functions` 插件，可以在 `.babelrc` 文件中添加如下内容：

```json
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

如果想要使用某个预设，也可以在 `.babelrc` 文件中指定要使用的预设。

```json
{
	"presets": ["@babel/preset-env"]
}
```

### 插件 & 预设排序

- 插件在预设之前运行。
- 插件排序是从第一个到最后一个。
- 预设顺序是颠倒的（最后一个到第一个）。

示例:

```json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

将先运行 `transform-decorators-legacy` 再运行 `transform-class-properties`。

重要的是要记住，使用预设时，顺序是 **颠倒** 的。例如下面：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

将按以下顺序运行：先 `@babel/preset-react` 再 `@babel/preset-env`。



### 常用插件 & 预设

常用的 Babel 插件包括：

- `babel-plugin-transform-arrow-functions`：转换箭头函数
- `babel-plugin-transform-object-rest-spread`：支持对象的扩展运算符
- `babel-plugin-transform-class-properties`：支持在类中定义静态属性
- `babel-plugin-transform-async-to-generator`：将 async/await 转换为 generator 函数

常用的 Babel 预设包括：

- `@babel/preset-env`：根据目标环境自动转换代码
- `@babel/preset-react`：支持 JSX 语法和 React 特有的语法
- `@babel/preset-typescript`：支持 TypeScript 语法

使用 Babel 时，可以通过在配置文件（如 `.babelrc`）中指定插件和预设来安装它们。例如：

```json
{
  "plugins": ["transform-arrow-functions", "transform-object-rest-spread"],
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

```

## 如何编写 Babel 插件

要编写一个 Babel 插件，需要实现一个 JavaScript 函数，该函数接收一个 Babel 的抽象语法树（AST）作为输入，并返回一个修改后的 AST。

[🔗 插件编写官方文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

以下是一个简单的 Babel 插件示例，该插件可以将所有字符串中的 "Hello" 替换为 "Goodbye"。

```js
// babel-plugins/my-babel-plugin.js
function myBabelPlugin(babel) {
  const { types: t } = babel;

  return {
    name: "my-babel-plugin",
    visitor: {
      StringLiteral(path) {
        if (path.node.value === "Hello") {
          path.node.value = "Goodbye";
        }
      },
    },
  };
}

module.exports = myBabelPlugin;
```

在上面的代码中，我们定义了一个函数 `myBabelPlugin`，它接收一个 Babel 的实例作为参数，并返回一个对象。该对象拥有两个属性：`name` 和 `visitor`。

- `name` 属性用于指定插件的名称。
- `visitor` 属性是一个对象，它用于定义插件对语法树中不同类型的节点进行的访问和操作。在上面的例子中，我们定义了一个 `StringLiteral` 的访问器，用于处理字符串节点，并将所有值为 "Hello" 的字符串节点替换为 "Goodbye"。

最后，我们通过 `module.exports` 将 `myBabelPlugin` 函数暴露出去，以便在其它地方使用。

要使用在本地文件中编写的插件，需要指定插件的路径。例如，如果我们的插件存储在 `./babel-plugins/my-babel-plugin.js` 文件中，那么我们可以在 `.babelrc` 文件中添加如下内容：

```json
{
  "plugins": ["./babel-plugins/my-babel-plugin.js"]
}
```

这样，Babel 就会在编译 JavaScript 代码时使用我们定义的插件。

需要注意的是，在指定插件路径时，可以使用相对路径或绝对路径。如果使用相对路径，则相对于项目根目录。例如，上面的例子中的相对路径为 `./babel-plugins/my-babel-plugin.js`，它表示在项目根目录下的 `babel-plugins` 目录中的 `my-babel-plugin.js` 文件。

另外，需要确保插件文件具有正确的模块导出方式，以便 Babel 能够识别并使用它。例如，上面的例子中，我们通过 `module.exports = myBabelPlugin` 将插件函数暴露出去。这样，Babel 就能够识别并使用这个插件。

::: tip 
除了上面提到的 `name` 和 `visitor` 属性外，Babel 插件还可以定义其它属性，例如：

- `pre` 属性：用于定义在编译之前要执行的函数。
- `post` 属性：用于定义在编译之后要执行的函数。
- `manipulateOptions` 属性：用于定义一个函数，在 Babel 读取配置选项时调用该函数。

例如，下面的插件使用 `manipulateOptions` 属性来修改 Babel 的默认配置：

```js
function myBabelPlugin(babel) {
  const { types: t } = babel;

  return {
    name: "my-babel-plugin",
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("dynamicImport");
    },
  };
}

module.exports = myBabelPlugin;
```

在这个例子中，我们通过 `manipulateOptions` 属性指定了一个函数，该函数会在 Babel 读取配置选项时被调用。我们在该函数中将 `parserOpts.plugins` 数组添加了 "dynamicImport" 插件，从而在编译时启用了对动态导入语法的支持。

通过定义这些属性，我们可以让 Babel 插件完成更多复杂的功能。例如，我们可以定义一个插件来转换所有的箭头函数，或者定义一个插件来优化代码结构，或者定义一个插件来检查代码中的语法错误等。
:::

总之，编写 Babel 插件需要实现一个函数，该函数接收一个 Babel 的实例和抽象语法树（AST）作为参数，并返回一个修改后的 AST。

通过定义插件的 `name`、`visitor` 和其它属性，我们可以实现多种功能，如转换语法、优化代码结构、检查语法错误等。

要在 Babel 中使用这个插件，需要在配置文件（如 .babelrc）中指定插件的名称或路径。如果插件来自 npm 包，则需要先安装它。如果插件来自本地文件，则需要指定插件的相对或绝对路径。

通过这些步骤，我们就可以编写并使用自己的 Babel 插件。

### 插件中的访问器

Babel 插件中的访问器分为两类：一类是针对特定类型的节点，如 `StringLiteral`、`Identifier` 等；另一类是针对语句或表达式的访问器，如 `Function`、`Conditional`、`BinaryExpression` 等。

在定义访问器时，我们需要根据需求选择适当的访问器类型，并定义操作逻辑。例如，我们可以定义一个 `Function` 类型的访问器，用于检查函数中是否存在重复的参数：

```js
function myBabelPlugin(babel) {
  const { types: t } = babel;

  return {
    name: "my-babel-plugin",
    visitor: {
      Function(path) {
        const paramSet = new Set();
        for (const param of path.node.params) {
          if (paramSet.has(param.name)) {
            throw new Error(`Duplicate parameter: ${param.name}`);
          }
          paramSet.add(param.name);
        }
      },
    },
  };
}

module.exports = myBabelPlugin;
```

在上面的例子中，我们定义了一个 `Function` 类型的访问器，该访问器会在遍历到函数节点时被调用。在访问器中，我们首先创建了一个 `Set` 对象，用于保存函数的参数。然后，我们遍历了函数的参数列表，并使用 `Set.has()` 和 `Set.add()` 方法检查和保存参数。如果发现重复的参数，则抛出一个错误。

除了上面提到的访问器之外，Babel 还提供了许多其它类型的访问器。例如，我们可以定义一个 `Conditional` 类型的访问器，用于替换三元表达式：

```js
function myBabelPlugin(babel) {
  const { types: t } = babel;

  return {
    name: "my-babel-plugin",
    visitor: {
      Conditional(path) {
        const { test, consequent, alternate } = path.node;
        const ifStatement = t.ifStatement(test, t.blockStatement([consequent]));
        if (alternate) {
          ifStatement.alternate = t.ifStatement(
            t.unaryExpression("!", test),
            t.blockStatement([alternate])
          );
        }
        path.replaceWith(ifStatement);
      },
    },
  };
}

module.exports = myBabelPlugin;
```

在上面的例子中，我们定义了一个 `Conditional` 类型的访问器，该访问器会在遍历到三元表达式时被调用。在访问器中，我们首先提取了三元表达式的 `test`、`consequent` 和 `alternate` 属性。然后，我们使用 `t.ifStatement()` 方法创建一个 `if` 语句，该语句用于替换三元表达式。

如果三元表达式有 `alternate` 属性，则我们再使用 `t.ifStatement()` 方法创建一个 `if` 语句，用于替换 `alternate` 属性。最后，我们使用 `path.replaceWith()` 方法，将三元表达式替换为新创建的 `if` 语句。

通过这些代码，我们就可以实现将三元表达式转换为 `if` 语句的功能。这只是一个简单的例子，Babel 中还有许多其它类型的访问器，并且可以通过组合多个访问器来实现更复杂的功能。

总之，Babel 插件中的访问器可以帮助我们在处理 AST 时，对不同类型的节点进行操作，从而实现多种功能。


## Babel 中的 Polyfill

Polyfill 是一种代码，它可以为浏览器提供对新的 JavaScript 特性的支持。例如，如果你的代码中使用了新的语言特性，而目标浏览器并不支持该特性，那么可以使用 polyfill 来解决这个问题。polyfill 会在代码运行时动态地为目标浏览器提供对新特性的支持，从而让你的代码能够在所有浏览器中正常运行。

Polyfill 主要用于消除浏览器的差异，使得开发人员能够在所有浏览器中使用同样的 API。通常，polyfill 会检查当前浏览器是否支持某个特性，如果不支持，就会动态地为浏览器注入所需的代码，从而使得浏览器能够支持这个特性。这样，开发人员就可以使用最新的 JavaScript 特性，而不用担心兼容性问题。

Babel 用了优秀的 [core-js](https://github.com/zloirock/core-js) 用作 polyfill，并且还有定制化的 [regenerator](https://github.com/facebook/regenerator) 来让 `generators`（生成器）和 `async functions`（异步函数）正常工作。

要使用 Babel 的 polyfill，你需要安装 `@babel/polyfill` 包，然后在你的 JavaScript 代码中引入它。例如：

```js
import "@babel/polyfill";
```

这样，Babel 就会自动为你的代码提供 polyfill 支持。

也可以通过配置 Babel 的 `presets` 选项来自动启用 polyfill，需要在 `.babelrc` 文件中进行如下配置：

```json
{
  "presets": ["@babel/preset-env"]
}
```

上面的配置会自动启用 Babel 的 `@babel/preset-env` preset，该 preset 会根据目标浏览器的环境来自动启用 polyfill。具体来说，Babel 会检查目标浏览器的版本，并根据需要为其提供 polyfill 支持。

需要注意的是，上面的配置仅会自动启用 polyfill，并不会自动添加 polyfill 代码到你的 JavaScript 代码中。如果你希望在你的代码中直接使用 polyfill，则需要在你的代码中手动引入 `@babel/polyfill` 包。

还可以通过配置 Babel 的 `entry` 选项来自动引入 `@babel/polyfill` 包，这样就无需在每个文件中都手动引入该包了。例如，你可以在 `.babelrc` 文件中进行如下配置：

```json
{
  "entry": ["@babel/polyfill", "./src/index.js"]
}
```

上面的配置会自动引入 `@babel/polyfill` 包，并将其作为入口文件的第一个文件。这样，你就无需在每个文件中都手动引入该包了。

此外，还可以通过配置 Babel 的 `useBuiltIns` 选项来控制 polyfill 的使用。例如，你可以使用 `useBuiltIns: "usage"` 来只为需要的特性提供 polyfill 支持。这样，Babel 就不会为所有特性都提供 polyfill 支持，而是只为使用到的特性提供支持，这样可以减小代码体积。
# Babel

Babel 是一个广泛使用的 JavaScript 编译器，它可以将最新版本的 JavaScript 代码转换为旧版本的 JavaScript 代码，以便在所有浏览器或其他环境中运行。

Babel 可以通过插件的形式来支持各种语言特性和转换，例如将 ES6+ 代码转换为 ES5，或者将 JSX 语法转换为 JavaScript。

Babel 可以在浏览器和各种 Node.js 环境中运行，通常用于编译模块化的 JavaScript 代码或者 React 等库的源码。

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





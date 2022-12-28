# JSDoc JS文档生成工具

[JSDoc](https://jsdoc.app/about-getting-started.html) 是 JavaScript 的文档生成器，可以生成 HTML 格式的文档。

JSDoc 使用注释块和特殊的标记来描述 JavaScript 中的函数、对象、变量等元素。注释块通常是由三个斜杠（ `/**` ）开始，由一个单独的斜杠（ `*/` ）结尾的。

例如，以下是一个使用 JSDoc 的简单函数的示例：

```js
/**
 * Calculates the sum of two numbers.
 *
 * @param {number} x - The first number.
 * @param {number} y - The second number.
 * @returns {number} The sum of `x` and `y`.
 */
function add(x, y) {
  return x + y;
}
```

JSDoc 会把上述注释中的标记解析为文档的元素。例如，`@param` 标记用于描述函数的参数，`@returns` 标记用于描述函数的返回值。

生成文档的方法有很多种，但是最常见的是使用 JSDoc 的命令行工具来生成 HTML 文档。通过这种方式，可以将 JSDoc 注释转换为可读性更好的网页文档。

## 命令行工具安装 & 使用

要使用 JSDoc 的命令行工具，首先需要在项目中安装 JSDoc：

```sh
$ npm install jsdoc
```

然后，可以在项目的根目录中运行以下命令来生成文档：

```sh
$ jsdoc source_files -d destination
```

`source_files` 是要生成文档的 JavaScript 文件的列表，可以使用通配符（例如 `*.js`）来包含多个文件。`destination` 指定文档生成后要存储的目录。

还有许多其他选项可用于配置 JSDoc 的行为，例如要包括或排除的文件，要使用的模板，以及如何命名生成的文件。要了解所有选项，可以使用 `jsdoc --help` 命令查看帮助文档。

例如，要生成所有 `.js` 文件的文档，并将其保存到 `docs` 目录中，可以使用以下命令：

```sh
$ jsdoc *.js -d docs
```

你也可以通过在 `package.json` 中添加一个脚本来轻松地运行 JSDoc。在你的 `package.json` 文件中添加一个 "scripts" 字段，然后将 JSDoc 命令添加到它，例如：

```json
{
  "scripts": {
    "docs": "jsdoc *.js -d docs"
  }
}
```

这样，你就可以通过运行 `npm run docs` 命令来生成文档。这个命令将执行你在 `package.json` 中指定的 JSDoc 命令。

你也可以使用 JSDoc 的配置文件来配置生成文档的行为。配置文件是一个 JavaScript 文件，其中包含对象，该对象定义了 JSDoc 应如何工作。要使用配置文件，可以使用 `-c` 选项指定配置文件的路径，例如：

```sh
jsdoc -c config.js
```

在配置文件中，你可以定义要包含或排除的文件，要使用的模板，以及如何命名生成的文件等。有关配置文件的详细信息，请参阅 [JSDoc](https://jsdoc.app/about-getting-started.html) 文档。

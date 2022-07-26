<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-26 16:05:32
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-26 16:26:06
-->
# yargs 命令行参数解析

Yargs 是一个 node.js 库，用于解析命令行参数。

Yargs 通过解析参数和生成优雅的用户界面来帮助我们构建交互式命令行工具。

> 官方文档 <http://yargs.js.org/>

## Yargs 为我们提供

- 命令和（分组）选项（如模块运行 -n --force），
- 根据参数动态生成的帮助菜单，
- 命令和选项的 bash 完成快捷方式，
- ......

有了这些功能以及更多功能，yargs 让我们可以专注于构建程序，而无需担心命令行参数。

## 安装

```bash
npm install --save yargs
```

## 基本使用

yargs 模块提供 `argv` 对象，用来读取命令行参数。请看下面的例子：

```js
#!/usr/bin/env node
const argv = require('yargs').argv;

console.log('hello ', argv.name);
```

使用时，下面两种用法都可以。

```bash
$ hello --name=tom
hello tom

$ hello --name tom
hello tom
```

可以使用 `alias` 方法，指定 name 是 n 的别名。

```js
#!/usr/bin/env node
const argv = require('yargs')
  .alias('n', 'name')
  .argv;

console.log('hello ', argv.n);
```

这样一来，短参数和长参数就都可以使用了。

```bash
$ hello -n tom
hello tom
$ hello --name tom
hello tom
```

`argv` 对象有一个下划线 `_` 属性，可以获取非连词线开头的参数。

```js
#!/usr/bin/env node
const argv = require('yargs').argv;

console.log('hello ', argv.n);
console.log(argv._);
```

用法如下。

```bash
$ hello A -n tom B C
hello  tom
[ 'A', 'B', 'C' ]
```

## 命令行参数的配置

yargs 模块还提供 3 个方法，用来配置命令行参数。

- `demand`：是否必选

- `default`：默认值

- `describe`：提示

```js
#!/usr/bin/env node
const argv = require('yargs')
  .demand(['n'])
  .default({n: 'tom'})
  .describe({n: 'your name'})
  .argv;

console.log('hello ', argv.n);
```

上面代码指定 n 参数不可省略，默认值为 tom，并给出一行提示。

`options` 方法允许将所有这些配置写进一个对象。

```js
#!/usr/bin/env node
const argv = require('yargs')
  .option('n', {
    alias : 'name',
    demand: true,
    default: 'tom',
    describe: 'your name',
    type: 'string'
  })
  .argv;

console.log('hello ', argv.n);
```

有时，某些参数不需要值，只起到一个开关作用，这时可以用 `boolean` 方法指定这些参数返回布尔值。

```js
#!/usr/bin/env node
const argv = require('yargs')
  .boolean(['n'])
  .argv;

console.log('hello ', argv.n);
```

上面代码中，参数 n 总是返回一个布尔值，用法如下。

```bash
$ hello
hello  false
$ hello -n
hello  true
$ hello -n tom
hello  true
```

`boolean` 方法也可以作为属性或者 `type` 熟悉的值，写入 `option` 对象。

```js
#!/usr/bin/env node
const argv = require('yargs')
  .option('n', {
    boolean: true,
    // 或者
    // type: 'boolean',
  })
  .argv;

console.log('hello ', argv.n);
```

## 帮助信息

yargs 模块提供以下方法，生成帮助信息。

- `usage`：用法格式

- `example`：提供例子

- `help`：显示帮助信息

- `epilog`：出现在帮助信息的结尾

```js
#!/usr/bin/env node
const argv = require('yargs')
  .option('f', {
    alias : 'name',
    demand: true,
    default: 'tom',
    describe: 'your name',
    type: 'string'
  })
  .usage('Usage: hello [options]')
  .example('hello -n tom', 'say hello to Tom')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2022')
  .argv;

console.log('hello ', argv.n);
```

执行结果如下。

```bash
$ hello -h

Usage: hello [options]

Options:
  -f, --name  your name [string] [required] [default: "tom"]
  -h, --help  Show help [boolean]

Examples:
  hello -n tom  say hello to Tom

copyright 2022
```

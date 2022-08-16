<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-26 16:05:32
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-16 17:00:15
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

## 选项 & 命令

- 选项使用 `options` 配置，使用时需要加 `-` 或 `--`
- 命令使用 `command` 配置，使用时无需加前缀

### 选项配置

语法：`.options(key, [opt])`、`.option(key, [opt])`

示例:

```js
const argv = require('yargs')
  .option('f', {
      alias: 'file',
      demandOption: true,
      default: '/etc/passwd',
      describe: 'x marks the spot',
      type: 'string'
  })
  .argv
;
```

### 命令配置

语法：

- `.command(cmd, desc, [builder], [handler])`
- `.command(cmd, desc, [module])`
- `.command(module)`

`cmd`, `desc`, `[builder]`, `[handler]`，其中 builder 和 handler 是方法，另外两个是字符串

示例：

```js
yargs
  .command(
    'get',
    'make a get HTTP request',
    function (yargs) {
      return yargs.option('u', {
        alias: 'url',
        describe: 'the URL to make an HTTP request to'
      })
    },
    function (argv) {
      console.log(argv.url)
    }
  )
  .help()
  .argv
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

## 示例

近期编写的 `GitLab MR` 命令行工具的代码示例

```js
#!/usr/bin/env node

const { options } = require('yargs');
const { existsSync } = require('fs');
const { TOKEN_PATH } = require('../utils');
const yargs = require('yargs');
const color = require('../utils/color');

const log = console.log;


const argv = yargs
  .usage('使用: mr [命令] <选项>')
  .recommendCommands()
  .strict()
  .command('token [token]', '查看/设置GitLab Token', () => { }, ({ token }) => {
    if (token) {
      require('./setToken')(token);
      yargs.exit();
    }
    if (!existsSync(TOKEN_PATH)) {
      log(color.red('错误:'), '未配置token, 请使用 mr token <token> 命令设置token');
    } else {
      log(color.green(require(TOKEN_PATH)));
    }
    yargs.exit();
  })
  .command(require('./userDataRelated'))
  .alias('version', 'v')
  .alias('h', ['help'])
  .example('$ mr', '创建MR')
  .example('$ mr token', '获取token')
  .example('$ mr token 123456', '设置token')
  .example('$ mr -h', '显示帮助信息')
  .showHelpOnFail()
  .argv;


Array.isArray(argv._) && !argv._.length && require('./create')();
```

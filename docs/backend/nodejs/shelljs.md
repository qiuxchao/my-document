<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-17 09:36:05
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-17 18:16:11
-->
# shelljs 在 Node 中使用 Shell 命令

ShellJS 是基于 Node.js API 的 shell 命令，跨平台（Windows/Linux/macOS）实现。

ShellJS 让我们用熟悉的 JS 的语法来执行 shell 命令。

[查看文档](https://www.npmjs.com/package/shelljs)

```js
//引入shelljs
var shell = require('shelljs')

//检查系统中是否存在 `git `命令
if (!shell.which('git')) {
  //在控制台输出内容
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

shell.rm('-rf','out/Release'); //强制递归删除 out/Release目录
shell.cp('-R','stuff/','out/Release'); //将 stuff/ 中所有内容拷贝至 out/Release 目录

shell.cd('lib'); //进入`lib`目录
//找出所有的扩展名为js的文件，并遍历进行操作
shell.ls('*.js').forEach((file) => {
  /* 这是第一个难点：sed流编辑器,建议专题学习，-i表示直接作用源文件 */
  //将build_version字段替换为'v0.1.2'
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
  //将包含`REMOVE_THIS_LINE`字符串的行删除
  shell.sed('-i', /^.*REMOVE_THIS_LINE.*$/, '', file);
  //将包含`REPLACE_LINE_WITH_MACRO`字符串的行替换为`macro.js`中的内容
  shell.sed('-i', /.*REPLACE_LINE_WITH_MACRO.*\n/, shell.cat('macro.js'), file);
});

//返回上一级目录
shell.cd('..');

//run external tool synchronously
//即同步运行外部工具
if (shell.exec('git commit -am "Auto-commit"').code !== 0){
    shell.echo('Error: Git commit failed');
    shell.exit(1);
}
```

## API

### which(command)

在环境变量PATH中寻找指定命令的地址，判断该命令是否可执行，返回该命令的绝对地址

```js
//检查系统中是否存在 `git `命令
if (!shell.which('git')) {
  //在控制台输出内容
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}
```

### echo(msg)

在控制台输出指定内容

`echo('xxx').to(xxx.txt)` 写入文件

### exit(code)

以退出码为code退出当前进程

### rm([options，] file [，file ...])

删除一个目录中一个或多个文件或目录，一旦删除，无法恢复。

常用参数：

- `-f`: 强制删除文件;
- `-i`: 删除之前先询问用户;
- `-r`: 递归处理目录;
- `-v`: 显示处理过程;

```js
shell.rm('-rf', staticSplash);
```

### cp([options,] source_array, dest) cp('-R','index.txt', '~/newCopy/') cp('-R',['index.txt', 'old.txt'], '~/newCopy/')

用来将一个或多个源文件或目录复制到指定的文件或目录。

常用参数：

- `-f`: 强制（默认行为)
- `-L`: 按照符号链接
- `-r,-R`: 递归
- `-n`: 不破坏
- `-u`: 仅当源比目标更新时复制
- `-P`: 不遵循符号链接

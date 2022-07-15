<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 09:46:54
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-15 10:46:48
-->
#  fs 文件系统模块的使用

fs 模块提供了用于与文件系统进行交互（以类似于标准 POSIX 函数的方式）的 API。

API： [http://nodejs.cn/api/fs.html#fs_file_system](http://nodejs.cn/api/fs.html#fs_file_system)

部分方法：
| 方法名 | 作用 |
| ----- | --- |
| **fs.mkdir()** | 异步创建目录(文件夹) |
| **fs.writeFile()** | 异步创建文件并写入内容 |
| **fs.appendFile()** | 附加内容到指定的文件中 |
| **fs.readFile()**  | 读取指定的文件 |
| **fs.rename()**  | 重命名指定的文件 |

```js
// fs 文件系统模块的使用    http://nodejs.cn/api/fs.html#fs_file_system
// fs 模块提供了用于与文件系统进行交互（以类似于标准 POSIX 函数的方式）的 API。

// 引入 fs 模块
const fs = require('fs');

const path = require('path');

// fs.mkdir()   异步创建目录(文件夹)
// 第一个参数是要创建的文件夹的路径（如果该文件夹已经存在，会抛出错误）
// 第二个参数为配置项，可写一个空对象
// 第三个参数是一个回调函数，该回调函数在创建文件夹后执行，参数是有可能捕获到的错误
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    // 如果有报错，就抛出这个错误
    if (err) throw err;
    console.log(`${path.join(__dirname, '/test')} 文件夹已创建`);
});
// e:\前端\Node.js\nodeTest\reference\test 文件夹已创建


// fs.writeFile()   异步创建文件并写入内容
// 第一个参数是创建文件的路径
// 第二个参数是向文件中写入的内容
// 第三个参数是一个回调函数，该回调函数在创建文件后执行，参数是有可能捕获到的错误
fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello World!', err => {
    if (err) throw err;
    console.log(`${path.join(__dirname, '/test', 'hello.txt')} 文件已创建并已写入内容`);
});
// e:\前端\Node.js\nodeTest\reference\test\hello.txt 文件已创建并已写入内容


// fs.appendFile()  附加内容到指定的文件中
// 第一个参数是附加文件的路径
// 第二个参数是向文件中附加的内容
// 第三个参数是一个回调函数，该回调函数在附加内容后执行，参数是有可能捕获到的错误
fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), '\nI love Node.js', err => {
    if (err) throw err;
    console.log(`已经附加内容到 ${path.join(__dirname, '/test', 'hello.txt')}`);
});
// 已经附加内容到 e:\前端\Node.js\nodeTest\reference\test\hello.txt


// fs.readFile()    读取指定的文件
// 第一个参数是要读取的文件的路径
// 第二个参数是文件的编码
// 第三个参数是回调函数，该回调函数有两个参数：报错信息和读取到的数据
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
// Hello World!
// I love Node.js


// fs.rename()      重命名指定的文件
// 参数1：要重命名的文件的路径
// 参数2：重命名后的文件的路径
// 参数3：回调函数，参数为可能捕获到的错误，该回调函数在重命名文件后执行
fs.rename(path.join(__dirname, '/test', 'hello.txt'), path.join(__dirname, '/test', 'helloworld.txt'), err => {
    if (err) throw err;
    console.log('文件已经重命名');
});
// 文件已经重命名
```

## 封装工具方法

下面是一些基于 fs 模块封装的工具方法

```js
const fs = require('fs')

// 列出指定目录下的所有文件
function readDirFiles(folder, callback) {
    const fileList = []
    fs.readdir(folder, function (err, files) {
        let count = 0
        let checkEnd = (fileList) => {
            ++count == files.length && callback(fileList)
        }
        files.forEach(function (file) {
            let fullPath = folder + '/' + file;
            fs.stat(fullPath, function (err, stats) {
                if (stats.isDirectory()) {
                    return readDirFiles(fullPath, checkEnd);
                } else {
                    /*not use ignore files*/
                    if (!(file[0] == '.')) {
                        fileList.push(fullPath)
                    }
                    checkEnd(fileList)
                }
            })
        })
        //为空时直接回调
        files.length === 0 && callback([])
    })
}

module.exports = {
    readDirFiles
}
```

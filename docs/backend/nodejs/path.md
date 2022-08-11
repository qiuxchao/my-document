<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 09:58:39
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-11 16:17:55
-->
# path 路径模块的使用

**path** 模块提供了一些用于处理文件与目录的路径的实用工具。

API： [http://nodejs.cn/api/path.html#path_path](http://nodejs.cn/api/path.html#path_path)

部分方法：
| 方法名 | 作用 |
| ----- | --- |
| **path.basename()** | 返回 path 路径的最后一部分，也就是文件名 |
| **path.dirname()** | 返回 path 路径的目录路径，该方法与直接调用 __dirname 的结果一样 |
| **path.extname()** | 返回 path 路径文件的扩展名 |
| **path.parse()**  | 返回一个经过解析的 path 路径对象 |
| **path.join()**  | 拼接路径，返回经过拼接后的路径 |

```js
// path 路径模块的使用

// 引入模块
const path = require('path');

// path.basename()  返回 path 路径的最后一部分，也就是文件名
// __filename ： 返回当前文件的绝对路径
console.log(__filename);    // e:\前端\Node.js\nodeTest\reference\path_demo.js
let fileName = path.basename(__filename);
console.log(fileName);  // path_demo.js


// path.dirname()   返回 path 路径的目录路径，该方法与直接调用 __dirname 的结果一样
let dirName = path.dirname(__filename);
console.log(dirName);    // e:\前端\Node.js\nodeTest\reference
console.log(__dirname); // e:\前端\Node.js\nodeTest\reference


// path.extname()   返回 path 路径文件的扩展名
let extname = path.extname(__filename);
console.log(extname);   // .js


// path.parse()     返回一个经过解析的 path 路径对象
let pathObj = path.parse(__filename);
console.log(pathObj);
// {
//     root: 'e:\\',    
//     dir: 'e:\\前端\\Node.js\\nodeTest\\reference',
//     base: 'path_demo.js',
//     ext: '.js',
//     name: 'path_demo'
// }


// path.join()  拼接路径，返回经过拼接后的路径
// 第一参数是指定的目录路径，第二个参数是指定的目录名，第三个参数是指定的文件名
// 假设在当前文件的目录下有目录 test，其下有一个 hello.html :   ./test/hello.html
let helloPath = path.join(__dirname, 'test', 'hello.html');
console.log(helloPath); // e:\前端\Node.js\nodeTest\reference\test\hello.html
```

## 获取用户 home 目录

```js
const USER_HOME = process.env.HOME || process.env.USERPROFILE;
```

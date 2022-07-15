<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 10:02:21
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-15 10:15:29
-->
# os 操作系统模块的使用

**os** 模块提供了与操作系统相关的实用方法和属性。

 API: [http://nodejs.cn/api/os.html](http://nodejs.cn/api/os.html)

部分方法：
| 方法名 | 作用 |
| ----- | --- |
| **os.platform()** | 返回标识操作系统平台的字符串 |
| **os.arch()** | 返回 CUP 架构信息 |
| **os.cpus()** | 返回包含 cpu 每一核的数组 |
| **os.freemem()** | 以整数的形式返回当前空闲的系统内存量（以字节为单位） |
| **os.totalmem()** | 返回系统内存总量（以字节为单位） |
| **os.homedir()** | 返回用户的主目录的字符串路径 |
| **os.uptime()** | 返回系统的运行时间（以秒为单位） |

```js
// os 操作系统模块的使用
// API : http://nodejs.cn/api/os.html#os_os
// os 模块提供了与操作系统相关的实用方法和属性

// 引入 os 操作系统模块
const os = require('os');


// os.platform()    返回标识操作系统平台的字符串
console.log(os.platform());     // win32


// os.arch()    返回 CUP 架构信息
console.log(os.arch());     // x64


// os.cpus()    返回包含 cpu 每一核的数组
console.log(os.cpus());
/* 
[
    {
        model: 'Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz',
        speed: 2712,
        times: { user: 800593, nice: 0, sys: 1293796, idle: 18595703, irq: 99625 }
    },
    {
        model: 'Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz',
        speed: 2712,
        times: { user: 759781, nice: 0, sys: 1032265, idle: 18897562, irq: 16796 }
    },
    {
        model: 'Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz',
        speed: 2712,
        times: { user: 898875, nice: 0, sys: 1678125, idle: 18112609, irq: 18000 }
    },
    {
        model: 'Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz',
        speed: 2712,
        times: { user: 922062, nice: 0, sys: 1327328, idle: 18440218, irq: 11062 }
    }
] */


// os.freemem()     以整数的形式返回当前空闲的系统内存量（以字节为单位）
console.log(os.freemem());      // 10890670080（约为 10 个 G）


// os.totalmem()       返回系统内存总量（以字节为单位）
console.log(os.totalmem());     // 17075154944（约为 16 个 G）


// os.homedir()     返回用户的主目录的字符串路径
console.log(os.homedir());    // C:\Users\Administrator


// os.uptime()      返回系统的运行时间（以秒为单位）
console.log(os.uptime());   // 26702
console.log(`系统当前已经运行了 ${(os.uptime() / 60 / 60).toFixed(1)} 个小时`); // 系统当前已经运行了 7.5 个小时
```

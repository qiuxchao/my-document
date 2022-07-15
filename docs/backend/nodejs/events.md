<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 10:36:14
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-15 10:37:25
-->
# events（事件触发器）模块的使用

大多数 Node.js 核心 API 构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）会触发命名事件来调用函数（又称监听器，Listener）。

例如，`net.Server` 会在每次有新连接时触发事件，`fs.ReadStream` 会在打开文件时触发事件，`stream` 会在数据可读时触发事件。

所有能触发事件的对象都是 `EventEmitter` 类的实例。 这些对象有一个 `eventEmitter.on()` 函数，用于将一个或多个函数绑定到命名事件上。 事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。

API: [http://nodejs.cn/api/events.html#events_events](http://nodejs.cn/api/events.html#events_events)

```js
// events（事件触发器）模块的使用
// API: http://nodejs.cn/api/events.html#events_events

// 引入 events 事件触发器模块
const EventEmitter = require('events');

// 创建 MyEmitter 类，继承自 EventEmitter
class MyEmitter extends EventEmitter { };

// 实例化 myEmitter 类
const myEmitter = new MyEmitter();

// 注册事件（默认为同步事件）
// myEmitter.on('event', (str) => {
//     console.log('注册事件event');
//     console.log(`接收的参数为：${str}`);
// });

// 注册异步事件
myEmitter.on('event', (str) => {
    setImmediate(() => {
        console.log(str);
    });
})

// 触发事件
myEmitter.emit('event', '此参数会传递到注册事件时的回调函数中');
    
console.log('如果是同步事件，我将在最后被输出；如果是异步事件，我将在前面被输出');

// 异步运行结果
// 如果是同步事件，我将在最后被输出；如果是异步事件，我将在前面被输出
// 此参数会传递到注册事件时的回调函数中

// 同步运行结果
// 注册事件event
// 接收的参数为：此参数会传递到注册事件时的回调函数中
// 如果是同步事件，我将在最后被输出；如果是异步事件，我将在前面被输出
```

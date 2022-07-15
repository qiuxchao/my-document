# http 服务器模块的使用

Node.js 中的 HTTP 接口旨在支持传统上难以使用的协议的许多特性。 特别是，大块的、可能块编码的消息。 接口永远不会缓冲整个请求或响应，所以用户能够流式传输数据。

API：[http://nodejs.cn/api/http.html#http_http](http://nodejs.cn/api/http.html#http_http)

## 基本使用

```js
// 引入 http 服务器模块
const http = require('http');

// 创建 http 服务器
// 参数为一个回调函数，回调函数中两个参数为 请求 和 响应
http.createServer((request, response) => {
    if (request.url === '/') {
        // 打印当前的 url 
        console.log(request.url);   // '/'
        // 设置响应内容
        response.write('这是 http 服务器的响应内容');
        // 响应结束
        response.end();
    }
    // listen() 方法，两个参数，第一个是服务器监听的端口号，第二个是服务器运行后的回调函数
}).listen(5000, () => console.log('http 服务器已运行'));
```

## 创建一个简单的 Web 服务器

下面代码演示了两种不同的根据请求地址处理返回结果的方法

```js
// 引入模块
const http = require('http');
const path = require('path');
const fs = require('fs');

// 创建变量，存储服务器对象
const server = http.createServer((request, response) => {
    // 打印请求的 url
    console.log(request.url);
    // // 判断访问的 url ,返回对应的页面
    // if (request.url === '/') {
    //     fs.readFile(path.join(__dirname, '/public', 'index.html'), 'utf-8', (err, data) => {
    //         if (err) console.log(err);
    //         // 设置响应头，第一个参数是状态码，第二个参数是一个对象，包含了响应头
    //         response.writeHead(200, { 'Content-Type': 'text/html' });
    //         // 响应内容
    //         response.end(data);
    //     });
    // }
    // if (request.url === '/about') {
    //     fs.readFile(path.join(__dirname, '/public', 'about.html'), 'utf-8', (err, data) => {
    //         if (err) console.log(err);
    //         // 设置响应头
    //         response.writeHead(200, { 'Content-Type': 'text/html' });
    //         // 响应内容
    //         response.end(data);
    //     });
    // }

    // if (request.url === '/api/users') {
    //     // 响应 json 数据
    //     const users = [
    //         {
    //             name: "Bob",
    //             age: 30
    //         },
    //         {
    //             name: 'Sunny',
    //             age: 26
    //         }
    //     ];
    //     response.writeHead(200, { 'Content-Type': 'application/json' });
    //     response.end(JSON.stringify(users));
    // }

    // 使用 三目运算符判断访问的 url ，返回对应的页面
    // 创建变量存储文件路径
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);
    console.log(filePath)
    // 初始化 content type
    let contentType = 'text/html';
    // 文件扩展名
    let extname = path.extname(filePath);
    // 通过扩展名设置 content Type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }
    // 读取文件
    fs.readFile(filePath, (err, data) => {
        // 处理发生错误时的情况
        if (err) {
            if (err.code = 'ENOENT') {
                // 没有找到页面，加载 404.html
                fs.readFile(path.join(__dirname, '/public', '404.html'), (err, data) => {
                    if (err) console.log(err);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data, 'utf-8');
                });
            } else {
                // 其他服务器错误
                response.writeHead(500);
                response.end(`服务器错误：${err.code}`);
            }
        }

        // 成功
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data, 'utf-8');
    });
});


// 端口号
// 如果有环境变量的端口就使用环境变量的端口，没有就使用 9999 端口
const PORT = process.env.PORT ||  9999;

// 监听端口号
server.listen(PORT, () => {
    console.log(`服务器已经在 ${PORT} 端口运行^-^`);
})

// nodemon 自动重启工具：
// 在编写调式 Node.js 项目的过程中，修改代码后需要频繁的手动关掉，然后再启动，非常繁琐。
// nodemon 的作用是监听代码文件的变动，带代码改变之后，自动重启。
// 安装：npm install -g nodemon --save-dev
// 使用：在命令行输入 nodemon index.js （把之前的 node 改为 nodemon）
```

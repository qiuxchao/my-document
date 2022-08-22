<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 10:53:08
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-22 11:36:07
-->
# Express

Express 框架是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。

安装 Express 框架: `npm install express --save-dev`

## Express 框架能做什么？

1. 已经封装好了服务器
2. 已经封装好了路由
3. 已经封装好了中间件
4. 已经封装好了网络请求
5. .......

## Express 框架怎么用 ？

1. NPM 安装 express 框架
2. 引入 express 模块
3. 实例化 express 对象
4. 通过对象调用各种方法

::: warning
在不指定路由判断的情况下，express 会默认渲染 `./public/index.html` 文件
:::

```js
const path = require('path');

// 使用 Express 框架
// Express 框架是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。

// 引入框架
let express = require('express');

//设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// 实例化 express 对象
let app = express();

// 通过对象调用方法
// 根据用户请求的地址返回对应的数据
// get()    根据用户请求的路由路径返回对应的数据
// 参数1：路由地址
// 参数2：回调函数，参数为 请求 和 响应
app.get('/', (request, response) => {
    // '/'  主页的路由
    console.log(request.url);
    // send()   响应的内容，参数支持 HTML 语法
    // response.send('<h1>欢迎来到 Express 框架！</h1>');
    // sendFile()   响应的内容，参数为 html 文件的绝对路径
    response.sendFile(path.join(__dirname, '/public', 'index.html'));
});
app.get('/about.html', (request, response) => {
    console.log(request.url);
    // '/about' 关于页面的路由
    // response.send('关于我们');
    response.sendFile(path.join(__dirname, '/public', 'about.html'));
})
// 路由参数
app.get('/profile/:id', (req, res) => {
    res.send(`您所访问的路由参数为：${req.params.id}`);
});
// 设置了上面的路由参数后，在地址栏输入：http://localhost:5000/profile/news
// 页面中的结果是： 您所访问的路由参数为：news


// 监听服务器的端口号
app.listen(5000, () => console.log('服务器已经在：http://localhost:5000/ 启动'));
```

## EJS 模板引擎

EJS 是一套简单的模板语言，可以利用普通的 JavaScript 代码生成 HTML 页面。

安装 ejs: `npm install ejs --save`

### 其他模板引擎

- jade
- handlebars
- hogan

### EJS 模板引擎的特点

1. 快速编译和渲染
2. 简单的模板标签
3. 支持浏览器端和服务器端
4. 支持 express 视图系统

### EJS 模板引擎的使用

1. 所有的 `js` 代码必须放在 `<%  %>` 里面；
2. 逻辑代码放在 `<%  %>` 中，取出的值放在 `<%=  %>` 中；
3. 每一行逻辑代码都需要放在 `<%  %>` 标签中

示例：

```ejs
<ul>
<% for(item of datas ) { %>
    <li><%= item %></li>
<% } %> 
</ul>   
```

### 在 Express 框架中使用 EJS 模板引擎

1. 配置视图引擎为 `ejs`
2. 在引入页面时使用 `response.render()` 方法

```js
const path = require('path');

// 使用 Express 框架
// Express 框架是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。

// 引入框架
let express = require('express');

// 实例化 express 对象
let app = express();

// 配置视图引擎为 ejs
app.set('view engine', 'ejs');

// 通过对象调用方法
// 根据用户请求的地址返回对应的数据
// get()    根据用户请求的路由路径返回对应的数据
// 参数1：路由地址
// 参数2：回调函数，参数为 请求 和 响应
app.get('/', (request, response) => {
    // '/'  主页的路由
    console.log(request.url);
    // send()   响应的内容，参数支持 HTML 语法
    // response.send('<h1>欢迎来到 Express 框架！</h1>');
    // sendFile()   响应的内容，参数为 html 文件的绝对路径
    response.sendFile(path.join(__dirname, '/public', 'index.html'));
});
app.get('/about.html', (request, response) => {
    console.log(request.url);
    // '/about' 关于页面的路由
    // response.send('关于我们');
    response.sendFile(path.join(__dirname, '/public', 'about.html'));
})
// 路由参数
app.get('/profile/:id', (req, res) => {
    // render()     渲染模板引擎文件，该方法会自动在同目录下的 views 目录下找到指定的文件，因此不需要给路径而只需给一个文件名即可
    // 第二个参数：向模板引擎文件传递的数据，必须是一个对象
    let data = [
        { name: ['Summer', 'Sunny', 'Suxi'], age: 25 }, 
        { name: ['Bob', 'Bucky', 'Babu'], age: 30 },
        {name: ['Jack', 'Jenny' ], age: 35 }
    ];
    res.render('profile', {websiteName: req.params.id, datas: data});
});

// 监听服务器的端口号
app.listen(5000, () => console.log('服务器已经在：http://localhost:5000/ 启动'));
```

EJS 文件:

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>主页</title>
</head>
<body>
    <header>
        <a href="/">主页</a>
        <a href="/about.html">关于</a>
    </header>
    <main>
        <section>
            <h1>这是一个 <%= websiteName %> 页面！</h1>
            <ul>
                <% for (data of datas) { %>
                <li><strong>Name:</strong> 
                    <ul>
                        <% for (name of data.name) { %>
                        <li><%= name %></li>
                        <% } %>
                    </ul>
                </li>
                <li><strong>Age:</strong> <%= data.age %></li>
                <% } %>
            </ul>
        </section>
    </main>
</body>
</html>
```

## Express & EJS 项目示例

### 创建公共模板

1. 在项目目录中创建 `assets` 文件夹
2. 在 `assets` 文件夹下创建公共模板，例如：`assets/nav.ejs`
3. 在 `ejs` 文件中引入模板，只需在需要引入的地方：`<%- include('../assets/nav.ejs') %>`

这样在 ejs 中通过 `link` 标签引入的外部 `css` 文件就可以使用了

### 创建公共模块代码

文件结构

```sh
nodeTest （项目主目录）
    -assets （外部 css 样式表目录）
        -style.css （外部样式表）
    -public （ ejs 公共模板文件的目录）
        -nav.ejs （ 导航公共模板）
    -views  （ ejs 页面文件的目录）
        -index.ejs （主页）
    -index.js （ express 框架配置文件）
```

#### express 框架文件：index.js

```js
// 引入框架
let express = require('express');

// 实例化 express 对象
let app = express();

// 配置视图引擎为 ejs
app.set('view engine', 'ejs');

// 让服务器能够识别外部 css 样式表
// 使用中间件 use() ，第一个参数是要处理的目录，
// 第二个参数使用 express.static 将指定目录下的静态文件转为模块
// 这样就能够识别 assets 目录下的 css 文件了
app.use('/assets', express.static('assets'));

// 通过对象调用方法
// 根据用户请求的地址返回对应的数据
// get()    根据用户请求的路由路径返回对应的数据
// 参数1：路由地址
// 参数2：回调函数，参数为 请求 和 响应
app.get('/', (request, response) => {
    // '/'  主页的路由
    response.render('index');
});

// 监听服务器的端口号
app.listen(5000, () => console.log('服务器已经在：http://localhost:5000/ 启动'));
```

#### html 主页：index.ejs

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>主页</title>
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
    <!-- 引入公共导航模板 -->
    <%- include('../public/nav.ejs') %>
    <main>
        <h1>Node.js http 服务器已正常启动</h1>
    </main>
</body>
</html>
```

#### 公共导航模板文件：nav.ejs

```ejs
<!-- 公共模板文件只能有一个根标签 -->
<nav>
    <a href="/">主页</a>
    <a href="/about.html">关于</a>
    <div class="route">
        <input type="text" id="profile" placeholder="myWebsite"><a id="router" href="#">跳转路由参数</a>
    </div>
</nav>
```

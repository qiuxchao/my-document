# mongoose

**mongoose** 用于在 Nodejs 中连接 MongoDB 数据。

## 安装

```sh
npm install mongoose
```

## 连接数据库

使用 `mongoose` 连接 MongoDB 有以下几种形式：

1. 最简单的（无密码，用户名等）

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database')
```

2. 有密码、用户名、参数等

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://username:password@host:port/database?options…');
```

`connect()` 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。

```js
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // 连接成功！
});
```
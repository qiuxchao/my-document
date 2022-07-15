<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 14:11:42
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-15 14:17:52
-->
# 爬取数据

使用 `sheerio` 和 `request` 库爬取数据。

## Cheerio 是什么？

官方：cheerio 是 jquery 核心功能的一个快速灵活而又简洁的实现，主要是为了用在服务器端需要对 DOM 进行操作的地方。

直白：cheerio 是一个 node 的库，可以理解为一个 Node.js 版本的 jQuery，用来从网页中以 css selector（css 选择器）获取数据，使用方式和 jquery 基本相同。

安装：`npm install --save cheerio request`

- `cheerio`  爬取数据模块
- `request`  网络请求模块

## 爬取数据，构建接口

1. 使用 `request` + `cheerio` 库爬取数据，存到 `json` 文件中
2. `express` 搭建服务器，使用 `res.sendFile` 将 `json` 文件返回

### 爬取数据，存储为 json 文件

```js
// 引入模块
const request = require('request'); // 网络请求模块
const cheerio = require('cheerio'); // 爬虫模块
const fs = require('fs');     // 文件系统

// request 请求库：
// 参数1：url
// 参数2：请求头对象
// 参数3：回调函数 参数1：错误信息，参数2：服务器返回的所有信息，参数3：页面 html 代码
const url = 'http://www.santostang.com/'
request(url, { timeout: 100000 }, (err, response, html) => {
    if (!err && response.statusCode == 200) {
        // 没有抛出错误并且响应的状态码为 200
        // console.log(response);
        // console.log(html);
        const $ = cheerio.load(html);
        let title = $('title').text();
        let postTags = $('#main .col-md-8 article').toArray();
        let postsData = [];
        postTags.forEach((post, index) => {
            let postTitle = $(post).find('.post-title a').text();
            let postContent = $(post).find('.post-content p').text();
            let postDate, postLabel;
            let metaArr = $(post).find('.post-meta .meta-span').toArray();
            postDate = $(metaArr[0]).text();
            postLabel = $(metaArr[1]).find('a').text();
            // console.log(index, postTitle, postContent, postDate, postLabel);
            let data = {
                id: index,
                post_title: postTitle,
                post_content: postContent,
                post_date: postDate,
                post_label: postLabel
            }
            postsData.push(data);
        })
        console.log(postsData);
        fs.writeFile(`${__dirname}\\post_data.json`, JSON.stringify(postsData), 'utf-8', (err) => {
            if (err) throw err;
            console.log(`文件已创建并写入：${__dirname}\\post_data.json`);
        })
    }
});
```

### 构建接口，返回数据

```js
const express = require('express');
const app = express();

//设置允许跨域访问该服务.
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/postData', (request, response) => {
    console.log(request.url);
    response.sendFile(__dirname + '\\post_data.json');
});


app.listen(4500, () => console.log('服务器已经在：http://localhost:4500/ 启动...'));
```

## 同步请求封装

使用 `Promise` 封装 `request` 库，再配合 `async` 函数使用即可达到同步的效果。

```js
const request = require('request')
const cheerio = require('cheerio')

const req = (option) => new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
        if (error) reject(error);
        resolve(body)
    })
})

async function send () {
    const baidu = await req('http://www.baidu.com')
    console.log(cheerio.load(baidu)('title').text());
    const zhihu = await req({url: 'https://www.zhihu.com/signin?next=%2F'})
    console.log(cheerio.load(zhihu)('title').text());
}

send()
// 百度一下，你就知道
// 知乎 - 有问题，就会有答案
```

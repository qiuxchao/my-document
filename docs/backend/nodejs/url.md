<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 10:14:13
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-15 10:31:24
-->
# url 网址模块的使用

url 模块用于处理与解析 URL。

API： [http://nodejs.cn/api/url.html#url_url](http://nodejs.cn/api/url.html#url_url)

url 解析后的实例的部分属性：

| 属性名 | 说明 |
| ----- | --- |
| **href** | 返回字符串形式的完整 url |
| **host** | 返回 url 中的主机地址部分（带有端口号） |
| **hostname** | 返回 url 中的主机地址（不带端口号） |
| **port** | 返回 url 中的端口号 |
| **pathname** | 返回 url 中的文件 path 部分 |
| **search** | 返回 url 中的 query 部分 |
| **searchParams** | 返回 url 中 Map 类型的 query 部分 |

::: tip
也可以使用 `URL` 类来实现与 `url.parse` 相同的功能，这样做就可以无需引入 `url` 模块

```js
const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');
```

:::

```js
// url 网址模块的使用
// API: http://nodejs.cn/api/url.html#url_url
// url 模块用于处理与解析 URL。

// 引入 url 模块
const url = require('url');

// 实例化要解析的 url
const myUrl = url.parse('http://mywebsite.com:8000/hello.html?id=100&status=active');
// 或者写成下面这种形式
// const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');

// href     返回字符串形式的完整 url
console.log(myUrl.href);    // http://mywebsite.com:8000/hello.html?id=100&status=active

// host     返回 url 中的主机地址部分（带有端口号）
console.log(myUrl.host);    // mywebsite.com:8000

// hostname     返回 url 中的主机地址（不带端口号）
console.log(myUrl.hostname);     // mywebsite.com

// port         返回 url 中的端口号
console.log(myUrl.port);    // 8000

// pathname     返回 url 中的文件 path 部分
console.log(myUrl.pathname);    //  /hello.html

// search       返回 url 中的 query 部分
console.log(myUrl.search);      // ?id=100&status=active

// searchParams     返回 url 中 Map 类型的 query 部分
console.log(myUrl.searchParams);    // URLSearchParams { 'id' => '100', 'status' => 'active' }

// append()         往 Map 类型的 query 部分追加属性和值
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);    // URLSearchParams { 'id' => '100', 'status' => 'active', 'abc' => '123' }

// forEach()    遍历 Map 类型的 query 部分
myUrl.searchParams.forEach((value, key) => {
    console.log(`${key} : ${value}`)
});
// id: 100
// status: active
// abc: 123
```

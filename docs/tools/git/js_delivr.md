<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-22 14:37:39
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-22 14:53:21
-->
# 通过 jsDelivr 引用资源

jsDelivr 是一个免费的开源 CDN，旨在帮助开发人员和网站管理员。没有限制，允许使用各种文件，包括 JavaScript 库、jQuery 插件、CSS 框架、字体等.

使用方法：`https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@发布的版本号/文件路径`

> 例如：
>
> <https://cdn.jsdelivr.net/gh/qiuxchao/CDN/ajax/img_01.jpg>
> <https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@2.0.1/css/style.css>
> <https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.3//The%20Pet%20Girl%20of%20Sakurasou.mp4>

::: warning
版本号不是必需的，是为了区分新旧资源，如果不使用版本号，将会直接引用最新资源，除此之外还可以使用某个范围内的版本，查看所有资源等
:::

具体使用方法如下：

```js
// 加载任何Github发布、提交或分支
https://cdn.jsdelivr.net/gh/user/repo@version/file

// 加载 jQuery v3.2.1
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js

// 使用版本范围而不是特定版本
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2/dist/jquery.min.js
https://cdn.jsdelivr.net/gh/jquery/jquery@3/dist/jquery.min.js

// 完全省略该版本以获取最新版本
https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js

// 将“.min”添加到任何JS/CSS文件中以获取缩小版本，如果不存在，将为会自动生成
https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/src/core.min.js

// 在末尾添加 / 以获取资源目录列表
https://cdn.jsdelivr.net/gh/jquery/jquery/
```

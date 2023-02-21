# 2023 学习计划

## 基础巩固 查漏补缺

- HTML, HTML5
- CSS, CSS3
- ES, ES6+
- DOM, BOM API
- Nodejs
- 大文件上传
- 手写 call、apply、bind
- 手写 new
- 手写 Promise

## 网络 浏览器相关

- 浏览器 渲染 缓存 进程 线程管理
- TCP/IP 协议 OSI 网络模型
- HTTP1 HTTP2
- Socket

## 基建相关

- Webpack
- Vite
- ESbuild
- Babel
- ESlint
- Prettier
- Husky
- 性能优化相关

## 框架相关

- React 源码
- Vue 源码
- Solidjs 会用
- Svelte 会用

## 端

- 微信小程序
- uni-app
- RN(React Native)

## 数据结构与算法

- Leetcode 刷题

## 面经

- 牛客
- 掘金

## 项目经历

### GitLab MR 结合钉钉机器人的自动化 Code Review

此项目是我在「OKR-团队增效」中产出的成果，旨在优化团队中Code Review流程，提高团队代码质量，避免常规bug上线。

此项目达成的效果为：团队成员编写好某一功能，在他的分支下命令行中输入 mr 命令，接着输入 MR 标题、描述并选择代码审查人员即可创建一个 GitLab Merge Request，接着自动触发 GitLab Hooks，发送请求到服务端，请求内容包含本次 MR 的信息，服务端解析 MR 信息，组合成 Markdown 格式发送到指定的钉钉群，该信息中会@对应成员，并且包含本次 Code Review 信息，对应人员收到消息后点击链接进入到 GitLab MR 页面，开始 CR 流程，后续触发的所有操作（评论、审批等）都将推送到钉钉群。

具体实现思路参见：<https://qiuxc.cn/share/code_review.html>

我负责整个项目的完成，具体实现流程如下：

- 使用 Egg 搭建 Node 服务，暴露接口，承接 GitLab 中的 Merge Reuqest Hook；
- 在服务端维护钉钉群成员与 GitLab 对应成员的映射关系，使在解析 GitLab Merge Request 请求时能找到相关人员，便可以实现@对应成员，使其收到钉钉提醒；
- 在服务端将 GitLab 发过来的请求处理成 Markdown 格式，通过钉钉自定义机器人发送到指定钉钉群中；
- 使用 Yargs 编写 mr-cli npm 包，上传到公司私有 npm 仓库，团队成员全局安装该包后便可以在任意的项目下通过全局命令 mr 来交互式创建 Merge Request，从而开始一个 Code Review 流程；
- 在 mr-cli 集成维护服务端数据的子命令，包括用来维护 GitLab 用户与钉钉用户映射表和 GitLab 项目与钉钉群的映射表。

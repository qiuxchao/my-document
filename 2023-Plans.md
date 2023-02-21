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

作为团队增效的一部分，我设计并实施了一个自动化Code Review的流程，旨在优化团队中的Code Review流程，提高代码质量，避免常见的错误上线。该流程通过GitLab MR和钉钉机器人相结合，实现了自动化的Code Review过程。

实现步骤如下：

- 使用Egg框架构建了一个Node服务，用于接收GitLab的Merge Request Hook；
- 在服务端维护了GitLab和钉钉的成员映射关系，可以根据GitLab Merge Request请求中的信息找到对应的成员，并@他们以便他们收到钉钉提醒；
- 在服务端将GitLab的请求处理成Markdown格式，并通过钉钉自定义机器人发送到指定的钉钉群中；
- 开发了一个npm包，名为mr-cli，使用Yargs编写，上传到公司私有npm仓库中。团队成员可以通过全局命令mr，交互式地创建Merge Request，从而开始一个Code Review流程；
- mr-cli还集成了维护服务端数据的子命令，包括维护GitLab用户和钉钉用户的映射表以及GitLab项目和钉钉群的映射表。

这个流程的好处在于：

- 提高了代码质量，避免常规错误上线；
- 加快了Code Review流程，减少了团队成员的负担；
- 通过自动化流程，减少了人为因素的干扰和错误。

具体实现细节和思路可参考我的博客文章：<https://qiuxc.cn/share/code_review.html>。
在这个项目中，我担任了主要的设计和实现角色，通过对整个流程的把控和完善，使得团队成员能够更加高效地进行Code Review。

### 拖拽生成微信小程序海报画图代码

在微信小程序中，经常会遇到有需要绘制分享海报的场景，而整个实现过程通常比较费时费力。因此我设计并实现了一个可视化搭建系统，该系统可以通过拖拽和表单配置的方式完成分享海报的制作，制作完成后导出成微信小程序需要的代码，直接将代码复制到小程序项目中即可使用，提升了开发效率和开发人员的体验。

我负责了整个可视化搭建系统的开发，具体实现思路和步骤如下：

- 将整个系统分为视图层和状态层；
- 状态层使用zustand + immer管理全局store，在全局store中维护画布相关状态；
- 视图层分为四个部分：组件栏、画布、配置栏、导出代码弹窗，视图层通过读写全局store来联动其他部分；
- 使用两个状态来存储当前操作的组件和组件列表，这样在修改当前操作的组件的数据时不会重新渲染整个列表；
- 使用dom来渲染组件，监听元素的mousedown、mousemove、mouseup事件来实现拖拽移动组件和改变组件宽高；
- 使用requestAnimationFrame来优化mousemove事件，使其在拖拽过程中不会显得很卡顿；
- 使用react-simple-code-editor和prism-react-renderer来支持可编辑和高亮显示导出的代码。

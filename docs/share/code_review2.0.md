<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-18 15:45:21
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-30 10:55:55
-->
# Code Review 2.0

- 将原来的 `mr` 脚本编写成命令行工具 `npm` 包，实现一次安装多处使用

- 提供与服务端交互的子命令，可以直接在前端维护服务端数据

## 前端实现

借助 `yargs` 库来编写命令行工具，`yargs` 是一个命令行参数解析库【演示如何使用】

### yargs 命令行解析库

### npm 发包

## 服务端实现

服务端按照 `egg` 的规范对代码进行了重构，使其便于维护。

`egg` 基础功能:

- `Router` 路由。暴露给前端的接口，指向对应的 `Controller`
- `Controller` 控制器。解析前端的请求，处理后返回相应的结果
- `Service` 服务。编写业务逻辑，供 `Controller` 调用
- `Middleware` 中间件。类似于拦截器

### token 校验中间件

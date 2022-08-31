<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-18 15:45:21
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-30 17:04:14
-->
# Code Review 2.0

- 将原来的 `mr` 脚本编写成命令行工具 `npm` 包，实现一次安装多处使用

- 提供与服务端交互的子命令，可以直接在前端维护服务端数据

## 前端实现

借助 `yargs` 库来编写命令行工具，`yargs` 是一个命令行参数解析库

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

将前端传过来的 `token` 传给 `GitLab`，验证用户是否存在，标识 `token` 是否有效。

```js
async (ctx, next) => {
  await next();

  const { token } = ctx.header;
  !token && ctx.throw(422, '无 token');

  const { status, data } = await ctx.curl('https://gitlab.fenxianglife.com/api/v4/user', {
    method: 'GET',
    data: { private_token: token },
  });
  status !== 200 && ctx.throw(422, 'token 验证失败');
};
```

# 工程搭建

演示了创建 `monorepo` 项目的流程。

包括：

- 定义项目结构（monorepo）
- 定义开发规范（lint、commit、tsc、代码风格）
- 选择打包工具

## 项目结构

`Multi-repo` 和 `Mono-repo` 该如何选择？

![](https://wechatapppro-1252524126.cdn.xiaoeknow.com/appjiz2zqrn2142/image/b_u_622f2474a891b_tuQ1ZmhR/law7gi1g089y.png?imageView2/2/q/80%7CimageMogr2/ignore-error/1)

- `Multi-repo` 每个库有自己独立的仓库，逻辑清晰，相对应的，协同管理会更繁琐。
- `Mono-repo` 可以很方便的协同管理不同独立的库的生命周期，相对应的，会有更高的操作复杂度。

[参考资料：现代前端工程为什么越来越离不开 Monorepo?](https://juejin.cn/post/6944877410827370504)

### Mono-repo 技术选型

简单工具：

- [npm workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- [pnpm workspaces](https://pnpm.io/workspaces)

专业工具：

- [nx](https://nx.dev/)
- [bit](https://bit.dev/)
- [turborepo](https://turborepo.org/)
- [rush.js](https://rushjs.io/)
- [lerna](https://www.lernajs.cn/)





# Mono-repo 工程搭建

演示了创建 `monorepo` 项目的流程。

包括：

- 定义项目结构（monorepo）
- 定义开发规范（lint、commit、tsc、代码风格）
- 选择打包工具

### 项目结构

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

`pnpm` 相比其他打包工具的优势：

- 依赖安装快
- 更规范（处理幽灵依赖问题）

[参考资料：pnpm 是凭什么对 npm 和 yarn 降维打击的？](https://juejin.cn/post/7127295203177676837)

### pnpm 初始化

[安装](https://pnpm.io/zh/installation)

```shell
npm install -g pnpm
pnpm init
```

[初始化 pnpm-workspace.yaml](https://pnpm.io/zh/pnpm-workspace_yaml)

### 定义开发规范

#### 代码规范检查与修复

代码规范：lint 工具

`eslint` 安装：

```shell
pnpm i eslint -D -w
```

初始化：

```shell
npx eslint --init
```

`.eslintrc.json` 配置如下：

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-case-declarations": "off",
    "no-constant-condition": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  }
}
```

安装 `ts` 的 `eslint` 插件：

```shell
pnpm i -D -w @typescript-eslint/eslint-plugin
```

> `-w` 仅添加能在 workspace 中找到的依赖包。非 Mono-repo 不需要加此选项

代码风格：`prettier`

安装：

```shell
pnpm i prettier -D -w
```

新建 `.prettierrc.json` 配置文件，添加配置：

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": true,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

将 `prettier` 集成到 `eslint` 中，其中：

- `eslint-config-prettier`：覆盖 `ESLint` 本身的规则配置

- `eslint-plugin-prettier`：用 `Prettier` 来接管修复代码即 `eslint --fix`

```shell
pnpm i eslint-config-prettier eslint-plugin-prettier -D -w
```

为 `lint` 增加对应的执行脚本，并验证效果：

```shell
"lint": "eslint --ext .js,.ts,.jsx,.tsx --fix --quiet ./packages"
```

验证成功后，安装 `prettier` 与 `eslint` 的 `VSCode` 插件，并在 `setting` 中设置为保存后自动执行：

![](https://wechatapppro-1252524126.cdn.xiaoeknow.com/appjiz2zqrn2142/image/b_u_622f2474a891b_tuQ1ZmhR/law7gi1g043s.png?imageView2/2/q/80%7CimageMogr2/ignore-error/1)

### commit 规范检查

安装 `husky`，用于拦截 `commit` 命令：

```shell
pnpm i husky -D -w
```

初始化 `husky`：

```shell
npx husky install
```

将刚才实现的格式化命令 `pnpm lint` 纳入 `commit` 时 `husky` 将执行的脚本：

```shell
npx husky add .husky/pre-commit "pnpm lint"
```

> TODO：`pnpm lint` 会对代码全量检查，当项目复杂后执行速度可能比较慢，届时可以考虑使用 `lint-staged`，实现只对暂存区代码进行检查

通过 `commitlint` 对 `git` 提交信息进行检查，首先安装必要的库：

```shell
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D -w
```

新建配置文件 `.commitlintrc.js`：

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

集成到 `husky` 中：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

conventional commit 规范集意义：

```sh
# 提交的类型: 摘要信息
<type>: <subject>
```

常用的 `type` 值包括如下:

- `feat`: 添加新功能
- `fix`: 修复 Bug
- `chore`: 一些不影响功能的更改
- `docs`: 专指文档的修改
- `perf`: 性能方面的优化
- `refactor`: 代码重构
- `test`: 添加一些测试代码等等

### ts 配置

配置 `tsconfig.json`：

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": false,
    "skipLibCheck": true,
    "baseUrl": "./packages"
  }
}
```

### 选择打包工具

比较不同打包工具的区别 [参考资料：Overview | Tooling.Report](https://bundlers.tooling.report/)

<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-09-01 10:19:53
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-01 10:53:21
-->
# 🪝 husky 一个 Git hooks 库
husky 旨在于在 Node 中更好的使用 Git hooks

> 官方文档: <https://typicode.github.io/husky/#/>

列举一个可以用到 husky 的场景：
- 我们想要在 commit 代码之前，先走一遍测试用例，运行测试用例的 script 是 `npm run test`。那我们就可以通过配置 husky，实现在 commit 前自动运行 `npm run test` 脚本。

## 安装

```sh
# npm
npm install husky --save-dev

# yarn
yarn add husky -D
```

## 使用

### 初始化 husky

```sh
npx husky install
```

初始化后会在当前目录下生成一个 `.husky` 的目录，这是 husky 的工作目录.

### 添加一个 hook
husky 支持所有的 [Git hooks](https://git-scm.com/docs/githooks)

```sh
# 添加 pre-commit commit 前置钩子，在 commit 时，先运行 npm run test 脚本
npx husky add .husky/pre-commit "npm run test"
```

#### 测试 hook

```sh
# 添加修改
git add .husky/pre-commit

# 提交修改
git commit -m "Keep calm and commit"

# npm run test 将会运行
```
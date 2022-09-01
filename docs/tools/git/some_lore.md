<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-09-01 09:46:58
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-01 10:01:19
-->
# 常用功能

## 修改本地绑定的远程仓库地址
场景：远程仓库地址变更，本地还是老地址。
解决办法：
```sh
# 查看远程分支
git remote
# origin

# 查看当前本地远程仓库地址
git remote get-url origin
# git@github.com:xxx/xxx.git

# 修改本地绑定的远程仓库地址
git remote set-url origin git@github.com:xxx/xxx.git
```

::: warning
远程仓库地址有 `SSH` 和 `HTTP` 两种类型，如果使用了 `SSH` 类型的地址，请确保你配置了 `ssh key`。
:::

## 撤销此次合并
当冲突发生时，我们有多种选择，这其中当然也包括撤销合并。

使用 `git merge --abort`，恢复或回退到执行合并以前的状态。

或者，如果**合并后的提交还停留在本地Git库**，没有被推送到远程，可以利用 `git reset --hard HEAD` 命令，恢复到当前分支的最近一次提交。Git 在接到这个命令以后，会按照下面的步骤一步步进行撤销：

- 把当前分支的 `HEAD` 指针移动到合并前的提交记录上；
- 把暂存区恢复成 `HEAD` 所指向的版本；
- 把工作目录恢复成和暂存区保持一致。

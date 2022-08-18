# fx-mr-cli

`fx-mr-cli` 是一个 GitLab Merge Request 命令行工具，能够帮助我们在命令行中交互式创建 Merge Reqeust，使 Code Review 流程更简洁高效。

## 如何使用？

### 1. 全局安装

> 需要连接到公司npm私有仓库，[查看教程](https://fenxianglife.yuque.com/technical-team/front/enhgqg)

```bash
sudo npm install fx-mr-cli -g
```

### 2. 配置 GitLab token

> token 用于后续创建MR、操作服务端数据时的身份验证，[创建token教程](https://fenxianglife.yuque.com/technical-team/front/dnoalf#b81f1344)

```bash
mr token <你的token>
```

### 3. 在项目根目录下创建配置文件 `.mrconfig.js`，详细字段说明见下方表格

> 项目配置文件主要字段是 `projectId`，此ID的作用是标识当前项目，创建MR时告诉GitLab操作的是哪个项目

```js
// .mrconfig.js
module.exports = {
  // GitLab 项目ID
  projectId: 0,
};
```

如果不想创建配置文件，也可以在项目的 `package.json` 文件中增加 `mrConfig` 属性，该属性的配置同上

```json
// package.json
{
  ...
  "mrConfig": {
    "projectId": 0
  }
}
```

优先级为 `.mrconfig.js` > `package.json[mrConfig]`

#### .mrconfig.js 配置文件字段说明

| 字段 | 说明 | 必填 | 类型 | 默认 |
| --- | --- | ---- | --- | --- |
| gitlabUrl | 托管当前项目的GitLab主页地址(非项目地址) | 否 | `string` | `'https://gitlab.fenxianglife.com'` |
| projectId | 当前项目在GitLab上的ID | 是 | `number` |  |
| sourceBranch | 发起MR的源分支，默认当前分支 | 否 | `string` |  |
| targetBranch | 发起MR的目标分支，默认develop | 否 | `string` | `'develop'` |

### 4. 运行脚本，部分命令示例

```bash
# 创建 MR
mr

# 设置 token
mr token <token>

# 查看 token
mr token

# 查看用户
mr user get --id=xxx

# 查看所有用户
mr user list

# 查看项目
mr dtu get xxx

# 查看所有项目
mr dtu list

# 查看帮助信息
mr -h

# mr user 子命令帮助信息
mr user -h

# mr dtu 子命令帮助信息
mr dtu -h
```

## 获取帮助菜单

```bash
$ mr -h

使用: mr [命令] <选项>

命令：
  mr token [token]  查看/设置GitLab Token
  mr user <命令>    操作用户数据
  mr dtu <命令>     操作GitLab项目与钉钉机器人URL的映射数据(DingTalkUrl)

选项：
  -v, --version  显示版本号                                               [布尔]
  -h, --help     显示帮助信息                                             [布尔]

示例：
  $ mr               创建MR
  $ mr token         获取token
  $ mr token 123456  设置token为123456
  $ mr -h            显示帮助信息
  $ mr user -h       显示user子命令帮助信息
  $ mr dtu -h        显示dtu子命令帮助信息
```

## mr user 操作用户数据

`mr user` 子命令用于操作服务端的用户数据，包括增、删、改、查等。
> 服务端的用户数据主要用于建立**GitLab用户**与**钉钉用户**的映射关系，实现将**GitLab上用户的操作**推送消息到**钉钉群对应的人**。

`mr user` 命令帮助菜单：

```bash
$ mr user -h

mr user <命令>

操作用户数据

命令：
  mr user get [--选项]                                     查看用户，根据 id | username | mobile 查询
  mr user list                                             查看全部用户
  mr user set <id> <name> <username> <mobile>              设置用户，参数解释: <GitLab用户ID> <你的名字> <GitLab username> <手机号>
  mr user update <old_id> <id> <name> <username> <mobile>  更新用户，参数解释: <GitLab用户ID> <新的GitLab用户ID> <你的名字> <GitLab username> <手机号>
  mr user delete <id>                                      删除用户，参数解释: <GitLab用户ID>
```

## mr dtu 操作GitLab项目与钉钉机器人URL的映射数据

`mr dtu` 子命令用于操作服务端的GitLab项目与钉钉机器人URL的映射数据，包括增、删、改、查等。
> 服务端的**GitLab项目与钉钉机器人URL的映射数据**主要用于建立**GitLab项目**与**钉钉群自定义机器人**的映射关系，实现将GitLab上**项目相关的Webhook事件**推送消息到**项目对应的钉钉群**。

`mr dtu` 命令帮助菜单：

```bash
$ mr dtu -h

mr dtu <命令>

操作GitLab项目与钉钉机器人URL的映射数据(DingTalkUrl)

命令：
  mr dtu get <project_id>                                     查看项目，参数解释: <GitLab项目ID>
  mr dtu list                                                 查看全部项目
  mr dtu set <project_id> <dingtalk_url>                      设置项目，参数解释: <GitLab项目ID> <钉钉自定义机器人URL>
  mr dtu update <old_project_id> <project_id> <dingtalk_url>  更新项目，参数解释: <GitLab项目ID> <新的GitLab项目ID> <钉钉自定义机器人URL>
  mr dtu delete <project_id>                                  删除项目，参数解释: <GitLab项目ID>
```

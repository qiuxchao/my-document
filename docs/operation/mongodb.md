# MongoDB

MongoDB 是一个文档数据库。MongoDB 中的记录是一个文档，它是由字段和值对组成的数据结构。MongoDB 文档类似于 JSON 对象。字段的值可能包括其他文档、数组和文档数组。

使用文档的优点是：

- 文档对应于许多编程语言中的本机数据类型。

- 嵌入式文档和数组减少了对昂贵连接的需求。

- 动态模式支持流畅的多态性。

MongoDB 将文档存储在**集合**中。集合类似于关系数据库中的表。

关系型数据库和文档数据库的概念对应关系如下表：

| 关系型 | 文档型 |
| ----- | ----- |
| 数据库 database |	数据库 database |
| 表 table | 集合 collection |
| 行 row | 记录 record / doc |
| 列 column | 字段 field |


> 官方文档：[https://www.mongodb.com/docs/manual/introduction/](https://www.mongodb.com/docs/manual/introduction/)

## 主要特性

### 高性能

MongoDB 提供高性能的数据持久性。尤其是，

- 对嵌入式数据模型的支持减少了数据库系统上的 I/O 活动。

- 索引支持更快的查询，并且可以包含来自嵌入文档和数组的键。

### 查询接口

MongoDB 查询 API 支持[读写操作 (CRUD)](https://www.mongodb.com/docs/manual/crud/)以及：

- [数据聚合](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)

- [文本搜索](https://www.mongodb.com/docs/manual/text-search/)和[地理空间查询](https://www.mongodb.com/docs/manual/tutorial/geospatial-tutorial/)。

### 高可用性

MongoDB 的复制工具，称为[副本集](https://www.mongodb.com/docs/manual/replication/)，提供：

- 自动故障转移

- 数据冗余。

副本集是一组 MongoDB 服务器，它们维护相同的数据集，提供冗余并提高数据可用性。

### 水平可扩展性

MongoDB 提供水平可扩展性作为其核心 功能的一部分：

- [分片](https://www.mongodb.com/docs/manual/sharding/#std-label-sharding-introduction)将数据分布在一组机器上。

- 从 3.4 开始，MongoDB 支持基于shard key创建数据区域。在平衡集群中，MongoDB 仅将区域覆盖的读取和写入定向到区域内的那些分片。有关详细信息，请参阅区域 手册页。

### 支持多个存储引擎

MongoDB 支持多种[存储引擎](https://www.mongodb.com/docs/manual/core/storage-engines/)：

- [WiredTiger 存储引擎](https://www.mongodb.com/docs/manual/core/wiredtiger/)（包括对 静态加密的支持）

- [内存存储引擎](https://www.mongodb.com/docs/manual/core/inmemory/)。

此外，MongoDB 提供可插拔的存储引擎 API，允许第三方为 MongoDB 开发存储引擎。


## 安装&连接

下面演示了 Windows 和 MacOS 安装 MongoDB 社区版的方法。

### Windows

1. **下载**，卡片切换到On-premise，选择 MongoDB Community 社区版，地址：[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. **安装**，一路 next，到最后的时候不要勾选 **install MongoDB Compass**

3. 配置环境变量，进入 `C:\Program Files\MongoDB\Server\4.4\bin`，复制路径添加到系统环境变量

4. 启动，cmd 中输入：`mongo` 连接到正在运行的实例。

### MacOS

MacOS 使用 brew 来安装 MongoDB，因此需要先安装 brew，安装方法：[https://zhuanlan.zhihu.com/p/90508170](https://zhuanlan.zhihu.com/p/90508170)

1. 终端中运行以下命令，下载 MongoDB 和数据库工具的官方 Homebrew 公式：

```sh
brew tap mongodb/brew
```

2. 要更新 Homebrew 和所有现有公式：

```sh
brew update
```

这一步可能会出现 *brew update 更新时 shallow clone* 问题，解决办法参考：[https://zhuanlan.zhihu.com/p/351199589](https://zhuanlan.zhihu.com/p/351199589)

3. 要安装 MongoDB，请在 macOS 终端应用程序中运行以下命令：

```sh
brew install mongodb-community@6.0
```

4. 运行，

  - 作为 MacOS 服务运行：

  ```sh
  # 运行
  brew services start mongodb-community@6.0
  # 停止运行
  brew services stop mongodb-community@6.0
  ```
  - 作为后台进程手动运行：

  ```sh
  mongod --config /usr/local/etc/mongod.conf --fork
  ```

  要停止 mongod 作为后台进程运行，使用 `mongosh` 连接到 mongod，并输入 `shutdown` 命令。



5. 检查是否正在运行，要验证 MongoDB 是否正在运行，请执行以下操作之一：

  - 如果将 MongoDB作为 macOS 服务启动：

  ```sh
  brew services list
  ```
  应该会看到列为 `mongodb-community` 的服务 `started`。

  - 如果是手动启动 **MongoDB** 作为后台进程：

  ```sh
  ps aux | grep -v grep | grep mongod
  ```

  您应该 `mongod` 在输出中看到您的进程。

  您还可以查看日志文件以查看 mongod 进程的当前状态：`/usr/local/var/log/mongodb/mongo.log`

#### 连接 MongoDB

要开始使用 MongoDB，使用 `mongosh` 命令连接到正在运行的实例。从终端输入以下命令：

```sh
mongosh
```






## 基本操作

### 创建管理员用户

数据库操作权限

```
readAnyDatabase    任何数据库的只读权限
userAdminAnyDatabase    任何数据库的读写权限
userAdminAnyDatabase    任何数据库用户的管理权限
dbAdminAnyDatabase    任何数据库的管理权限
```

查看一下用户表有没有数据:

```sh
>>> db.system.users.find()
```

查看用户:

```sh
>>> show users
```

MongoDB 创建数据库管理员用户:

```sh
# 切换至admin数据库。
# 也可以使用db = db.getSiblingDB('admin')代替use admin。
use admin
 
# 创建管理员用户，并指定其权限。
db.createUser({
  user : 'root',
  pwd : '123456',
  roles : [
    'clusterAdmin',
    'dbAdminAnyDatabase',
    'userAdminAnyDatabase',
    'readWriteAnyDatabase'
  ]
})

# 输出
{ ok: 1 }
```


### 创建数据库

MongoDB 创建数据库的语法格式如下：

```sh
use DATABASE_NAME
```

如果数据库不存在，则创建数据库，否则切换到指定数据库。

以下示例我们创建了数据库 demo:

```sh
> use demo
switched to db demo
> db
demo
> 
```

如果想查看所有数据库，可以使用 `show dbs` 命令：

```sh
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> 
```

可以看到，我们刚创建的数据库 demo 并不在数据库的列表中， 要显示它，我们需要向 demo 数据库插入一些数据。

```sh
> db.demo.insert({name: 'demo'})
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
{
  acknowledged: true,
  insertedIds: { '0': ObjectId("634fbb7785c149d4fb978071") }
}
> show dbs
admin   132.00 KiB
config  108.00 KiB
demo     40.00 KiB
local    40.00 KiB
```

MongoDB 中默认的数据库为 `test`，如果你没有创建新的数据库，集合将存放在 `test` 数据库中。

### 创建集合

集合类似于关系型数据库中的表。

MongoDB 中使用 `createCollection()` 方法来创建集合。

语法格式：

```sh
db.createCollection(name, options)
```

参数说明：

- name: 要创建的集合名称
- options: 可选参数, 指定有关内存大小及索引的选项

options 可以是如下参数：

| 字段 | 类型 | 描述 |
| ---- | --- | --- |
| **capped** | 布尔 | （可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。 |
| **autoIndexId** | 布尔 | 当该值为 true 时，必须指定 size 参数。 |
| **size** | 数值 | （可选）为固定集合指定一个最大值，即字节数。
如果 capped 为 true，也需要指定该字段。 |
| **max** | 数值 | （可选）指定固定集合中包含文档的最大数量。 |

在插入文档时，MongoDB 首先检查固定集合的 `size` 字段，然后检查 `max` 字段。

**实例**

在 test 数据库中创建 demo 集合：

```sh
> use test
switched to db test
> db.createCollection('demo')
{ ok: 1 }
> 
```

如果要查看已有集合，可以使用 `show collections` 或 `show tables` 命令：

```sh
> show collections
demo
> show tables
demo
> 
```

下面是带有几个关键参数的 `createCollection()` 的用法：

创建固定集合 `mycol`，整个集合空间大小 `6142800 KB`, 文档最大个数为 `10000` 个：

```sh
> db.createCollection('mycol', {capped: true, autoIndexId: true, size: 6142800, max: 10000})
{ ok: 1 }
> show tables
demo
mycol
> 
```

在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会**自动创建**集合：

```sh
> db.mycol2.insert({name: 'mycol2'})
{
  acknowledged: true,
  insertedIds: { '0': ObjectId("634fc45b85c149d4fb978072") }
}
> show tables
demo
mycol
mycol2
> 
```

### 增删改查


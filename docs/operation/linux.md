<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-04 19:53:55
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-25 09:35:26
-->
# Linux

## 常用Shell命令

``` shell
# 创建文件夹
mkdir 文件夹名

# 创建文件
touch 文件名

# 删除文件
rm 文件名
# 强制删除文件夹
rm -rf 文件/文件夹名

# 查看端口是否被占用
netstat -anp | grep 端口号

# 远程拷贝
scp 文件 root@xxx.xxx.xxx.xxx:/etc/
# 拷贝文件夹
scp -r 文件夹 root@xxx.xxx.xxx.xxx:/etc/

# 查看可执行命令所在路径
which xxx

# 查看文件
du -h 文件/目录

```

### 远程访问/网络

```sh
#安装网络工具包
yum install -y net-tools

# 查看ip地址
ifconfig

# 安装ssh-server
yum install -y openssh-server

# 安装wget
yum install -y wget

# 自定义Host
vi /etc/hosts
```

### systemctl 命令

```sh
#开机运行服务：
systemctl enable *.service

#取消开机运行
systemctl disable *.service

#启动服务
systemctl start *.service

#停止服务
systemctl stop *.service

#重启服务
systemctl restart *.service

#重新加载服务配置文件
systemctl reload *.service

#查询服务运行状态
systemctl status *.service

#显示启动失败的服务
systemctl --failed
```

### 用户相关

```sh
# 创建用户
useradd qiuxc

# 修改密码
passwd qiuxc

# 删除用户
userdel qiuxc

# 查看有哪些用户
cat /etc/passwd

# 查看当前用户名
whoami

# 切换身份
su qiuxc

```

### 防火墙

```sh
# 查看版本
firewall-cmd --version

# 查看帮助
firewall-cmd --help

# 显示状态
firewall-cmd --state

# 查看端口
firewall-cmd --list-port

# 开放端口
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --add-port=20000-20010/tcp --permanent

# 禁用端口
firewall-cmd --remove-port=80/tcp --permanent
firewall-cmd --remove-port=20000-20010/tcp --permanent

# 重新加载防火墙规则
firewall-cmd --reload

# 开放/关闭服务端口
# 打开FTP服务
firewall-cmd --add-service=ftp --permanent

# 关闭FTP服务
firewall-cmd --remove-service=ftp --permanent

## 参数 --permanent，表示永久生效
```

### ssh 远程连接

ssh 监听 `22` 端口。

基本语法：

```sh
ssh [OPTIONS] [-p PORT] [USER@]HOSTNAME [COMMAND]
```

监听端口示例：

```sh
ssh -p 300 git@8.8.8.8
```

打开调试模式：

```sh
# -v 冗详模式，打印关于运行情况的调试信息
ssh -v git@8.8.8.8
```

#### 远程连接并执行指定任务

执行一条命令

```sh
ssh qiuxc@xxx.xxx.xxx.xxx "df -h"
```

执行多条命令，用 `;` 分隔

```sh
ssh qiuxc@xxx.xxx.xxx.xxx "pwd; cat hello.txt"
```

执行需要交互的命令，通过 `-t` 参数显式的告诉 ssh，我们需要一个 TTY 远程 shell 进行交互

```sh
ssh -t qiuxc@xxx.xxx.xxx.xxx "pwd; cat hello.txt"
```

### cat

查看文件内容：

```sh
cat ~/.ssh/id_rsa.pub
```

清空 index.html 内容：

```sh
cat /dev/null > index.html
```

把 index.html 的内容写入 second.html：

```sh
cat index.html > second.html
```

把 index.html 的内容追加写入 second.html：

```sh
cat index.html >> second.html
```

把 index.html 和 second.html 追加写入 third.html：

```sh
cat index.html second.html >> third.html

```

### chmod 更改文件权限

权限除了用 `r`(读) `w`(写) `x`(执行) 这种方式表示，也可以用数字表示，数组与字母的对应关系为：

- r:4
- w:2
- x:1

之所有如此对应关系，主要还是为了方便推导，比如我们希望一个文件可读可写，那我们可以方便的设置权限为 6（4 + 2），同样，如果我们知道一个权限为 3，我们也可以推导出权限为可写可执行，因为只有 2 + 1 才可能等于 3。​

`chmod` （change mode） 的具体语法：

```sh
# -R：递归更改文件属组
chmod [-R] xyz 文件或目录
```

其中 xyz 分别表示 Owner、Group、Others 的权限，如果我们这样设置一个文件的权限：

```sh
chmod 750 index.html
```

我们可以得知，Owner 的权限为 7，为可读可写可执行，Group 的权限为 5，为可读可执行，Others 的权限为 0，表示不可读写不可执行。对应字母为：`rwxr-x---`。

除了这种数字的方式，还有一种使用符号类型改变权限的方式：

在这种方式里，我们将三种身份 `Owner`、`Group`、`Others`，分别简写为 `u（User）`、`g`、`o`，用 `a` 表示所有身份，再使用 `+` `-` `=` 表示加入、去除、设定一个权限，`r` `w` `x` 则继续表示读，写，执行权限，举个例子：

```sh
chmod u+x,g-x,o-x index.html
```

意思就是 Owner 加上执行权限，Group 和 Others 去除执行权限。

当然我们也可以直接设定权限

```sh
chmod u=rwx,g=rx,o=r index.html
```

此时文件的权限就相当于 `-rwxr-xr--`。

此外，我们还可以省略不写 `ugoa` 这类身份内容，直接写：

```sh
chmod +x index.html
```

此时相当于使用了 a，会给所有身份添加执行权限。

## 常用包

- 压缩zip

``` shell
yum install zip
# 压缩文件
zip 文件
```

- 解压zip

``` shell
yum install unzip
unzip xxx.zip
```

## Centos 配置免密登录

1. 在本机生成密钥文件 `ssh-keygen -t rsa`
2. 进入本机 `~/.ssh` 目录，复制 `id_rsa.pub` 的内容
3. `root` 用户登录服务器，进入到服务器 `~/.ssh` 目录
4. 将刚才复制的内容粘贴到 `~/.ssh/authorized_keys` 文件中
5. 配置完成，现在可以无需密码登录到远程服务器了

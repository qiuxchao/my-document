<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-04 19:53:55
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-29 14:46:03
-->
# Linux

## 常用命令

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

### cyctemctl 命令

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
useradd -d / ftpuser

# 修改密码
passwd ftpuser
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

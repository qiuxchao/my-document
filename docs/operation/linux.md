<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-04 19:53:55
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-07 13:54:05
-->
# Linux

## 常用命令

``` shell
# 查看端口是否被占用
netstat -anp | grep 端口号

# 远程拷贝
scp 文件 root@xxx.xxx.xxx.xxx:/etc/
# 拷贝文件夹
scp -r 文件夹 root@xxx.xxx.xxx.xxx:/etc/

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

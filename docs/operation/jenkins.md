<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-07 15:41:48
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-07 19:41:04
-->
# Jenkins

Jenkins是一个开源的支持自动化构建、部署等任务的平台。基本上可以说是持续集成（CI）、持续发布（CD）不可或缺的工具。

官网： [https://jenkins.io/](https://jenkins.io/)

## 安装

- 本篇环境信息

|工具/环境 | 版本|
| - | - | - |
|Linux Server | CentOS 7.6 |
|Jenkins | 2.346.1 |
|JDK | 1.8.0_332 |
|Nginx | 1.22.0|

### 准备工作

1. 安装JDK
参考: [Centos7.5安装java8](https://www.jianshu.com/p/0dd37861a983)
2. 安装Nginx（非必要步骤）
参考: [https://qiuxc.cn/operation/nginx.html](https://qiuxc.cn/operation/nginx.html)

### Jenkins安装

#### Yum安装

1. yum源导入

``` shell
#添加Yum源
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo --no-check-certificate

#导入密钥
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

2. 安装

``` shell
sudo yum install -y jenkins
```

#### 开放防火墙端口

Jenkins站点的默认监听端口是8080

``` shell
sudo firewall-cmd --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
```

#### 启动Jenkins并设置Jenkins开机启动

``` shell
#重载服务（由于前面修改了Jenkins启动脚本）
sudo systemctl daemon-reload

#启动Jenkins服务
sudo systemctl start jenkins

#将Jenkins服务设置为开机启动
#由于Jenkins不是Native Service，所以需要用chkconfig命令而不是systemctl命令
sudo /sbin/chkconfig jenkins on
```

浏览器输入 `http://<ip address>:8080` 访问Jenkins

### Nginx配置（非必要步骤）

#### 配置Nginx反向代理Jenkins

这里使用的是`https`，需要配置`443`端口，并且需要在域名服务商那里申请`ssl`证书，然后把证书上传到服务器并把路径填入下面的配置中

``` shell
#新增Jenkins专用Nginx配置文件
sudo vi /etc/nginx/conf.d/jenkins.conf

#输入以下内容并保存
server {
    listen       443 ssl;        #监听443端口
    server_name  jenkins.qiuxc.cn; #监听的域名
    access_log  /var/log/nginx/jenkins.access.log;
    error_log  /var/log/nginx/jenkins.error.log;
    ssl          on;     #这一行是另外添加的，意思是打开ssl功能，一定要添加。
    ssl_certificate      /etc/nginx/server/ssl/jenkins.qiuxc.cn_nginx/jenkins.qiuxc.cn_bundle.crt;  #这是下载下来的nginx证书的crt文>件路径，绝对或者>相对路径都可以
    ssl_certificate_key  /etc/nginx/server/ssl/jenkins.qiuxc.cn_nginx/jenkins.qiuxc.cn.key;   #和crt的规则一样
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers  ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers  on;

    location / {            #转发或处理
        proxy_pass http://127.0.0.1:8080;
    }
    error_page   500 502 503 504  /50x.html;#错误页
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

配置完 `nginx` 后重启

```shell
sudo systemctl restart nginx
```

然后即可通过域名访问：[https://jenkins.qiuxc.cn](https://jenkins.qiuxc.cn)

### Jenkins初始化

#### 解锁Jenkins

查询root账号默认密码

``` shell
cat /var/lib/jenkins/secrets/initialAdminPassword
```

![](./image/jenkins_login.png)
输入密码并继续

#### 选择插件

![](./image/jenkins_select_plugin.png)
这里直接选择“安装推荐的插件”即可
![](./image/jenkins_initinal.png)

#### 添加管理员

插件安装完成后会自动进入添加管理员界面
![](./image/jenkins_create_admin_user.png)

#### 配置Jenkins URL

这里的URL指的是默认访问`Jenkins`的地址。
默认是是<http://:8080>，如果你通过`Nginx`配置了域名，那么直接填写配置的域名即可
![](./image/jenkins_url_configure.png)

#### 开始使用Jenkins

配置完`Jenkins URL`之后就完成了整个`Jenkins`配置引导
![](./image/jenkins_install_successful.png)

点击“开始使用Jenkins”就会进入`Jenkins`主页
![](./image/jenkins_homepage.png)

大功告成～

> 本章参考🔗：[CentOS 7 下Jenkins安装部署教程](https://ken.io/note/centos7-jenkins-install-tutorial)

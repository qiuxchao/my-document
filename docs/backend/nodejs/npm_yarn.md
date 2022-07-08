<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-08 15:28:24
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-08 15:29:18
-->
# npm & yarn

## npm, yarn查看源和换源

``` shell
npm config get registry  # 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  # 设置npm镜像源为淘宝镜像

yarn config get registry  # 查看yarn当前镜像源

yarn config set registry https://registry.npm.taobao.org/  # 设置yarn镜像源为淘宝镜像
```

镜像源地址部分如下：

``` shell
npm --- https://registry.npmjs.org/

cnpm --- https://r.cnpmjs.org/

taobao --- https://registry.npm.taobao.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmMirror --- https://skimdb.npmjs.com/registry/

deunpm --- http://registry.enpmjs.org/
```

# 创建虚拟环境

Python 虚拟环境用于将软件包安装与系统隔离开来。

创建一个新的虚拟环境，方法是选择 Python 解释器并创建一个 `./venv` 目录来存放它：

```sh
# 使用系统中已有的包
$ python3 -m venv --system-site-packages ./venv

# 不使用系统的包，一个纯净的虚拟环境
$ python3 -m venv ./venv
```

激活该虚拟环境：

```sh
$ source ./venv/bin/activate
```

当虚拟环境处于有效状态时，shell 提示符带有 `(venv)` 前缀。

在不影响主机系统设置的情况下，在虚拟环境中安装软件包。首先升级 `pip`：

```sh
(venv) $ python3 -m pip install --upgrade pip
(venv) $ pip list # 显示安装在虚拟环境中的包
(venv) $ pip --version # 查看pip的版本
(venv) $ python3 --version # 查看python3的版本
```

退出虚拟环境：

```sh
(venv) $ deactivate
```
# MacOS

## 使用 Proxychains-ng 代理命令行

### 为什么要使用 Proxychains-ng

在使用终端下载东西时，经常会遇到此报错：

```sh
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```

此报错为: _443 端口连接被拒_，一般是因为墙的原因，如果你可以科学上网（Virtual Private Network）的话，在命令行键以下命令执行：

```sh
# 7890 和 789 需要换成你自己的端口
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:789
```

再次执行之前连接 `http://raw.githubusercontent.com:443` 被拒绝的命令应该就成功了。

这个方法不便之处在于，运行完上述的那行命令后，终端当前 `session` 的所有命令都是翻墙的，解决方法也很简单：**关掉当前的终端会话**（或者暴力点，关掉终端重新打开）即可。

更推荐的是使用 proxychains-ng 来更方便的代理命令行。具体使用方法见下文。

### 安装与使用 Proxychains-ng

Proxychains-ng 是一个代理链工具，可以在命令行中使用代理服务器。它可以让您轻松地在终端中使用代理，并隐藏您的真实 IP 地址。

可以使用 Homebrew 来安装 Proxychains-ng。以下是安装和使用 Proxychains-ng 的指南：

1. 安装 Homebrew：如果您尚未安装 Homebrew，请使用以下命令安装（可以先使用前面临时代理的方法使命令后翻墙，这样才可以安装 Homebrew）：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

2. 安装 Proxychains-ng：接下来，使用 Homebrew 安装 Proxychains-ng：

```sh
brew install proxychains-ng
```

3. 配置代理服务器：接下来，打开配置文件，通常位于 `/opt/homebrew/etc/proxychains.conf` 或 `/usr/local/etc/proxychains.conf`，并编辑代理服务器的列表。您可以使用 SOCKS4，SOCKS5 或 HTTP 代理服务器。

```sh
[ProxyList]
socks5  127.0.0.1 9981
http    127.0.0.1 9981
```

3. 运行命令：在命令行中运行以下命令：

```sh
proxychains4 <命令>
```

例如，如果要使用代理服务器访问网站，您可以运行以下命令：

```sh
# 访问网站
proxychains4 curl http://www.example.com

# 下载文件
procychains4 git clone https://github.com/facebook/react.git
```

这将使用代理服务器访问该网站，并隐藏您的真实 IP 地址。

#### zsh 配置别名

可以在 zsh 中配置 `proxychains4` 为 `pc`，便于使用：

```sh
# 编辑 zsh 配置文件
vi ~/.zshrc

# 在 .zshrc 配置别名
alias pc="proxychains4"

# 重载配置
source ~/.zshrc
```

然后便可以通过 `pc` 命令来实现命令行代理：

```sh
pc curl https://www.baidu.com
```

#### 安装后无法使用，命令行提示：zsh: command not found: procychains4

如果您在安装完 Proxychains-ng 后遇到“zsh: command not found: procychains4”错误，则表明您没有正确配置系统的 `PATH` 变量。可以使用以下步骤来解决此问题：

1. 检查是否已安装 Proxychains-ng：请使用以下命令确认 Proxychains-ng 已成功安装：

```sh
which proxychains4
```

如果该命令显示了 Proxychains-ng 安装路径，则说明它已成功安装。

2. 配置 `PATH` 变量：您可以在您的 shell 配置文件（通常是 `~/.zshrc` 或 `~/.bashrc`）中添加以下行：

```sh
export PATH="$PATH:/usr/local/bin"
```

然后，重新加载您的配置文件：

```sh
source ~/.zshrc
```

或

```sh
source ~/.bashrc
```

3. 测试命令：现在，您应该能够在命令行中运行 `proxychains4` 命令。如果问题仍然存在，请尝试重新安装 Proxychains-ng 或联系技术支持。

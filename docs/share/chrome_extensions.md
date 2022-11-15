# Chrome 扩展开发

Chrome扩展是用于扩充Chrome浏览器功能的程序。

Chrome扩展主要用于对浏览器功能的增强，它更强调与浏览器相结合。比如Chrome扩展可以在浏览器的工具栏和地址栏中显示图标，它可以更改用户当前浏览的网页中的内容，也可以更改浏览器代理服务器的设置等等。

Chrome扩展是一系列文件的集合，这些文件包括**HTML文件**、**CSS样式文件**、**JavaScript脚本文件**、**图片等静态文件**以及 `manifest.json` 清单文件。

> 扩展程序（插件）是能通过『当前选项卡』『插件弹出页』『全局js脚本』『devtools信息』等合作通信去实现特定功能的后台程序。

## 扩展程序基本组成结构

![chrome_ext_jiagou](./image/chrome_ext_jiagou.png)

### manifest.json

扩展被安装后，Chrome就会读取扩展中的 `manifest.json` 文件。这个文件的文件名固定为 `manifest.json`，内容是按照一定格式描述的扩展相关信息，如扩展名称、版本、更新地址、请求的权限、扩展的UI界面入口等等。这样Chrome就可以知道在浏览器中如何呈现这个扩展，以及这个扩展如何同用户进行交互。

自2022年1月17日起，Chrome 网上应用店已停止接受新的 Manifest V2 扩展。Manifest V2 将于 2024 年逐步淘汰。

Manifest V3 扩展在安全性、隐私和性能方面得到增强，因此后续我们使用最新的 V3 版本。

下面仅列举部分配置，完整配置清单见官方：[https://developer.chrome.com/docs/extensions/mv3/manifest/](https://developer.chrome.com/docs/extensions/mv3/manifest/)

```json
  {
  // Required
  "manifest_version": 3,  // V3 版本
  "name": "My Extension",  // 插件名称
  "version": "1.0.1",  // 插件版本
  "description": "A plain text description", // 插件描述
  "default_locale": "en",  // 默认语言
  "author": "xxx",  // 插件作者

   // 用于配置点击插件图标后的浮层，popup.html 则是浮层的内容
  "action": {
     "default_title": "Click to view a popup",  // 鼠标移动到扩展图标时显示 tooltip
   	 "default_popup": "popup.html"
   },

  "icons": {...},  // 插件图标配置

  // `后台脚本`，该脚本不能访问DOM，只能通过 `消息传递` 与扩展程序的其他部分进行通信，例如：`内容脚本`、`浮层`
  "background": {
    "service_worker": "background.js",
  },

  // `内容脚本`，在网页中运行，可以访问DOM、获取页面上下文以及向页面中插入内容，通过 `消息传递` 与扩展程序的其他部分进行通信
  "content_scripts": [
     {
       "matches": ["https://*.nytimes.com/*"],  // 指定此内容脚本被插入到哪些页面中
       "css": ["my-styles.css"],  // 要注入匹配页面的 CSS 文件列表
       "js": ["content-script.js"],  // 要注入匹配页面的 JavaScript 文件列表，按照数组的顺序注入
       "run_at": "document_idle", // 何时将 JavaScript 文件注入网页，可选址值：document_idle document_start document_end
     }
   ],

  // 使用/添加devtools中的功能
  "devtools_page": "devtools.html",

  // 可以使用该插件的网站
  "host_permissions": ["http://*/*", "https://*/*"],

  // 必需权限，扩展程序的基本功能所需的权限。 权限列表：https://developer.chrome.com/docs/extensions/mv2/declare_permissions/
  "permissions": ["storage"],

  // 可选权限，与 permissions 类似，但在扩展运行时授予，而不是提前授予
  "optional_permissions": ["downloads"],
  
}
```

### 后台脚本(service_worker)

扩展程序是**基于事件**的程序，用于修改或增强 Chrome 浏览体验。事件是浏览器触发器，例如导航到新页面、删除书签或**扩展程序的其他部分注册的事件**。

扩展程序使用 `service_worker` **后台脚本**监视这些事件，然后根据指定的指令做出反应。

- `service_worker` 无法访问页面 `DOM`。

- `service_worker` 会一直处于休眠状态，直到它们正在侦听的事件触发，按照指定的指令做出反应，然后卸载。

> [service_worker官方文档](https://developer.chrome.com/docs/extensions/mv3/service_workers/)

#### 注册 service_worker

在 `manifest.json` 清单文件的 `background` 字段配置一个JS文件以指定后台脚本：

```json
{
  "name": "Awesome Test Extension",
  ...
  "background": {
    "service_worker": "background.js"
  },
  ...
}
```

还可以选择指定一个额外的字段，`"type": "module"` 以让 `service_worker` 支持 `ES` 模块，这允许我们使用 `import`。例如：

```json
 "background": {
    "service_worker": "background.js",
    "type": "module"
  }
```

#### 初始化扩展

监听到 `runtime.onInstalled` 事件触发时表明插件安装完成。可以使用此事件设置状态或一次性初始化，例如设置右键菜单：

```js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});
```


有关更多信息，参阅 [ES modules in service workers](https://web.dev/es-modules-in-sw/)


### 内容脚本(content_script)

**内容脚本**是在网页上下文中运行的文件。通过使用标准文档对象模型(DOM)，他们能够读取浏览器访问的网页的详细信息(DOM)，对其进行更改，并将信息传递给扩展的其他部分。

此外，**内容脚本**只可以访问部分 chrome API：

- i18n
- storage
- runtime:
  - connect
  - getManifest
  - getURL
  - id
  - onConnect
  - onMessage
  - sendMessage

**内容脚本**可以通过使用 `message API` 来与扩展的其他部分进行通信。

> [content_script官方文档](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

#### 注入方式

内容脚本可以**静态声明**或以**编程方式**注入。

##### 使用静态声明注入

`manifest.json` 中的 `content_scripts` 字段声明用于应该在目标页面上自动运行的脚本。

```json
{
 "name": "My extension",
 ...
 "content_scripts": [
   {
     "matches": ["https://*.nytimes.com/*"],
     "css": ["my-styles.css"],
     "js": ["content-script.js"]
   }
 ],
 ...
}
```

##### 以编程方式注入

对需要在特定场合运行的**内容脚本**使用编程注入。

要以编程方式注入内容脚本，扩展程序要有 `activeTab` 权限，具体配置：

manifest.json:
```json
{
  "name": "My extension",
  ...
  "permissions": [
    "activeTab" // 声明 activeTab 权限
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

content-script.js:
```js
// 修改页面背景色
document.body.style.backgroundColor = 'orange';
```

background.js:
```js
chrome.action.onClicked.addListener((tab) => {
  // 点击扩展图标时动态注入内容脚本
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  });
});
```

或者函数体也可以作为内容脚本注入和执行：

background.js:
```js
function injectedFunction() {
  document.body.style.backgroundColor = 'orange';
}

chrome.action.onClicked.addListener((tab) => {
  // 点击扩展图标时动态注入内容脚本
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    // 直接运行函数
    func: injectedFunction
  });
});
```



### 浮层(popup)

点击插件图标后出现的浮层，`popup.html` 则是浮层的内容，可以在 `popup.html` 中引入JS文件，以用于与扩展其他部分进行交互。

![chrome_ext_fehelper](./image/chrome_ext_fehelper.png)

```json
{
  "name": "My Extension",

  "action": {
     "default_title": "Click to view a popup",
   	 "default_popup": "popup.html"
   },
}
```

### 消息传递

由于**内容脚本**(content_script)在网页上下文而不是扩展程序的上下文中运行，因此它们通常需要某种方式与扩展程序的其余部分进行通信。 

**内容脚本**和扩展程序其他部分的通信通过使用**消息传递**进行。任何一方都可以侦听从另一端发送的消息，并在同一通道上响应。消息可以包含任何有效的 JSON 对象（null, boolean, number, string, array, object）。

有一个用于**一次性请求**的API和一个**建立长期连接**API（它允许在共享上下文中交换多条消息的长连接。如果知道另一个扩展的ID，也可以向另一个扩展发送消息）。

> [消息传递官方文档](https://developer.chrome.com/docs/extensions/mv3/messaging/)

#### 一次性请求

如果只需要向扩展程序的另一部分(内容脚本或后台脚本)发送一条消息（并且可以选择返回响应），应该使用简化的 `runtime.sendMessage` 或 `tabs.sendMessage`。这可以将一次性 JSON 可序列化消息从**内容脚本**发送到**后台脚本**或其他部分，反之亦然。可选的回调参数允许我们处理来自另一侧的响应（如果有）。

从内容脚本发送请求如下所示：

```js
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

在接收端，需要设置一个 `runtime.onMessage` 事件侦听器来处理消息：

```js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // 有 sender.tab 说明是从 内容脚本 发过来的，否则就是从其他部分发过来的
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);
```

从**扩展程序其他部分**向**内容脚本**发送请求看起来非常相似，只是需要指定将请求发送到哪个选项卡：

```js
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  // 向当前浏览器窗口正在激活的 tab 页面发送消息
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
```

#### 长期连接

有时，我们可能需求建立一个长会话。在这种情况下，可以使用 `runtime.connect` 或 `tabs.connect` 打开一个从内容脚本到**其他部分**的长期通道，反之亦然。通道可以有一个可选的名称，允许我们区分不同类型的连接。

> 有关建立长连接的更多信息，参阅：[长期连接](https://developer.chrome.com/docs/extensions/mv3/messaging/#connect)




## 开发调试

- `popup` 没有控制台，报错信息在导入插件的地方查看

![chrome_ggbp_ts](./image/chrome_ggbp_ts.png)

- `service_worker` 有一个专属的控制台，可以在那里查看打印信息

![chrome_ggbp_ts2](./image/chrome_ggbp_ts2.png)

- `content_script` 直接在页面控制台查看信息


## 踩坑记录

### 无法为内容脚本加载 JavaScript“”。 无法加载清单。

出现此错误可能有多种原因，一般都是 `manifest.json` 中的配置项有问题，可以排查下列属性：

- `content_scripts` 中的js不能使用网络路径
- `default_locale` 配置为 `zh_CN` 后需要在根目录下新建 `_locales` 语言包目录
- 将需要在外部使用的资源列到 `web_accessible_resources` 属性中

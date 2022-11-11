# Chrome 扩展开发

Chrome扩展是用于扩充Chrome浏览器功能的程序。

Chrome扩展主要用于对浏览器功能的增强，它更强调与浏览器相结合。比如Chrome扩展可以在浏览器的工具栏和地址栏中显示图标，它可以更改用户当前浏览的网页中的内容，也可以更改浏览器代理服务器的设置等等。

Chrome扩展是一系列文件的集合，这些文件包括**HTML文件**、**CSS样式文件**、**JavaScript脚本文件**、**图片等静态文件**以及 `manifest.json`。

> 插件是能通过『当前选项卡』『插件弹出页』『全局js脚本』『devtools信息』等合作通信去实现特定功能的后台程序。

## 插件基本组成结构

![chrome_ext_jiagou](./image/chrome_ext_jiagou.jpg)

### manifest.json

扩展被安装后，Chrome就会读取扩展中的 `manifest.json` 文件。这个文件的文件名固定为 `manifest.json`，内容是按照一定格式描述的扩展相关信息，如扩展名称、版本、更新地址、请求的权限、扩展的UI界面入口等等。这样Chrome就可以知道在浏览器中如何呈现这个扩展，以及这个扩展如何同用户进行交互。

> 类似于 `package.json`

```json
  {
  // Required
  "manifest_version": 3,  // V3 版本
  "name": "My Extension",  // 插件名称
  "version": "1.0.1",  // 插件版本

   // 『重点』action配置项主要用于点击图标弹出框，对于弹出框接受的是html文件
  "action": {
     "default_title": "Click to view a popup",
   	 "default_popup": "popup.html"
   }
    
  // 通俗易懂
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},
  "author": ...,

  // 『重点』下面将出现的background.js 配置service work
  "background": {
    // Required
    "service_worker": "service-worker.js",
  },

    // 『重点』下面将出现content_script.js 应用于所有页面上下文的js
  "content_scripts": [
     {
       "matches": ["https://*.nytimes.com/*"],
       "css": ["my-styles.css"],
       "js": ["content-script.js"]
     }
   ],

    // 使用/添加devtools中的功能
  "devtools_page": "devtools.html",


    /**
    * 三个permission
    * host_permissions - 允许使用扩展的域名
    * permissions - 包含已知字符串列表中的项目 【只需一次弹框要求允许】
    * optional_permissions - 与常规类似permissions，但由扩展的用户在运行时授予，而不是提前授予【安全】
    * 列出常见选项
    * {
    *		activeTab: 当扩展卡选项被改变需要重新获取新的权限
    *		tabs: 操作选项卡api（改变位置等）
    *		downloads: 访问chrome.downloads API 的权限 便于下载但还是会受到跨域影响
    *		history: history api权限
    *		storage: 访问localstorage/sessionStorage权限
    * }
    */
  "host_permissions": ["http://*/*", "https://*/*"],
  "permissions": ["tabs"],
  "optional_permissions": ["downloads"],

    // 内部弹出可选页面 - 见fehelper操作页
  "options_page": "options.html",
  "options_ui": {
    "chrome_style": true,
    "page": "options.html"
  },
}
```
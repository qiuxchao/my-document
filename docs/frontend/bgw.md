# 八股文

## 网络、浏览器

### http 和 https

- `http`:超文本传输协议，用于从`www`服务器向本地浏览器传输数据，默认端口`80`
- `https`:以安全为目标的`http`通道，在`http`的基础上加入了`SSL`加密，确保数据传输的安全性，默认端口`443`

### TCP 和 UDP

- `TCP` 面向`连接`，仅支持`单播传输`
  - 三次握手建立连接
  - 四次挥手断开连接
- `UDP` 面向`无连接`，支持`单播`、`多播`、`广播`

### HTTP 常见状态码

- **200**(OK)：请求成功
- **400**(Bad Request)：客户端请求的语法错误，服务器无法理解
- **301**(Moved Permanently)：重定向，资源被永久移动到新的 URI
- **304**(Not Modified)：未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
- **401**(Unauthorized)：无权限访问该资源
- **404**(Not Found)： 请求的资源/网页不存在
- **500**(Internal Server Error )： 服务器内部错误

### HTTP 请求跨域

- 跨域的原理
  - **跨域**是浏览器的**同源策略**造成的
  - **协议**、**域名**、**端口**，只要有任何一个不同，都会产生跨域
- 解决方案
    1. `JSONP`，`ajax` 请求受同源策略影响，不允许进行跨域请求，而 `script` 标签 `src` 属性中的链接却可以访问跨域的 `js` 脚本，利用这个特性，服务端不再返回 `JSON` 格式的数据，而是返回一段调用某个函数的 `js` 代码，在 `src` 中进行了调用，这样实现了跨域。
    2. `CORS` CORS(Cross-origin resource sharing)跨域资源共享 服务器设置对 CORS 的支持原理：服务器设置`Access-Control-Allow-Origin` HTTP 响应头之后，浏览器将会允许跨域请求
    3. webpack `proxy` 代理

### Cookie、sessionStorage、localStorage 的区别

- `cookie` 大小不能超过 `4Kb`，会过期，会被发送到服务器，可以由服务端设置
- `sessionStorage` 大小可以达到 `5Mb+`，临时存储，浏览器关闭后删除数据
- `localStorage` 大小可以达到 `5Mb+`，永久存储，浏览器关闭后不会删除

### 从输入 URL 到页面加载的全过程

1. 在浏览器中输入 url 并回车
2. 查找缓存，浏览器缓存、操作系统缓存、路由器缓存、ISP 缓存
3. DNS 域名解析，浏览器向 DNS 服务器发送请求，建立`UDP连接`，通过域名换取 IP 地址
4. 拿到 IP 地址，与服务器建立`TCP`连接
5. 发起`HTTP`请求，服务器返回`index.html`等静态资源
6. 浏览器拿到`html`文件，开始渲染页面：
    1. 构建`DOM树`：根据`html`中的结构构建`DOM树`，树的根是`document`对象
    2. 构建`CSS规则树`：根据`css`样式表构建`CSS规则树`
    3. 构建`Render树`：合并`DOM树`和`CSS树`，构建渲染树（render tree）
    4. 布局`Layout`：计算每个节点在屏幕中的位置
    5. 绘制`Painting`：遍历 render 树，并使用 UI 后端层绘制每个节点。
7. JS 引擎解析过程：调用 JS 引擎执行 JS 代码（JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
    1. 创建 window 对象：window 对象也叫全局执行环境，当页面产生时就被创建，所有的全局变量和函数都属于 window 的属性和方法，而 DOM Tree 也会映射在 window 的 doucment 对象上。当关闭网页或者关闭浏览器时，全局执行环境会被销毁。
    2. 加载文件：完成 js 引擎分析它的语法与词法是否合法，如果合法进入预编译
    3. 预编译：在预编译的过程中，浏览器会寻找全局变量声明，把它作为 window 的属性加入到 window 对象中，并给变量赋值为'undefined'；寻找全局函数声明，把它作为 window 的方法加入到 window 对象中，并将函数体赋值给他（匿名函数是不参与预编译的，因为它是变量）。而变量提升作为不合理的地方在 ES6 中已经解决了，函数提升还存在。
    4. 解释执行：执行到变量就赋值，如果变量没有被定义，也就没有被预编译直接赋值，在 ES5 非严格模式下这个变量会成为 window 的一个属性，也就是成为全局变量。string、int 这样的值就是直接把值放在变量的存储空间里，object 对象就是把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再弹出，控制权交还给之前的环境。JS 作用域其实就是这样的执行流机制实现的。

### 浏览器重绘与重排的区别

- **重排/回流（Reflow）**：当 DOM 的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。
- **重绘(Repaint)**: 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。表现为某些元素的外观被改变
    > 『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。

#### 如何触发重排和重绘？

任何改变用来构建渲染树的信息都会导致一次重排或重绘：

1. 添加、删除、更新 DOM 节点
2. 通过 display: none 隐藏一个 DOM 节点-触发重排和重绘
3. 通过 visibility: hidden 隐藏一个 DOM 节点-只触发重绘，因为没有几何变化
4. 移动或者给页面中的 DOM 节点添加动画
5. 添加一个样式表，调整样式属性
6. 用户行为，例如调整窗口大小，改变字号，或者滚动。

#### 如何避免重绘或者重排？

1. 集中改变样式，不要一条一条地修改 DOM 的样式。
2. 不要把 DOM 结点的属性值放在循环里当成循环里的变量。
3. 为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。
4. 不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。
5. 尽量只修改 position：absolute 或 fixed 元素，对其他元素影响不大
6. 动画开始 GPU 加速，translate 使用 3D 变化

## HTML

### H5 新特性

- 语义化标签
- 视频和音频 `video`、`audio`
- `canvas` 画布
- `svg` 绘图
- 地理定位
- 拖曳 API
- WebWorker
- WebStorage
- WebSocket

### H5 语义化标签

HTML5 的语义化指的是合理正确的使用语义化的标签来创建页面结构。【正确的标签做正确的事】

语义化标签：

- `header`、`nav`
- `aside`、`main`、`section`、`article`、`details`
- `footer`

语义化标签的优点：

- 在没 CSS 样式的情况下，页面整体也会呈现很好的结构效果
- 代码结构清晰，易于阅读，
- 利于开发和维护 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
- 有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

## CSS

### 选择器和优先级

#### 选择器

- id 选择器 `#id`
- class 选择器 `.class`
- 属性选择器 `a[name="name"]`
- 伪类选择器 `a:hover, li:nth-child`
- 标签选择器 `div, h1, p`
- 相邻选择器 `div + p`
- 父子选择器 `div > p`
- 后代选择器 `div p`
- 通配符选择器 `*`

#### 优先级

- `!important`
- 内联样式 `style="color: red;"`（1000）
- id 选择器（0100）
- 类选择器/属性选择器/伪类选择器（0010）
- 元素选择器/伪元素选择器（0001）
- 关系选择器/通配符选择器（0000）

带 `!important` 标记的样式属性优先级最高；`!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性`

### position 定位

- **固定定位 `fixed`**： 元素的位置相对于浏览器窗口是固定位置，即使窗口是滚动的它也不会移动。Fixed 定 位使元素的位置与文档流无关，因此不占据空间。 Fixed 定位的元素和其他元素重叠。
- **相对定位 `relative`**： 如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直 或水平位置，让这个元素“相对于”它的起点进行移动。 在使用相对定位时，无论是 否进行移动，元素仍然占据原来的空间。因此，移动元素会导致它覆盖其它框。
- **绝对定位 `absolute`**： 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于 body。absolute 定位使元素的位置与文档流无关，因此不占据空间。 absolute 定位的元素和其他元素重叠。
- **粘性定位 `sticky`**： 元素先按照普通文档流定位，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。而后，元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。
- **默认定位 `static`**： 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声 明）。 inherit: 规定应该从父元素继承 position 属性的值。

### box-sizing 属性

`box-sizing` 规定两个并排的带边框的框，语法为 `box-sizing: content-box/border-box/inherit;`

- `content-box`：宽度和高度分别应用到元素的内容框，在宽度和高度之外绘制元素的内边距和边框。【标准盒子模型】
- `border-box`：为元素设定的宽度和高度决定了元素的边框盒。【IE 盒子模型】
- `inherit`：继承父元素的 box-sizing 值。

### CSS 盒子模型

CSS 盒模型本质上是一个盒子，它包括：边距，边框，填充和实际内容。CSS 中的盒子模型包括 IE 盒子模型和标准的 W3C 盒子模型。
在标准的盒子模型中，width 指 content 部分的宽度。
在 IE 盒子模型中，width 表示 content+padding+border 这三个部分的宽度。

故在计算盒子的宽度时存在差异：

- `标准盒模型`： 一个块的总宽度 = width+margin(左右)+padding(左右)+border(左右)
- `怪异盒模型`： 一个块的总宽度 = width+margin（左右）（既 width 已经包含了 padding 和 border 值）

### BFC（块级格式上下文）

#### BFC 的概念

BFC 是 Block Formatting Context 的缩写，即块级格式化上下文。BFC 是 CSS 布局的一个概念，是一个独立的渲染区域，规定了内部 box 如何布局， 并且这个区域的子元素不会影响到外面的元素，其中比较重要的布局规则有内部 box 垂直放置，计算 BFC 的高度的时候，浮动元素也参与计算。

#### BFC 的原理布局规则

- 内部的 Box 会在`垂直方向`，一个接一个地放置
- Box `垂直方向的距离由 margin 决定`。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反
- BFC 的区域不会与 `float box 重叠`
- BFC 是一个独立容器，容器里面的`子元素不会影响到外面的元素`
- 计算 BFC 的高度时，`浮动元素也参与计算高度`
- 元素的类型和 `display 属性，决定了这个 Box 的类型`。不同类型的 Box 会参与不同的 Formatting Context。

#### 如何创建 BFC？

- 根元素，即 HTML 元素
- float 的值不为 none
- position 为 absolute 或 fixed
- display 的值为 inline-block、table-cell、table-caption
- overflow 的值不为 visible

#### BFC 的使用场景

- 去除边距重叠现象
- 清除浮动（让父元素的高度包含子浮动元素）
- 避免某元素被浮动元素覆盖
- 避免多列布局由于宽度计算四舍五入而自动换行

### 让一个元素水平垂直居中

#### 水平居中

- 对于 行内元素 : text-align: center;

- 对于确定宽度的块级元素：
    1. width 和 margin 实现。margin: 0 auto;
    2. 绝对定位和 margin-left: (父 width - 子 width）/2, 前提是父元素 position: relative
- 对于宽度未知的块级元素
    1. table 标签配合 margin 左右 auto 实现水平居中。使用 table 标签（或直接将块级元素设值为 display:table），再通过给该标签添加左右 margin 为 auto。
    2. inline-block 实现水平居中方法。display：inline-block 和 text-align:center 实现水平居中。
    3. 绝对定位+transform，translateX 可以移动本身元素的 50%。
    4. flex 布局使用 justify-content:center

#### 垂直居中

1. `line-height` 的值设为容器的 `height` 的值
2. 父级 `dispaly: flex; align-items: center;`
3. 通过设置父容器 相对定位 ，子级设置 绝对定位，top: 50%
4. table 布局, 父级通过转换成表格形式，然后子级设置 vertical-align 实现。（需要注意的是：vertical-align: middle 使用的前提条件是内联元素以及 display 值为 table-cell 的元素）。

### 隐藏页面中某个元素

1. `opacity: 0;` 将元素设为透明
2. `visibility: hidden;` 隐藏元素，但不会改变页面布局（重绘）
3. `display: none;` 隐藏元素，改变页面布局（回流+重绘）

### CSS 实现三角符号

口诀：盒子宽高均为零，三面边框皆透明。

```css
div {
 width: 0px;
 height: 0px;
 border-right: 100px solid transparent;
 border-left: 100px solid transparent;
 border-bottom: 100px solid transparent;
 border-top: 100px solid red;
}
```

### 页面布局

- flex 布局
- rem 布局
- 百分比布局
- vw、vh 布局

## JavaScript

### 数据类型

- 基本类型 存储在**栈内存**
    1. `string` 字符串
    2. `number` 数值
    3. `boolean` 布尔
    4. `Symbol` 符号
    5. `null` 空
    6. `undefined` 未定义
- 引用类型 存储在**堆内存**
    1. `object` 对象
    2. `function` 函数
    3. `Array` 数组
    4. `Date` 日期
    5. `Regexp` 正则表达式
    6. `Set` 集合
    7. `Map`

### 数据类型检测方案

- typeof
  - 返回字符串包裹的对应类型
  - 缺点：无法区分`object`、`array`、`null`，都返回`object`

```javascript
typeof 'hi' // string
```

- instanceof
  - 验证一个值是否是一个构造函数的实例，返回布尔值
  - 缺点：不能判断`Number`、`String`、`Boolean` 类型的值

```javascript
;[] instanceof Array // true
function a() {}
a instanceof Function // true
const obj = {}
obj instanceof Object // true
true instanceof Boolean // false
'aaa' instanceof String // false
1 instanceof Number // false
```

- Object.prototype.toString.call()
  - 精准判断数据类型
  - 缺点：写法比较繁琐

```javascript
var toString = Object.prototype.toString
console.log(toString.call(1)) //[object Number]
console.log(toString.call(true)) //[object Boolean]
console.log(toString.call('mc')) //[object String]
console.log(toString.call([])) //[object Array]
console.log(toString.call({})) //[object Object]
console.log(toString.call(function () {})) //[object Function]
console.log(toString.call(undefined)) //[object Undefined]
console.log(toString.call(null)) //[object Null]
```

### EventLoop

- 同步任务，立即执行
- 异步任务，加入到事件队列中
  - 微任务，`Promise`、`async`、`await`，同步任务执行完成后立即执行
  - 宏任务，`xhr`、`setTimeout`、`setInterval`，优先级低于微任务

### this

- 函数内的 `this` 被哪个对象调用就指向那个对象，例如：`a.fun()`，`fun` 中的 `this` 现在指向对象 `a`
- 没有被对象调用而是自执行，就指向 `window`，例如：`fun()`
- 改变 `this` 指向
  - `call(obj, a, b, c)`
  - `apply(obj, [a, b, c])`
  - `bind(obj, a, b, c)` 会返回新的函数

### 作用域

- 全局作用域

    1. 全局作用域在页面打开时被创建，即 `window` 对象
    2. 全局作用域中声明的变量和函数会作为 `window` 对象的属性和方法

- 函数作用域

    1. 调用函数时，函数作用域被创建，函数执行完毕，函数作用域被销毁
    2. 每调用一次函数就会创建一个新的函数作用域，他们之间是相互独立的
    3. 在函数作用域中可以访问到全局作用域的变量，在函数外无法访问到函数作用域中的变量
    4. 在函数作用域中访问变量、函数时，会现在自身作用域中寻找，如果没有找到，则会到函数的上一级作用域中寻找，一直找到全局作用域

- 函数作用域预编译

    1. 创建 `AO{}` 对象
    2. 找**形参**和变量声明 将变量和形参名当作 `AO` 对象的属性名，值为 `undefined`
    3. **实参形参相统一**（将实参赋值给形参）
    4. 在函数体里面找函数声明，将`AO{}`对应的属性名值赋予函数体（使用`function`关键字`function xxx(){}`这种格式的叫**函数声明**）

- 全局作用域预编译
    1. 创建 `GO{}` 对象
    2. 找变量声明，将变量名作为`GO{}`的属性名 值为 `undefined`
    3. 找函数声明 值赋予函数体

### 闭包

#### 闭包是什么

方法里面返回一个方法

#### 闭包存在的意义

1. 延长变量的生命周期
2. 创建私有变量

### 原型

- 原型是基于构造函数的，没有构造函数，原型就没有意义。
- 任何一个构造函数（包括函数）都有一个 `prototype` 属性，这个属性是一个对象，是这个构造函数**构造出所有对象的公有祖先**。
- 当一个构造函数被 `new` 时，就构造出了一个对象，这个对象的原型链上就会有构造函数的 `prototype` ，并且可以访问 `prototype` 中的属性和方法。
- 当一个构造函数构造出多个对象时，这多个对象的原型链上都有同一个 `prototype` 。

- `Object.create()` 方法
  - `Object.create(prototype)` 方法也可以构造出一个对象，但是传入的参数必须是要构造的对象的原型对象

#### 原型链

- 通过 `new` 关键字对一个构造函数使用时，该函数会返回一个对象，返回的对象身上会有一个 `[[Prototype]]` 属性，该属性指向 `new` 的那个构造函数的 `prototype` 属性，即它构造函数的原型；
- 构造函数的 `prototype` 也是个对象，它身上也有 `[[Prototype]]` 属性，也指向这个对象构造函数的 `prototype`，这样就形成了一个原型的链条；
- 在底层对象身上获取属性或调用方法时，它会先在自身寻找要获取的属性或调用的方法，如果自身没有，则会通过它的 `[[Prototype]]` 向它构造函数的原型对象上查找，原型对象也没有则继续向上查找；
- 最顶层的原型是 **`Object.prototype.__proto__`** ，值为 `null`；
- 如果找到最顶层的原型 `null`，依然没有找到要获取的属性或调用的方法，则属性值会返回 `undefined`，方法会报错。

#### `obj.hasOwnProperty(prototype)` 获取对象自身的属性

`obj.hasOwnProperty(prototype)` 获取对象自身的属性，而非原型链上的；返回布尔值

```javascript
const obj = {
 name: 'Bob'
}
obj.hasOwnProperty('name') // true
obj.hasOwnProperty('age') // false
```

### 防抖、节流

#### 防抖

将多次操作变成一次操作，在最后一次操作延时指定的时间后，触发真正的操作。

思路为：每次操作时先判断有没有设置延时器，有延时器就清除，然后再设置新的延时器

```javascript
// 防抖封装
function antiShake(fn, wait) {
 let timeOut = null
 // 闭包
 return (args) => {
  if (timeOut) clearTimeout(timeOut)
  timeOut = setTimeout(fn, wait)
 }
}

// 真正要触发的操作
function handle() {
 console.log('发送请求')
}

// input 输入事件防抖
// 在最后一个字符输入两秒后发起请求
document
 .querySelector('input')
 .addEventListener('input', antiShake(handle, 2000))
```

#### 节流

在指定时间内只触发一次真正的操作

思路 1：设置一个标记值，第一次操作时将标记值设为延时器，延时器回调函数中触发真正的操作并将标记值重置，后续操作时只需要判断标记值是否有值，有值就忽略本次操作，无值则重复第一次的步骤。

```javascript
// 节流封装
function throttle(fn, wait) {
 let timer = null
 return (args) => {
  if (!timer) {
   timer = setTimeout(() => {
    fn()
    timer = null
   }, wait)
  }
 }
}

// 真正要触发的操作
function handler() {
 console.log('提交表单')
}

// div 触摸事件节流
// 在三秒内只触发一次提交表单的操作
document
 .querySelector('.box')
 .addEventListener('touchmove', throttle(handler, 3000))
```

思路 2：第一次操作时记录下当前的时间戳，后续触发请求时需要拿当前时间戳跟上次触发时的时间戳来比较，判断是否在指定时间内。如果在，就不触发真正的操作；如果不在，就触发真正的操作，并将当前时间戳更新上去

```javascript
// 节流封装
function throttle(fn, wait) {
 let timestamp = null
 return (args) => {
  if (timestamp) {
   const nowTimestamp = new Date().getTime()
   // 判断当前操作的时间与上次的真正操作的时间间隔是否大于指定的时间
   if (nowTimestamp - timestamp > wait) {
    // 大于指定的时间，执行真正的操作，更新时间戳
    fn()
    timestamp = nowTimestamp
   }
  } else {
   fn()
   // 记录第一次操作的时间戳
   timestamp = new Date().getTime()
  }
 }
}

// 真正要触发的操作
function handler() {
 console.log('提交表单')
}

// div 触摸事件节流
// 在三秒内只触发一次提交表单的操作
document
 .querySelector('.box')
 .addEventListener('touchmove', throttle(handler, 3000))
```

以上两种节流的不同之处为：

- 延时器方式第一次会在先等待指定的时间再触发操作
- 时间戳方法第一次会立即触发操作

## Vue

### Vue 响应式原理

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将**遍历**此对象**所有的** `property`，并使用 `Object.defineProperty` 把这些 `property` 全部转为 `getter/setter`。`Object.defineProperty` 是 ES5 中一个无法 `shim` 的特性，这也就是 Vue **不支持 IE8 以及更低版本浏览器**的原因。

这些 `getter/setter` 对用户来说是不可见的，但是在内部它们让 Vue 能够**追踪依赖**，在 `property` 被**访问和修改**时**通知变更**。

**每个组件实例都对应一个 watcher 实例**，它会在组件**渲染的过程中**把“接触”过的数据 **`property` 记录为依赖**。之后当依赖项的 **`setter` 触发**时，会**通知 `watcher`**，从而使它关联的组件重新渲染。

![vue](https://cn.vuejs.org/images/data.png)

### 什么是虚拟 dom

就是一个 JS 对象.

vue 在初次渲染时会根据 `template` 中的模板来生成虚拟 dom，然后将虚拟 dom 同步到真实 dom，并保留这一次的虚拟 dom 对象，以便于后续更新 dom 时做比对。

#### 虚拟 dom 是如何提升 vue 的渲染效率的

局部更新，通过 `diff` 算法来比对更新前的虚拟 dom 和更新后的虚拟 dom，找到不同的部分并只更新不同的部分

## React

### 为什么要在文件顶部引入 react

`babel` 编译时需要使用 `React.createElement` 来转化 `jsx`，而 `React` 是需要存在于当前的上下文中的，如果没有，就会报错

### 虚拟 dom 的优缺点

#### 优点

- 内部处理了浏览器兼容性问题，避免操作真实 dom，麻烦且易出错
- 内容经过了 `xss` 处理，可以防范 `xss` 攻击
- 容易实现跨平台开发 `Android`、`iOS` 等应用
- 可以实现差异化更新，减少更新真实 dom 的操作

#### 缺点

- 虚拟 dom 需要消耗额外的内存
- 首次渲染不一定会更快

### 函数式组件和类组件的相同点和不同点

#### 相同点

- 它们都可以接收属性并且返回 `React` 元素

#### 不同点

- 编程思想不同：类组件使用的是面相对象的编程思想，需要创建类的实例；而函数式组件用的是函数式编程，接收参数，返回值
- 内存占用：类组件需要内存存储实例，而函数组件执行完立即释放内存
- 捕获特性：函数式组件拥有值捕获特性
- 可测试性：便于编写单元测试
- 状态：类组件有自己的状态，函数组件需要使用 `useState` 来获得状态
- 声明周期：类组件有完整的生命周期，函数组件可以使用 `useEffect` 来拥有生命周期
- 更新：类组件使用 `pureComponent` 或 `shouldComponentUpdate` 来告诉组件需不需要更新，函数组件使用 `useMemo`

### React Fiber

#### 什么是 Fiber

`Fiber` 可以理解为是一个执行单元，也可以理解为是一种数据结构。

##### 一个执行单元

`Fiber` 可以理解为一个执行单元，每次执行完一个执行单元，react 就会检查现在还剩多少时间，如果没有时间则将控制权让出去。React Fiber 与浏览器的核心交互流程如下：
![fiber](https://ucc.alicdn.com/pic/developer-ecology/2ce425f98426412aa518a202367fc5f0.png)
首先 React 向浏览器请求调度，浏览器在一帧中如果还有空闲时间，会去判断是否存在待执行任务，不存在就直接将控制权交给浏览器，如果存在就会执行对应的任务，执行完成后会判断是否还有时间，有时间且有待执行任务则会继续执行下一个任务，否则就会将控制权交给浏览器。这里会有点绕，可以结合上述的图进行理解。

Fiber 可以被理解为划分一个个更小的执行单元，它是把一个大任务拆分为了很多个小块任务，一个小块任务的执行必须是一次完成的，不能出现暂停，但是一个小块任务执行完后可以移交控制权给浏览器去响应用户，从而不用像之前一样要等那个大任务一直执行完成再去响应用户

##### 一种数据结构

`Fiber` 还可以理解为是一种数据结构，React Fiber 就是采用链表实现的。每个 `Virtual DOM` 都可以表示为一个 fiber，如下图所示，每个节点都是一个 fiber。一个 fiber 包括了 `child`（第一个子节点）、`sibling`（兄弟节点）、`return`（父节点）等属性，`React Fiber` 机制的实现，就是依赖于以下的数据结构。在下文中会讲到基于这个链表结构，Fiber 究竟是如何实现的。

PS：这里需要说明一下，Fiber 是 React 进行重构的核心算法，`fiber` 是指数据结构中的每一个节点，如下图所示的 A1、B1 都是一个 fiber。
![fiber2](https://ucc.alicdn.com/pic/developer-ecology/5f06a34620d24478b859c9169bb77d93.png)

#### requestIdleCallback

`requestIdleCallback` 是 react Fiber 实现的基础 api 。我们希望能够快速响应用户，让用户觉得够快，不能阻塞用户的交互，`requestIdleCallback` 能使开发者在主事件循环上执行后台和低优先级的工作，而不影响延迟关键事件，如动画和输入响应。正常帧任务完成后没超过 `16ms`，说明有多余的空闲时间，此时就会执行 `requestIdleCallback` 里注册的任务。

具体的执行流程如下，开发者采用 `requestIdleCallback` 方法注册对应的任务，告诉浏览器我的这个任务优先级不高，如果每一帧内存在空闲时间，就可以执行注册的这个任务。另外，开发者是可以传入 timeout 参数去定义超时时间的，如果到了超时时间了，浏览器必须立即执行，使用方法如下：`window.requestIdleCallback(callback, { timeout: 1000 })`。浏览器执行完这个方法后，如果没有剩余时间了，或者已经没有下一个可执行的任务了，`React` 应该归还控制权，并同样使用 `requestIdleCallback` 去申请下一个时间片。具体的流程如下图：
![](https://ucc.alicdn.com/pic/developer-ecology/d1fb0a0b3b814f4480ace346e6c1ee5d.png)

`window.requestIdleCallback(callback)` 的 `callback` 中会接收到默认参数 `deadline` ，其中包含了以下两个属性：

- `timeRamining` 返回当前帧还剩多少时间供用户使用
- `didTimeout` 返回 callback 任务是否超时
    `requestIdleCallback` 方法非常重要，下面分别讲两个例子来理解这个方法，在每个例子中都需要执行多个任务，但是任务的执行时间是不一样的，下面来看浏览器是如何分配时间执行这些任务的：

##### 一帧执行

直接执行 task1、task2、task3，各任务的时间均小于 16ms：

```javascript
let taskQueue = [
 () => {
  console.log('task1 start')
  console.log('task1 end')
 },
 () => {
  console.log('task2 start')
  console.log('task2 end')
 },
 () => {
  console.log('task3 start')
  console.log('task3 end')
 }
]

const performUnitWork = () => {
 // 取出第一个队列中的第一个任务并执行
 taskQueue.shift()()
}

const workloop = (deadline) => {
 console.log(`此帧的剩余时间为: ${deadline.timeRemaining()}`)
 // 如果此帧剩余时间大于0或者已经到了定义的超时时间（上文定义了timeout时间为1000，到达时间时必须强制执行），且当时存在任务，则直接执行这个任务
 // 如果没有剩余时间，则应该放弃执行任务控制权，把执行权交还给浏览器
 while (
  (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
  taskQueue.length > 0
 ) {
  performUnitWork()
 }

 // 如果还有未完成的任务，继续调用requestIdleCallback申请下一个时间片
 if (taskQueue.length > 0) {
  window.requestIdleCallback(workloop, { timeout: 1000 })
 }
}

requestIdleCallback(workloop, { timeout: 1000 })
```

上面定义了一个任务队列 `taskQueue，并定义了` `workloop` 函数，其中采用 `window.requestIdleCallback(workloop, { timeout: 1000 })`去执行 `taskQueue` 中的任务。每个任务中仅仅做了 `console.log` 的工作，时间是非常短的，浏览器计算此帧中还剩余 `15.52ms`，足以一次执行完这三个任务，因此在此帧的空闲时间中，`taskQueue` 中定义的三个任务均执行完毕。打印结果如下：
![](https://ucc.alicdn.com/pic/developer-ecology/e5063c7d4d3540e8ba451ee52ec0892a.png)

##### 多帧执行

在 task1、task2、task3 中加入睡眠时间，各自执行时间超过 16ms：

```javascript
const sleep = (delay) => {
 for (let start = Date.now(); Date.now() - start <= delay; ) {}
}

let taskQueue = [
 () => {
  console.log('task1 start')
  sleep(20) // 已经超过一帧的时间（16.6ms），需要把控制权交给浏览器
  console.log('task1 end')
 },
 () => {
  console.log('task2 start')
  sleep(20) // 已经超过一帧的时间（16.6ms），需要把控制权交给浏览器
  console.log('task2 end')
 },
 () => {
  console.log('task3 start')
  sleep(20) // 已经超过一帧的时间（16.6ms），需要把控制权交给浏览器
  console.log('task3 end')
 }
]
```

基于以上的例子做了部分改造，让 `taskQueue` 中的每个任务的执行时间都超过 `16.6ms`，看打印结果知道浏览器第一帧的空闲时间为 14ms，只能执行一个任务，同理，在第二帧、第三帧的时间也只够执行一个任务。所有这三个任务分别是在三帧中分别完成的。打印结果如下：
![](https://ucc.alicdn.com/pic/developer-ecology/944ec3f9059b481bbe86bcfb868f5bf3.png)

浏览器一帧的时间并不严格是 `16ms`，是可以动态控制的（如第三帧剩余时间为 49.95ms）。如果子任务的时间超过了一帧的剩余时间，则会一直卡在这里执行，直到子任务执行完毕。如果代码存在死循环，则浏览器会卡死。如果此帧的剩余时间大于 0（有空闲时间）或者已经超时（上文定义了 `timeout` 时间为 `1000`，必须强制执行了），且当时存在任务，则直接执行该任务。如果没有剩余时间，则应该放弃执行任务控制权，把执行权交还给浏览器。如果多个任务执行总时间小于空闲时间的话，是可以在一帧内执行多个任务的。

<!-- ## 算法 -->

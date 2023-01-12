<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-12 16:41:37
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-12 16:41:51
-->
# ES6 异步解决方案 Promise

## 背景

JS 经常会遇到一些**异步任务**，所谓异步任务，就是需要经过一段时间 或 当某个时机到达后才能得到结果的任务

例如：

- 使用 ajax 请求服务器，当服务器完成响应后拿到响应结果
- 监听按钮是否被点击，当按钮被点击后拿到某个文本框的值
- 使用 setTimeout 等待一段时间，当时间到达后做某些事情

面对这样的场景，JS 没有一种标准的模式来进行处理，我们处理这些问题的方式是杂乱的，这就导致了不同的人书写的异步任务代码使用方式不一致。

另外，过去常常使用回调的方式来处理异步场景，这种方式又容易产生回调地狱（callback hell）

ES6 总结了各种异步场景，并提取出一种通用的异步模型

## ES6 的异步处理模型

ES6 将异步场景分为**两个阶段**和**三种状态**

两个阶段：unsettled（未决） 和 settled（已决）
三种状态：pending（挂起）、resolved（完成）、rejected（失败）

他们的关系图如下：

![](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets2/2019-12-25-15-30-33.png)

当任务处于**未决阶段**时，它一定是 **pending 挂起状态**，表示任务从开始到拿到结果之间的过程。比如：网络完成了各种配置，也发送了请求，但是请求结果还没有拿到。

当任务处于 **已决阶段**时，它只能是 **resolved** 和 **rejected**两种状态的一种，表示任务有了一个结果。比如：从服务器拿到了数据（resolved）、网络不好没有拿到数据（rejected）

任务开始时，始终是未决阶段，那任务如何才能走向已决阶段呢？

ES6 认为，任务在未决阶段的时候，有能力将其**推向**已决。比如，当从服务器拿到数据后，我们就从未决阶段推向已决的 resolved 状态，如果网络不好，导致出错了，我们就从未决阶段推向已决的 rejected 状态

我们把**从未决推向已决的 resolved 状态的过程，叫做 resolve**，**从未决推向已决的 rejected 状态的过程，叫做 reject**，如下图所示

![](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets2/2019-12-25-15-40-43.png)

这种状态和阶段的变化是不可逆的，也就是说，一旦推向了已决，就无法重新改变状态

任务从未决到已决时，可能附带一些数据，比如：跑步完成后的用时、网络请求后从服务器拿到的数据

![](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets2/2019-12-25-15-45-10.png)

任务已决后（有了结果），可能需要进一步做后续处理，如果任务成功了（resolved），有后续处理，如果任务失败了（rejected），仍然可能有后续处理

我们把针对 resolved 的后续处理，称之为 thenable，针对 rejected 的后续处理，称之为 catchable

![](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets2/2019-12-25-15-48-58.png)

## Promise 的基本使用

ES 官方制定了一个全新的 API 来适配上面提到的异步模型，这个 API 即 Promise

Promise 是一个构造函数，通过`new Promise()`可以创建一个任务对象，构造函数的参数是一个函数，用于处理未决阶段的事务，该函数的执行是立即同步执行的。在函数中，可以通过两个参数自主的在合适的时候将任务推向已决阶段

```js
var pro = new Promise((resolve, reject) => {
 //未决阶段的代码，这些代码将立即执行
 //...
 //在合适的时候，将任务推向已决
 //resolve(数据)：将任务推向resovled状态，并附加一些数据
 //reject(数据)：将任务推向rejected状态，并附加一些数据
})
```

**注意**

1. 任务一旦进入已决后，所有企图改变任务状态的代码都将失效
2. 以下代码可以让任务到达 rejected 状态
    1. 调用 reject
    2. 代码执行报错
    3. 抛出错误

拿到 Promise 对象后，可以通过 then 方法指定后续处理

```js
pro.then(thenable, catchable)
//或
pro.then(thenable)
pro.catch(catchable)
```

无论是 thenable 还是 catchable，均是下面格式的函数

```js
function (data){
    //data为状态数据
}
```

**注意：后续处理函数一定是异步函数，并且放到微队列中**

## Promise 静态方法

### Promise.allSettled()

`Promise.allSettled()` 方法以 promise 组成的可迭代对象作为输入，并且返回一个 `Promise` 实例。当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，并带有描述每个 promsie 结果的对象数组。

`Promise.allSettled()` 方法是 **promise 并发性** 方法的其中之一。在你有多个不依赖于彼此成功完成的异步任务时，或者你总是想知道每个 promise 的结果时，使用 `Promise.allSettled()` 。相比之下，如果任务相互依赖，或者如果你想立即拒绝其中任何任务，`Promise.all()` 返回的 Promise 可能更合适。

语法：

```js
Promise.allSettled(iterable)
```

参数：

- `iterable`：一个以 promise 组成的可迭代（例如 Array）对象。

返回值：

一个 `Promise`，如下：

- **已经兑现**，如果传递的 `iterable` 是空的。

- **异步兑现**，当给定的 `iterable` 中所有 promise 已经敲定时（要么已兑现，要么已拒绝）。兑现的值是一个对象数组，其中的对象按照 `iterable` 中 promise 传递的顺序，描述每一个 promise 的结果，无论完成顺序如何。每个结果对象都有以下的属性：
  - `status`：一个字符串，要么是 `"fulfilled"`（成功），要么是 `"rejected"`（失败），表示 promise 的最终状态。
  - `value`：仅当 `status` 为 `"fulfilled"`，才存在。在 promise 兑现时才有 `value`。
  - `reason`：仅当 `status` 为 `"rejected"`，才存在，在 promsie 拒绝时才有 `reason`。

示例：

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

// 当 promises 中的所有 promise 都有结果时成功
Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));

// 输出结果:
// "fulfilled"
// "rejected"
```

###

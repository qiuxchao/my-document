# Webpack tapable 模块

`tapable` 模块是 `Webpack` 内部使用的事件钩子处理模块，其中有同步钩子和异步钩子供我们使用。

## 内部 Api

`tapbale` 模块内提供了同步和异步 `class`

- 同步 Sync
    1. SyncHook 同步按顺序执行所有注册的钩子
    2. SyncBailHook 同步熔断，其中一个返回非`undefined`终止后续钩子执行
    3. SyncWaterfallHook 后续钩子可以拿到前面钩子的返回值
    4. SyncLoopHook 遇到某个不返回`undefined`的钩子会一直执行该钩子
- 异步 Async
    1. AsyncParallelHook 异步并发，直至所有注册的异步钩子执行完才会执行`call`方法的回调
    2. AsyncParallelBailHook 异步并行熔断
    3. AsyncSeriesHook 异步串行，按顺序执行注册的异步钩子
    4. AsyncSeriesBailHook
    5. AsyncSeriesWaterfallHook

以上 `class` 通常有两种方法：注册事件 `tap` 和 执行事件 `call` (不同类型的钩子类的这两种方法名字稍有不同)

- 注册有以下 3 种方法：
    1. _`tap`_ `(name: string, (data: any) => void)`
    2. _`tapAsync`_ `(name: string, (data: any, cb: function => void`
    3. _`tapPromise`_ `(name: string, cb: (data: any) => Promise<any>)`
- 触发也有以下 3 种方法：

    1. _`call`_ `(data: any) => void`
    2. _`callAsync`_ `(data: any, cb: () => void)`
    3. _`promise`_ `(data: any, cb: Promise<any>)`

- _`tap`_ 用来注册事件。通常第一个参数没什么用，用于给开发者标识当前的注册的事件名称；第二个参数回调函数中会传入 `call` 方法的执行时传入的参数（waterfallHook 模式下则是前一个 hook 的返回值）

- _`call`_ 用来触发注册的所有事件。`call` 的参数会传给所有 `tap` 方法第二个参数回调函数的参数中（waterfallHook 除外）

## 同步钩子 Sync

### SyncHook 按顺序依次执行注册的事件

```javascript
const { SyncHook } = require('tapable')

const hook = new SyncHook(['name'])

hook.tap('event1', (name) => {
 console.log('event1', name)
})

hook.tap('event2', (name) => {
 console.log('event2', name)
})

hook.call('qxc')

/*
执行结果
event1 qxc
event2 qxc
*/
```

### SyncBailHook 某一个事件返回非 undefined 时，后续注册的事件终止执行

从以下执行结果可以看出，第二个注册的事件返回了非 `undefined` 的值，因此第三个注册的事件不再执行

```javascript
const { SyncBailHook } = require('tapable')

const hook = new SyncBailHook(['name'])

hook.tap('node', (name) => {
 console.log('node', name)
})

hook.tap('express', (name) => {
 console.log('express', name)
 return '不想学了'
})

hook.tap('webpack', (name) => {
 console.log('webpack', name)
})

hook.call('qxc')

/*
结果
node qxc
express qxc
*/
```

### SyncWaterfallHook 后一个 hook 能够拿到前一个 hook 的返回值

此时有返回值的 `hook` 的后续 `hook` 回调参数中不再是 `call` 方法的入参，而是前一个 `hook` 的返回值，如果前一个没有返回值，则会一直往前找。

```javascript
const { SyncWaterfallHook } = require('tapable')

const hook = new SyncWaterfallHook(['name'])

hook.tap('hook1', (name) => {
 console.log('hook1', name)
 return '这是hook1的结果'
})

hook.tap('hook2', (data) => {
 console.log('hook2', data)
 return '这是hook2的结果' // 如果这里没有返回值，那么 hook3 的 data 将是 hook1 的返回值
})

hook.tap('hook3', (data) => {
 console.log('hook3', data)
})

hook.call('qxc')

/*
结果
hook1 qxc
hook2 这是hook1的结果
hook3 这是hook2的结果
*/
```

### SyncLoopHook 遇到某个不返回 undefined 的 hook 会一直执行该 hook 直到其返回 undefined 才会执行下一个 hook

```javascript
const { SyncLoopHook } = require('tapable')

const hook = new SyncLoopHook(['name'])

let index = 0
hook.tap('hook1', (name) => {
 console.log('hook1', name)
 return ++index === 3 ? undefined : '继续执行'
})

hook.tap('hook2', (name) => {
 console.log('hook2', name)
})

hook.call('qxc')

/*
结果
hook1 qxc
hook1 qxc
hook1 qxc
hook2 qxc
*/
```

## 异步钩子 Async

### AsyncParallelHook 异步并行

从以下执行结果可以看出，在所有的异步任务执行完毕后才会执行 `callAsync` 方法的第二个参数的回调函数；在处理多个异步任务上，实现了与 `Promise.all` 相同的效果

```javascript
const { AsyncParallelHook } = require('tapable')

const hook = new AsyncParallelHook(['name'])

let tasks = [1, 2, 3, 4, 5]

tasks.forEach((task) => {
 hook.tapAsync(`name${task}`, (name, cb) => {
  setTimeout(() => {
   console.log(task, name)
   cb()
  }, 1000)
 })
})

hook.callAsync('qxc', () => {
 console.log('done')
})

/*
执行结果
1 qxc
2 qxc
3 qxc
4 qxc
5 qxc
done 
*/
```

### AsyncParallelBailHook 异步并行熔断

通过以下执行结果可以看出，并发其中一个钩子触发熔断后，会直接执行`call`或者`promise`回调，但是并不能阻止后续异步钩子执行（因为大家是一起执行的）

```javascript
const { AsyncParallelBailHook } = require('tapable')

const hook = new AsyncParallelBailHook(['hook'])

hook.tapPromise(
 'hook1',
 (name) =>
  new Promise((resolve, reject) => {
   setTimeout(() => {
    console.log('hook1', name)
    resolve('熔断')
   }, 500)
  })
)

hook.tapPromise(
 'hook2',
 (name) =>
  new Promise((resolve, reject) => {
   setTimeout(() => {
    console.log('hook2', name)
    resolve()
   }, 1000)
  })
)

hook.tapPromise(
 'hook3',
 (name) =>
  new Promise((resolve, reject) => {
   setTimeout(() => {
    console.log('hook3', name)
    resolve()
   }, 2000)
  })
)

hook.promise('qxc').then(() => {
 console.log('✨ Down...')
})

/*
结果
hook1 qxc
✨ Down...
hook2 qxc
hook3 qxc
*/
```

### AsyncSeriesHook 按注册顺序执行异步钩子（串行）

从结果看出：所有异步钩子按照注册的顺序被执行，待全部执行完毕后，才会执行 `call` 方法的回调

```javascript
const { AsyncSeriesHook } = require('tapable')

const hook = new AsyncSeriesHook(['hook'])

hook.tapAsync('hook1', (name, cb) => {
 setTimeout(() => {
  console.log('hook1', name)
  cb()
 }, 1000)
})

hook.tapAsync('hook2', (name, cb) => {
 setTimeout(() => {
  console.log('hook2', name)
  cb()
 }, 1000)
})

hook.tapAsync('hook3', (name, cb) => {
 setTimeout(() => {
  console.log('hook3', name)
  cb()
 }, 1000)
})

hook.callAsync('qxc', () => {
 console.log('✨ Down...')
})

/*
结果
hook1 qxc
hook2 qxc
hook3 qxc
✨ Down...
*/
```

### AsyncSeriesWaterfallHook 异步串行后一个拿前一个返回值

```javascript
const { AsyncSeriesWaterfallHook } = require('tapable')

const hook = new AsyncSeriesWaterfallHook(['hook'])

hook.tapAsync('hook1', (name, cb) => {
 setTimeout(() => {
  console.log('hook1', name)
  cb(null, 'hook1执行结果')
 }, 500)
})

hook.tapAsync('hook2', (data, cb) => {
 setTimeout(() => {
  console.log('hook2', data)
  cb(null, 'hook2执行结果')
 }, 1000)
})

hook.tapAsync('hook3', (data, cb) => {
 setTimeout(() => {
  console.log('hook3', data)
  cb(null)
 }, 2000)
})

hook.callAsync('qxc', () => {
 console.log('✨ Down...')
})

/*
结果
hook1 qxc
hook2 hook1执行结果
hook3 hook2执行结果
✨ Down...
*/
```

# ES6+

本文是我在学习 `JavaScript ES6+` 这一部分内容时知识点的记录。<br>

> 参考资料：[MDN JavaScript Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## let、块级作用域、const 常量

### let 声明变量

1. 使用 `let` 定义的变量在同一作用域下不可被重复定义：

```javascript
let b = 1
let b = 2 // 报错 语法错误：标识符“b”已经被声明
// SyntaxError: Identifier 'b' has already been declared

let c = 1
var c = 2 // 报错 语法错误：标识符“c”已经被声明
// SyntaxError: Identifier 'c' has already been declared
```

2. 使用 `var` 声明过的变量也不可被 `let` 重复声明：

```javascript
var a = 1
let a = 2 // 报错 语法错误：标识符“a”已经被声明
// SyntaxError: Identifier 'a' has already been declared
```

3. 使用 let 声明的变量在预编译时不会提升，会产生一个暂时性死区:

```javascript
console.log(a) // 报错，引用错误: 在初始化之前不能访问 'a'
let a = 1
// ReferenceError: Cannot access 'a' before initialization

function test(x = y, y = 2) {
 console.log(x, y)
}
test() // 报错，引用错误: 在初始化之前不能访问 'y'
// ReferenceError: Cannot access 'y' before initialization

console.log(typeof a) // 报错，引用错误: 在初始化之前不能访问 'a'
let a
// ReferenceError: Cannot access 'a' before initialization
```

4. `let` 只能在当前的作用域下生效:

```javascript
if (1) {
 let a = 2
}
console.log(a) // 报错
for (let i = 0; i < 10; i++) {
 let a = 1
}
console.log(a) // 报错
console.log(i) // 报错
```

### 块级作用域

花括号中的是独立的块级作用域：

```javascript
let a = 1
{
 let a = 2
 console.log(a) // 2
}
console.log(a) // 1
```

`for` 循环中有两个作用域：

```javascript
for(父级作用域) {
    子级作用域
}

for(let i = 0; i < 10; i++) {
    let i = 'abc';
    console.log(i);
}
// 上面的 for 循环执行后将会打印 10 个 abc
// 因为 for 括号中的 和 花括号中的 是两个不同的作用域
// 花括号作用域是括号作用域的子作用域，括号作用域又是全局作用域的子作用域，这样就形成了一个作用域链：
// 自顶到底： 全局作用域  -->   括号作用域   -->   花括号作用域
```

### const 声明常量

使用 `const` 声明的是常量，常量是不可被修改的:

```javascript
// 使用 const 声明一个常量：
const a = 1
console.log(a) // 1

// 常量不可被修改，下面的代码将抛出错误
a = 2 // 报错

// 常量不可被删除
delete a
console.log(a) // 1
```

## 模版字符串 & 字符串新增方法

` `` ` 反引号定义模版字符串，在模版字符串中可以随意换行。<br>
字符串模板中使用 `${}` 的形式添加变量

> 使用这种方法拼接字符串比使用 `+` 的方式更简洁美观

```javascript
var name = 'Bob'
var age = 19
var message = `Hello ${name}, Your age is ${age}. `
console.log(message)
// Hello Bob, Your age is 19.
```

字符串新增的一些方法:

1. `str.includes()` 在字符串中查找指定的字符，返回布尔值

```javascript
var str = 'Hello World!'
var message = str.includes('llo')
console.log(message)
// true
```

2. `str.startsWith()` 检测字符串是否以指定的字符开头，返回布尔值

```javascript
var str = 'Hello World!'
var message = str.startsWith('H')
console.log(message)
// true
```

3. `str.endsWith()` 检测字符串是否以指定的字符结尾，返回布尔值

```javascript
var str = 'Hello World!'
var message = str.endsWith('!')
console.log(message)
// true
```

4. `str.repeat()` 指定字符串被重复多少次，返回重复指定次数的字符串

```javascript
var str = 'Hello World!'
var message = str.repeat(3)
console.log(message)
// Hello World!Hello World!Hello World!
```

5. `str.padStart()` 往字符串开头填充指定的字符（需指定填充后字符串的长度）

```javascript
var name = 'Bob'
var age = 19
var message = name.padStart(5, age)
console.log(message)
// 19Bob
```

6. `str.padEnd()` 往字符串末尾填充指定的字符（需指定填充后字符串的长度）

```javascript
var name = 'Bob'
var age = 19
var message = name.padEnd(5, age)
console.log(message)
// Bob19
```

## 解构赋值

一个基本的结构赋值:

```javascript
// 解构赋值，等号两边的格式必须一致
let [a, b, c] = [1, 2, 3]
console.log(a, b, c) // 1 2 3

// let [a, [b, c]] = [1, [2, 3]]
// console.log(a, b, c)    // 1 2 3
```

### 解构对象

```javascript
// 解构对象
// 直接把对象的键提取出来并用花括号包裹起来就可以解构对象
let {
 name,
 age,
 email,
 likes: { first: firstLike }
} = {
 name: 'Bob',
 age: 18,
 email: 'Bob@gmail.com',
 likes: {
  first: 'game',
  second: 'study'
 }
}
console.log(name, age, email, firstLike) // Bob 18 Bob@gmail.com game
```

### 指定别名

```javascript
// key:name     指定别名，在键后写冒号，冒号后面指定的字符就替代了键名
let {
 name: n,
 age: g,
 email: e
} = {
 name: 'Bob',
 age: 18,
 email: 'Bob@gmail.com'
}
console.log(n, g, e) // Bob 18 Bob@gmail.com
```

### 设置默认值

```javascript
// 设置默认值，仅在值为 undefined 时默认值生效
let [a, b, c = '默认值'] = [1, 2]
console.log(a, b, c) // 1 2 "默认值"
```

### 解构函数返回值

```javascript
// 解构函数的返回值
let people = () => ({ name: 'Bob', age: 18 })
let { name, age } = people() // 使用定义好的变量接收函数返回的值
console.log(name, age) // Bob 18
```

### 引入模块时的解构

```javascript
// 这里的 a b c 对应的是 test 模块中返回的三个值方法
import { a, b, c } from './test'
```

### 函数形参使用解构赋值

```javascript
// 函数形参使用解构赋值
let fun = ({ name, age }) => console.log(name + "'s age is " + age)
fun({
 name: 'Bob',
 age: 20
}) // Bob's age is 20
```

## this 指向、箭头函数、...运算符、函数参数

### this

`this` 指向的 `4` 条规则：

1. 默认绑定： 默认指向 `window` ：

```javascript
function test() {
 console.log(this)
}
test()
// Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
```

2. 隐式绑定：被谁调用就指向谁：

```javascript
function test() {
 console.log(this.a)
}
var obj = {
 a: 1,
 b: 2,
 test: test
}
obj.test()
// 1
```

3. 显示绑定：`call(obj, a, b, c)`、`apply(obj, [a, b, c])`、`bind(obj, a, b, c)`

```javascript
var obj = {
 name: 'Bob',
 age: 19
}
function sayName() {
 console.log(this.name)
}
sayName.call(obj)
// Bob
```

4. `new` 构造函数：

```javascript
function Cars(name, color) {
 this.name = name
 this.color = color
 this.sayName = function () {
  console.log(this.name)
 }
}
var car = new Cars('BMW', 'red')
car.sayName()
// BMW
```

### 箭头函数 `=>`

- 箭头函数是由 `=>` 操作符定义的；
- 箭头函数是一个函数表达式；
- 箭头函数的 `this` 指向定义这个函数时所在的对象，而不是运行函数时所在的对象；
- 构造函数不能使用箭头函数；
- 箭头函数中不存在 `arguments`，可以使用 `...` 运算符；
- 能用到回调函数的地方都能使用箭头函数
    一个基本的箭头函数最基本的定义形式：

```javascript
() => {};
```

当仅有一个参数或一个返回值时，定义一个箭头函数的语法为：

```javascript
var 函数名 = 形参 => 返回值；

var a = 'test';
var f = a => a + ' Hello World!';
console.log(f(a));  // test Hello World!

// 等价于
function f(a) {
    return a + ' Hello World!';
}
console.log(f(a));  // test Hello World!
```

当有多个形参或多条函数内容时，定义一个箭头函数的语法为：

```javascript
var 函数名 = (形参1, 形参2 ...) => {
    // 函数体
}

var a = 1;
var b = 2;
var add = (x, y) => {
    var result = x + y;
    return result;
}
console.log(add(a, b));
// 3

//等价于
function add(x, y) {
    var result = x + y;
    return result;
}
```

### `...` spread/rest 运算符

#### 用于展开或收集数组

箭头函数中没有 `arguments` 实参列表，但可以使用 `...` 操作符来获取实参列表；<br>
展开或重置的基本用法：

```javascript
// ... 运算符展开或收集数组
// 展开数组
let arr = [1, 2, 3, 4, 5]
console.log(...arr) // 1 2 3 4 5
// 收集数组（主要用于函数的形参中）
function makeArray(...names) {
 names.forEach((item) => console.log(item))
}
makeArray('Bob', 'Jack', 'Henry')
// Bob
// Jack
// Henry
```

#### `...` 收集实参列表或数组

```javascript
// ... 运算符（收集实参列表）
// ... 后默认就是一个数组，传多少个实参都会被放入到这个数组中
var sum = (...args) => {
 console.log(args)
 console.log(args[0] + args[1])
}
sum(1, 2)
// [1, 2]
// 3

// ... 运算符收集 剩余的所有实参数组 必须是最后一个参数
// 收集剩余参数时，...必须放到形参列表的末尾，这样前面依然可以正常传实参，多余的实参会被收入到该数组中
let fn = (a, b, ...c) => {
 console.log(a, b, c)
}
fn(1, 2, 3, 4, 5)
// 1 2 [3, 4, 5]
```

#### `...` 展开实参列表或数组

```javascript
// ... 运算符（展开实参列表）
function foo(x, y, z) {
 console.log(x, y, z)
}
foo(...[1, 2, 3])
// 等价于
foo(1, 2, 3)
// 等价于
foo.apply(null, [1, 2, 3])
// 1 2 3
// 1 2 3
// 1 2 3

// ... 运算符 展开数组
var a = [2, 3, 4]
let b = [1, ...a, 5]
console.log(b)
// [1, 2, 3, 4, 5]
```

#### 箭头函数与解构赋值结合

```javascript
// 箭头函数与解构赋值结合
var full = ({ first, last } = {}) => first + '' + last
console.log(full({ first: 3, last: 5 })) // '35'

// 等价于
function full({ first, last } = {}) {
 return first + '' + last
}
```

#### 箭头函数应用于数组排序

```javascript
// 箭头函数应用于数组排序
var arr = [109, 59, 6, 9, 15, 4651, 13, 52, 1235]
var arr1 = arr.sort((a, b) => a - b)
console.log(arr1)
// [6, 9, 13, 15, 52, 59, 109, 1235, 4651]

// 使用 ...args 收集实参数组
const sortNum = (...args) => args.sort((a, b) => a - b)
console.log(sortNum(109, 59, 6, 9, 15, 4651, 13, 52, 1235))
// [6, 9, 13, 15, 52, 59, 109, 1235, 4651]
```

### 函数参数

函数默认参数，可在定义函数形参时指定默认值：

```javascript
// 形参默认值
// 指定默认值的形参应该放到形参列表的末尾
function people(name, age = 19) {
 console.log(name + "'s age is " + age)
}
```

函数参数默认已经定义了，不能再使用 `let`, `const` 声明：

```javascript
// 函数参数默认已经定义了，不能再使用 let const 声明
function test(age = 18) {
 let age = 20 // 错误，形参 age 已经被定义
}
```

## 数组新增

### 数组新增方法

1. `Array.from(arr)` 将类数组转为纯数组，返回一个纯数组

```javascript
let lis = document.querySelectorAll('ul li')
console.log(lis) // Nodelist(5) [li, li, li, li, li] （类数组）
// Array.from(arr)  将类数组转为纯数组
let liArr = Array.from(lis)
console.log(liArr) //(5) [li, li, li, li, li] （纯数组）
// Array.from() 还可以将所有带有 length 属性的类型都转为数组
let str = 'Hello' // 字符串带有 length 属性，转换字符串
console.log(Array.from(str)) // ["H", "e", "l", "l", "o"]
let obj = {
 0: 'apple',
 1: 'banana',
 2: 'orange',
 length: 3
} // 转换类数组
console.log(Array.from(obj)) // ["apple", "banana", "orange"]
```

2. `Array.of(arg1, arg2[,arg3 ...])` 把一组值转为数组，类似于 `new Array()`

```javascript
// Array.of(arg1, arg2[,arg3 ...])  将一组值转为数组，类似于 new Array
let ofArr = Array.of('apple', 'banana', 'orange')
console.log(ofArr) //  ["apple", "banana", "orange"]
```

### 数组实例方法

1. `arr.find((item, index, arr) => {})` 遍历数组，在找到第一个**对回调函数的条件返回 `true` 的项**时，返回该项，找不到则返回 `undefined`

```javascript
// arr.find((item, index, arr) => {})    遍历数组，在数组中查找指定的项，返回第一个找到的项，没找到返回 undefined
let nums = [1, 4, 6, 76, 234, 110]
let result = nums.find((item, index, arr) => {
 return item > 100
})
console.log(result) // 234
```

2. `arr.findIndex((item, index, arr) => {})` 在数组中查找满足条件的项，返回该项的索引，没找到返回 `-1`

```javascript
// arr.findIndex((item, index, arr) => {})  遍历数组，在数组中查找满足条件的项，返回该项的索引，没找到返回 -1
let nums = [1, 4, 6, 76, 234, 110]
let result = nums.findIndex((item, index, arr) => {
 return item > 100
})
console.log(result) // 4
```

3. `arr.fill(填充的值，开始位置，结束位置)` 填充数组
    > 如果不指定开始位置和结束位置则全部填充

```javascript
// arr.fill(item, startIndex, endIndex)     填充数组
let emptyArr = new Array(5)
console.log(emptyArr) // [empty × 5]
let newArr = emptyArr.fill('apple', 0, 3)
console.log(newArr) // ["apple", "apple", "apple", empty × 2]
```

4. `arr.includes(item)` 判断数组中是否包含指定的项，返回布尔值

```javascript
// arr.includes(item)     判断数组中是否包含指定的项，返回布尔值
let colors = ['red', 'green', 'orange']
console.log(colors.includes('green')) // true
console.log(colors.includes('blue')) // false
```

### 数组循环相关

#### `ES5`中数组数组实例可以调用的各种循环方法

1. `arr.forEach((item, index, arr) => {})` 代替普通 `for` 循环，没有返回值
2. `arr.map((item, index, arr) => {})` 正常情况下，需要配合 `return` 返回的是一个新的数组，若是没有 `return` ，相当于 `forEach`。<br>
    > 注意：平时只要用 `map`，一定要有 `return`。
3. `arr.filter((item, index, arr) => {})` 过滤数组，把对回调函数中的条件返回 `true` 的项加入到一个新的数组然后返回
4. `arr.some((item,index,arr) => {})` 查询数组，只要数组中有一项对回调函数返回 `true`，`some()` 方法就返回 `true`，否则就返回 `false`
5. `arr.every((item, index, arr) => {})` 查询数组，必须数组中的所有项都对回调函数返回 `true`，`every()` 方法才返回 `true`，否则就返回 `false`
6. `reduce((prev, cur, index, arr) => {})` 递归数组，得到数组中所有的项累计（加减乘除）的值，从左往右
7. `reduceRight((prev, cur, index, arr) => {})` 递归数组，得到数组中所有的项累计（加减乘除）的值，从右往左

#### `ES6` 新增循环数组方法

- `for...of...` `for of` 循环默认可以拿到数组中的每一项，而不是数组的每一项的索引

```javascript
// for of 循环  默认循环数组，拿到数组中的每一项
let arr = ['apple', 'banana', 'orange']
for (item of arr) {
 console.log(item)
}
// apple
// banana
// orange
```

- `arr.keys()` 返回只包含索引的数组 `Array Iterator {}`，此数组只能被迭代；`for (index of arr.keys()) {}` 拿到数组中每一项的索引:

```javascript
// for (index of arr.keys()) {}  拿到数组中每一项的索引
let arr = ['apple', 'banana', 'orange']
for (index of arr.keys()) {
 console.log(index)
}
// 0
// 1
// 2
```

- `arr.entries()` 返回包含索引和值的数组 `Array Iterator {}`，此数组只能被迭代；`for ([index, item] of arr.entries()) {}` 拿到数组中每一项的索引和值:

```javascript
// for ([index, item] of arr.entries()) {}  拿到数组中每一项的索引和值
let arr = ['apple', 'banana', 'orange']
for ([index, item] of arr.entries()) {
 console.log(index, item)
}
// 0 "apple"
// 1 "banana"
// 2 "orange"
```

- `arr.values()` 返回包含值的数组 `Array Iterator {}`，此数组只能被迭代；`for (item of arr.values()) {}` 拿到数组中每一项的索引和值:<br>
    > `for of`  默认循环的就是  `arr.values()`

```javascript
// for (item of arr.values()) {}    拿到数组中的每一项，for of 默认循环的就是 arr.values()
let arr = ['apple', 'banana', 'orange']
for (item of arr.values()) {
 console.log(item)
}
// apple
// banana
// orange
```

## 对象新增

### 对象简洁语法

- 可以将相同名称的属性和值变为只写为一个属性名
- 方法可以直接声明，但不能使用箭头函数，会造成 `this` 混乱

```javascript
// 对象简洁语法，可以将相同名称的属性和值只写为一个属性名
// 方法可以直接声明，但不能使用箭头函数，会造成 this 混乱
let name = 'Bob'
let age = 10
let obj = {
 // name: name,
 name, // 等价于上面 // age: age,
 age, // 等价于上面 // sayName: function () { //     console.log(this.name) //     },
 sayName() {
  // 等价于上面
  console.log(this.name)
 }
}
console.log(obj) // {name: "Bob", age: 10, sayName: ƒ }
```

### 对象构造函数`Object`新增方法

以下方法通过对象构造函数 `Object` 来调用

- `Object.is(arg1, arg2)` 判断两个参数是否相等（使用这种方法时，`NaN` 和 `NaN` 是相等的），返回布尔值

```javascript
//Object.is(arg1, arg2)     判断两个参数是否相等
// 使用这种方法时，NaN 和 NaN 是相等的
// -0 和 +0 不相等
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(-0, +0)) // false
console.log(Object.is('aaa', 'aaa')) // true
```

- `Object.assign({}/[], sourceObj1[,sourceObj2 ...])` 合并对象或数组，将多个对象或数组合并到一个指定的对象中，返回一个新的对象<br>
    > 用途：复制一个对象或数组，合并参数<br>
    > 注意：此方法会改变位于第一个参数的对象

```javascript
// Object.assign({}/[], sourceObj1[,sourceObj2 ...])   合并对象或数组，将多个对象或数组合并到一个指定的对象中
// 参数1：合并后的对象或数组
// 参数2：要合并的对象1
// 参数3：要合并的对象2
// ...
// 注意：后面指定的对象中如果有相同的属性或方法，后面的覆盖前面的
let obj1 = { name: 'Bob' }
let obj2 = { age: 20 }
let obj3 = { name: 'Suxi' }
let json = Object.assign({}, obj1, obj2, obj3)
// 有相同的属性，后面的覆盖前面的
console.log(json) // {name: "Suxi", age: 20}
// 复制数组
let arr = ['apple', 'banana', 'orange']
let arr2 = Object.assign([], arr)
console.log(arr2) // ["apple", "banana", "orange"]
```

- `Object.keys()` 取出对象的键，返回键的数组
- `Object.values()` 取出对象的值，返回值的数组
- `Object.entries()` 取出对象的键和值，返回键和值的数组

```javascript
// Object.keys()    取出对象的键，返回键
// Object.values()  取出对象的值，返回值
// Object.entries() 取出对象的键和值，返回键和值
let colors = {
 apple: 'red',
 banana: 'yellow',
 orange: 'orange'
}
// 遍历对象的键
for (let key of Object.keys(colors)) {
 console.log(key)
}
// apple
// banana
// orange

// 遍历对象的值
for (let value of Object.values(colors)) {
 console.log(value)
}
// red
// yellow
// orange

// 遍历对象的键和值
for (let item of Object.entries(colors)) {
 console.log(item)
}
// ["apple", "red"]
// ["banana", "yellow"]
// ["orange", "orange"]

// 结构对象的 keys()、values() 和 entries() 方法
let { keys, values, entries } = Object
// 使用结构的方法，得到跟上面一样的结果
for (let key of keys(colors)) {
 console.log(key)
}
for (let value of values(colors)) {
 console.log(value)
}
for (let item of entries(colors)) {
 console.log(item)
}
```

## Promise

`Promise` 对于解决异步问题，基本使用：

```javascript
// Promise 对象，解决异步

// 被 promise 测试的变量
let a = 10

// 创建一个 Promise 实例
let promise = new Promise(function (resolve, reject) {
 // resolve     成功的时候返回的结果
 // reject       失败的时候返回的结果
 // 这里定义成功或失败后返回的结果，
 // 在 Promise 实例的 .then 方法的 回调的 参数中 自动传入
 if (a == 10) {
  // 这里定义 .then(res) 中 res 的内容
  resolve('成功')
 } else {
  // 这里定义 .then(err) 中 err 的内容
  reject('失败')
 }
})

// Promise 实例的 .then 方法，接收两个回调，一个是成功的回调，一个是失败的回调
// 这里回调接收到的参数就是创建 Promise 实例时所设置的 resolve 和 reject 的值
promise.then(
 (res) => {
  // 成功的回调
  console.log(res)
 },
 (err) => {
  // 失败的回调
  console.log(err)
 }
)

// 失败的回调也可以放在 .catch 中：
promise.catch((err) => {
 // 等价于 .then 的第二个参数
 console.log(err)
})

// 因为 .then 返回的还是 promise 对象，所有可以在 .then 后面直接 .catch
promise
 .then((res) => {
  console.log(res)
 })
 .catch((err) => {
  console.log(err)
 })
// 这就是一个 promise 的基本流程
```

### `Promise.resolve()`

`Promise.resolve()` 创建一个 `Promise` 实例 并 定义这个实例的**成功**状态

```javascript
// Promise.resolve()    创建一个 Promise 实例 并 定义这个实例的成功状态
let pTest1 = Promise.resolve('成功')
pTest1.then((res) => console.log(res)) // 成功
```

等价于：

```javascript
new Promise((resolve) => {
 resolve('成功')
})
```

### `Promise.reject()`

`Promise.reject()` 创建一个 `Promise` 实例并 定义这个实例的的**失败**状态

```javascript
// Promise.reject()     创建一个 Promise 实例 并 定义这个实例的的失败状态
let pTest2 = Promise.reject('失败')
pTest2.catch((err) => console.log(err)) // 失败
```

### `Promise.all()`

`Promise.all()` 将多个 `Promise` 实例包装成一个新的 `Promise` 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回**最先被 `reject` 失败状态的值**。

> 注意：必须确保放入到数组 `Promise` 实例都是 `resolve` 状态，也就是成功状态，否则没什么意义

```javascript
// Promise.all()     将多个Promise实例包装成一个新的Promise实例。
// 成功和失败的返回值是不同的，成功的时候返回的是一个结果数组
// 而失败的时候则返回最先被 reject 失败状态的值。
let p1 = Promise.resolve('成功1')
let p2 = Promise.resolve('成功2')
let p3 = Promise.reject('失败 3')
Promise.all([p1, p2]).then((res) => console.log(res)) // ["成功1", "成功2"]
Promise.all([p1, p2, p3])
 .then((res) => console.log(res))
 .catch((err) => console.log(err)) // 失败 3
```

`Promise.all` 在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个 `ajax` 的数据回来以后才正常显示，在此之前只显示 `loading` 图标。<br>

需要特别注意的是，**`Promise.all` 获得的成功结果的数组里面的数据顺序和 `Promise.all` 接收到的数组顺序是一致的**，即 p1 的结果在前，即便 p1 的结果获取的比 p2 要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用 `Promise.all` 毫无疑问可以解决这个问题。

### `Promise.race()`

`Promise.race()` 顾名思义，`Promse.race` 就是赛跑的意思，意思就是说，`Promise.race([p1, p2, p3])` 里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

```javascript
// Promise.race()      把一组 Promise 实例的成功或失败的结果放入到数组中，
// 返回数组中最先有结果（不论是成功或失败）的 Promise 实例 的结果
let p1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('成功 1')
 }, 1000)
})
let p2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  reject('失败 2')
 }, 500)
})
Promise.race([p1, p2])
 .then((res) => {
  console.log(res)
 })
 .catch((err) => {
  console.log(err)
 }) // 失败 2，因为失败状态先被捕获到
```

## 类（class）和继承

### ES5 构造函数

先来回顾一下 `ES5` 的构造函数

```javascript
// ES5 构造函数
function Person(name, age) {
 this.name = name
 this.age = age
}
let person = new Person('Bob', 20)
// 打印出对象的构造函数，就是上面定义的 Person
console.log(person.constructor) // ƒ Person(name, age) {...}
// 给构造函数原型添加方法
Person.prototype.sayName = function () {
 console.log(this.name)
}
Person.prototype.sayAge = function () {
 console.log(this.age)
}
// 实例对象调用方法
person.sayName() // Bob
person.sayAge() // 20
// 添加方法也可以使用下面这种形式
Object.assign(Person.prototype, {
 sayMessage() {
  console.log(`你的名字是：${this.name}，你的年龄是：${this.age}`)
 }
})
// 调用方法
person.sayMessage() // 你的名字是：Bob，你的年龄是：20
```

### ES6 class

#### 基本使用

```javascript
// ES6 class 类
// 创建类：
class Person1 {
 constructor(name, age) {
  // 使用 new 创建实例时，该 constructor 方法自动运行
  // new 传过来的参数都在该方法的形参中
  console.log(
   `使用 new 创建实例，我被自动执行了，接收到的参数是：${name} ${age}`
  )
 }
}
// 创建实例
// 不传参数，两个 undefined
let person1 = new Person1() // 使用 new 创建实例，我被自动执行了，接收到的参数是：undefined undefined
// 传递参数
let person2 = new Person1('Jack', 40) // 使用 new 创建实例，我被自动执行了，接收到的参数是：Jack 40
//类中的属性和方法：
// constructor 方法用来接收属性
// 其他方法可以写在 constructor 方法后面，方法之间不需要加逗号
class Person2 {
 constructor(name, age) {
  this.name = name
  this.age = age
 } // 方法之间不需要加逗号！
 sayName() {
  console.log(this.name)
 }
 sayAge() {
  console.log(this.age)
 }
}
// 创建实例
let peiQi = new Person2('佩奇', 3)
// 调用方法
peiQi.sayName() // 佩奇
peiQi.sayAge() // 3
// 也可以使用表达式的方式创建类
// 这种方式与上面的方式结果一样，推荐使用上面的方式
const Persons = class {}
```

> 注意：使用 `class` 声明的类没有预解析提升的功能，必须先声明类后再使用

#### `get` `set`

`get` 取值，`set` 存值

```javascript
// get 取值，set 存值
class Car {
 _color = ''
 constructor(color) {
  this._color = color
 }
 set color(value) {
  console.log('设置Car的颜色为：' + value)
  this._color = value
 }
 get color() {
  console.log('获取Car的颜色为：' + this._color)
  return this._color
 }
}

const car = new Car('red')
// 实例取值
car.color // 获取Car的颜色为：red
// 实例存值
car.color = 'green' // 设置Car的颜色为：green
// 实例取值
car.color // 获取Car的颜色为：green
```

#### `static`

`static` 声明类本身的静态方法，只能通过类本身调用

> 通过 `static` 声明的方法，可以被子类继承（会在后面介绍）

```javascript
// static 声明类身上的静态方法，只能通过类本身调用
class Person {
 constructor() {}
 message() {
  console.log('这是 message 方法')
 }
 static method() {
  console.log('这是类身上的静态方法 method')
 }
}
let person = new Person()
// 通过实例调用普通方法
person.message() // 这是 message 方法
// 通过类本身调用静态方法
Person.method() // 这是类身上的静态方法 method
```

#### 父类、子类、继承

- 子类继承父类，使用 `extends` 关键字，语法：`class` 子类名 `extends` 父类名
- 子类继承父类的属性，使用 `super()` 方法
- 子类继承父类后，子类的 `this` 和父类的 `this` 指向同一个地方
- 子类不能有跟父类相同的属性名，否则会覆盖掉父类的属性
- 子类跟父类有相同的方法名时，先在自己的方法中运行父类的方法，然后再运行自己的方法

```javascript
// 创建父类
class Car {
 constructor(color) {
  // 初始化属性
  this.color = color
 }
 sayColor() {
  console.log(this.color)
 }
}
// 创建子类
// extends 指定要继承的父类
// 语法：class 子类名 extends 父类名
class XnyCar extends Car {
 // constructor 的第一个参数是父类拥有的属性
 constructor(color, name) {
  // super()  将父类里的东西接收过来放到指定的参数里
  super(color)
  this.name = name
 }
 sayName() {
  console.log(this.name)
 }
}

// 创建父类实例
let car = new Car('red')
// 正常使用自己的方法
car.sayColor() // red
// 创建子类实例
let xnyCar = new XnyCar('green', 'BMW')
// 子类使用父类的方法
xnyCar.sayColor() // green
// 子类使用自己的方法
xnyCar.sayName() // BMW
```

如果子类中的方法和父类中的方法同名，则子类会覆盖父类的方法；<br>
可以在冲突的方法中使用 `super.父类的方法` ，先执行父类的方法，再执行子类的逻辑：

```javascript
// 子类父类方法名冲突，默认子类覆盖父类
// 解决方法：在子类的方法中先运行父类的方法，再运行自己的方法
class Father {
 constructor(fname) {
  this.fname = fname
 }
 sayName() {
  console.log(`爸爸的名字是：${this.fname}`)
 }
}
class Children extends Father {
 constructor(fatherName, name) {
  // 继承父类的属性
  super(fatherName)
  this.name = name
 }
 sayName() {
  // super.sayName() 先运行父类的方法，再定义子类的方法
  super.sayName()
  console.log(`儿子的名字是：${this.name}`)
 }
}
let children = new Children('老王', '小王')
children.sayName()
// 爸爸的名字是：老王
// 儿子的名字是：小王
```

## 模块化

> 注意：模块化需要运行在服务器环境中

### 定义模块

在需要导出的 `js` 文件中的变量名前加上 `export` :

```javascript
export let a = 1
export let b = 2
export let c = 3
// 也可以写成下面这种形式
let d = 4
let e = 5
let f = 6
export {
 d, // 相当于 d:d
 e as eee, // 指定别名 , 这里的别名就是引入文件时的指向该变量的名称
 f as fff // 指定别名
}
```

注意：使用 export 导出的变量在引入时必须加上花括号，使用 export default 导出的变量引入时则不需要加花括号

```javascript
// 使用 export 导出的数据在引入时必须加上花括号，使用 export default 导出的数据引入时则不需要加花括号
export const a = 12
export default 'test'
```

### 引入模块中某个功能

`import { xxx } from './xxx'` 引入模块中某个功能

```javascript
// import {xxx} from './xxx'    引入模块中某个功能
// 引入的变量必须是在模块文件中导出（export）了的
// 同时引入一个模块中的多个变量，必须使用 {} 包裹要引入的变量，即使只有一个
import { b, c, d } from './modules/test.js'
console.log(b, c, d)

// 引入模块时指定别名
import { b as q, c as w, d as e } from './modules/test.js'
console.log(q, w, e)

// import * as xx from './xxx'  引入一个模块下的所有导出的变量，
// 返回一个 Module 对象，对象中的属性对应了所有导出的变量
// let a = 1,
//     b = 2,
//     c = 3;
// export {
//    a,
//    b,
//    c
// }
import * as obj from './modules/2.js'
console.log(obj) // {a: 1, b: 2, c: 3}
console.log(obj.a, obj.b, obj.c) // 1 2 3
// 只有在模块中指定了 export default 时，引入变量才不需要加花括号 {}
// export default "Bob"
import name from './modules/name.js'
console.log(name) // Bob
// 同时引入 export 和 export default 导出的数据，花括号必须在后面
// 数据如下：
// export const a = 12;
// export default "test";
// 引入
import test, { a } from './modules/test.js'
console.log(test, a) // test 12
```

### 引入模块文件

在 `script` 标签中 `type="module"`, 然后使用 `import` 关键字引入模块文件

```javascript
<script type='module'>
 // 引入整个文件 import './modules/test.js' // 也可以引入 url import
 'https://code.jquery.com/jquery-3.5.0.min.js'
</script>
```

> 注意: 这种方式只是引入了整个文件，并不是引入模块中的某个功能。`import` 模块只会导入一次，后面再导入就不会生效

### `import` 特点

1. `import` 可以是相对路径，也可以是绝对路径（url）
2. `import` 导入模块只会导入一次，无论导入了多少次
3. `import './modules/1.js` 如果这么用，相当于引入了整个模块文件
4. 有预编译变量提升效果，`import` 会自动提升到顶部，首先执行
5. 导入的文件是响应式的，源文件发生改变，导入的地方也会改变
6. `import` 引入文件，是静态的，只能先引入文件，然后在下面使用，不能写在分支语句（`if else`）中

### `import()`

`import()` 函数，可以动态引入文件，该方法引入文件会返回一个 `Promise` 对象，可以在 `.then` 中使用模块中的数据（是异步的）

```javascript
// import() 动态引入文件，返回 Promise 对象 , 成功状态的数据就是一个 Module 对象，其中包含了模块中的所有数据
// 在分支语句中使用 import()   函数动态引入模块并使用模块中的数据
let temp = 2
if (temp === 1) {
 // 模块文件内容如下：
 // export default "Bob";
 import('./modules/name.js').then((res) => console.log(res)) // {default: "Bob"}
} else {
 // 模块文件内容如下：
 // export const a = 12;
 // export default "test";
 // let
 // b = 2,
 // c = 3,
 // d = 4;
 // export {
 // b,
 // c,
 // d
 // }
 import('./modules/test.js').then((res) => console.log(res)) // { a: 12, b: 2, c: 3, d: 4, default: "test" }
}
```

`import()` 特点：

1. 按需加载
2. 可以写在 `if` 中
3. 路径也可以动态

## `async`、`await`

`async` 和 `await` 主要是为了解决异步队列的问题 <br>
在 `async` 和 `await` 之前解决异步是使用，生成器 `function * fn() { yield xxx }` 的方法<br>
语法:

```javascript
// async 表示这个函数中有异步队列
async function fn() {
 let result = await xxx // await 表示执行完当前的异步任务才能执行后面的
 let result2 = await yyy // 异步任务2
 let result3 = await zzz // 异步任务...
}
```

`async` 和 `await` 特点：

1. `await` 只能放到 `async` 函数中
2. 相比 `genrator` 语义化更强
3. `await` 后面可以是 `Promise` 对象，也可以是数字、字符串、布尔等
4. `async` 函数返回的是一个 `Promise` 对象
5. 只要 `async` 函数中有一个 `await` 的 `Promise` 状态变为 `reject`(失败)，那么整个 `async` 函数就会中断执行
    > 注意：因为 `async` 中的 `await` 只要有任何一个出现错误都会影响整个函数的执行，所以要把每一个可能会出现错误的 `await` 都使用 `try{}catch(e){}` 捕获

## `Set`

`Set` 是一种数据结构，类似于数组，但里面不能有重复值（类似于 Python 中的集合）

- `Set` 构造函数接收的是一个数组 `new Set([])`
- `WeakSet` 构造函数接收的是一个对象 `new WeakSet({})`（这种写法不靠谱，而且 `WeakSet` 没有 `size`，故下面就不展开介绍了）<br>
    `Set` 构造函数原型上的属性和方法：
    ![Set构造函数原型上的属性和方法](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/pictures/set.png)<br>
    `WeakSet` 构造函数原型上的属性和方法：
    ![WeakSet构造函数原型上的属性和方法](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/pictures/weakSet.png)

### `Set` 类型的属性和方法

```javascript
// 创建一个 Set
let setArr = new Set(['a', 'b', 'c'])
console.log(setArr) // {"a", "b", "c"}
// Set 不能有重复值
let setArr2 = new Set(['a', 'b', 'c', 'a', 'b'])
console.log(setArr2) // {"a", "b", "c"}
// add()    往 Set 末尾添加值，一次只能添加一个
setArr.add('d')
console.log(setArr) // {"a", "b", "c", "d"}
// delete()    删除 Set 中指定的值
setArr.delete('b')
console.log(setArr) // {"a", "c", "d"}
// has()    判断 Set 中有没有指定的值，返回布尔值
console.log(setArr.has('b')) // false
console.log(setArr.has('a')) // true
// size     查看 Set 里面值的个数，返回数值
console.log(setArr.size) // 3
// clear()  清空 Set
setArr.clear()
console.log(setArr) // {}
// 循环
for (item of setArr2) {
 console.log(item)
}
// a
// b
// c

// keys()   Set中每一项的键
for (item of setArr2.keys()) {
 console.log(item)
}
// a
// b
// c

// values() Set 中每一项的值
for (item of setArr2.values()) {
 console.log(item)
}
// a
// b
// c

// 通过上面三个例子我们发现，Set 循环的默认值、keys()、values() 结果都是一样的
// Set 循环的值默认是 values()

// entries()    Set 中每一项的键和值
for (item of setArr2.entries()) {
 console.log(item)
}
//  ["a", "a"]
//  ["b", "b"]
//  ["c", "c"]

// forEach((item, index) => {}) 遍历 Set，回调函数中的 item 和 index 是每一项的值和键
setArr2.forEach((item, index) => {
 console.log(item, index)
})
// a a
// b b
// c c
```

### 使用 `Set` 的特性给数组去重

```javascript
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7, 5]
// [...Set]  把 Set 转为数组
let newArr = [...new Set(arr)]
console.log(newArr) // [1, 2, 3, 4, 5, 6, 7]
```

## `Map`

- `Map` 是一种类似对象的数据类型，`Map` 的 `key` 可以是任何类型；
- `WeakMap` 的 `Key` 只能是对象，用处不大。。<br>
    `Map` 构造函数原型上的属性和方法：
    ![Map构造函数原型上的属性和方法](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/pictures/map.png)<br>
    `WeakMap` 上的属性和方法：
    ![WeakMap上的属性和方法](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/pictures/weakMap.png)

### `Map` 的基本方法和属性

```javascript
// map 是一种类似对象的类型
// 使用：
// 创建一个 map
let map = new Map()
console.log(map) // {}
// set(key, value)    设置一个键值对，此方法返回自身，可以链式调用
map.set('name', 'Bob')
console.log(map) // {"name" => "Bob"}
// get(key)     获取一个值
console.log(map.get('name')) // Bob
// delete(key)  删除一项
map.delete('name')
console.log(map) // {}
// 删完了，再增加两项
map.set('name', 'Bob').set('age', 20)
console.log(map) //  {"name" => "Bob", "age" => 30}
// has(key)     判断有没有指定的项，返回布尔值
console.log(map.has('name')) // true
console.log(map.has('sex')) // false
// size     返回 Map 中的项数
console.log(map.size) // 2
// clear()      清空 map
map.clear()
console.log(map) // {}
```

`Map` 的遍历方法：

```javascript
// Map 的循环
let newMap = new Map()
newMap.set('name', 'Bob').set('age', 30).set('sex', 'male')
console.log(newMap) // {"name" => "Bob", "age" => 30, "sex" => "male"}
// 基本循环，每一项都是一个数组
for (let item of newMap) {
 console.log(item)
}
// ["name", "Bob"]
// ["age", 30]
// ["sex", "male"]

// keys()   拿到 map 的每一个键
for (let key of newMap.keys()) {
 console.log(key)
}
// name
// age
// sex

// values() 拿到 map 的每一个值
for (let value of newMap.values()) {
 console.log(value)
}
// Bob
// 30
// male

// entries()    拿到 Map 的每一个键值对，默认Map循环的就是 entries
for (let item of newMap.entries()) {
 console.log(item)
}
// ["name", "Bob"]
// ["age", 30]
// ["sex", "male"]

// forEach((value, key) => {})  循环 Map，回调函数中第一个参数是 值，第二个参数是 键
newMap.forEach((value, key) => {
 console.log(key, value)
})
// name Bob
// age 30
// sex male
```

### `Map` 和 `Set` 各自的特性

1. `Set` 里面是数组，不重复，没有 `key` 没有 `get` 和 `set` 方法；
2. `Map` 是对 `json` 功能的增强，`key` 可以是任意类型的值

## 异步循环

`ES9` 引入了异步迭代器(asynchronous iterators),使 `await` 可以和 `for...of` 循环一起使用

```javascript
async function foo(array) {
 for await (let i of array) {
  doSomething(i)
 }
}
```

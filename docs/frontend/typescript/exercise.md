<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-09-05 10:29:12
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-15 11:23:43
-->
# TS 练习题

本文用于记录我对 [「重学TS 2.0 」](https://github.com/semlinker/awesome-typescript/issues?page=2&q=is%3Aissue+is%3Aopen) 系列练习题的学习。

## 第一题

### 题目

```ts
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer'
  }
}
```

以上代码为什么会提示错误，应该如何解决上述问题？

### 解答

为什么报错？

- 因为 `T` 兼容 `User` 类型，即包含但不限于 `User` 类型，所以返回为 `T` 类型可能不仅仅只有 `id` 和 `kind`，所以要么修改返回值类型，要么就修改返回值

1. 修改返回值类型:

```ts
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): User {
  return {
    id: u.id,
    kind: 'customer'
  }
}
```

2. 修改返回值：

```ts
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: 'customer'
  }
}
```

## 第二题

### 题目

本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

```ts
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
```

### 解答

1. 使用函数重载:

```ts
function f(a: number, b: number): number;
function f(a: string, b: string): string;
function f(a, b) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}
f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
```

2. 泛型解决

```ts
function f<T extends string | number>(a: T, b: T) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return (a as number) + (b as number); // error as b can be number | string
  }
}
f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
```

## 第三题

### 题目

在 [掌握 TS 这些工具类型，让你开发事半功倍](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484142&idx=1&sn=946ba90d10e2625513f09e60a462b3a7&chksm=ea47a3b6dd302aa05af716d0bd70d8d7c682c9f4527a9a0c03cd107635711c394ab155127f9e&scene=21#wechat_redirect) 这篇文章中，阿宝哥介绍了 TS 内置的工具类型：`Partial<T>`，它的作用是将某个类型里的属性全部变为可选项 `?`。

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

// lib.es5.d.ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

那么如何定义一个 `SetOptional` 工具类型，支持把给定的 keys 对应的属性变成可选的？对应的使用示例如下所示：

```ts
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }
```

在实现 `SetOptional` 工具类型之后，如果你感兴趣，可以继续实现 `SetRequired` 工具类型，利用它可以把指定的 keys 对应的属性变成必填的。对应的使用示例如下所示：

```ts
type Foo = {
	a?: number;
	b: string;
	c?: boolean;
}

// 测试用例
type SomeRequired = SetRequired<Foo, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }
```

### 解答

`SetOptional` 思路：

- 先使用 `Omit<Foo, 'a' | 'b'>` 得到排除了 `a | b` 的 `Foo`，再使用 `Partial<Pick<Foo, 'a' | 'b'>>` 将 `Foo` 中的 `a | b` 设置为可选，最后将两种类型合并 `&` 返回即可。

```ts
type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

`SetRequired` 思路：

- 同 `SetOptional`，只不过将后面的 `Partial` 改为 `Required` 即可。

```ts
type SetRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

## 第四题

### 题目

`Pick<T, K extends keyof T>` 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
```

那么如何定义一个 `ConditionalPick` 工具类型，支持根据指定的 `Condition` 条件来生成新的类型，对应的使用示例如下：

```ts
interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
```

### 解答

- `[K in keyof T as (T[K] extends U ? K : never)]`: 这里使用 `as` 巧妙的对 `T[K]` 进行二次判断，使 `:` 左边返回符合 `T[K] extends U` 的 `K`；

- 还有一个知识点：当 key 为 `never` `null` 和 `undefined` 时不会生效。

```ts
type ConditionalPick<T, U> = {
  [K in keyof T as (T[K] extends U ? K : never)]: T[K]
}

interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
```


## 第五题

### 题目

定义一个工具类型 `AppendArgument`，为已有的函数类型增加指定类型的参数，新增的参数名是 `x`，将作为新函数类型的第一个参数。具体的使用示例如下所示：

```ts
type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = // 你的实现代码

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
```

### 解答

1. 使用 `Parameters<F>` 和 `ReturnType<F>` 工具类型提取出 `Fn` 函数类型的参数类型和返回值类型，再与 `x: A` 组合成新的类型即可

```ts
// 使用 Parameters<F> 和 ReturnType<F> 工具类型
type AppendArgument<F extends (...args: any) => any, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>;

type Fn = (a: number, b: string) => number

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
```

2. 使用 `infer`，因为 `Parameters` 和 `ReturnType` 都是通过 `infer` 实现的；这里直接使用 `infer`，在一个函数类型里声明了两个变量，即可同时收集参数类型和返回值类型

```ts
// 使用 infer
type AppendArgument<F extends (...args: any) => any, T> = F extends (...args: infer P) => infer R ? (x: T, ...args: P) => R : never;

type Fn = (a: number, b: string) => number

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
```


## 第六题

### 题目

定义一个 `NativeFlat` 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

```ts
type NaiveFlat<T extends any[]> = // 你的实现代码

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"
```

在完成 `NaiveFlat` 工具类型之后，在继续实现 `DeepFlat` 工具类型，以支持多维数组类型：

```ts
type DeepFlat<T extends any[]> = unknown // 你的实现代码

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
```

### 知识点铺垫

1. `['a', 'b', 'c'][number]` 可以取出 `"a" | "b" | "c"`。演变过程如下：

```ts
// 使用下标取数组元素
type A = ['a', 'b', 'c'][0] // type A = "a"

// | 可以取多个下标
type B = ['a', 'b', 'c'][0 | 1] // type B = "a" | "b"

// number 表示取所有下标，即取出数组中所有的类型
type C = ['a', 'b', 'c'][number] // type C = "a" | "b" | "c"
```

2. `{[K in keyof ['a', 'b', 'c']]}` 得到 `{0: 'a', 1: 'b', 2: 'c', length: 3, ...}`, 再加上 `[number]` 就可以提取出数组的联合类型：

```ts
type StringArr = ['a', 'b', 'c'];
// 根据数组类型生成对象类型
type KeyofArrMap = {
  [K in keyof StringArr]: StringArr[K]
}
/* 这里会将 Array 的属性都暴露出来
type KeyofArrMap = {
    [x: number]: "a" | "b" | "c";
    0: "a";
    1: "b";
    2: "c";
    length: 3;
    toString: () => string;
    toLocaleString: () => string;
    pop: () => "a" | "b" | "c";
    ...
}
*/

// 加上 [number] 即可将所有数字所有对应的值提取出来
type KeyofArrType = KeyofArrMap[number] // type KeyofArrType = "a" | "b" | "c"
```

### 解答

`NaiveFlat` 实现：

```ts
type NaiveFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P]
}[number]

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"
```

`DeepFlat` 实现：

```ts
type DeepFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? DeepFlat<T[P]> : T[P]
}[number]

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
```

## 第七题

### 题目

使用类型别名定义一个 `EmptyObject` 类型，使得该类型只允许空对象赋值：

```ts
type EmptyObject = {} 

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = { // 将出现编译错误
  prop: "TS"
}
```

在通过 `EmptyObject` 类型的测试用例检测后，我们来更改以下 `takeSomeTypeOnly` 函数的类型定义，让它的参数只允许严格SomeType类型的值。具体的使用示例如下所示：

```ts
type SomeType =  {
  prop: string
}

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly(x: SomeType) { return x }

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // 将出现编译错误
```

### 知识点铺垫

`PropertyKey` 系统内置索引签名参数类型，源码：

```ts
type PropertyKey = string | number | symbol
```

### 解答

`EmptyObject`

```ts
type EmptyObject = {
  // type PropertyKey = string | number | symbol
  [K in PropertyKey]: never 
}

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = { // 将出现编译错误
  prop: "TS"
}
```

`takeSomeTypeOnly`

```ts
type SomeType =  {
  prop: string
}

// 将 T2 中和 T1 不相同的 K 设置为 never
type Exclusive<T1, T2 extends T1> = {
  [K in keyof T2]: K extends keyof T1 ? T2[K] : never 
}

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) { return x }

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // 将出现编译错误
```

## 第八题

### 题目

定义 `NonEmptyArray` 工具类型，用于确保数据非空数组。

```ts
type NonEmptyArray<T> = // 你的实现代码

const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
```

### 解答

解法一

```ts
type NonEmptyArray<T> = [T, ...T[]]
```

解法二

```ts
type NonEmptyArray<T> = T[] & { 0: T }
```
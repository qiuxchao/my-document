<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-09-05 10:29:12
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-05 14:26:42
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
# declare 关键字

在 TypeScript 中，`declare` 关键字用于告诉编译器某些变量、函数、类或模块的声明。它不会生成任何实际的 JavaScript 代码，而只是提供了一些类型信息。

通常情况下，TypeScript 编译器会尝试根据代码的结构和上下文推断出类型信息。但是，有时候我们需要使用一些第三方库或一些全局变量，这些变量的类型信息可能并没有包含在 TypeScript 的类型定义文件中。这时候就可以使用 `declare` 关键字来告诉编译器这些变量的类型信息。

::: tip
不一定需要把 `declare` 关键字写在 `.d.ts` 类型声明文件中，但是通常建议把它们写在类型声明文件（`.d.ts`）中。
:::

下面是一个使用 `declare` 关键字声明全局变量的例子：

```ts
declare var jQuery: (selector: string) => any;
```

上面的代码告诉编译器，有一个全局变量叫做 `jQuery`，它是一个函数，接收一个字符串类型的参数，返回任意类型的值。这样，在使用 `jQuery` 变量时，编译器就知道它的类型信息了，不会报类型错误。

除了全局变量，`declare` 关键字还可以用于声明模块、函数、类等。总的来说，`declare` 关键字的作用就是提供类型信息，让 TypeScript 编译器能够进行类型检查和代码提示。


## declare 可以声明哪些类型？

在 TypeScript 中，`declare` 关键字可以用来声明一些全局变量、函数、类、命名空间等。具体来说，它可以跟以下几种声明语句：

1. 变量声明语句：

```ts
declare const MyVar: string;
declare let MyVar: number;
declare var MyVar: number;
```

2. 函数声明语句：

```ts
declare function MyFunction(x: number): number;
declare function MyFunction(x: string): string;
```

3. 类声明语句：

```ts
declare class MyClass {
  constructor(x: number);
  method(): void;
}
```

4. 接口声明语句：

```ts
declare interface MyInterface {
  x: number;
  y: number;
}
```

5. 类型别名声明语句：

```ts
declare type MyType = string | number;
```

6. 命名空间声明语句：

```ts
declare namespace MyNamespace {
  function MyFunction(x: number): number;
  const MyVar: string;
}
```

7. 模块或库声明语句：

```ts
declare module 'jquery' {
  function $(selector: string): any;
  export = $;
}
```

在这些声明语句中，`declare` 关键字告诉 TypeScript 编译器，这些变量、函数、类、接口、模块或命名空间已经存在，不需要编译器再去查找定义。这样，在使用这些变量、函数、类、接口、模块或命名空间时，编译器就会知道它们的类型信息，可以进行类型检查和代码提示。
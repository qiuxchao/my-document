# 依赖引用 `/// <reference path="" />`

在 TypeScript 中，`/// <reference path="" />` 是用来指定当前文件依赖其他 TypeScript 文件的语法。

具体来说，`/// <reference path="" />` 告诉编译器，在编译当前文件时需要先编译被引用的文件，并且在当前文件中可以使用被引用文件中定义的类型和变量。这样可以避免在当前文件中使用未定义的类型和变量，同时也可以确保编译器正确地解析类型和变量。

例如，如果我们有一个文件 `foo.ts`，它依赖于另一个文件 `bar.ts`，则可以在 `foo.ts` 文件中使用以下语法：

```ts
/// <reference path="bar.ts" />

// 在这里使用 bar.ts 中定义的类型和变量
```

在编译 `foo.ts` 文件时，编译器会先编译 `bar.ts` 文件，然后再编译 `foo.ts` 文件，并且会在 `foo.ts` 文件中包含 `bar.ts` 文件中定义的类型和变量。

需要注意的是，从 TypeScript 3.0 开始，推荐使用 ES6 风格的模块语法（例如 `import` 和 `export`）来管理模块依赖，而不是使用 `/// <reference path="" />`。因此，在新的 TypeScript 项目中，建议使用模块语法来管理文件之间的依赖关系。

#### 使用 `bar.ts` 中定义的类型和变量，变量是指？

变量是指在被引用的文件 `bar.ts` 中定义的任何类型的数据，例如：变量、常量、函数、类等等。当在 `foo.ts` 文件中使用 `bar.ts` 中定义的变量时，编译器会将 `bar.ts` 文件中定义的变量包含在生成的 JavaScript 代码中，以便在运行时使用。

下面是一个示例，假设在 `bar.ts` 文件中定义了一个变量 `x`：

```ts
// bar.ts
let x = 10;
```

我们可以在 `foo.ts` 文件中使用 x 变量：

```ts
/// <reference path="bar.ts" />

console.log(x); // 输出 10
```

在编译 `foo.ts` 文件时，编译器会将 `bar.ts` 文件中定义的 `x` 变量包含在生成的 JavaScript 代码中，以便在运行时使用。需要注意的是，如果 `bar.ts` 中的变量是一个类或者函数，那么在 `foo.ts` 中使用时需要通过 `import` 或者其他模块导入方式引用，而不是使用 `/// <reference path="" />`。
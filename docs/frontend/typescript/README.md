
# TypeScript

本文是我在学习 `TypeScript` 过程中的一些知识点的记录

## TypeScript 数据类型

### 基本数据类型

- `number`

```typescript
// 数值默认通为 number 类型
let num = 25 // 整数 等价与 let num:number = 25
let flo: number = 25.5 // 浮点数
let hex: number = 0xa05 // 十六进制
let binary: number = 0b1001 // 二进制
let octal: number = 0o751 // 八进制
// 错误示例
// num = '25' // 错误：不能将 string 赋值给原有 number 类型的变量 num
```

- `string`

```typescript
let str: string = 'Hello World!'
```

- `boolean`

```typescript
let isLogin: boolean = false
```

- `function`

```typescript
// 返回值类型
function returnStr(): string {
 return 'Hello World!'
}
let returnNum = (): number => 222
let returnBool = (): boolean => false
let returnAny = (): any => 'string' || 111 || false

// 返回空
let returnVoid = (): void => {}

// 指定参数类型
let sumValue = (n1: number, n2: number): number => n1 + n2
let strValue = (v1: string, v2: number): string => `${v1}${v2}`

// 指定函数的返回值类型后，就是将接受函数返回值的变量的类型设置为返回值类型，
// 此时该函数表达式变量不可再被修改为其他类型的值，例：
let returnNumber = (): number => 111
// returnNumber = 'string' // 错误，不能将类型 string 赋值给 number
// returnNumber = ():void => {}   // 错误，不能将 void 赋值给number
```

- `null` 和 `undefined`

```typescript
// 非严格模式下可以给任何类型赋值为 null 或 undefined
// 严格模式下只有 null 和 undefined 可以互相赋值
let myValue = 10
myValue = null
myValue = undefined
// 但是已经声明了类型的 null 和 undefined 只能赋值为各自本身
let myValue: null = null
// myValue = undefined;    // 错误
let myValue2: undefined = undefined
// myValue2 = null // 错误
```

- `unknown` 与 `any`

```typescript
// any 类型可以赋给任何类型，unknown 类型只能赋值给 any | unknown
let notSure: unknown = 11
notSure = '11'
notSure = false
// let strVal: string = notSure // Error 不能将类型“unknown”分配给类型“string”。ts(2322)
let anyVal: any = notSure
let numVal: number = anyVal // 正确
```

### 数组、元组、枚举类型

- 数组

```typescript
// string 数组
let names: Array<string> = ['henry', 'bucky'] // 等价于 let names: string[] = ['henry', 'bucky']
// number 数组
let numbers: number[] = [1, 2, 3] // 等价于 let numbers: Array<number> = [1, 2, 3]
// any 数组
let anys: any[] = []
anys[0] = 'string'
anys[1] = 111
anys[2] = false
```

- 元组

```typescript
// 规定了数组中类型的顺序
let colors: [string, number] = ['hello', 111]
```

- `enum` 枚举类型

```typescript
enum Color {
 Black, // 0
 Yellow, // 1
 Red, // 2
 Green = 100,
 Blue // 101
}
let myColor: Color = Color.Blue
console.log(Color[0])
```

### 联合类型、检查类型、扩展类型

- 联合类型（使用 `|` 符号（「或」符号））

```typescript
unionType = 'Hello, World'
unionType = 12
unionType = true
// unionType = {}  // 错误，只能是 string、number、boolean 中的一种类型
```

- 检查类型 `typeof`

```typescript
let checkType = 10
console.log(typeof checkType === 'string') // false
console.log(typeof checkType === 'number') // true // 非严格模式报错
```

- 扩展类型 `&`

```typescript
interface PersonBasicType {
 name: string
 age: number
}
interface Props {
 sex: string
}
const formatPerson = (person: Props & PersonBasicType): string =>
 `${person.name}${person.age}${person.sex}`
formatPerson({ name: 'John', age: 18, sex: 'male' })
```

### 对象类型

```typescript
// 简单对象
let obj: { name: string; age: number } = {
 name: 'qiuxc',
 age: 12
}
/*
obj = {
    aaa: 'ss',
    bbb: 234
}  // 错误，参数必须是 name 和 age，即使是对应的类型，不同的变量名也不可以
 */
obj = {
 name: 'summer',
 age: 18
} // 正确
// 复杂对象
let complexObj: { data: number[]; func: (value: number) => number[] } = {
 data: [1, 2, 3],
 func(value: number) {
  this.data.push(value)
  return this.data
 }
}
console.log(complexObj.func(4)) // [1, 2, 3, 4]
```

### `type` 关键字声明类型

```typescript
type myType = {
 data: number[]
 myFunc: (value: number) => number[]
}
let complexObj2: myType = {
 data: [1, 2, 3],
 myFunc(value: number) {
  this.data.push(value)
  return this.data
 }
}
console.log(complexObj2.myFunc(4)) // [1, 2, 3, 4]
```

### `class`类、`interface`接口、`implements`关键字、抽象类

```typescript
interface Alarm {
 alert(): void
}
class Door {}
// SecurityDoor 类继承 Door 类并使用 implements 为 SecurityDoor 类拓展方法
class SecurityDoor extends Door implements Alarm {
 alert() {
  console.log('防盗门的报警功能')
 }
}
class Car implements Alarm {
 alert() {
  console.log('车的报警功能')
 }
}
// 接口继承类
class Ponit {
 x: number
 y: number
 constructor(x: number, y: number) {
  this.x = x
  this.y = y
 }
}
interface Ponit3d extends Ponit {
 z: number
}
let ponit: Ponit3d = { x: 1, y: 2, z: 3 }

// 抽象类
abstract class Person {
 public name: string
 protected age: number
 public constructor(name: string, age: number) {
  this.name = name
  this.age = age
 }
 public abstract sayHi()
}

class Man extends Person {
 sayHi() {
  console.log('Hi, my name is ' + this.name)
 }
}

const jonny: Man = new Man('Jonny', 20)
jonny.sayHi()
```

## 泛型

泛型可以接受一些类型参数，让`ts`自己推导出想要的类型。通过使用泛型，可以使类型声明变得更加灵活

```typescript
// 声明泛型函数
function createArray<T>(length: number, value: T): Array<T> {
 return new Array(length).fill(value)
}

// Array<string>
console.log(createArray<string>(5, 'qxc')) //[ 'qxc', 'qxc', 'qxc', 'qxc', 'qxc' ]

// // Array<number>
console.log(createArray<number>(5, 6)) //[ 6, 6, 6, 6, 6 ]
console.log(createArray(5, '6')) //[ '6', '6', '6', '6', '6' ]

// 多个类型参数
function swap<T, U, A>(tuple: [T, U, A]): [A, U, T] {
 return [tuple[2], tuple[1], tuple[0]]
}
// [boolean, string, number]
console.log(swap([1, '1', true])) // [true, '1', 1]

// 泛型参数约束
interface Lengthwise {
 length: number
}
function getLength<T extends Lengthwise>(value: T): number {
 return value.length
}
getLength([1, 2, 3]) // 3

// 泛型接口-函数
interface ValueArray {
 <T>(Value: T): Array<T>
}
let ValueArray: ValueArray
ValueArray = <T>(val: T): Array<T> => new Array(val)

// 泛型类
class GenericValue<T> {
 value: T
 joint(x: T, y: T): T[] {
  return [x, y]
 }
}

// 泛型参数默认类型
function temp<T = string>(name: T): T {
 return name
}
```

## 工具类型

`ts` 内置了许多工具类型，使用这些工具类型可以很方便的实现我们想要的功能

### 泛型相关工具类型

#### `typeof` 获取类型 获取指定变量的类型

```typescript
interface PersonBasicType {
 name: string
 age: number
}
interface Props {
 sex: string
}
const formatPerson = (person: Props & PersonBasicType): string =>
 `${person.name}${person.age}${person.sex}`

type formatPersonType = typeof formatPerson
// type formatPersonType = (person: Props & PropsType) => string

const people: PersonBasicType & Props = {
 name: 'qiuxc',
 age: 21,
 sex: 'male'
}
type PersonFullType = typeof people
const newPeople: PersonFullType = {
 name: 'Sunny',
 age: 28,
 sex: 'woman'
}
```

#### `keyof` 获取某种类型的所有键，返回的是联合类型

```typescript
type PersonAllKeysType = keyof PersonFullType // name | age | sex
const xq: PersonAllKeysType = 'name'
type StrKType = keyof string // "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | ...
type NumKType = keyof number // "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type BooKtype = keyof boolean // "valueOf"

// 使用 keyof 指定参数类型
const getProps = <T extends object, K extends keyof T>(obj: T, key: K): T[K] =>
 obj[key]
getProps(newPeople, 'age') // <PersonBasicType & Props, "age">(obj: PersonBasicType & Props, key: "age") => number
getProps(newPeople, 'name') // <PersonBasicType & Props, "name">(obj: PersonBasicType & Props, key: "name") => string
getProps(newPeople, 'sex') // <PersonBasicType & Props, "sex">(obj: PersonBasicType & Props, key: "sex") => string
```

#### `in` 用来遍历枚举类型

```typescript
type Keys = 'a' | 'b' | 'c'
type Obj = {
 [k in Keys]: any
} // type Obj = { a: any; b: any; c: any; }
```

#### `infer` 声明一个类型变量并且对它进行使用

`infer` 可以获取一个类型。

`infer` 获取函数返回值类型：

- `T extends () => infer R` 是一个表达式，返回布尔值，通常配合三目运算符使用。表示泛型参数 `T` 是否兼容（包含但不限于）`() => infer R`，这里将函数类型的返回值用 `infer R` 收集了起来。
- `? R : T` 表示如果前面的三目表达式成立，则返回收集了函数返回值类型的 `R`，否则返回传入的泛型参数 `T`。

```typescript
// 获取函数返回值类型
type RT<T> = T extends () => infer R ? R : T;
const rs = () => 'abc';
type RSRT = RT<typeof rs>;  // type RSRT = string（获取到函数 rs 的返回值类型为 string）
```

`infer` 获取函数参数列表类型：

- `T extends (...args: infer P) => any` 仍然是表达式，因为函数可能会有多个参数，所以我们要使用 `...args: infer P` 来收集参数列表的类型；如果只是使用 `arg: infer P` ，在有多个参数时会导致表达式失败，从而返回我们意料之外的结果；
- `? P : any` 表示如果前面的三目表达式成立，则返回收集了函数返回值类型的 `P`，否则返回 `any`。

```typescript
// 获取函数参数类型
type PT<T> = T extends (...args: infer P) => any ? P : any;
const ps1 = (str: string) => str;
type PS1PT = PT<typeof ps1>;  // type PS1PT = [str: string]（获取到 ps1 函数的参数类型为 [str: string]）
const ps2 = (a: number, b: number) => a + b;
type PS2PT = PT<typeof ps2>;  // type PS2PT = [a: number, b: number]（获取到 ps2 函数的参数类型为 [a: number, b: number]
```

#### `extends` 添加泛型约束

```typescript
const logging = <T extends { a: 1; b: 2 }>(val: T): void => console.log(val)
```

#### 索引类型

```typescript
// 在对象中获取一些属性的值，然后建立对应的集合。下面这种写法可以约束第二个数组参数中的值
const getValues = <T, K extends keyof T>(obj: T, keys: K[]): T[K][] =>
 keys.map((key: K) => obj[key])
getValues({ a: 1, b: '2' }, ['a', 'b']) // => (string | number)[]
// getValues({a: 1, b: '2'}, ['a', 'b', 'c']) // 不能将类型“"c"”分配给类型“"a" | "b"”。ts(2322)
```

#### 映射类型 根据旧的类型创建出新的类型, 我们称之为映射类型

```typescript
interface TestInterface {
 name: string
 age: number
}
type OptionalTestInterface<T> = {
 [k in keyof T]?: T[k]
}
type newTestInterface =
 OptionalTestInterface<TestInterface> /* type newTestInterface = {name?: string; age?: number} */
const objInterface: newTestInterface = { name: 'qiuxc', age: 18 }
```

### 内置工具类型

#### `Partial<T>` 将类型的属性都变成可选的

源码: `type Partial<T> = { [P in keyof T]?: T[P]; }`

```typescript
interface User {
 name: string
 id: number
}
const user: Partial<User> = {
 name: 'qiuxc'
}

// 但是 Partial<T> 有个局限性，就是只支持处理第一层的属性，如果要处理多层，就可以自己实现
type DeepPartial<T> = {
 [k in keyof T]?: T[k] extends object ? DeepPartial<T[k]> : T[k]
}
interface NewUser extends User {
 loves: {
  movie: boolean
  music: boolean
 }
}
const newUser: DeepPartial<NewUser> = {
 name: 'qiuxc',
 loves: {
  movie: false
 }
}
```

#### `Required<T>` 将类型的属性变成必选

源码: `type Required<T> = { [P in keyof T]-?: T[P] };` (`-?`表示去除 `?`表示可选)

```typescript
// 示例：先将类型的属性变成非必选，再变成必选
type OptionalUser = Partial<User>
const u1: OptionalUser = { name: 'John' }
type RequiredUser = Required<User>
const u2: RequiredUser = { name: 'John'} // Error: 类型 "{ name: string; }" 中缺少属性 "id"，但类型 "Required<User>" 中需要该属性
```

#### `Readonly<T>`将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值

源码: `type Readonly<T> = { readonly [k in keyof T]: T[k] }`

```typescript
const u3: Readonly<User> = {
 name: 'qiuxc',
 id: 18
}
// u3.id = 11 // Error: 无法分配到 "id" ，因为它是只读属性。ts(2540)
```

#### `Pick<T, K extends keyof T>`从某个类型中挑出一些属性出来

源码: `type Pick<T, K extends keyof T> = { [P in K]: T[P]; };`

```typescript
interface Todo {
 title: string
 description: string
 completed: boolean
}
type TodoPriview = Pick<Todo, 'title' | 'completed'>
/* type TodoPriview = {
 title: string
 completed: boolean
} */
```

#### `Record<K extends keyof any, T>` 将 `K` 中所有的属性的值转化为 `T` 类型

源码: `type Record<K extends keyof any, T> = { [P in K]: T }`

```typescript
type PageInfo = 'home' | 'about' | 'contact'
type NewPageInfo = Record<PageInfo, { title: string }>
/* type NewPageInfo = {
 home: {
  title: string
 }
 about: {
  title: string
 }
 contact: {
  title: string
 }
} */
const homepage: NewPageInfo = {
 home: { title: 'Home' },
 about: { title: 'About' },
 contact: { title: 'Contact' }
}
```

#### `ReturnType<T extends (...args: any[]) => any>` 获取函数返回值类型

源码: `type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any`

```typescript
const returnPerson = (name: string, age: number) => ({ name, age })
type ReturnPersonReturnType = ReturnType<typeof returnPerson>
// type ReturnPersonReturnType = { name: string; age: number; }
const foo: ReturnPersonReturnType = { name: 'foo', age: 1 }
// const bar: ReturnPersonReturnType = 1 // Error: 不能将类型“number”分配给类型“{ name: string; age: number; }”。ts(2322)
```

#### `Exclude<T, U>` 将 `T` 中的 `U` 移除掉

源码: `type Exclude<T, U> = T extends U ? never : T;`

```typescript
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // type T0 = "b" | "c"
```

#### `Extract<T, U>` 从 `T` 中提取出 `U`

源码: `type Extract<T, U> = T extends U ? T : never;`

```typescript
type T4 = Extract<'a' | 'b' | 'c', 'a'> // type T4 = "a"
```

#### `Omit<T, K extends keyof T>` 忽略 `T` 中的 `K`，返回排除 `K` 后的 `T`

源码: `type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>`

```typescript
interface AboutBook {
 lookBook: string
 writeBook: string
 buyBook: string
}
type BookThing = Omit<AboutBook, 'lookBook'>
/* type BookThing = {
 writeBook: string
 buyBook: string
} */
```

#### `NonNullable<T>` 过滤 `T` 中的 `null` 和 `undefined` 类型

源码: `type NonNullable<T> = T extends null ? never : T` ( 这里说明 `undefined` 也 `extends null` )

```typescipt
type SomeType = string | number | null | undefined | boolean
type FilterNullable = NonNullable<SomeType>
```

#### `Parameters<T extends (...args: any) => any>` 用于获取函数的参数类型组成的元组类型

源码: `type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never`

```typescript
type F0 = (v1: number, v2: string, v3: boolean) => any
type ParamsType = Parameters<F0> // type ParamsType = [v1: number, v2: string, v3: boolean]
```

## tsconfig.json

`tsconfig.json` 是 `TypeScript` 项目的配置文件。如果一个目录下存在一个 `tsconfig.json` 文件，那么往往意味着这个目录就是 `TypeScript` 项目的根目录。

`tsconfig.json` 包含 `TypeScript` 编译的相关配置，通过更改编译配置项，我们可以让 `TypeScript` 编译出 `ES6`、`ES5`、`node` 的代码。

### tsconfig.json 重要字段

- `files` 设置要编译的文件的名称；
- `include` 设置需要进行编译的文件，支持路径模式匹配；
- `exclude` 设置无需进行编译的文件，支持路径模式匹配；
- `compilerOptions` 设置与编译流程相关的选项。

### compilerOptions 选项

```json
{
 "compilerOptions": {
  /* 基本选项 */
  "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
  "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
  "lib": [], // 指定要包含在编译中的库文件
  "allowJs": true, // 允许编译 javascript 文件
  "checkJs": true, // 报告 javascript 文件中的错误
  "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
  "declaration": true, // 生成相应的 '.d.ts' 文件
  "sourceMap": true, // 生成相应的 '.map' 文件
  "outFile": "./", // 将输出文件合并为一个文件
  "outDir": "./", // 指定输出目录
  "rootDir": "./", // 用来控制输出目录结构 --outDir.
  "removeComments": true, // 删除编译后的所有的注释
  "noEmit": true, // 不生成输出文件
  "importHelpers": true, // 从 tslib 导入辅助工具函数
  "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

  /* 严格的类型检查选项 */
  "strict": true, // 启用所有严格类型检查选项
  "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
  "strictNullChecks": true, // 启用严格的 null 检查
  "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
  "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

  /* 额外的检查 */
  "noUnusedLocals": true, // 有未使用的变量时，抛出错误
  "noUnusedParameters": true, // 有未使用的参数时，抛出错误
  "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
  "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

  /* 模块解析选项 */
  "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
  "baseUrl": "./", // 用于解析非相对模块名称的基目录
  "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
  "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
  "typeRoots": [], // 包含类型声明的文件列表
  "types": [], // 需要包含的类型声明文件名列表
  "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

  /* Source Map Options */
  "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
  "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
  "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
  "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

  /* 其他选项 */
  "experimentalDecorators": true, // 启用装饰器
  "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
 }
}
```

## 特殊语法

### `/// <reference path="" />`

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

### declare 关键字

## 踩坑记录🕳️

### 箭头函数泛型声明报错

像下面这样的工作正常:

```ts
function foo<T>(x: T): T { return x; }
```

但是,使用箭头函数不会:

```ts
const foo = <T>(x: T) => x; // ERROR : unclosed `T` tag
```

解决方法：对泛型参数进行类型约束提示编译器它是通用的，例如:

```ts
const foo = <T extends unknown>(x: T) => x;
```

> 本文参考文章<br> > [2021 typescript 史上最强学习入门文章(2w 字)
> ](https://juejin.cn/post/7018805943710253086#heading-73) <br> > [TypeScript 入门教程](http://ts.xcatliu.com/introduction/what-is-typescript.html)

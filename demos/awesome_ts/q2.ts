/*
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-31 19:57:53
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-09-02 10:10:50
 */
/**
 * 第二题
本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

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

 */

function f(a: string | number, b: typeof a) {
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

interface Person {
  name: string;
  age: number;
  sex: string;
}
type ReturnTypes<T> = T extends (...args: any[]) => infer R ? R : T;

let fun: ReturnTypes<'name'> = 'a';

// 获取函数返回值类型
type RT<T> = T extends () => infer R ? R : T;
const rs = () => 'abc';
type RSRT = RT<typeof rs>;  // type RSRT = string

// 获取函数参数类型
type PT<T> = T extends (...args: infer R) => any ? R : any;
const ps1 = (str: string) => str;
type PS1PT = PT<typeof ps1>;  // type PS1PT = [str: string]（获取到 ps1 函数的参数类型为 [str: string]）
const ps2 = (a: number, b: number) => a + b;
type PS2PT = PT<typeof ps2>;  // type PS2PT = [a: number, b: number]（获取到 ps2 函数的参数类型为 [a: number, b: number]

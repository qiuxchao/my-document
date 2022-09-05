/* 题目

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

以上代码为什么会提示错误，应该如何解决上述问题？

*/

type User = {
  id: number;
  kind: string;
};

// 问题原因: 因为 `T` 兼容 `User` 类型，即包含但不限于 `User` 类型，所以返回为 `T` 类型可能不仅仅只有 `id` 和 `kind`，所以要么修改返回值类型，要么就修改返回值

// 修改返回值类型
function makeCustomer<T extends User>(u: T): User {
  return {
    id: u.id,
    kind: 'customer'
  }
}

// 修改返回值
function makeCustomer2<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: 'customer'
  }
}
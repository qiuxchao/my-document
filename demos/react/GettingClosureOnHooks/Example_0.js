// Example 0
function useState(initialValue) {
  var _val = initialValue; // _val 是 useState 创建的一个局部变量
  function state() {
    // state 是一个内部函数，一个闭包
    return _val; // state() 使用了 _val，由父函数声明
  }
  function setState(newVal) {
    // 同样
    _val = newVal; // 设置 _val 而不暴露 _val
  }
  return [state, setState]; // 公开函数供外部使用
}
var [foo, setFoo] = useState(0); // 使用数组解构
console.log(foo()); // 打印 0 -我们给出的初始值
setFoo(1); // 在 useState 的范围内设置 _val
console.log(foo()); // 打印 1 - 新的初始值，尽管调用完全相同

// 过期的闭包
// Example 0，重新访问 - 这是bug !
function useState(initialValue) {
  // 将 state() 函数换成了 _val 变量
  let _val = initialValue;
  function setState(newValue) {
    _val = newValue;
  }
  return [_val, setState]; // 直接暴露 _val
}

const [foo, setFoo] = useState(0);
console.log(foo); // 打印 0 - 无需调用函数
setFoo(1); // 在 useState 的作用域内设置 _val
console.log(foo); // 输出 0 - 哎呀！！

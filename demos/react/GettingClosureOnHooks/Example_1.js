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

// Example 1
function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count() + 1),
    render: () => console.log("render:", { count: count() }),
  };
}

const C = Counter();
C.render(); // render: { count: 0 }
C.click();
C.render(); // render: { count: 1 }
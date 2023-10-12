# 在 React Hooks 中使用闭包

在本文中，我们通过构建 React Hooks 的简单实现来重新引入闭包。

这将有两个目的 – 演示闭包的有效使用，以及展示如何在 29 行可读 JS 代码中构建 Hooks 的简单实现。最后，我们了解自定义钩子是如何自然产生的。

## 什么是闭包？

使用 Hooks 的众多特点之一是完全避免了类和高阶组件的复杂性。然而，有了 Hooks，一些人觉得我们可能把一个问题换成了另一个问题。我们现在不必担心绑定上下文，而是要担心闭包。

闭包是 JS 中的基本概念。尽管如此，它们因让许多尤其是新开发人员感到困惑而臭名昭著。凯尔·辛普森（Kyle Simpson）在《You Don't Know JS》将闭包定义为：

> 当函数在执行时能够记住并访问其词法作用域时，闭包就产生了。

它们显然与作用域的概念密切相关，MDN 将其定义为“解析器在嵌套函数中解析变量名的方式”。让我们看一个实际的例子来更好地说明这一点：

```js
// Example 0
function useState(initialValue) {
  var _val = initialValue // _val 是 useState 创建的一个局部变量
  function state() {
    // state 是一个内部函数，一个闭包
    return _val // state() 使用了 _val，由父函数声明
  }
  function setState(newVal) {
    // 同样
    _val = newVal // 设置 _val 而不暴露 _val
  }
  return [state, setState] // 公开函数供外部使用
}
var [foo, setFoo] = useState(0) // 使用数组解构
console.log(foo()) // 打印 0 -我们给出的初始值
setFoo(1) // 在 useState 的范围内设置 _val
console.log(foo()) // 打印 1 - 新的初始值，尽管调用完全相同
```

在这里，我们正在创建 React `useState` 钩子的基础版本。在我们的函数中，有 2 个内部函数， `state` 和 `setState` . `state` 返回上面定义的局部变量，`setState` 将局部变量 `_val` 设置为传递给它的参数（即 `newVal` ）。

我们在这里实现 `state` 的是一个 getter 函数，这并不理想，但我们稍后会解决这个问题。重要的是，有了 `foo` 和 `setFoo` ，我们就能够访问和操作内部变量 `_val` 。它们保留对 `useState` 作用域的访问权限，该引用称为闭包。在 React 和其他框架的上下文中，这看起来像状态。

## 在函数组件中的用法

让我们在熟悉的环境中应用我们实现的 `useState`。我们将制作一个 `Counter` 组件！

```js
// Example 1
function Counter() {
  const [count, setCount] = useState(0); // 使用上面实现的 useState
  return {
    click: () => setCount(count() + 1),
    render: () => console.log("render:", { count: count() }),
  };
}

const C = Counter();
C.render(); // render: { count: 0 }
C.click();
C.render(); // render: { count: 1 }
```

在这里，我们没有渲染到 DOM，而是选择使用 `console.log` 打印我们的 state。我们还为计数器公开了一个编程 API，以便我们可以在脚本中运行它，而不是附加事件处理程序。通过这种设计，我们能够模拟我们的组件渲染和对用户操作的反应。

虽然这有效，但调用 getter 来访问状态并不是真正 `React.useState` API。让我们解决这个问题。

## 过期的闭包

如果我们想要与真实的React API相匹配，我们的状态必须是一个变量而不是一个函数。如果我们简单地暴露 `_val` 而不是将其包装在一个函数中，我们将遇到一个错误：

```js
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
```

这是“过期的闭包”问题的一种形式。当我们从 `useState` 的输出中解构出 `foo` 时，它引用的是初始 `useState` 调用时的 `_val`... 并且再也不会变化！这不是我们想要的；通常我们需要我们的组件状态反映当前状态，同时仅仅是一个变量而不是一个函数调用！这两个目标似乎是相互对立的。

## 模块中的闭包

我们可以通过将闭包移动到另一个闭包中来解决 `useState` 的难题！

```js
// Example 2
const MyReact = (function () {
  let _val; // 在模块作用域中保存状态
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue; // 每次运行时重新赋值
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();
```

在这里，我们选择使用模块模式来创建我们的小型 React。像 React 一样，它会跟踪组件状态（在我们的示例中，它只跟踪一个具有 `_val` 状态的组件）。这种设计允许 `MyReact` “渲染”您的函数组件，从而使其能够每次都使用正确的闭包为内部的 `_val` 值赋值：

```js
// Example 2 continued
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log("render:", { count }),
  };
}

let App;
App = MyReact.render(Counter);
App.click();
App = MyReact.render(Counter);
```

现在这看起来更像是带有 Hooks 的 React 了！

## 实现 useEffect

到目前为止，我们已经介绍了 `useState`，这是第一个基本的 React Hook。下一个最重要的 Hook 是 `useEffect`。与 `setState` 不同，`useEffect` 是异步执行的，这意味着更容易遇到闭包问题。

我们可以扩展到目前为止构建的小型 React 模型，以包括 `useEffect`：

```js
// Example 3
const MyReact = (function () {
  let _val, _deps;
  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps
        ? !depArray.every((el, i) => el === _deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    },
  };
})();

// 使用
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  MyReact.useEffect(() => {
    console.log("effect:", count);
  }, [count]);
  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log("render", { count }),
  };
}

let App
App = MyReact.render(Counter)
// effect 0
// render {count: 0}
App.click()
App = MyReact.render(Counter)
// effect 1
// render {count: 1}
App.noop()
App = MyReact.render(Counter)
// // no effect run
// render {count: 1}
App.click()
App = MyReact.render(Counter)
// effect 2
// render {count: 2}
```

为了追踪依赖项（因为 `useEffect` 在依赖项更改时重新运行），我们引入了另一个变量来跟踪 `_deps`。

## 不是魔法，只是数组

我们有一个相当好的 `useState` 和 `useEffect` 功能的实现，但它们都是糟糕的单例实现（只能存在一个实例，否则会出现错误）。为了做一些有趣的事情（并使最终的陈旧闭包示例成为可能），我们需要将它们修改为接受任意数量的 state 和 effect。幸运的是，正如 Rudi Yardley 所写，React Hooks 并不是魔法，只是数组。所以我们将有一个 `hooks` 数组。我们还将利用机会将 `_val` 和 `_deps` 都合并到我们的 `hooks` 数组中，因为它们永远不会重叠：


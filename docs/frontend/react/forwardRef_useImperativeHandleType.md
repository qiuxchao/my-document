# React 中的 forwardRef 和 useImperativeHandle

`forwardRef` 和 `useImperativeHandle` 是 React 中的 API，它们都与组件的引用（`ref`）有关，但是它们的作用不同。

- `forwardRef` 是一个高阶组件，它的作用是将组件转发给它的子组件，使得子组件能够访问到父组件的引用。使用 `forwardRef` 可以在函数式组件中使用 `ref` 属性，同时将 `ref` 传递给子组件。这样就能够在父组件的外部，通过 `ref` 获取到子组件的引用，从而可以调用子组件的方法或者访问子组件的属性。

例如，下面是一个使用 `forwardRef` 的例子：

```tsx
const MyComponent = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

const App = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return <MyComponent ref={inputRef} />;
};
```

在上面的例子中，`MyComponent` 是一个无状态组件，使用了 `forwardRef` 将 `ref` 属性传递给了 `<input>` 元素，因此在父组件 `App` 中，可以通过 `inputRef.current` 获取到 `<input>` 元素的引用，从而在 `useEffect` 钩子函数中将其聚焦。

- `useImperativeHandle` 是一个钩子函数，它的作用是在组件中定义外部可以访问的方法。通常情况下，函数式组件中定义的方法只能在组件内部访问。但是有些情况下，我们可能需要将组件的一些方法暴露给外部调用，例如在 React 中使用第三方库时，需要将组件的某些方法暴露出来给外部使用。

`useImperativeHandle` 钩子函数可以实现这个功能。它允许在组件内部定义一些方法，并将这些方法与外部传入的 `ref` 相关联。这样，在组件外部通过 `ref` 获取到组件的引用后，就可以通过这些方法来调用组件的功能。

例如，下面是一个使用 `useImperativeHandle` 的例子：

```tsx
const MyComponent = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  useImperativeHandle(ref, () => ({
    increment,
  }));
  return <h1>{count}</h1>;
});

const App = () => {
  const myComponentRef = useRef(null);
  const handleClick = () => {
    myComponentRef.current.increment();
  };
  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      <MyComponent ref={myComponentRef} />
    </div>
  );
};
```

在上面的例子中，`MyComponent` 定义了一个 `increment` 方法，并通过 `useImperativeHandle` 将该方法与外部传入的 `ref` 相关联。


## 使用 forwardRef 和 useImperativeHandle 定义组件方法，如何声明类型？



在使用 `forwardRef` 和 `useImperativeHandle` 定义组件方法的情况下，你可以通过声明组件 `props` 中的 `ref` 属性类型来获得类型提示。以下是一个示例：

```tsx
import React, { forwardRef, useImperativeHandle } from 'react';

type MyComponentProps = {
  // 声明 ref 属性类型
  ref?: React.ForwardedRef<MyComponentMethods>;
  // 其他 props
  // ...
}

export interface MyComponentMethods {
  // 定义组件方法
  doSomething: () => void;
}

const MyComponent = forwardRef<MyComponentMethods, MyComponentProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    doSomething: () => {
      // ...
    }
  }));

  return (
    // 组件内容
  );
});

export default MyComponent;
```

在上面的代码中，我们声明了 `MyComponentProps` 类型，其中包含了一个 `ref` 属性，其类型为 `React.ForwardedRef<MyComponentMethods>`。`MyComponentMethods` 是一个接口类型，其中定义了组件的方法。

在组件中，我们使用 `forwardRef` 函数来将组件转发给它的子组件，然后使用 `useImperativeHandle` 函数定义了组件的方法，并将它们绑定到外部传入的 `ref` 上。

最后，我们通过 `export` 将组件和方法类型导出，使其可以在其他地方使用。在使用组件时，你可以像下面这样通过 `ref` 获取到组件的引用，并获得类型提示：

```tsx
import MyComponent, { MyComponentMethods } from './MyComponent';

function App() {
  const myComponentRef = useRef<MyComponentMethods>(null);

  useEffect(() => {
    myComponentRef.current?.doSomething();
  }, []);

  return <MyComponent ref={myComponentRef} />;
}
```

在上面的代码中，我们使用了 `useRef` 来创建了一个 `MyComponentMethods` 类型的引用，并将其传递给了 `MyComponent` 组件的 `ref` 属性。这样，在使用 `myComponentRef.current?.doSomething()` 调用组件的方法时，就能够获得类型提示。




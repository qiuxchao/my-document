# React Hooks

`Hook` 是 `React 16.8` 的新增特性。它可以让你在不编写 `class` 的情况下使用 `state` 以及其他的 React 特性。

本文主要介绍 React 中内置的 Hook API 的使用。

Hook API 概览：

- `useState`
- `useEffect`
- `useContext`
- `useReducer`
- `useCallback`
- `useMemo`
- `useRef`
- `useImperativeHandle`
- `useLayoutEffect`
- `useDebugValue`
- `useDeferredValue`
- `useTransition`
- `useId`
  
> [🔗 官方文档](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## useState

`useState` 可以为函数式组件添加状态。它会返回一个包含两个元素的数组：`[当前状态值, 可用于更新状态的函数]`。

语法：

```js
const [state, setState] = useState(initialState)
```

参数：

- `initialState`：状态的初始值。它可以是任何类型的值，但函数有特殊的行为。这个参数在初始渲染后被忽略。
  - 如果将函数作为 `initialState` 传递给 `useState`，它将被视为初始化函数。它应该是纯的，不带任何参数，并且应该返回任何类型的值。React 在初始化组件时会调用初始化函数，并将其返回值存储为初始状态。

示例：

```js
import { useState } from 'react';

function Example() {
  // 声明一个新的状态变量，我们称之为 "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点我
      </button>
    </div>
  );
}
```

在这个例子中，我们使用 `useState` 声明了一个状态变量 `count`，并将它的初始值设置为 `0`。`useState` 钩子会返回一个包含当前状态值（在这种情况下是 `count`）和用于更新状态的函数（在这种情况下是 `setCount`）的数组。

然后我们可以在组件内使用状态值（`count`）和更新函数（`setCount`）来呈现动态内容并在某些事情发生时更新状态（如按钮单击）。

### 根据之前的状态更新状态

假设 `age` 是 `42`。此处理程序调用 `setAge(age + 1)` 三次：

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

然而，点击之后，`age` 只会是 `43` 而不是 `45`！这是因为调用该 `set` 函数不会更新已运行代码中的 `age` 状态变量。所以每次 `setAge(age + 1)` 都变成了 `setAge(43)`。

要想在 `useState` 中根据之前的状态值更新状态，可以将函数传递给更新函数（下面示例中的 `setCount`）。该函数将接收先前的状态值作为参数，并应返回新的状态值。

下面是使用函数根据先前的状态值更新状态的示例：

```js
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    // setCount 函数接受一个函数作为参数，该函数接收先前的状态值作为参数
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={incrementCount}>
        点我
      </button>
    </div>
  );
}

```

在这个示例中，我们有一个初始值为 `0` 的 `count` 状态变量和一个按钮。当单击该按钮时，会将计数器增加 `1`。`incrementCount` 函数通过将函数传递给 `setCount` 来更新 `count` 状态。该函数接收先前的 `count` 值作为参数（`prevCount`），并返回新值（`prevCount + 1`）。

在更新状态时遵循这种模式是有用的，因为它可以确保状态更新是基于最新的状态值。如果没有这种模式，状态可能会异步更新，导致意外行为。

### 更新状态中的对象和数组

您可以将对象和数组放入状态。在 React 中，状态被认为是只读的，所以你应该替换它而不是改变你现有的对象。例如，如果您有一个 `form` 的对象，请不要像这样更新它：

```js
// 🚩 Don't mutate an object in state like this:
form.firstName = 'Taylor';
```

相反，通过创建一个新对象来替换整个对象：

```js
// ✅ Replace state with a new object
setForm({
  ...form,
  firstName: 'Taylor'
});
```

### 避免重新创建初始状态

React 会保存一次初始状态，并在下一次渲染时忽略它。

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

尽管 `createInitialTodos()` 的结果仅用于初始渲染，但仍会在每次渲染时调用此函数。如果要创建大型数组或执行昂贵的计算，这可能会造成浪费。

要解决这个问题，可以将其作为初始化函数传递给 `useState`：

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

请注意，传递 `createInitialTodos` 的是函数本身，而不是 `createInitialTodos()` 函数调用的结果。如果你传递一个函数给 `useState`，React 只会在初始化期间调用它。

### 一键重置状态

您可以通过传递给组件不同的 `key` 来重置组件的状态。

在下面的示例中，我们可以通过给子组件 `Form` 传递 `key` prop，然后通过 `handleReset` 方法更改 `key` 指向的值来重新渲染子组件 `Form`：

```js
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```

## useEffect

`useEffect` 可以让你在函数式组件中执行副作用操作，例如获取数据、订阅、设置计时器等。

语法：

```js
useEffect(setup, dependencies?)
```

参数：

- `setup`：这是一个函数，它在组件第一次渲染和之后的每次更新时都会调用。这个函数可以返回一个清除函数，用来在组件卸载时执行一些清理操作。
- `dependencies`: 这是一个数组，用来表示 `setup` 依赖的所有反应值（`props`、`state`）列表。当这些值改变时，`setup` 函数会再次被调用。如果省略这个参数，`setup` 函数将在每次渲染时都被调用。

使用 `useEffect` 的方式如下：

```js
import { useEffect } from 'react';

function Example() {
  useEffect(() => {
    // 这里是副作用代码，例如获取数据、订阅或设置计时器
  });

  return (
    // 组件的渲染内容
  );
}
```

在这个例子中，我们调用了 `useEffect` 钩子，并将一个匿名函数作为参数传递给它。这个匿名函数中的代码就是我们要执行的副作用。

需要注意的是，`useEffect` 会在组件每次渲染后调用，所以你可能需要提供一个第二个参数来控制何时触发副作用。例如：

```js
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 这里的副作用只会在 count 改变时触发
  useEffect(() => {
    console.log(`Count is ${count}`);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

在这个例子中，我们提供了一个数组作为第二个参数，其中包含了要监听的变量（这里是 `count`）。这样，每当 `count` 改变时，才会触发副作用。

如果你希望在组件卸载时清除副作用，可以返回一个清除函数。例如：

```js
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    // 这里的函数会在组件卸载时调用，用于清除计时器
    return () => clearInterval(interval);
  });

  return (
    <div>
      <p>The count is {count}</p>
    </div>
  );
}
```

::: warning
在 `useEffect` 的依赖数组中可以包含任何值，包括 `state` 和 `props`，也可以包含其他变量。但是，如果这个变量不是 `state` 或 `props`，则 React 不会自动检测其变化，因此在变量变化时 `useEffect` 不会重新运行。

查看如下示例：

```js
let x = 0;

useEffect(() => {
  console.log(x);
}, [x]);

const handleChangeX = () => {
  x++;
};
```

当我们通过点击事件触发 `handleChangeX` 方法改变 `x` 时，并不会被 `useEffect` 检测到，因此也不会打印最新的 `x` 的值。这是因为：`x` 是一个普通的变量，而不是 `state`。React 不会自动检测普通变量的变化，因此 `useEffect` 的依赖数组中的 `x` 值不会发生变化。

为了使用Effect监听非 `state` 和 `props` 变量的变化，我们需要在变量变化时手动触发组件重新渲染。

简而言之，可以在依赖数组中放入非 `state` 和 `props` 变量，但是需要在变量变化时手动触发组件重新渲染。

例如：

```js
const [state, setState] = useState({ x: 0 });
const x = state.x;

useEffect(() => {
    console.log(x);
}, [x]);

const handleChangeX = () => {
  setState(prevState => {
    return { x: prevState.x + 1 }
  });
};

```

这样在点击事件中使用 `setState` 就能触发组件重新渲染，使 `useEffect` 监听到 `x` 变化，重新运行。但这样做没有意义，因为我们可以直接使用 `state.x`。

:::

## useContext

`useContext` 可以让组件能够直接访问上下文（参见 [React Context](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)）并获取数据。这可以让组件的结构更加清晰和简洁。

语法：

```js
const value = useContext(SomeContext)
```

参数：

- `SomeContext`：你之前使用 [React.createContext](https://zh-hans.reactjs.org/docs/context.html) 创建的上下文。

一个使用 `createContext`、`useContext`、`useState` 动态改变主题的例子：

```ts
import { useState, useContext, createContext, Component } from 'react';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<ThemeType>('light')

function UseContextDemo() {
  const [theme, setTheme] = useState<ThemeType>('light');
  return (
    <div className='mx-auto mt-72 px-20'>
      <button className="py-2 px-4 text-sm rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 mb-6" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change Theme</button>
      <ThemeContext.Provider value={theme}>
      <Form />
      </ThemeContext.Provider></div>
  )
}

function Form() {
  return <Panel title="Welcome">
    <Button>Sign up</Button>
      <Button>Log in</Button>
  </Panel>
}

// 函数组件使用 useContext 获取 context
function Panel(props: any) {
  const theme = useContext(ThemeContext)
  return <div className={`w-[300px] rounded-md shadow-md ${theme === 'light' ? 'bg-emerald-200 text-[#333]' : 'bg-emerald-900'}  p-12`}>
    <div className="text-[30px] font-medium mb-6">{props.title}</div>
    {props.children}
  </div>
}

// 类组件使用 this.context 获取 context
class Button extends Component<{children: string}> {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;

  render() {
    return <button className={`mr-2 py-1 px-2 font-semibold rounded-lg shadow-md ${this.context === 'dark' ? 'bg-slate-500 text-white' : 'bg-white text-[#333]'}`}>{this.props.children}</button>
  }
}

export default UseContextDemo
```

上面的例子演示了在函数组件和类组件使用 Context 的方法，效果如下：

![react_useContext_demo](./images/react_useContext_demo.gif)

## useReducer

`useState` 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

语法：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

参数：

- `reducer`: reducer 函数，指定如何更新状态。它必须是纯粹的，应该以**状态**和**动作**(action)作为参数，并且应该返回下一个状态。状态和动作可以是任何类型。
- `initialArg`：初始状态值。它可以是任何类型的值。如何计算初始状态取决于下一个 `init` 参数。
- 可选 `init`：指定如何计算初始状态的初始化函数。如果未指定，则初始状态设置为 `initialArg`。否则，初始状态设置为 `init` 函数的调用结果 `init(initialArg)`。

一个使用 `useReducer` 实现的 TodoList 的例子：

```tsx
import { useReducer, useState } from 'react'

// 类型声明
type TodoType = typeof initialTodos[number];
type ActionType = 'add' | 'delete' | 'update'
interface Action<T extends ActionType> {
  type: T;
  title: T extends 'add' ? TodoType['title'] : never;
  id: T extends 'delete' ? TodoType['id'] : never;
  todo: T extends 'update' ? TodoType : never;
}
interface AddTodoPropsType {
  onAdd: (title: TodoType['title']) => void
}
interface TodoListPropsType {
  todos: TodoType[];
  onChange: (todo: TodoType) => void;
  onDelete: (id: TodoType['id']) => void
}
type TodoPropsType = Omit<TodoListPropsType, 'todos'> & {todo: TodoType}

// 初始状态
let todoId = 3;
const initialTodos = [
  {
    id: 1,
    title: '🎤',
    done: false,
  },
  {
    id: 2,
    title: '💃',
    done: true,
  },
  {
    id: 3,
    title: '🎹',
    done: false,
  },
];

// reducer
const todoReducer = <T extends ActionType>(todos: TodoType[], action: Action<T>): TodoType[] => {
  switch (action.type) {
    case 'add': {
      return [...todos, { id: ++todoId, title: action.title, done: false }]
    }
    case 'delete': {
      return todos.filter(todo => todo.id !== action.id)
    }
    case 'update': {
      return todos.map(todo => {
        return todo.id === action.todo.id ? action.todo : todo
      })
    }
    default: {
      throw new Error(`Unknown action ${action.type}`)
    }
  }
}

export default function UseReducerDemo() {

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // 添加
  const handleAddTodo = (title: TodoType['title']) => {
    dispatch({
      type: 'add',
      title,
    } as Action<'add'>)
  };

  // 修改
  const handleChangeTodo = (todo: TodoType) => {
    dispatch({
      type: 'update',
      todo
    } as Action<'update'>);
  };

  // 删除
  const handleDeleteTodo = (id: TodoType['id']) => {
    dispatch({
      type: 'delete',
      id,
    } as Action<'delete'>)
  };

  return (
    <div className="mt-72 flex justify-center flex-col items-center">
      <AddTodo onAdd={handleAddTodo} />
      <TodoList todos={todos} onChange={handleChangeTodo} onDelete={handleDeleteTodo} />
    </div>
  )
}

function AddTodo({ onAdd }: AddTodoPropsType) {
  const [title, setTitle] = useState('')
  const handleAdd = () => {
    title && onAdd(title);
    setTitle('');
  }

  return <div className="flex mb-6">
    <input 
      value={title} 
      type="text" 
      className='mr-4 px-2 py-1 leading-5 border rounded-md focus:outline-none focus:ring focus:border-blue-400' 
      onInput={(e: any) => setTitle(e.target.value)} />
      <button 
        className='transition duration-700 ease-in-out transform hover:scale-125 bg-emerald-600 text-white py-1 px-3 rounded-md' 
        onClick={handleAdd}>添加</button>
    </div>
}

function TodoList({ todos, onChange, onDelete }: TodoListPropsType) {
  return <>
    {
      todos.map((todo) =>
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onChange={onChange} />
      )}
  </>
}

function Todo({todo, onChange, onDelete }: TodoPropsType) {
  const [isEdit, setIsEdit] = useState(false)

  return <div className="flex items-center mb-2">
          <div className="w-[134px]">
            <input 
              type="checkbox" 
              className='mr-4 scale-150' 
              checked={todo.done} 
              onChange={(e: any) => onChange({...todo, done: e.target.checked})} />
          {isEdit ? 
            <input 
              type="text" 
              className='w-[100px] p-1 rounded-md border'
              value={todo.title}
              onInput={(e: any) => onChange({...todo, title: e.target.value})} /> : 
            todo.title
          }
          </div>
          <button 
            className="ml-4 py-1 px-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 mr-2" 
            onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? '保存' : '修改'}</button>
          <button 
            className="py-1 px-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75" 
              onClick={() => onDelete(todo.id)}>删除</button>
        </div>
}
```

效果：

![react_useReducer_demo](./images/react_useReducer_demo.gif)

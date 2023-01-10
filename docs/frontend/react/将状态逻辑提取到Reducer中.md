# 优化 - 将状态逻辑提取到 Reducer 中

在一个组件中如果有很多分布在各种事件处理函数中的**状态更新**可能会让人不知所措。对于这种情况，我们可以将**组件的所有状态更新逻辑**合并到**组件外部一个称为 `reducer` 的函数**中。

## 使用 reducer 整合状态逻辑

随着我们的组件变得越来越复杂，一目了然地了解组件状态更新的所有不同方式会变得越来越困难。

例如，下面的 `TaskApp` 组件包含一个状态数组 `tasks` 并使用三个不同的事件处理程序来添加、删除和编辑任务：

```js
import {useState} from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  // 添加任务
  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  // 修改任务
  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  // 删除任务
  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
```

它的每个事件处理程序都会调用 `setTasks` 以更新状态。随着这个组件的增长，散布在其中的状态逻辑的数量也会增加。为了降低这种复杂性并将所有逻辑放在一个易于访问的地方，我们可以将该状态逻辑移动到组件外部的单个函数中，称为 `reducer`。

Reducers 是处理状态的另一种方式。我们可以分三步从 `useState` 迁移到 `useReducer`：

1. 从设置状态改为派发操作。
2. 写一个 `reducer` 函数。
3. 在组件中使用 `reducer`。

### 第 1 步：从设置状态改为派发操作

我们的组件当前通过设置状态执行的操作：

```js
// 添加任务
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

// 修改任务
function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

// 删除任务
function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}
```

删除所有状态设置逻辑。我们剩下的是三个事件处理程序：

- `handleAddTask(text)` 当用户按下“添加”时被调用。
- `handleChangeTask(task)` 当用户按下“编辑”时调用。
- `handleDeleteTask(taskId)` 当用户按下“删除”时调用。

使用 `reducer` 管理状态与直接设置状态略有不同。不是通过设置状态告诉 React “做什么”，而是通过从事件处理函数中派发 `action` 来指定 “用户刚刚做了什么”。（状态更新逻辑将存在于其他地方！）因此我们不再通过事件处理函数“设置”，而是派发“添加/更改/删除任务”操作来设置状态。这更能描述用户的意图。

```js
function handleAddTask(text) {
  // 派发 action
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  // 派发 action
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  // 派发 action
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

我们传递给 `dispatch` 的对象称为“动作”，它是一个常规的 JavaScript 对象。我们决定将什么放入其中，但通常它应该包含有关发生的事情的最少信息。

按照惯例，通常给它一个字符串 `type` 来描述发生的事情，并在其他字段中传递任何附加信息：

```js
dispatch({
  // 必要的属性
  type: 'what_happened',
  // 附带的一些数据
  payload: xxx,
  ...
});
```

### 第 2 步：编写 `reducer` 函数

`reducer` 函数是放置状态逻辑的地方。它有两个参数，**当前状态**和**动作对象**，并返回下一个状态：

```js
function yourReducer(state, action) {
  // 返回下一个状态给 React
}
```

React 会将状态设置为 `reducer` 函数返回的内容。

在此示例中，要将状态设置逻辑从事件处理程序移动到 `reducer` 函数，我们将：

1. 将当前状态 `tasks` 声明为第一个参数。
2. 将 `action` 对象声明为第二个参数。
3. 从 `reducer` 返回下一个状态（React 设置为最新状态）。

以下是迁移到 `reducer` 函数的所有状态设置逻辑：

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

由于 `reducer` 函数将 state (`tasks`) 作为参数，使得我们可以在组件外部声明它。这会降低缩进级别并使我们的代码更易于阅读。

:::tip
建议将每个 `case` 块包裹在花括号 `{` 和 `}` 中，这样在不同 `case` 内声明的变量就不会相互冲突。此外，一个 `case` 应该通常以一个 `return` 结尾。如果忘记了 `return`，代码将“漏”到下一个 `case`，这可能会导致错误！
:::

### 在组件中使用 `reducer`

最后，我们需要将 `tasksReducer` 连接到我们的组件。先从 React 中导入 `useReducer` Hook：

```js
import { useReducer } from 'react';
```

然后替换 `useState`：

```js
// const [tasks, setTasks] = useState(initialTasks);
// 替换为👇
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

`useReducer` Hook 类似于 `useState`：我们必须向它传递一个初始状态，然后它返回一个状态值和一种设置状态的方法。但他们的不同之处在于：

`useReducer` Hook 接受两个参数：

1. 一个 `reducer` 方法
2. 初始状态

它返回：

1. 状态值
2. 派发函数（将用户操作“派发”到`reducer`）

下面是改造后的组件代码：

```js
import {useReducer} from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

let nextId = 3;
// 初始状态
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

// reducer
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  // 使用 useReducer 来管理状态，传入 reducer 和 初始状态
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    // 派发 action 到 reducer
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    // 派发 action 到 reducer
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    // 派发 action 到 reducer
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
```

我们还可以将 `reducer` 抽离到单独的文件，这样可以使组件逻辑可以更容易阅读。事件处理函数仅通过**派发**`操作指定发生了什么，reducer` 函数确定状态如何更新。

## 为什么叫 reducer?

reducers 可以“减少”组件内的代码量，但它们实际上是根据数组的 `reduce()` 方法命名的。

该 `reduce()` 操作将数组中的所有值累加：

```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5
```

我们传递给 `reduce` 方法的回调函数称为 **reducer** 。它获取*到目前为止的结果*和*当前项*，然后返回下一个结果。

React reducers 是相同想法的一个例子：它们获*到目前为止的状态*和*action*，然后返回下一个状态。通过这种方式，它们会随着时间的推移将动作累计到状态中。

下面这个列子演示了 reducer 在 React 中的运作：

```js
// reducer
const todoReducer = (todos, action) => {
    switch(action.type) {
        case 'delete':
            return todos.filter(_ => _.id !== action.id);
        case 'add':
            return [...todos, action.todo]
        default:
            throw new Error('出乎意料的 action：', action.type);
    }
}

// 状态列表
const todos = [
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
]

// 动作列表
const actions = [
    {
        type: 'add',
        todo: {
            id: 3,
            title: '📚',
            done: false,
        },
    },
    {
        type: 'delete',
        id: 2,
    },
]

// 新的状态
const newTodos = actions.reduce(todoReducer, todos);
/* 
[
    {
        "id": 1
        "title": "🎤",
        "done": false,
    },
    {
        "id": 3,
        "title": "📚"
        "done": false,
    }
]
*/
```

## 比较 `useState` 和 `useReducer`

Reducers 并非没有缺点！可以通过以下几种方式比较它们：

- **代码量**：通常，使用 `useState` 需要预先编写较少的代码。而使用 `useReducer`，必须同时编写 `reducer` 函数和 `dispatch` 操作。但是，如果许多事件处理程序以类似的方式修改状态，则 `useReducer` 可以帮助减少代码。

- **可读性**： 当状态更新简单时，`useState` 非常易读。当它们变得更加复杂时，它们可能会膨胀组件的代码并使其难以阅读。在这种情况下，`useReducer` 可以让我们清晰地将*更新逻辑的方式*与*事件处理程序发生的事情*分开。

- **调试**：使用 `useState` 出现错误时，很难知道状态是在哪里设置不正确的。使用 `useReducer`，可以在 Reducer 中添加控制台日志，查看每次状态更新，并了解为什么会发生错误（因为哪个操作）。如果每个操作都正确，你就会知道错误在 Reducer 逻辑本身。

- **测试**： `reducer` 是一个纯函数，不依赖于组件。这意味着你可以单独导出并在隔离环境中测试它。虽然通常最好在更真实的环境中测试组件，但是对于复杂的状态更新逻辑，能够独立断言你的 Reducer 对于特定的初始状态和操作返回特定状态是非常有用的。

- **个人喜好**：有些人喜欢 Reducer，有些人不喜欢。没关系。这是一个喜好问题。你可以随时在 `useState` 和 `useReducer` 之间转换：它们是等价的！

如果你经常遇到一些组件由于状态更新不正确而导致的 bug，并且想要为代码引入更多的结构时，建议使用 Reducer。你不必对所有内容使用 Reducer：可以混合使用，例如在同一个组件中同时使用 `useState` 和 `useReducer`。

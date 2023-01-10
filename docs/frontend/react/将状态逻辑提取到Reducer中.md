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

1. 从设置状态改为调度操作。
2. 写一个 `reducer` 函数。
3. 在组件中使用 `reducer`。

### 第 1 步：从设置状态改为调度操作

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

使用 `reducer` 管理状态与直接设置状态略有不同。不是通过设置状态告诉 React “做什么”，而是通过从事件处理函数中派发 `action` 来指定 “用户刚刚做了什么”。（状态更新逻辑将存在于其他地方！）因此我们不再通过事件处理函数“设置”，而是调度“添加/更改/删除任务”操作来设置状态。这更能描述用户的意图。

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

### 第 2 步：编写 reducer 函数

`reducer` 函数是放置状态逻辑的地方。它有两个参数，**当前状态**和**动作对象**，并返回下一个状态：

```js
function yourReducer(state, action) {
  // 返回下一个状态给 React
}
```

React 会将状态设置为 `reducer` 函数返回的内容。

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

/* 题目

定义一个 `NativeFlat` 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

```ts
type NaiveFlat<T extends any[]> = // 你的实现代码

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"
```

在完成 `NaiveFlat` 工具类型之后，在继续实现 `DeepFlat` 工具类型，以支持多维数组类型：

```ts
type DeepFlat<T extends any[]> = unknown // 你的实现代码

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
```

*/

type NaiveFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P]
}[number]

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"



type DeepFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? DeepFlat<T[P]> : T[P]
}[number]

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"

const script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.innerText = `
const playNext = () => {
  console.log('播放完成');
  const videoEl = document.querySelector('video');
  videoEl.addEventListener('ended', playNext);
  
};
const videoEl = document.querySelector('video');
videoEl.addEventListener('ended', playNext);

`
const playNext = () => {
  // const targetEl = document.querySelector('.ant-tree-treenode-switcher-open.ant-tree-treenode-selected + li');
  // targetEl.click();
  console.log('播放完成');
  videoEl.removeEventListener('ended', playNext);
  videoEl.addEventListener('ended', playNext);
};
const videoEl = document.querySelector('video');
videoEl.addEventListener('ended', playNext);
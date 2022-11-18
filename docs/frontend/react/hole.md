# 踩过的坑 🕳️

## 使用 && 符号时左侧为 0 时页面显示了 0

这种情况需要将左侧会返回 0 的数值改为布尔值：

```js
const num = 0;

// 会显示 0
num && <span>Hello</span>

// 不会显示任何东西
num > 0 && <span>Hello</span>
```

这种语法称为 [`Falsy` 表达式](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)

经测试，只有在左边为**数值**或**NaN**时需要考虑这种情况，其他 `falsy` 的值符合预期。
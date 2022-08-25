<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-25 16:43:26
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-25 17:24:44
-->
# 一些例子

## `nth-child(3n + 3)` 指定选择 3 的倍数

- `3n` 表示3的倍数
- `+3` 表示从第3个元素开始

`li:nth-child(3n + 3)` 表示：从第 3 个 li 开始选择符合 3 的倍数倍数的 li，如果有 10 个 li，那么第 3、6、9 个 li 将被选中
`li:nth-child(n + 4)` 表示：从第 4 个 li 开始选择符合 1 的倍数倍数的 li，如果有 5 个 li，那么第 4、5 个 li 将被选中

> n 默认为 1，表示 1 的倍数

```css
image {
    width: 226rpx;
    height: 226rpx;
    margin-right: 12rpx;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
```

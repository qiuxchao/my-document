# Flex 布局

Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。

我们说 flexbox 是一种一维的布局，是因为一个 flexbox 一次只能处理一个维度上的元素布局，一行或者一列。作为对比的是另外一个二维布局 `CSS Grid Layout`，可以同时处理行和列上的布局。

当使用 flex 布局时，首先想到的是两根轴线 — 主轴和交叉轴。主轴由 `flex-direction` 定义，另一根轴垂直于它。我们使用 flexbox 的所有属性都跟这两根轴线有关，所以有必要在一开始首先理解它。

## 声明 flex 布局

```css
{
  display: flex;
  /* 或者 */
  display: inline-flex;
}
```

声明 `flex` 布局的元素被称为 `flex 容器`，它的子元素被称为 `flex 项目`。


## flex-direction 定义主轴方向

`flex-direction` 取值：

- `row`: 元素从左到右摆放。
- `row-reverse`: 元素摆放的方向从右到左。
- `column`: 元素从上放到下。
- `column-reverse`: 元素从下放到上。

## justify-content 水平对齐元素

`justify-content` 取值：

- `flex-start`: 元素和容器的左端对齐。
- `flex-end`: 元素和容器的右端对齐。
- `center`: 元素在容器里居中。
- `space-between`:元素之间保持相等的距离。
- `space-around`:元素周围保持相等的距离。

## align-items 垂直对齐元素

`align-items` 取值：

- `flex-start`: 元素与容器的顶部对齐。
- `flex-end`: 元素与容器的底部对齐。
- `center`: 元素纵向居中。
- `baseline`: 元素在容器的基线位置显示。
- `stretch`: 元素被拉伸以填满整个容器。

## flex-wrap 元素换行

`flex-wrap` 取值：

- `nowrap`: 所有的元素都在一行。
- `wrap`: 元素自动换成多行。
- `wrap-reverse`: 元素自动换成逆序的多行。

## align-content 控制行与行间隔

`align-content` 取值：

- `flex-start`: 多行都集中在顶部。
- `flex-end`: 多行都集中在底部。
- `center`: 多行居中。
- `space-between`: 行与行之间保持相等距离。
- `space-around`: 每行的周围保持相等距离。
- `stretch`: 每一行都被拉伸以填满容器。

## flex-flow 简写属性

`flex-flow` 是 `flex-direction` 和 `flex-wrap` 的简写，第一个指定的值为 `flex-direction` ，第二个指定的值为 `flex-wrap`.

## flex 容器子元素的属性

`order` 定义子元素的排序，默认值为`0`。还可以设置这个属性为负数或正数，值越小越靠前。

`align-self` 控制子元素自身的垂直对齐，取值和 `align-items` 一样。

`flex` 定义子元素所占的尺寸、增长尺寸以及收缩尺寸，该属性的语法为：`flex: flex-basis flex-grow flex-shrink`

- `flex-basis`: 定义了该元素的空间大小。
- `flex-grow`: 若被赋值为一个正整数， flex 元素会以 `flex-basis` 为基础，沿主轴方向增长尺寸。
- `flex-shrink`: 如果我们的容器中没有足够的空间，那么可以该属性设置为正整数来缩小它所占空间到`flex-basis`以下。

`flex` 属性的默认值：`flex: 0 1 auto;`，这里 `flex-grow` 的值为 0，所以 flex 元素不会超过它们 `flex-basis` 的尺寸。`flex-shrink` 的值为 1, 所以可以缩小 flex 元素来防止它们溢出。`flex-basis` 的值为 `auto`，意为让父元素自动分配。
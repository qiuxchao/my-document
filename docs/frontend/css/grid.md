# grid 网格布局

grid 是一个 CSS 简写属性，可以用来设置以下属性： 显式网格属性 `grid-template-rows`、`grid-template-columns `和 `grid-template-areas`， 隐式网格属性 `grid-auto-rows`、`grid-auto-columns` 和 `grid-auto-flow`， 间距属性 `grid-column-gap` 和 `grid-row-gap`。

CSS 网格布局擅长于将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系（前提是 HTML 生成了这些区域）。

像表格一样，网格布局让我们能够按行或列来对齐元素。然而在布局上，网格比表格更可能做到或更简单。例如，网格容器的子元素可以自己定位，以便它们像 CSS 定位的元素一样，真正的有重叠和层次。

如何声明 Grid 布局? `display: grid;`、`display: inline-grid;` 或者 `display: subgrid;`

`grid-column-start` 和 `grid-column-end` 作用于网格项的开始结束, `start` 不一定比 `end` 小, 且都可以为负数.

除了取数值外,还可以使用 `span` 关键字.格式是 `span <number>` 意思是跨越多少个网格轨道.

可以使用 `grid-column: <start>/<end`> 来简写, `span` 关键字适用此缩写.

`grid-area` 属性可以再次简写,接收 `4` 个由 `/` 隔开的值,依次为: `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end`.

存在属性关键字: `order`, `order` 类似于 `z-index` 表明叠放顺序, 数值越大, 越在上. 允许负数.

`grid-template-columns` 和 `grid-template-rows` 用于设置Grid布局的行列中网格轨道的大小.

`repeat` 函数可以简化多个同值, 格式为 `repeat(N, value)`, 其中 `N` 是个数, `value` 是值. `repeat` 可以与其他值混用, 如: `grid-template-columns: repeat(N-1, value) value`.

定义上述属性时,允许长度单位混合使用.

`fr` 用于等分等分网格容器剩余空间.举例说明: 设有A B C 三个网格轨道, 他们的 `grid-template-columns` 的设置依次是 1fr 2fr 和 3fr. 那么他们共同把一个行分为 6 等分, 则 A B C 的空间就依次获得了这一行的1/6、2/6 和 3/6.

`fr` 是可以和其他单位混用的,如 `grid-template-columns:1fr 50px 1fr 1fr`. 计算优先级记住一点即可: 除了 `auto` 之外,先计算所有固定值(包括百分数)后,剩下的空间再计算 `fr`.

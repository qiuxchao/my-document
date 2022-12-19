# SCSS

SCSS（Sassy CSS）是一种 CSS 预处理器，它提供了许多强大的功能来帮助你更高效地编写和维护 CSS 代码。

SCSS 由 SASS 项目开发，是 SASS 的新版本，与 SASS 相比，SCSS 的语法更接近 CSS，使用起来更方便。

SCSS 文件以 `.scss` 为扩展名，语法类似于 CSS，但提供了一些额外的功能，例如**变量**、**嵌套**、**混合**、**函数**、**循环**等。使用 SCSS，你可以使用这些功能来编写更简洁、更灵活的 CSS 代码。

SCSS 文件需要通过编译器转换为 CSS 文件，才能在浏览器中使用。常用的编译器有 sass、node-sass 和 dart-sass 等。

🔗 官方文档：[SCSS Documentation](https://sass-lang.com/documentation/)

## 嵌套

在 SCSS 中，你可以使用**嵌套**来组织你的样式，使代码更具可读性。例如，你可以嵌套一个元素的样式在另一个元素的样式内，如下所示：

```scss
nav {
  ul {
    list-style: none;
    li {
      display: inline-block;
      a {
        text-decoration: none;
        &:hover {
          color: red;
        }
      }
    }
  }
}
```

在上面的代码中，我们嵌套了 `ul`、`li` 和 `a` 元素的样式在 `nav` 元素的样式内，这使得代码更具可读性，也更容易维护。

提示：SCSS 嵌套中的 `&` 表示上一级选择器。

## 变量

在 SCSS 中，你可以使用 `$` 符号来声明变量。例如，你可以声明一个名为 `$font-size` 的变量来存储字体大小：

```scss
$font-size: 16px;

body {
  font-size: $font-size;
}
```

在上面的代码中，我们声明了一个名为 `$font-size` 的变量，并将其设置为 16px。然后，我们将变量 `$font-size` 用于设置 body 元素的字体大小。

你还可以使用变量来存储颜色值，例如：

```scss
$primary-color: #333;

a {
  color: $primary-color;
}
```

这样，如果你想要更改主色调，只需更改 `$primary-color` 变量的值即可。

## 流程控制

SCSS 中的流程控制是使用 `@if`、`@else if` 和 `@else` 关键字控制代码执行流程的语句。

`@if` 语句的语法如下：

```scss
@if <condition> {
  // 条件成立时要执行的代码
}
```

其中，`<condition>` 是一个布尔表达式，如果表达式的值为 `true`，则执行条件成立时要执行的代码。

例如，你可以这样使用 `@if` 语句：

```scss
$font-size: 16px;

@if $font-size > 20px {
  body {
    font-size: $font-size;
  }
}
```

你还可以使用 `@else` 关键字提供条件不成立时的备选代码：

```scss
$font-size: 16px;

@if $font-size > 20px {
  body {
    font-size: $font-size;
  }
} @else {
  body {
    font-size: 20px;
  }
}
```

你还可以使用 `@else if` 语句提供更多的条件分支：

```scss
$font-size: 16px;

@if $font-size > 20px {
  body {
    font-size: $font-size;
  }
} @else if $font-size > 15px {
  body {
    font-size: 15px;
  }
} @else {
  body {
    font-size: 14px;
  }
}
```

## 循环

SCSS 提供了三种循环控制结构，分别是 `@for`、`@each` 和 `@while`。

- `for` 循坏

`@for` 循环用于重复执行一段代码多次。它的语法如下：

```scss
@for $i from <start> through <end> {
  // 循环体
}
```

其中，`$i` 是一个循环变量，`<start>` 和 `<end>` 是起始和结束值。循环变量从起始值开始，逐步增加，直到到达结束值，每次增加的值为 1。

例如，下面的代码会生成 5 个类名为 `.item-1` 到 `.item-5` 的选择器：

```scss
@for $i from 1 through 5 {
  .item-#{$i} {
    // 样式规则
  }
}
```


- `@each` 循环

`@each` 循环用于遍历一个列表中的每个元素。它的语法如下：

```scss
@each $var in <list> {
  // 循环体
}
```

其中，`$var` 是循环变量，`<list>` 是要遍历的列表。每次循环，循环变量都会被赋值为列表中的一个元素。

例如，下面的代码会生成 3 个类名为 `.red`、`.green` 和 `.blue` 的选择器：

```scss
@each $color in red, green, blue {
  .#{$color} {
    color: $color;
  }
}

// 或者把颜色值放在一个变量中：
$basic-colors: red, green, blue;

@each $color in $basic-colors {
  .#{$color} {
    color: $color;
  }
}
```

你还可以使用 `@each` 循环来遍历一个映射（map）中的每个元素：

```scss
$colors: (
  red: #ff0000,
  green: #00ff00,
  blue: #0000ff
);

@each $name, $color in $colors {
  .#{$name} {
    color: $color;
  }
}
```

在这种情况下，循环变量分别被赋值为映射中的键和值。


- `@while` 循环

`@while` 循环用于在满足特定条件时重复执行一段代码。它的语法如下：

```scss
@while <condition> {
  // 循环体
}
```

其中，`<condition>` 是一个布尔表达式，如果表达式的值为 `true`，则执行循环体，否则退出循环。

例如，下面的代码会生成 5 个类名为 `.item-1` 到 `.item-5` 的选择器：

```scss
$i: 1;
@while $i <= 5 {
  .item-#{$i} {
    // 样式规则
  }
  $i: $i + 1;
}
```

在使用循环时，需要注意一些细节，例如循环变量的命名、循环条件的设置等。

## 混合（Mixins）

混合（Mixins）是 SCSS 中的一种特性，允许你定义一组样式，并将其复用到多个地方。例如，你可以定义一个名为 `rounded-corners` 的混合来给元素添加圆角：

```scss
@mixin rounded-corners {
  border-radius: 5px;
}

button {
  @include rounded-corners;
}
```

在上面的代码中，我们使用 `@mixin` 声明了一个名为 `rounded-corners` 的混合，然后使用 `@include` 将混合应用到 `button` 元素上。

## 函数

函数是 SCSS 中的另一种特性，允许你定义一个函数来执行特定的计算，并返回结果。例如，你可以定义一个名为 `lighten` 的函数来使颜色变浅：

```scss
@function lighten($color, $amount) {
  $hsl: hsl(hue($color), saturation($color), lightness($color) + $amount);
  @return hsla($hsl, alpha($color));
}
```

在上面的代码中，我们定义了一个名为 · 的函数，该函数接受两个参数：`$color` 和 `$amount`。

函数的主体部分（也就是大括号内的代码）包含了两个语句：

- 第一个语句使用了 `hsl` 函数将颜色转换为 HSL 格式，并使用 `hue`、`saturation`、`lightness` 函数获取颜色的色调、饱和度、亮度，最后使用 `$amount` 参数调整亮度。

- 第二个语句使用了 `hsla` 函数将 HSL 值转换为 RGBA 格式，并使用 `alpha` 函数获取颜色的 alpha 值（即透明度）。

最后，使用 `@return` 语句将函数的结果（转换后的RGBA颜色值）返回。

总的来说，这段代码定义了一个函数，该函数可以将给定的颜色变浅，且保留原有的透明度。你可以使用这个函数来轻松地调整颜色的亮度，而无需手动计算 HSL 值。

### 常用内置函数

SCSS 提供了许多内置函数，可以帮助你在 SCSS 中进行各种计算。下面是一些常用的内置函数：

- `percentage($value)`：将给定的数字转换为百分比。
- `round($value)`：对给定的数字进行四舍五入。
- `ceil($value)`：对给定的数字进行向上取整。
- `floor($value)`：对给定的数字进行向下取整。
- `abs($value)`：计算给定数字的绝对值。
- `min($value1, $value2, ...)`：计算给定数字中的最小值。
- `max($value1, $value2, ...)`：计算给定数字中的最大值。
- `hue($color)`：获取给定颜色的色调值（HSL 格式）。
- `saturation($color)`：获取给定颜色的饱和度值（HSL 格式）。
- `lightness($color)`：获取给定颜色的亮度值（HSL 格式）。
- `alpha($color)`：获取给定颜色的 alpha 值（即透明度）。
- `rgba($color, $alpha)`：将给定颜色转换为 RGBA 格式，并设置 alpha 值。
- `hsl($hue, $saturation, $lightness)`：将给定的 HSL 值转换为颜色。
- `hsla($hue, $saturation, $lightness, $alpha)`：将给定的 HSLA 值转换为颜色。

这些函数可以帮助你在 SCSS 中进行各种计算，例如转换颜色的格式、计算数字的百分比、调整数字的精度等。这些函数可以帮助你在 SCSS 中更加高效地进行计算，并使你的代码更具可维护性。例如，你可以使用 `percentage` 函数将数字转换为百分比，使用 `round` 函数对数字进行四舍五入。

SCSS 还提供了许多其他内置函数，例如：

- `red($color)`：获取给定颜色的红色值（RGB 格式）。
- `green($color)`：获取给定颜色的绿色值（RGB 格式）。
- `blue($color)`：获取给定颜色的蓝色值（RGB 格式）。
- `mix($color1, $color2, [$weight])`：混合两种颜色。
- `grayscale($color)`：将给定颜色转换为灰色。
- `complement($color)`：获取给定颜色的补色。
- `invert($color)`：反转给定颜色的颜色值。
- `unquote($string)`：去除字符串两边的引号。
- `quote($string)`：在字符串两边添加引号。
- `type-of($value)`：获取给定值的数据类型。
- `unit($number)`：获取给定数字的单位。
- `color($color)`：将给定的颜色转换为 SCSS 颜色对象。
- `str-length($string)`：计算给定字符串的长度。
- `str-insert($string, $insert, $index)`：在给定字符串的指定位置插入另一个字符串。
- `str-index($string, $substring)`：搜索给定子字符串在给定字符串中的位置。
- `str-slice($string, $start-at, $end-at)`：从给定字符串中截取一段字符。
- `to-upper-case($string)`：将给定字符串转换为大写。
- `to-lower-case($string)`：将给定字符串转换为小写。
- `map-get($map, $key)`：获取给定映射中指定键对应的值。
- `map-merge($map1, $map2)`：合并两个映射。
- `map-remove($map, $key)`：从给定映射中删除指定键。
- `map-keys($map)`：获取给定映射中的所有键。
- `map-values($map)`：获取给定映射中的所有值。

另外，SCSS 中没有提供用于替换字符串的方法，我们可以自己实现它：

```scss
/// 将 `$string` 中的 `$search` 替换为 `$replace`
/// @param {String} $string - 初始字符
/// @param {String} $search - 要替换的子字符串
/// @param {String} $replace ('') - New value
/// @return {String} - Updated string
@function str-replace($string, $search, $replace: '') {
  $index: str-index($string, $search);
  
  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);
  }
  
  @return $string;
}

// 使用：
.selector {
  $string: 'The answer to life the universe and everything is 42.';
  content: str-replace($string, 'e', 'xoxo');
}

// 结果
.selector {
  content: "Thxoxo answxoxor to lifxoxo thxoxo univxoxorsxoxo and xoxovxoxorything is 42.";
}
```


这些函数可以帮助你更加高效地编写 SCSS 代码，并使你的代码更具可维护性。
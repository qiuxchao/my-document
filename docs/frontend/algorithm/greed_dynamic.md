# 贪心算法和动态规划

## 贪心算法

当遇到一个求解全局最优解问题时，如果可以将全局问题切分为小的局部问题，并**寻求局部最优解**，同时可以证明**局部最优解累计的结果就是全局最优解**，则可以使用贪心算法

找零问题：

示例：假设你有一间小店，需要找给客户 46 分钱的硬币，你的货柜里只有面额为 25 分、10 分、5 分、1 分的硬币，如何找零才能保证数额**正确**并且硬币数**最小**

JavaScript 代码：

```js
/**
 * 得到一个找零的结果： [25, 10, 10, 1]
 * @param {*} total 要找零的总额
 * @param {*} denos 拥有的面额
 */
function exchange(total, denos) {
 if (total <= 0) {
  return [] //不用找零
 }
 // 寻找最大的面额，同时要保证面额小于等于total
 var max = 0
 for (var i = 0; i < denos.length; i++) {
  var deno = denos[i]
  if (deno > max && deno <= total) {
   max = deno
  }
 }
 // max记录这一次的解（局部最优解）
 var result = [max]
 var next = exchange(total - max, denos) //得到后续的局部最优解
 result = result.concat(next) //拼接之后，就是整体最优解
 return result
}

// 要找的总金额
var total = 51
// 拥有的面值
var denos = [30, 25, 10, 5, 1]
var result = exchange(total, denos)
console.log(result) // [25, 10, 10, 1]
```

## 动态规划

分治法有一个问题，就是容易重复计算已经计算过的值，使用动态规划，可以将每一次分治时算出的值记录下来，防止重复计算，从而提高效率。

青蛙跳台阶问题：

有 N 级台阶，一只青蛙每次可以跳 1 级或两级，一共有多少种跳法可以跳完台阶？

Js 代码：

```js
var num1 = 0
// 不使用动态规划
function count1(total) {
 num1++
 if (total === 0) return 0
 if (total === 1) return 1
 if (total === 2) return 2
 return count1(total - 1) + count1(total - 2)
}

var num2 = 0
//使用动态规划优化效率
function count2(total) {
 var cache = {} //缓存已经计算过的结果
 function _count(total) {
  if (cache[total] !== undefined) {
   return cache[total] //直接使用缓存结果
  }
  num2++
  var result
  if (total === 0) result = 0
  else if (total === 1) result = 1
  else if (total === 2) result = 2
  else {
   result = _count(total - 1) + _count(total - 2)
  }
  cache[total] = result
  return result
 }
 return _count(total)
}

console.time('没有动态规划')
var result1 = count1(25)
console.log(result1, '计算了' + num1 + '次')
console.timeEnd('没有动态规划')
console.time('动态规划')
var result2 = count2(25)
console.log(result2, '计算了' + num2 + '次')
console.timeEnd('动态规划')

// 121393 "计算了150049次"
// 没有动态规划: 5.377197265625ms
// 121393 "计算了25次"
// 动态规划: 0.339111328125ms
```

由上述代码运行的结果可知，动态规划可以大大的提高程序的效率

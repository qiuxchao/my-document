# 排序和查找

## 排序算法

> 排序算法没有优劣之分，在不同的场景中，不同的排序算法执行效率不同。

1. **冒泡排序 Bubble Sort**

一次冒泡排序，可以将某个区域序列的最大值排序到该区域的最后一位，具体的方式是：

1. 将第 1 位和第 2 位比较，如果前者比后者大则交换
2. 将第 2 位和第 3 位比较，如果前者比后者大则交换
3. 依次类推，直到比较到该区域的最后两位
4. 重复上述过程，直到序列排序完成

> 冒泡排序效率一般，在各种情况下不会太好，也不至于太差
> 如果数组本身是比较有序的，冒泡排序还是不错的

```javascript
function bubbleSort(list) {
 if (!Array.isArray(list)) return []
 for (let i = 0; i < list.length; i++) {
  for (let j = 0; j < list.length - i - 1; j++) {
   if (list[j] > list[j + 1]) {
    ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
   }
  }
 }
 return list
}

const list = [5, 3, 2, 4, 6, 1, 7]
console.log(bubbleSort(list)) // [1, 2, 3, 4, 5, 6, 7]
```

2. **插入排序 Insertion Sort**

将序列分为两个部分，一部分是有序的，一部分是无序的，现在要做的是，就是不断的从无序的部分取出数据，加入到有序的部分，直到整个排序完成

例如：序列[5, 7, 2, 3, 6]

1. 分为有序的序列和无序的序列 (5) (7 2 3 6)
2. 不断的扩充有序序列 (5 7) (2 3 6)
3. 不断的扩充有序序列 (2 5 7) (3 6)
4. 不断的扩充有序序列 (2 3 5 7) (6)
5. 不断的扩充有序序列 (2 3 5 6 7)
6. 排序完成

> 插入排序在小规模的数组中效率很高，如果数组本身是比较有序的，则效率会进一步提升
> V8 引擎在数组比较小的时候会使用插入排序

```javascript
function insertSort(list) {
 if (!Array.isArray(list)) return []
 for (let i = 1; i < list.length; i++) {
  // 当前下标小于前面排好的右侧边界时才需要排序
  if (list[i] < list[i - 1]) {
   let temp = list[i]
   let j = i
   for (; j >= 0; j--) {
    if (j > 0 && temp < list[j - 1]) {
     list[j] = list[j - 1]
    } else {
     break
    }
   }
   list[j] = temp
  }
 }
 return list
}

const list = [5, 3, 2, 4, 6, 1, 7]
console.log(insertSort(list)) // [1, 2, 3, 4, 5, 6, 7]
```

3. **快速排序 Quick Sort**

选择一个数（比如序列的最后一位）作为基准数，将整个序列排序成两部分，一部分比该数小，另一部分比该数大，基准数在中间，然后对剩余的序列做同样的事情，直到排序完成

例如：序列[5, 7, 2, 3, 6, 4]

1. 选择 4 作为基准数，排序成为：(3, 2) 4 (7, 6, 5)
2. 对于 3,2， 继续使用该方式排序，得到： (2, 3) 4 (7,6,5)
3. 对于 7,6,5，继续使用该方式排序，得到： (2, 3) 4 (5,6,7)
4. 排序完成

> 当数组比较大并且比较混乱的时候，使用快速排序效率很高
> V8 引擎在数组较大时会自动使用快速排序

```javascript
function quickSort(list) {
 if (!Array.isArray(list)) return []
 function _quickSort(left, right) {
  if (left < 0 || right >= list.length || left > right) return
  // 拿一个基准数
  let key = list[right]
  let low = left,
   high = right
  // 此循环结束后low === high
  while (low < high) {
   while (list[low] <= key && low < high) {
    low++
   }
   list[high] = list[low]
   while (list[high] >= key && low < high) {
    high--
   }
   list[low] = list[high]
  }
  // low === high，将基准值放到当前位置
  list[low] = key
  // 搞定左边
  _quickSort(0, low - 1)
  // 搞定右边
  _quickSort(low + 1, right)
 }
 _quickSort(0, list.length - 1)
 return list
}

const list = [5, 3, 2, 4, 6, 1, 7]
console.log(quickSort(list)) // [1, 2, 3, 4, 5, 6, 7]
```

## 查询算法

下面的例子均使用此数组：

```javascript
const list = [1, 3, 4, 5, 6, 7, 8]
```

1. **顺序查找 Inorder Search**

即普通的遍历，属于算法的穷举法，没啥好解释的

```javascript
// 顺序查找
function inorderSearch(list, target) {
 if (!Array.isArray(list) || !target) return false
 for (let i = 0; i < list.length; i++) {
  if (list[i] === target) return true
 }
 return false
}
console.log(inorderSearch(list, 5)) // true
console.log(inorderSearch(list, 0)) // false
```

2. **二分查找 Binary Search**

如果一个序列是一个排序好的序列，则使用二分查找可以极大的缩短查找时间

具体的做法是：

查找该序列中间未知的数据

1. 相等，找到
2. 要找的数据较大，则对后续部分的数据做同样的步骤
3. 要找的数据较小，则对前面部分的数据做同样的步骤

```javascript
// 二分查找
function binarySearch(list, target) {
 if (!Array.isArray(list) || !target) return false
 function _binarySearch(left, right) {
  // 两个指针重合了，判断当前值是否符合条件
  if (left === right && list[left] !== target) return false
  // 排除意外情况
  if (left < 0 || right > list.length - 1 || left > right) return false
  // 在指定范围内，开始二分
  const mid = Math.floor((left + right) / 2)
  if (list[mid] === target) {
   // 中间值正好就是目标值，即找到了
   return true
  } else if (list[mid] > target) {
   // 中间值比目标值大，即目标值在 左边值 ~ 中间值-1 这个范围，在左边继续查找
   return _binarySearch(left, mid - 1)
  } else {
   // 中间值比目标值小，即目标值在 中间值+1 ~ 右边值这个范围，在右边继续查找
   return _binarySearch(mid + 1, right)
  }
 }
 return _binarySearch(0, list.length - 1)
}
console.log(binarySearch(list, 5)) // true
console.log(binarySearch(list, 0)) // false
```

4. **插值查找 Interpolation Search**

插值查找是对二分查找的进一步改进

如果序列不仅是一个排序好的序列，而且序列的步长大致相同，使用插值查找会更快的找到目标。

插值查找基于如下假设：下标之间的距离比和数据之间的距离比大致相同，即：

```
(目标下标-最小下标) / (最大下标 - 最小下标) ≈ (目标值 - 最小值) / (最大值 - 最小值)
```

因此可以算出大致的下标落点：

```
目标下标 ≈ (目标值 - 最小值) / (最大值 - 最小值) * (最大下标 - 最小下标) + 最小下标
```

这样就可以计算出大致的下标落点，后续的比较和二分查找一样。

```javascript
// 插值查找
function interpolationSearch(list, target) {
 if (!Array.isArray(list) || !target) return false
 function _interpolationSearch(left, right) {
  if (left === right && list[left] !== target) return false
  if (left > right || left < 0 || right > list.lenght - 1) return false
  // 计算大致下标落点
  const mid = Math.floor(
   ((target - list[left]) / (list[right] - list[left])) *
    (right - left) +
    left
  )
  // 验证mid的范围
  if (mid < left || mid > right) {
   return false;
  }
  if (list[mid] === target) {
   return true
  } else if (list[mid] > target) {
   return _interpolationSearch(left, mid - 1)
  } else {
   return _interpolationSearch(mid + 1, right)
  }
 }
 return _interpolationSearch(0, list.length - 1)
}
console.log(interpolationSearch(list, 5)) // true
console.log(interpolationSearch(list, 0)) // false
```

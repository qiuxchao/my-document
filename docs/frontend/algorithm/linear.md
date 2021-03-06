
# 线性结构

---

## 数据结构和算法概述

**1、什么是数据结构？**

存储和运算是程序的两大基础功能，数据结构是专门研究数据存储的学科。

很多时候，我们无法仅使用简单的数字、字符串、布尔就能完整的描述数据，可能我们希望使用数组、对象、或它们组合而成的复合结构来对数据进行描述。这种复合的结构就是数据结构。

而在实际开发中，我们会发现很多场景中使用的数据结构有着相似的特征，于是，数据结构这门学科，就把这些相似的结构单独提取出来进行研究。

在这门学科中，常见的数据结构有：数组、链表、树、图等

**2、什么是算法？**

存储和运算是程序的两大基础功能，算法是专门研究运算过程的学科。

一个程序，很多时候都需要根据一种已知数据，通过计算，得到另一个未知数据，这个运算过程使用的方法，就是算法。

而在很多的场景中，它们使用的算法有一些共通的特点，于是把这些共通的算法抽象出来，就行了常见算法。

从一个更高的角度来对算法划分，常见的算法有：穷举法、分治法、贪心算法、动态规划

**3、数据结构和算法有什么关系？**

一个面向的是存储，一个面向的是运算，它们共同构成了计算机程序的两个重要部分。

有了相应的数据结构，免不了对这种数据结构的各种变化进行运算，所以，很多时候，某种数据结构都会自然而然的搭配不少算法。

**4、数据结构和算法使用什么计算机语言？**

数据结构和算法属于计算机基础，它们和具体的语言无关，用任何语言都可以实现。

本文章采用 JavaScript 语言。

## 线性结构

线性结构是数据结构中的一种分类，用于表示一系列的元素形成的有序集合。
常见的线性结构包括：数组、链表、栈、队列

### 数组

特别注意：这里所说的数组是数据结构中的数组，和 JS 中的数组不一样

数组是一整块连续的内存空间，它由固定数量的元素组成，数组具有以下基本特征：
整个数组占用的内存空间是连续的
数组中元素的数量是固定的（不可增加也不可减少），创建数组时就必须指定其长度
每个元素占用的内存大小是完全一样

根据数组的基本特征，我们可以推导出数组具有以下特点： 1. 通过下标寻找对应的元素效率极高，因此遍历速度快 2. 无法添加和删除数据，虽然可以通过某种算法完成类似操作，但会增加额外的内存开销或时间开销 3. 如果数组需要的空间很大，可能一时无法找到足够大的连续内存

**JS 中的数组**

在 ES6 之前，JS 没有真正意义的数组，所谓的 Array，实际上底层实现是链表。
ES6 之后，出现真正的数组（类型化数组），但是由于只能存储数字，因此功能有限
目前来讲，JS 语言只具备不完善的数组（类型化数组）

### 链表

为弥补数组的缺陷而出现的一种数据结构，它具有以下基本特征：
每个元素除了存储数据，需要有额外的内存存储一个引用（地址），来指向下一个元素
每个元素占用的内存空间并不要求是连续的
往往使用链表的第一个节点（根节点）来代表整个链表

根据链表的基本特征，我们可以推导出它具有以下特点： 1. 长度是可变的，随时可以增加和删除元素 2. 插入和删除元素的效率极高 3. 由于要存储下一个元素的地址，会增加额外的内存开销 4. 通过下标查询链表中的某个节点，效率很低，因此链表的下标遍历效率低

### 手动用代码实现链表

实际上，很多语言本身已经实现了链表（如 JS 中的数组，底层就是用链表实现的），但链表作为一种基础的数据结构，通过手写代码实现链表，不仅可以锻炼程序思维和代码转换能力，对于后序的复杂数据结构的学习也是非常有帮助的。
因此，手写链表是学习数据结构和算法的一门基本功
手写一个链表结构，并完成一些链表的相关函数，要实现以下功能：
ps: 以下代码主要使用分治法（递归）来完成

**1. 创建一个链表**

```javascript
// 链表的构造函数
function Node(value) {
 this.value = value
 this.next = null
}
var node1 = new Node(3)
var node2 = new Node(5)
var node3 = new Node(8)
node1.next = node2
node2.next = node3
```

**2. 遍历打印**

```javascript
// 遍历打印
// root 表示链表的根节点
function print(root) {
 if (!root) {
  return
 }
 console.log(root.value)
 print(root.next)
}
print(node1)
// 3
// 5
// 8
```

**3. 获取链表的长度**

```javascript
// 获取指定链表的长度
function getLength(node) {
 if (!node) {
  return 0
 }
 return 1 + getLength(node.next)
}
getLength(node1)
// 3
```

**4.通过下标获取链表中的某个数据**

```javascript
// 通过下标获取指定链表中的某个数据
function getValue(root, index) {
 function _getValue(node, curIndex) {
  if (curIndex === index) {
   return node
  }
  if (!node) {
   return false
  }
  return _getValue(node.next, curIndex + 1)
 }
 return _getValue(root, 0)
}
getValue(node1, 2)
// Node {value: 8, next: null}
```

**5.通过下标设置链表中的某个数据**

```javascript
// 通过下标设置链表中的某个数据
function setValue(root, index, value) {
 function _setValue(node, curIndex) {
  if (!node) {
   //节点不存在,无法设置
   return
  }
  if (curIndex === index) {
   node.value = value
  } else {
   _setValue(node.next, curIndex + 1)
  }
 }
 _setValue(root, 0)
}
setValue(node1, 2, 999)
console.log(getValue(node1, 2))
// Node {value: 999, next: null}
```

**6.在链表某一个节点之后加入一个新节点**

```javascript
// 在链表指定下标的位置加入新节点
function insert(root, index, newValue) {
 function _insert(node, curIndex) {
  if (curIndex === 0 && index === 0) {
   // 改变链表第一个节点即改变整个列表，将返回一个新链表
   var newNode = new Node(newValue)
   newNode.next = node
   return newNode
  }
  if (curIndex === index - 1) {
   var nextNode = node.next
   var newNode = new Node(newValue)
   newNode.next = nextNode
   node.next = newNode
  }
  if (!node) {
   return false
  }
  _insert(node.next, curIndex + 1)
 }
 return _insert(root, 0)
}
insert(node1, 2, 999)
print(node1)
// 3
// 5
// 999
// 8
```

**7.在链表末尾加入一个新节点**

```javascript
// 在链表末尾加入一个新节点
function append(root, newValue) {
 function _append(node) {
  if (!node) {
   return false
  }
  if (node.next === null) {
   var newNode = new Node(newValue)
   newNode.next = null
   node.next = newNode
   return
  }
  return _append(node.next)
 }
 return _append(root)
}
append(node1, 888)
print(node1)
// 3
// 5
// 8
// 888
```

**8.删除一个链表节点**

```javascript
// 删除一个列表节点
function remove(root, index) {
 function _remove(node, curIndex) {
  if (curIndex === 0 && index === 0) {
   // 删除链表第一个节点，返回第二个节点
   return node.next
  }
  if (curIndex === index - 1) {
   node.next = node.next.next
  }
  if (!node) {
   return false
  }
  _remove(node.next, curIndex + 1)
 }
 return _remove(root, 0)
}
```

**9.链表倒序**

```javascript
// 链表倒序
function reverse(root) {
 if (!root || !root.next) {
  // 没有节点,或者只有一个节点
  return root
 }
 if (!root.next.next) {
  // 两个节点
  var temp = root.next
  temp.next = root
  root.next = null
  return temp
 } else {
  // 大于两个节点
  var temp = reverse(root.next)
  root.next.next = root
  root.next = null
  return temp
 }
}
```

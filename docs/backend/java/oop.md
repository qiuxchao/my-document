<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-22 11:28:35
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-22 13:34:47
-->
# 面向对象

## 概述

### 类和对象

- **类** 是抽象笼统的概念，描述一类事物，一类事物中的所有个体具有相同的**特征**和**行为**。拿人类来举例：
  - 人类的**特征**：有名字 有年龄 有性别 ...
    - **特征**是静态的，又称作**属性**
  - 人类的**行为**：会说话 会吃饭 会学习 ...
    - **行为**是动态的，又称作**方法**

- **对象** 是一个类中的具体的个体，拥有这一个类的定义好的特征与行为。又称作类的**实例**。先定义好**类**，然后才能根据**类**来创建**个体**。用上面定义的人类来创建个体：
  - **特征**(属性)：名字: QiuXc 年龄: 21 性别: 男
  - **行为**(方法)：说话 吃饭 学习

##### 代码实现

```java
public class Person {
    // 属性
    String name;
    int age;
    String sex;
    
    // 方法
    public void talk() {
        System.out.println("说话中~");
    }
    public void eat() {
        System.out.println("吃饭中~");
    }
    public void study() {
        System.out.println("学习中");
    }
    
    // 创建类型实例（对象）
    public static void main(String[] args) {
        Person qiuxc = new Person();
        qiuxc.name = "QiuXc";
        qiuxc.age = 21;
        qiuxc.sex = "男";
        qiuxc.talk();
        qiuxc.eat();
        qiuxc.study();
    }
}
```

### 属性和方法

> 中括号内的部分表示不是必要的

- 属性格式：`权限修饰符 [特征修饰符] 属性类型 属性名 [= 值];`
  - 基本项：`权限修饰符 属性类型 属性名;`
  - 只声明属性不赋值时，会自动赋予默认值
  
- 方法格式：`权限修饰符 [特征修饰符] 返回值类型 方法名 (形参列表) [抛出异常] [{方法体}];`
  - 基本项：`权限修饰符 返回值类型 方法名 () {}`
  - 形参列表是指小括号，小括号必须有，括号内的参数可以没有
  - 方法体只有在抽象方法时不需要，其他情况都要
  - 按参数和返回值划分：
        1. 无参数无返回值 `public void func() {}`
        2. 无参数有返回值 `public int func() {}`
        3. 有参数无返回值 `public void func(int[] numbers) {}`
        4. 有参数有返回值 `public int func(int[] numbers) {}`

## main 入口方法

`main` 是程序的入口方法，和类没有关系，在哪个类里面都无所谓。

```java
public class Test{
    public static void main(String[] args) {
        for(String val : args) {
   System.out.println(val);
  }
    }
}
```

- `public`： 访问权限修饰符 公有的
- `static`： 特征修饰符 静态的 有且只有一份
- `void`：   方法执行完的返回值类型，`void` 表示无返回值
- `main`：   方法名字 主要的

### 主方法中的 args 参数是可以传递的

1. 主方法不是我们调用的，是 `JVM` 虚拟机启动的时候自动调用的
2. 主方法里面的 `args` 参数，是一个 `String[]` 类型，我们是可以传递参数进去的
3. `args` 参数的传递方法如下，以下命令在终端中输入

```shell
$ java Test.java 参数1 参数2
// 结果
参数1
参数2
```

## 方法

### 形参和实参

- **形参**可以理解为是方法执行时创建的临时变量空间
- **实参**可以理解为是方法调用时传递进去的参数
- 方法调用时会将实参的内容传给形参
- 如果内容是基本类型，传递的是**值**，形参改变，实参不变
- 如果内容是引用类型，传递的是地址（引用），形参改变，实参跟着改变

### 方法执行内存结构

分析下面这段代码执行时，内存中的变化

```java
public class Test {
    public void changeNum (int num) {
        System.out.println("方法开始执行: " + num);
        num = 10;
        System.out.println("方法执行结束: " + num);
    }
    
    public static void main (String[] args) {
        Test t = new Test();
        int a = 1;
        t.changeNum(a);
        System.out.println("changeNum 方法执行后: " + a);
    }
}
```

以上代码的执行结果为：

```
方法开始执行: 1
方法执行结束: 10
changeNum 方法执行后: 1
```

`main` 方法执行流程：

1. 类加载器(`ClassLoader`)将`Test`类模板加载到内存存储区中的方法区
2. 在栈内存中创建`Test`类型的名为`t`的变量
3. 在堆内存中根据`Test`类模板创建一个实例，然后将实例引用地址给栈内存中的`t`变量
4. 在栈内存中创建`int`类型的`a`变量，然后将存储区常量池中的`1`赋给`a`
5. `t.changeNum`方法执行，在栈内存中临时开辟一块方法执行空间，待方法执行完成，销毁该空间
6. 在方法执行空间中创建类型为`int`的`num`变量，然后将方法执行空间外面的`a`变量的值复制给`num`变量
7. 打印`num`变量，此时`num`的值是刚从`a`那里复制来的，因此结果为 `1`
8. 从常量区中取出`10`，覆盖到方法执行空间中的`num`变量的值上，此时`num`为`10`
9. 打印`num`，结果为 `10`
10. `t.changeNum`方法执行完毕，销毁方法执行空间
11. 输入`a`的值，因为`a`从来没有被改变过，所以结果为 `1`
![方法内存图](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/usersProject/方法执行内存图.png)

### 方法重载 overload

##### 概念

一个类中的一组方法，具有相同的方法名字、不同的参数列表，这样的一组方法构成了方法重载
> 参数列表的不同体现在了哪里？<br />
> 参数的**个数** 参数的**类型** 参数的**顺序**

##### 作用

为了让使用者便于记忆与调用，只需要记录一个方法名字，就可以执行不同的操作

##### 定位方法

- 由于方法重载是多个方法名字一致，所以调用方法的时候，可以根据**参数的数据类型**定位到方法
- 如果没有支持传递的参数类型的方法，个别基础类型会自动发生类型转换，转换成支持的类型，例如如果没有支持`char`类型参数的方法，却有支持`int`类型参数的方法，那么传入`char`类型的参数时，会自动转为`int`从而调用支持`int`类型参数的方法。

##### `...` 语法 动态形参列表

- JDK1.5版本之后出现了一个新的语法 `...`，可以用来收集参数列表

- 例如 `int... x` 会将所有传入的参数收集到 `x` 中，`x`
本质上就是一个数组，有 `length` 属性，有 `index`

- 拥有动态参数列表的方法，不能与具有相同意义的数组类型方法构成重载，因为它们本质上是一样的

- 动态参数列表的方法，可以不传参数，相当于数组长度是 `0`，而数组参数的方法，必须传递参数

- 动态参数列表在方法的参数中只能存在一个，并且必选放置在方法参数的末尾

```java
// 方法重载（多个方法同名，各自接受不同类型参数）
public class Overload {
 public void log() {
  System.out.println("没有参数的log方法");
 }
 public void log(int prop) {
  System.out.println("int 参数类型：" + prop);
 }
 public void log(char prop) {
  System.out.println("char 参数类型：" + prop);
 }
 public void log(boolean prop) {
  System.out.println("boolean 参数类型：" + prop);
 }
 public void log(float prop) {
  System.out.println("float 参数类型：" + prop);
 }
 public void log(int... props) {
  System.out.println("使用 ... 收集参数的log方法，收集到的参数如下：");
  for (int prop : props) {
   System.out.println(prop);
  }
 }
 
 public static void main(String[] args) {
  Overload t = new Overload();
  t.log(1, 2, 3, 4, 5);
  t.log(1);
  t.log('a');
  t.log(true);
  t.log((float)10);
  t.log();
 }
}
// 输出结果
/*
使用 ... 收集参数的log方法，收集到的参数如下：
1
2
3
4
5
int 参数类型：1
char 参数类型：a
boolean 参数类型：true
float 参数类型：10.0
没有参数的log方法
*/
```

## 类中的四个成员

1. 属性
2. 方法
3. 构造方法
4. 程序块

> 下面格式中`[]`括起来的部分表示非必要的

### 属性

- 用于描述特征，是静态的，一般操作有：存值/取值
- 格式：`权限修饰符 [特征修饰符] 属性类型 属性名字 [= 值];`

```java
public class Main {
    public static String name = "QiuXc";
    private int age = 21;
}
```

### 方法

- 用于描述行为，是动态的
- 格式：`权限修饰符 [特征修饰符] 返回值类型 方法名字 ([参数列表]) [抛出异常] [{方法体}]`
- 主要的知识点是方法设计的参数及返回值问题、 参数传递、 方法调用、执行时内存中发生的事

```java
public class Main {
    public static void sayHello (String name) {
        System.out.println("Hello, " + name);
    }
    private int sum (int a, int b) {
        return a + b;
    }
}
```

### 构造方法

- 用于初始化要创建的对象
- 格式：`权限修饰符 与类名相同的方法名 ([参数列表]) [抛出异常] {方法体}`

```java
public class Main {
    public Main (String name, int age, String sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}
```

### 程序块

- 程序块是一个特殊的方法，没名字，不用我们调用，在构建对象之前自动调用，调用比构造方法还要早
- 格式：`{}`

```java
public class Main {
    {
        System.out.println("我是第一个程序块，构建对象时我最先被调用");
    }
    {
        System.out.println("我是第二个程序块，构建对象我第二个被调用");
    }
}
```

### this 关键字

- 用来代替当前被构建的对象
- 可以调用一般属性或一般方法，可以放置在任何类成员中使用
- 可以调用构造方法，格式为 `this()` ，只能放在另一个构造方法中（必须构成重载），并且只能放在方法体的第一行

```java
public class Main {
 public Main () {
  System.out.println("无参数的构造方法");
 }
 // 构造方法重载
 public Main (String name) {
  this();
  // 下面这行会等上面无参数的构造方法执行完毕后才会执行
  System.out.println("有参数的构造方法，name：" + name);
 }
 
 public static void main (String[] args) {
  Main m = new Main("QiuXc");
 }
}
// 输出:
/*
无参数的构造方法
有参数的构造方法，name：QiuXc
*/

```

### 代码示例

> ClassDemo.java

```java
public class ClassDemo {
 // 属性
 public String name;
 public int age;
 
 // 方法
 public void sayHello () {
  System.out.println("Hello, My Name Is " + this.name + ", And My Age Is " + this.age);
 }
 
 // 构造方法
 public ClassDemo () {} // 此方法用于兼容不传参数的情况，与下面的方法构成重载
 public ClassDemo (String name, int age) {
  this.name = name;
  this.age = age;
  System.out.println("对象构建好啦");
 }
 
 // 程序块
 {
  System.out.print("我是第一个程序块，读取属性 name: " + this.name);
  System.out.println("（结果肯定是 null，因为构造方法还没有执行，null 是默认值）");
 }
 {
  System.out.print("我是第二个程序块，读取属性 age: " + this.age);
  System.out.println("（结果肯定是 0，因为构造方法还没有执行, 0 是默认值）");
 }
}
```

> Test.java

```java
public class Test {
 public static void main (String[] args) {
  ClassDemo demo = new ClassDemo("QiuXc", 22);
  demo.sayHello();
  System.out.println("通过对象获取属性，name：" + demo.name + " age：" + demo.age);
 }
}
// 输出
/*
我是第一个程序块，读取属性 name: null（结果肯定是 null，因为构造方法还没有执行，null 是默认值）
我是第二个程序块，读取属性 age: 0（结果肯定是 0，因为构造方法还没有执行, 0 是默认值）
对象构建好啦
Hello, My Name Is QiuXc, And My Age Is 22
通过对象获取属性，name：QiuXc age：22
*/
```

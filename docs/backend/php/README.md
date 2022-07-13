<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-13 11:40:49
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-13 15:40:24
-->
# PHP

## 变量和数据类型

### 变量 variables

1. 前缀 `$`
2. 以字母或下划线 `_` 开头
3. 由字母/数字/下划线组成
4. 驼峰命名法
5. 大小写敏感

``` php
$output = "Hello World!";
echo $output;  // Hello World!
```

### 数据类型

1. `String` - 字符串
2. `Integer` - 数值
3. `Float` - 浮点数值
4. `Boolean` - 布尔值
5. `Array` - 数组
6. `Object` - 对象
7. `Null` - 空值
8. `Resource` - ???

``` php
$string = "Hello World!";  // 字符串
$number = 7;  // 数值
$float = 5.5; // 浮点数值
$bool = true; // 布尔值
```

### 打印的方法

1. `echo` : `echo "Hello World!";`
2. `print` : `print "Hello World!";`
3. `print_r` : `print_r(["name" => 'Merry']);`
4. `var_dump` : `var_dump('Hello')`
建议使用 `echo`，速度比较快

### 注释

1. `//`  单行注释
2. `#`   单行注释
3. `/**/`  多行注释

### 字符串拼接

不能使用 `+` 号，要使用 `.` ：

``` php
$str1 = "Hello ";
$str2 = "World!";
$greeting = $str1 . $str2;
echo $greeting;  // Hello World!
```

### 单引号 `''` & 双引号 `""`

- 单引号中的所有内容都是字符串；
- 双引号中的变量可以被解析（类似 Js 模板字符串）

``` php
$str1 = "Hello ";
$str2 = "World!";
$greeting = '$str1 $str2';
echo $greeting;  // $str1 $str2
$greeting2 = "$str1 $str2";
echo $greeting2;  // Hello World!
```

### 转义字符

1. `\`  将字符串中的特殊符号转义
2. 单引号 引 双引号  `' "" '`
3. 双引号 引 单引号 `" '' "`

```php
'They\'re Here';
"They're Here";
```

### 常量

`define()` 函数声明一个常量，第一个参数为常量名(需要加引号)，第二个参数为常量值。常量不可被改变，名称一般大写，使用时没有美元符号。

```php
define('GREETING', 'Hello Everyone!');
echo GREETING;  // Hello Everyone!
```

`define()` 最后一个参数默认为 `false`，表示区分大小写，若设为 `true` 则表示不区分大小写

```php
define('GREETING', 'Hello Everyone!', true);
echo greeting;  // Hello Everyone!
echo GREETING;  // Hello Everyone!
```

## if switch 分支语句 & 关系运算符 & 逻辑运算符

### if - else if - else 分支语句

```php
if(条件) {
    // ...
} else if (条件) {
    // ...
} else {
    // ...
}
```

也可以不写花括号，默认只执行条件判断后面的一条代码：

```php
if (条件)
    // ...
else if (条件)
    // ...
else 
    // ...    
```

### switch - case 分支语句

每条语句要加 `break`，不然会往下漏

```php
switch ($num) {
    case 1 :
        // ...
        break;
    case 2 :
        // ...
        break;
    case 3 :
        // ...
        break;  
    default:
        // ...
        break;  
}
```

### 关系运算符

- `==` 是否相等（松散比较，只比较值）
- `===` 是否相等（严格比较，比较值和类型）
- `!=` 是否不相等（松散比较）
- `!==` 是否不相等（严格比较）
- `>` 是否大于
- `<` 是否小于
- `>=` 是否大于等于
- `<=` 是否小于等于

### 逻辑运算符

- `&&` , `AND` 逻辑与，左右都满足才返回 `true`
- `||` , `OR` 逻辑或，左右其一满足就返回 `true`
- `XOR` 逻辑异或，左右都为真或左右都为假会返回 `false`，只有左右其一为真才会返回 `true`（即左右其一为真才为真，其他情况都为假）

## 循环

`PHP` 中的循环主要有：

 - `For` 循环
 - `While` 循环
 - `Do......While` 循环
 - `Foreach` 循环

```php
<?php 
    # PHP 循环  -------------------------------------------------------------------------------->

    # 循环： 根据某种条件，重复执行某段代码

    /** 四种循环类型：
     *      - For
     *      - While
     *      - Do...While
    *      - Foreach
   */

/** for 循环
 * @param init              每次循环的变量
 * @param condition         条件判断
 * @param inc               每次循环结束后             
 */
    for($i = 0; $i < 10; $i++) {
        echo $i;
        echo '<br />';
    }


/** while循环
 * @param condition     条件，条件满足时会一直执行，直至条件不满足
 */
    $num = 0;
    while($num < 10) {
        echo $num;
        echo '<br />';
        $num ++;
    }


    /** do...while 循环
     * @param condition         条件
     */
    $x = 0;
    do {
        echo $x;
        echo '<br />';
        $x++;
    }
    while($x < 10);

    # do...while 和 while 的区别：
    # do...while 会先执行 do 里面的代码，不管条件成立不成立
    # while 会先执行 while 里的条件，条件满足才会执行花括号中的代码



    /** forEach 循环（主要用来遍历数组）
     * @param as        as 前是要遍历的数组，as 后是遍历的变量
     */
    # 遍历下标数组
    $people = array('Henry', 'Elyse', 'Bucky');
    foreach($people as $person) {
        echo $person;
        echo '<br />';
    }
    # 遍历关联数组
    $peoples = ['Henry' => 35, 'Elyse' => 28, 'Bucky' => 40];
    foreach($peoples as $people => $age) {
        echo "The $people is $age years old.";
        echo '<hr />';
    }
?>
```

## 函数

函数主要情况：

1. 无参无返回值
2. 有参有返回值
3. 有返回值无参
4. 无返回值有参

```php
<?php

# 函数

# Function: 可被重复利用的代码块

/*
    函数命名规则：
        1. 小驼峰(Camel Case)   - myFunction()
        2. 下划线(Lower Case)    - my_function()
        3. 大驼峰(Pascal Case)   - MyFunction() 

    */

# 定义函数
function simpleFunction()
{
    echo 'Hello World!';
    echo '<hr />';
}
# 调用函数
simpleFunction();

# 带参函数
function sayHello($name)
{
    echo "Hello $name, have a good day!!!";
    echo '<hr />';
}
sayHello('QiuXc');

# 默认参数
function defaultParam($param = 'OK')
{
    echo $param;
    echo '<hr />';
}
defaultParam();

# 有参有返回值
function addNumbers($num1, $num2)
{
    return $num1 + $num2;
}
echo addNumbers(3, 5);
echo '<hr />';

# 无参有返回值
function getMessage()
{
    return 'Hello World!';
}
echo getMessage();
echo '<hr />';


# 函数传引用
$myNum = 10;
function addFive($num)
{
    $num += 5;
}
# 形参前加 & 符会影响全局变量，参数的变量的值将被函数内的操作所影响
function addTen(&$num)
{
    $num += 10;
}
addFive($myNum);
echo $myNum;    # 10 
addTen($myNum);
echo $myNum;    # 20

?>
```

## 面向对象

主要知识点：

1. `class` 关键字创建一个类: `class Person{}`
2. 类中的属性和方法的三种类型: `public`: 公开的、`private`: 私有的、`protected`: 受保护的
3. 类中的 `$this` 指向本身
4. 类的实例使用 `xxx->xxx` 来获取属性或调用方法
5. `__construct` 自执行函数，用于初始化实例
6. `__destruct`   自执行函数，销毁实例时触发（销毁是指实例代码执行完后）
7. 类中 `__CLASS__` 返回类的名字
8. 子类通过 `extends` 继承父类：`class Children extends Father{}`
9. 子类的 `__construct` 函数要涵盖父类的参数
10. 子类 `__construct` 中使用 `parent::__construct()` 将接收到的参数传递给父类

### 类中声明属性和方法的三种类型

1. `public`: 公开的
    - 类的外部可以访问
    - 类的内部可以访问
    - 类的子类可以访问

2. `private`: 私有的
    - 类的内部可以访问

3. `protected`: 受保护的
    - 类的内部可以访问
    - 类的子类可以访问

```php
<?php

// PHP 面向对象

# 类
# 对象

/*
        public: 公开的 访问场景
            - 类的外部可以访问
            - 类的内部可以访问
            - 类的子类可以访问

        private: 私有的 访问场景
            - 类的内部可以访问
    
        protected: 受保护的 访问场景
            - 类的内部可以访问
            - 类的子类可以访问

        $this: 指类本身
    
    */

# 创建一个类
class Person
{

    # 属性<名词>
    # public 声明一个公开的，外部可以访问到
    public $name = "QiuXc";
    # private 声明一个私有的，外部不能访问，只能在内部访问
    private $email = "2915241235@qq.com";

    # 方法<动词>
    # 私有属性可以通过公开的方法来获取和设置
    public function setEmail($email)
    {
        $this->email = $email;
    }
    public function getEmail()
    {
        return $this->email . '<br>';
    }

    # 构造函数：自执行（实例化类的时候就执行，用来接收传递来的参数）
    public function __construct($name, $email)
    {   
        # 初始化类
        $this->name = $name;
        $this->email = $email;
    }

    # 析构函数：自执行（实例化完成后要销毁时执行）
    public function __destruct()
    {
        # __CLASS__ 返回当前的类名
        echo __CLASS__ . "被销毁了<br>";
    }
}

# 实例化类
$person1 = new Person("Qiuxc001","2915241235@qq.com");
# 获取属性
echo $person1->name . '<br>';
# 修改属性
$person1->name = "Henry";
echo $person1->name . '<br>';

# 通过公开的方法设置和获取私有属性
$person1->setEmail("qiuxchao@gmail.com");
echo $person1->getEmail();

# 再次实例化类
$person2 = new Person("Bucky", "bucky@gmail.com");
echo $person2->name . '<br>';
echo $person2->getEmail();


# 继承，用户类继承了人类，即用户类是人类的子类
class Customers extends Person{
    private $salary = "3000";

    public function setSalary($salary) {
        $this->salary = $salary;
    }
    public function getSalary() {
        return $this->salary . "<br>";
    }

    # 子类的构造函数的参数，要完全涵盖父类的参数
    public function __construct($name, $email, $salary)
    {
        # 将父类的参数传递给父类，剩下的就是子类自己的参数
        # 调用父级构造函数
        parent::__construct($name, $email);
        # 初始化子类自己的属性
        $this->salary = $salary;
    }
}
# 实例化子类
$customer1 = new Customers("Qiuxc002", "qiuxc002@163.com", 10000);
echo $customer1->name . "<br>";
echo $customer1->getEmail();
echo $customer1->getSalary();

?>
```

## include & require

`include` 和 `require` 都是引入模块的方法，区别在于，文件加载失败的时候：

- `include` 会产生一个警告脚本并且会继续执行代码；
- `require` 会导致一个致命性的错误同时停止执行代码。

```php
<?php 

include('./test.php');  // 引入同目录下的 test.php 文件
require('./test.php');  // 引入同目录下的 test.php 文件

?>
```

## 字符串函数

字符串函数是指操作字符串的系统函数

官方文档：[https://www.w3school.com.cn/php/php_ref_string.asp](https://www.w3school.com.cn/php/php_ref_string.asp)

1. `substr()`      返回字符串的一部分（截取子串）
2. `strlen()`      返回字符串的长度
3. `strpos()`      返回指定的字符在字符串中第一次出现的下标
4. `strrpos()`     返回指定的字符在字符串中最后一次出现的下标
5. `trim()`        返回去除首位空格后的字符串
6. `strtoupper()`  返回转为大写后的字符串
7. `strtolower()`  返回转为小写后的字符串
8. `ucwords()`     返回每个单词首字母大写的字符串
9. `str_replace()` 替换字符串中指定的字符，返回替换后的字符串
10. `is_string()`  判断一个值是不是字符串，是就返回 `1`，不是则不返回任何东西
11. `gzcompress()` 压缩字符串，返回压缩后的字符串
12. `gzuncompress()` 解压字符串，返回解压后的字符串

```php
<?php

# 字符串函数

# 官方手册：https://www.w3school.com.cn/php/php_ref_string.asp

# substr()      返回字符串的一部分（截取子串）
$output = substr('Hello', 0, 3);
echo $output . '<hr />';   # Hel
# 不给第三个参数就截取到字符串末尾
$output2 = substr('hello', 2);
echo $output2 . '<hr />';  # llo

# strlen()      返回字符串的长度
$output3 = strlen("hello world");
echo $output3 . '<hr />';  # 11

# strpos()      返回指定的字符在字符串中第一次出现的下标
$output4 = strpos('hello world', 'l');
echo $output4 . '<hr />';  # 2

# strrpos()     返回指定的字符在字符串中最后一次出现的下标
$output5 = strrpos('hello world', 'l');
echo $output5 . '<hr />';  # 9

# trim()        返回去除首位空格后的字符串
$output6 = trim('       hello    ');
echo $output6 . '<hr />';  # hello

# strtoupper()  返回转为大写后的字符串
$output7 = strtoupper('hEllo');
echo $output7 . '<hr />';  # HELLO

# strtolower()  返回转为小写后的字符串
$output8 = strtolower('HeLLO');
echo $output8 . '<hr />';  # hello

# ucwords()     返回每个单词首字母大写的字符串
$output9 = ucwords('hello world');
echo $output9 . '<hr />';  # Hello World

# str_replace()    替换字符串中指定的字符，返回替换后的字符串
$text = "Hello World";
$output10 = str_replace("World", "Every", $text);
echo $output10 . '<hr />';  # Hello Every

# is_string()   判断一个值是不是字符串，是就返回 1，不是则不返回任何东西
$result = is_string('hello');
echo $result . '<hr />';  # 1

# gzcompress()  压缩字符串，返回压缩后的字符串
$string = "hello world";
$compressed = gzcompress($string);
echo $compressed . '<hr />';  # x��H���W(�/�I]

# gzuncompress()    解压字符串，返回解压后的字符串
$original = gzuncompress($compressed);
echo $original . '<hr />';  # hello world

?>
```

## 数组函数

官方文档：[https://www.w3school.com.cn/php/php_ref_array.asp](https://www.w3school.com.cn/php/php_ref_array.asp)

1. `array()`        创建一个数组
2. `array_push()`   末尾添加
3. `array_unshift()` 开头添加
4. `array_pop()`     末尾删除，返回值是被删除的项
5. `array_shift()`   开头删除，返回值是被删除的项
6. `srot()`     对数组的值排序，更改原数组
7. `implode()`  将数组转为字符串，返回字符串
8. `explode()`   将字符串转化为数组，返回数组

```php
<?php 
    # 数组方法

    # array()    创建一个数组
    $array = array();

    # 添加内容到数组中
    # array_push()      末尾添加
    array_push($array, 'hello');
    print_r($array);    # Array ( [0] => hello )
    # array_unshift()   开头添加
    array_unshift($array, 'world');
    print_r($array);    # Array ( [0] => world [1] => hello )

    # 删除数组中的内容
    # array_pop()     末尾删除，返回值是被删除的项
    $val = array_pop($array);
    print_r($array);    # Array ( [0] => world )
    print_r($val);      # hello
    # array_shift()     开头删除，返回值是被删除的项
    $val2 = array_shift($array);
    print_r($array);    # Array ( )
    print_r($val2);      # world


    # 数组排序
    # srot()    对数组的值排序，更改原数组
    $arrayNum = [1, 5, 2, 3, 8, 7, 9, 6, 4];
    sort($arrayNum);
    print_r($arrayNum);     # Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 [5] => 6 [6] => 7 [7] => 8 [8] => 9 )

    
    # implode() 将数组转为字符串，返回字符串
    $arr = array('Hello', 'Wrold');
    $string = implode('-', $arr);
    echo $string;   # Hello-Wrold


    # explode()  将字符串转化为数组，返回数组
    $oriArr = explode('-', $string);
    print_r($oriArr); # Array ( [0] => Hello [1] => Wrold )

?>
```

## 超全局变量 $_REQUEST &  $_GET  &  $_POST

### $_REQUEST

`$_REQUEST` 用于收集 `HTML` 表单提交的数据。
下面的例子展示了一个包含输入字段及提交按钮的表单。当用户通过点击提交按钮来提交表单数据时, 表单数据将发送到 `<form>` 标签的 `action` 属性中指定的脚本文件。在这个例子中，我们指定文件本身来处理表单数据。如果您需要使用其他的 `PHP` 文件来处理表单数据，请修改为您选择的文件名即可。然后，我们可以使用超级全局变量 `$_REQUEST` 来收集 `input` 字段的值：

```html
<html>
  <body>

    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
    Name: <input type="text" name="fname">
    <input type="submit">
    </form>

    <?php 
    $name = $_REQUEST['fname']; 
    echo $name; 
    ?>

  </body>
</html>
```

### $_POST

`$_POST` 广泛用于收集提交 `method="post"` 的 `HTML` 表单后的表单数据。`$_POST` 也常用于传递变量。
下面的例子展示了一个包含输入字段和提交按钮的表单。当用户点击提交按钮来提交数据后，表单数据会发送到 `<form>` 标签的 `action` 属性中指定的文件。在本例中，我们指定文件本身来处理表单数据。如果您希望使用另一个 `PHP` 页面来处理表单数据，请用更改为您选择的文件名。然后，我们可以使用超全局变量 `$_POST` 来收集输入字段的值：

```html
<html>
  <body>

    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
    Name: <input type="text" name="fname">
    <input type="submit">
    </form>

    <?php 
    $name = $_POST['fname'];
    echo $name; 
    ?>

  </body>
</html>
```

### $_GET

`$_GET` 也可用于收集提交 `HTML` 表单 (`method="get"`) 之后的表单数据。

`$_GET` 也可以收集 `URL` 中的发送的数据。

假设我们有一张页面含有带参数的超链接：

```html
<html>
  <body>
    <a href="test_get.php?subject=PHP&web=W3school.com.cn">测试 $GET</a>
  </body>
</html>
```

当用户点击链接 **测试 $GET**，参数 `subject` 和 `web` 被发送到 `test_get.php`，然后您就能够通过 `$_GET` 在 `test_get.php` 中访问这些值了。

下面的例子是 `test_get.php` 中的代码：

```html
<html>
  <body>
    <?php 
    echo "在 " . $_GET['web'] . " 学习 " . $_GET['subject'];
    ?>
  </body>
</html>
```

## 超全局变量 $_SERVER

`$_SERVER` 这种超全局变量保存关于报头、路径和脚本位置的信息。

下面列出了能够在 `$_SERVER` 中访问的最重要的元素：

| 元素代码 | 描述 |
| ------------- | ------------- |
|  **$_SERVER['PHP_SELF']**   | 返回当前执行脚本的文件名。  |
|  **$_SERVER['GATEWAY_INTERFACE']**   | 返回服务器使用的 CGI 规范的版本。  |
|  **$_SERVER['SERVER_ADDR']**  | 返回当前运行脚本所在的服务器的 IP 地址。 |
|  **$_SERVER['SERVER_NAME']**  | 返回当前运行脚本所在的服务器的主机名（比如 www.w3school.com.cn）。|
|  **$_SERVER['SERVER_SOFTWARE']**  | 返回服务器标识字符串（比如 Apache/2.2.24）。 |
|  **$_SERVER['SERVER_PROTOCOL']** | 返回请求页面时通信协议的名称和版本（例如，“HTTP/1.0”）。 |
|  **$_SERVER['REQUEST_METHOD']**  | 返回访问页面使用的请求方法（例如 POST）。 |
|  **$_SERVER['REQUEST_TIME']**  | 返回请求开始时的时间戳（例如 1577687494）。 |
|  **$_SERVER['QUERY_STRING']**  | 返回查询字符串，如果是通过查询字符串访问此页面。 |
|  **$_SERVER['HTTP_ACCEPT']**  | 返回来自当前请求的请求头。 |
|  **$_SERVER['HTTP_ACCEPT_CHARSET']**  | 返回来自当前请求的 Accept_Charset 头（ 例如 utf-8,ISO-8859-1）|
|  **$_SERVER['HTTP_HOST']**  | 返回来自当前请求的 Host 头。 |
|  **$_SERVER['HTTP_REFERER']**  | 返回当前页面的完整 URL（不可靠，因为不是所有用户代理都支持）。 |
|  **$_SERVER['HTTPS']**  | 是否通过安全 HTTP 协议查询脚本。 |
|  **$_SERVER['REMOTE_ADDR']**  | 返回浏览当前页面的用户的 IP 地址。 |
|  **$_SERVER['REMOTE_HOST']**  | 返回浏览当前页面的用户的主机名。 |
|  **$_SERVER['REMOTE_PORT']**  | 返回用户机器上连接到 Web 服务器所使用的端口号。 |
|  **$_SERVER['SCRIPT_FILENAME']**  | 返回当前执行脚本的绝对路径。 |
|  **$_SERVER['SERVER_ADMIN']**  | 该值指明了 Apache 服务器配置文件中的 SERVER_ADMIN 参数。 |
|  **$_SERVER['SERVER_PORT']**  | Web 服务器使用的端口。默认值为 “80”。 |
|  **$_SERVER['SERVER_SIGNATURE']**  | 返回服务器版本和虚拟主机名。 |
|  **$_SERVER['PATH_TRANSLATED']**  | 当前脚本所在文件系统（非文档根目录）的基本路径。 |
|  **$_SERVER['SCRIPT_NAME']**  | 返回当前脚本的路径。 |
|  **$_SERVER['SCRIPT_URI']**  | 返回当前页面的 URI。 |

## 接收 POST 请求

`htmlspecialchars()`  将 `html` 转为字符串，使其不会自动执行 `html` 代码，可防止 `XSS` 攻击。

```php
<?php 
    // 判断是否发起了 POST 请求
    if(isset($_POST['submit'])) {
        echo 'Email: ' . htmlspecialchars($_POST['email']) . '<br />';
        echo 'Title: ' . htmlspecialchars($_POST['title']) .'<br />';
        echo 'Points: ' . htmlspecialchars($_POST['points']) .'<br />';
    }

?>
```

```html
<section class="container grey-text">
   <h4 class="center">添加课程</h4>
    <form action="add.php" class="white" method="POST">
        <label for="email">邮箱</label>
        <input type="text" name="email">
        <label for="title">课程名称</label>
        <input type="text" name="title">
        <label for="points">知识要点 (英文逗号隔开)</label>
        <input type="text" name="points">

        <div class="center">
            <input type="submit" name="submit" class="btn brand z-depth-0" value="提交">
        </div>
    </form>
</section>
```

## 表单验证

- `empty($xxx)`  判断一个变量是否为空，为空返回 `true`，不为空返回 `false`；
- `filter_var($email, FILTER_VALIDATE_EMAIL)`  验证一个东西是否符合规则（例如邮箱），第一个参数是要验证的东西，第二个参数是规则，返回布尔值，`true` 代表验证通过，`false` 代表验证不通过;
- `preg_match(reg, $xxx)`  判断一个字符串是否符合指定的正则表达式，第一个参数为正则表达式，第二个参数为字符串，返回布尔值，`true` 表示符合规则，`false` 表示不符合规则；
- `array_filter($xxx, callback)`  遍历数组中的值，对每一项使用第二个参数的条件进行判断，如果有一项返回 `true`，那么该方法就返回 `true`，全部返回 `false`，该方法才会返回 `false`

```php
if (isset($_POST['submit'])) {
    // 验证表单
    // empty() 判断一个变量是否为空，返回布尔值
    if (empty($_POST['email'])) {
        $errors['email'] = '邮箱不能为空';
    } else {
        $email = $_POST['email'];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = '邮箱格式不正确';
        }
    }
    if (empty($_POST['title'])) {
        $errors['title'] = '课程名称不能为空';
    } else {
        $title = $_POST['title'];
        if (!preg_match('/^[\w\x{4e00}-\x{9fa5}]+$/u', $title)) {
            $errors['title'] = '课程名称不能有特殊字符';
        } 
    }
    if (empty($_POST['points'])) {
        $errors['points'] = '知识要点至少写一个';
    } else {
        $points = $_POST['points'];
        if (!preg_match('/^([\w\x{4e00}-\x{9fa5}]+)(,\s*[\w\x{4e00}-\x{9fa5}\s]*)*$/u', $points)) {
            $errors['points'] = '知识要点必须以英文逗号隔开';
        }
    }
    
    // errors 数组为空，表单没有错误信息，重定向页面
    // array_fliter()  数组中只要有一项为 true，就返回 true，全部为 false 才返回 false
    if (array_filter($errors)) {
        // 有错误信息
        // echo '表单中有错误提示';
    } else {
        // 表单没有错误信息，重定向
        echo '表单验证通过';
        header('Location: index.php');
        exit;
    }
}
```

## JSON Array 互转

`json_decode()` 将 `JOSN` 字符串转为 `PHP` 对象，如指定第二个参数为 `true` 则转为关联数组：

```php
$json = '{"name":"qiuxc","age":18}';
$arr = json_decode($json, true);
var_dump($arr);
// array(2) { ["name"]=> string(5) "qiuxc" ["age"]=> int(18) }
```

`josn_encode()` 将 `PHP` 中的数组或对象转为 `JSON` 字符串：

```php
$arr = ["name" => "qiuxc", "age" => 18];
echo json_encode($arr);
// {"name":"qiuxc","age":18}
```

## Sql 语句

- 创建一个数据库 `CREATE DATABASE 数据库名;`

  ```sh
  CREATE DATABASE my_database;
  ```

- 删除一个数据库 `DROP DATABASE 数据库名;`

  ```sh
  DROP DATABASE my_database;
  ```

- 创建一个数据表 `CREATE TABLE 表名(字段名 类型(长度));`

  ```sh
    CREATE TABLE customers(
      id INT NOT NULL AUTO_INCREMENT,  // 创建一个 id 字段，AI自增
      firstName VARCHAR(255),  // 创建一个 firstName 字段，字符串类型，长度 255，下面雷同
      lastName VARCHAR(255),
      email VARCHAR(255),
      address VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      PRIMARY KEY(id)  // 声明主键为 id
  );
  ```

- 删除一个数据表 `DROP TABLE 表名;`

  ```sh
  DROP TABLE customers;
  ```

- 插入一条数据到表中

  ```sh
  # INSERT INTO `表名` (`字段1`, `字段2`, ...) VALUES (`字段1的值`, `字段2的值`, ...);
  INSERT INTO `customers` (`id`, `firstName`, `lastName`, `email`, `address`, `city`, `state`) VALUES (NULL, 'Qiu', 'Xiangchao', '13683823372@163.com', '郑州市管城区', '郑州市', '在职');
  ```

- 插入多条数据到表中

  ```sh
  # INSERT INTO `表名` (`字段1`, `字段2`, ...) VALUES (`字段1的值`, `字段2的值`, ...), (`字段1的值`, `字段2的值`, ...);
  INSERT INTO `customers` (`id`, `firstName`, `lastName`, `email`, `address`, `city`, `state`) VALUES (NULL, 'Qiu', 'Xiangchao', '13683823372@163.com', '郑州市管城区', '郑州市', '在职'), (NULL, 'Qiu2', 'Xiangchao', '13683823372@163.com', '郑州市管城区', '郑州市', '在职'), (NULL, 'Qiu3', 'Xiangchao', '13683823372@163.com', '郑州市管城区', '郑州市', '在职');
  ```

- 更新一条数据

  ```sh
  # UPDATE 表名 SET 字段名 = '新值', 字段名 = '新值' WHERE 主键 = 主键值;  // 主键值决定了要更新哪条数据
  UPDATE customers SET email = '2915241235@qq.com', city = "南京" WHERE id = 3;
  ```

- 更新多条数据

  ```sh
  # 更新表中所有行的 firstName 字段的值
  UPDATE customers SET firstName = '邱';
  # UPDATE 表名 SET 字段名 = '新值';

  # 更新表中所有 firstName = '邱' 的行的 firstName 字段值
  UPDATE customers SET firstName = 'Qiu' WHERE firstName = '邱';
  ```

- 删除一条数据

  ```sh
  # DELETE FROM 表名 WHERE 字段名 = 指定的值;  // 删除 customers 表中 id 字段为 1 的那一条数据
  DELETE FROM customers WHERE id = 1;
  ```

- 删除表中所有数据

  ```sh
  # DELTE FROM 表名;
  DELETE FROM customers;
  ```

- 查询表中所有数据

  ```sh
  # SELECT * FROM 表名;
  SELECT * FROM customers;
  ```

- 查询表中指定字段的数据

  ```sh
  # SELECT 字段1, 字段2 FROM customers;
  SELECT firstName, lastName FROM customers;
  ```

- 根据指定的字段查询一条数据

  ```sh
  # SELECT * FROM 表名 WHERE 条件;
  SELECT * FROM customers WHERE id = 2;  // 查询 id 为 2 的那条数据（显示所有字段）
  ```

- 查询所有包含指定字段的数据（默认升序 ASC）

  ```sh
  # SELECT * FROM 表名 ORDER BY 字段名;
  SELECT * FROM customers ORDER BY lastName;
  ```

- 查询所有包含指定字段的数据并排序 DESC / ASC (降序/升序)

  ```sh
  # SELECT * FROM 表名 ORDER BY 字段名 排序规则(DESC/ASC);
  SELECT * FROM customers ORDER BY lastName DESC;
  ```

## 数据库增删改查类封装

```php
<?php

# PHP 连接 MySql 数据库
# 增 删 改 查

# 封装连接数据库的类
class MySql {
    # 私有的数据库实例
    private $dataBase;

    # 接收参数，连接数据库
    public function __construct($local, $userName, $passWord, $dataBase)
    {
        $this->dataBase = new mysqli($local, $userName, $passWord, $dataBase);
        if ($this->dataBase->connect_errno) {
            die($this->dataBase->connect_error);
        } else {
            echo "数据库 <b>$dataBase</b> 连接成功！<br>";
            # 设定编码格式
            $this->dataBase->query('set names utf8');
        }
    }

    /** 插入数据
     * @param $sql: sql 插入语句
     */
    public function insertData($sql)
    {
        if ($this->dataBase) {
            $result =  $this->dataBase->query($sql);
            # 判断插入是否成功
            echo $result ? "插入成功<br>" : "插入失败<br>";
        } else {
            echo "未连接数据库<br>";
        }
    }

    /** 更新数据
     * @param $sql: sql 更新语句
     */
    public function updateData($sql)
    {
        if ($this->dataBase) {
            $result = $this->dataBase->query($sql);
            echo $result ? "更新成功<br>" : "更新失败<br>";
        } else {
            echo "未连接数据库<br>";
        }
    }

    /** 删除数据
     * @param $sql: sql 删除语句
     */
    public function deleteData($sql)
    {
        if ($this->dataBase) {
            $result = $this->dataBase->query($sql);
            echo $result ? "删除成功<br>" : "删除失败<br>";
        } else {
            echo "未连接数据库<br>";
        }
    }

    /** 查询数据
     * @param $sql: sql 查询语句
     * @param return 将查询到的结果转为 json 字符串并返回
     */
    public function fetchData($sql)
    {
        if ($this->dataBase) {
            $result = $this->dataBase->query($sql);
            // var_dump($result);

            # 判断是否查询到数据
            if ($result->num_rows) {
                # 查询数据的第一种方法
                # 有数据，解析数据
                # fetch_row() 方法只返回表中的一行数据（以关联数组的形式）
                # 循环打印表中的所有行
                // while($row = $result->fetch_row()) {
                //     print_r($row);
                //     echo json_encode($row, JSON_UNESCAPED_UNICODE) . '<hr>';
                //     echo "<hr>";
                // }

                # 查询数据的第二种方法
                # fetch_array()  参数可以指定返回的是索引数组还是关联数组
                // while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                //     print_r($row);
                //     echo json_encode($row, JSON_UNESCAPED_UNICODE) . '<hr>';
                //     echo "<hr>";
                // }

                # 查询数据的第三种方法
                # fetch_all() 参数也可以指定返回的是索引数组还是关联数组，返回整张表的数据
                $row = $result->fetch_all(MYSQLI_ASSOC);
                # json_encode() 将下标数组转为 json 数据
                # 第一个参数是一个数组，第二个参数指定编码
                # 如果不设置第二个参数为 JSON_UNESCAPED_UNICODE，默认会将中文转码
                // echo json_encode($row, JSON_UNESCAPED_UNICODE) . '<hr>';
                return json_encode($row, JSON_UNESCAPED_UNICODE);
            } else {
                echo "未查询到数据<br>";
            }
        } else {
            echo "未连接数据库";
        }
    }


    # 关闭数据库连接
    public function closeDataBase()
    {
        if ($this->dataBase) {
            $this->dataBase->close();
            echo "已关闭数据库连接<br>";
        } else {
            echo "未连接数据库<br>";
        }
    }
}


# 实例化数据库连接
$mysql = new MySql('localhost', 'root', '', 'people');

# 插入数据
// $sql = "INSERT INTO `customers` (`id`, `firstName`, `lastName`, `email`, `address`, `city`, `state`) VALUES (NULL, 
// 'Qiu8', 'XC', '13683823372@163.com', '郑州市管城区', '郑州市', '在职')";
// $mysql->insertData($sql);


# 更新数据
// $sql = "UPDATE `customers` SET `address` = '郑州市管城回族区', `email` = 'qxcsmail@gmail.com' WHERE `lastName` = 'Xiangchao';";
// $mysql->updateData($sql);

# 删除数据
// $sql = "DELETE FROM `customers` WHERE `id` = 9;";
// $mysql->deleteData($sql);


# 查询数据，返回 json 字符串
$sql = "SELECT * FROM `customers`;";
$json = $mysql->fetchData($sql);
echo $json . "<br>";



# 关闭数据库连接
$mysql->closeDataBase();

?>
```

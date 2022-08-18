<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-18 15:39:32
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-18 15:42:08
-->
# 依赖注入

现在假设有个logger是用于写日志的对象：

```js
var logger = {write: function(content){console.log(content)}}
```

现在我们要写一个函数myFunc，需要先做一些奇奇怪怪的事 `doSomething()`，然后利用某个logger，将结果写入日志。

不用依赖注入：可以这么写

```js
var myFunc = function(){
    var result = doSomething(); 
    logger.write(result);
}
myFunc();
```

这里的logger是通过当前作用域上下文找到的，看上去很简单，可是问题是假如我又需要另外一个myFuncAlert用loggerAlert去写日志该怎么办

不用依赖注入，又不想覆盖已有的logger变量，也许不得不这么写：

```js
var loggerAlert = {write: function(content){alert(content)}}
var myFuncAlert = function() {
    var result = doSomething();
    loggerAlert.write(result);
}
myFuncAlert()
```

用依赖注入：定义时看上去稍微麻烦了一些，需要多包裹一层，不过相比于前面的例子可以减少些冗余代码。此外，与隐式地通过上下文找到外层作用域的对象相比，显式地注入依赖，即将所依赖的对象作为外层函数的参数传进去，可以使逻辑更加清晰，也更**容易替换依赖**：

```js
var myFuncFactory = function(logger) {
      return function() {
          var result = doSomething();
          logger.write(result);
      }
}
var myFunc = myFuncFactory(logger);
myFunc();
var myFuncAlert = myFuncFactory(loggerAlert);
myFuncAlert();
```

> 转自知乎: <https://www.zhihu.com/question/22463207/answer/53345984>

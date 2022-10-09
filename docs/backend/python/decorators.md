# Python中的注解 @

`Python3.0` 之后加入新特性 `Decorators`，以 `@` 为标记修饰 `function` 和 `class`。

`Decorators` 用以修饰约束 `function` 和 `class`，分为带参数和不带参数，影响原有输出，例如类静态函数我们要表达的时候需要函数前面加上修饰 `@ staticmethod` 或 `@ classmethod`

语法，从下到上的顺序：

```py
@dec2
@dec1
def func(arg1, arg2, ...):
    pass
```

这相当于：

```py
def func(arg1, arg2, ...):
    pass
func = dec2(dec1(func))
```

还允许装饰器声明调用返回装饰器的函数：

```py
@decomaker(argA, argB, ...)
def func(arg1, arg2, ...):
    pass
```

这相当于：

```py
func = decomaker(argA, argB, ...)(func)
```


下面的例子分别演示了注解的这几种使用情况：

- 不带参数单次使用

- 不带参数多次使用

- 带参数单次使用

- 带参数多次使用

## 不带参数单次使用

```py
def a(fn):
  print('exec a: ', fn)
  def b(*args):
    print('exec b: ', *args)
    fn(*args)
  return b

@a
def c(p):
  print('exec c: ', p)

c('hello world')

# 相当于
a(c)('hello world')

# exec a:  <function c at 0x108efef70>
# exec b:  hello world
# exec c:  hello world

```

## 不带参数多次使用

```py
def a(fn):
  print('exec a: ', fn)

  def b(*args):
    print('exec b: ', *args)
    fn(*args)
  return b


def a1(fn):
  print('exec a1: ', fn)
  def b(*args):
    print('exec b1: ', *args)
    fn(*args)
  return b


@a
@a1
def c(p):
  print('exec c: ', p)


c('hello world')

# 相当于
a1(a(c))('hello world')


# exec a1: < function c at 0x108f0bca0 >
# exec a: < function a1. < locals > .b at 0x108f2ba60 >
# exec b:  hello world
# exec b1:  hello world
# exec c:  hello world

```

## 带参数单次使用

```py
def a(**kwds):
    print('exec a', kwds)

    def b(f):
        print('exec b', f)
        for k in kwds:
            setattr(f, k, kwds[k])
        return f

    return b


@a(p1='a', p2='b')
def c(p):
    print(getattr(c, 'p1'))
    print(getattr(c, 'p2'))
    print('exec c: ', p)
    
c('c')

# 等价于
a(p1='a', p2='b')(c)('c')

# exec a {'p1': 'a', 'p2': 'b'}
# exec b <function c at 0x108de9e50>
# a
# b
# exec c:  c
```

## 带参数多次使用

```py
def a(**kwds):
    print('exec a', kwds)

    def b(f):
        print('exec b', f)
        for k in kwds:
            setattr(f, k, kwds[k])
        return f

    return b


def a1(**kwds):
    print('exec a1', kwds)

    def b1(f):
        print('exec b1', f)
        for k in kwds:
            setattr(f, k, kwds[k])
        return f

    return b1

@a1(p3='c', p4='d')
@a(p1='a', p2='b')
def c(p):
    print(getattr(c, 'p1'))
    print(getattr(c, 'p2'))
    print(getattr(c, 'p3'))
    print(getattr(c, 'p4'))
    print('exec c: ', p)


c('c')

# 等价于
a1(p3='c', p4='d')(a(p1='a', p2='b')(c))('c')

# exec a1 {'p3': 'c', 'p4': 'd'}
# exec a {'p1': 'a', 'p2': 'b'}
# exec b <function c at 0x111332c10>
# exec b1 <function c at 0x111332c10>
# a
# b
# c
# d
# exec c:  c
```

## Python 中存在闭包

```py
def a():
    d = {
        'name': 'qiuxc'
    }

    def b():
        return d

    return b


b = a()
nd = b()
nd1 = b()
nd['age'] = 22
# 修改了 nd 但是 nd1 的值也变了，说明两者指向一个地方
print(nd1)

# {'name': 'qiuxc', 'age': 22}
```
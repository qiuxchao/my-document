<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-15 14:18:14
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-15 14:59:48
-->
# 图片上传

## Multer 文件上传模块

Multer 是一个 express 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。它是写在 `busboy` 之上非常高效。

::: warning
Multer 不会处理任何非 `multipart/form-data` 类型的表单数据。
:::

### 安装

```sh
npm install --save multer
```

### 使用

Multer 会添加一个 `body` 对象 以及 `file` 或 `files` 对象 到 `express` 的 `request` 对象中。 `body` 对象包含表单的文本域信息，`file` 或 `files` 对象包含对象表单上传的文件信息。

基本使用方法:

```js
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  //
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body 将具有文本域数据，如果存在的话
})
```

如果你需要处理一个只有文本域的表单，你应当使用 `.none()`:

```js
var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/profile', upload.none(), function (req, res, next) {
  // req.body 包含文本域
})
```

### API

#### 文件信息

每个文件具有下面的信息:

| Key | Description | Note |
| -- | -- | -- |
| fieldname | Field name 由表单指定 |  |
| originalname | 用户计算机上的文件的名称  |  |
| encoding | 文件编码  |  |
| mimetype | 文件的 MIME 类型 |  |
| size | 文件大小（字节单位） |  |
| destination | 保存路径 | DiskStorage |
| filename | 保存在 destination 中的文件名 | DiskStorage |
| path | 已上传文件的完整路径 | DiskStorage |
| buffer | 一个存放了整个文件的 Buffer | MemoryStorage |

#### multer(options)

Multer 接受一个 `options` 对象，其中最基本的是 `dest` 属性，这将告诉 Multer 将上传文件保存在哪。如果你省略 `options` 对象，这些文件将保存在内存中，永远不会写入磁盘。

为了避免命名冲突，Multer 会修改上传的文件名。这个重命名功能可以根据您的需要定制。

以下是可以传递给 Multer 的选项：
| Key | Description |
| -- | -- |
| dest 或 storage | 在哪里存储文件 |
| fileFilter | 文件过滤器，控制哪些文件可以被接受 |
| limits | 限制上传的数据 |
| preservePath | 保存包含文件名的完整文件路径 |

通常，一般的网页应用，只需要设置 `dest` 属性，像这样：

```js
var upload = multer({ dest: 'uploads/' });
```

::: tip
如果你想在上传时进行更多的控制，你可以使用 `storage` 选项替代 `dest`。Multer 具有 DiskStorage（磁盘存储引擎） 和 MemoryStorage（内存存储引擎） 两个存储引擎；另外还可以从第三方获得更多可用的引擎。
:::

以下方法通过 `upload` 实例调用：

- `.single(fieldname)` 接受一个以 `fieldname` 命名的文件。这个文件的信息保存在 `req.file`

- `.array(fieldname[, maxCount])` 接受一个以 `fieldname` 命名的文件数组。可以配置 `maxCount` 来限制上传的最大数量。这些文件的信息保存在 `req.files`

- `.fields(fields)` 接受指定 `fields` 的混合文件。这些文件的信息保存在 `req.files`。`fields` 应该是一个对象数组，应该具有 `name` 和可选的 `maxCount` 属性。例子:

  ```js
  [
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
  ]
  ```

- `.none()` 只接受文本域。如果任何文件上传到这个模式，将发生 `"LIMIT_UNEXPECTED_FILE"` 错误。这和 `upload.fields([])` 的效果一样

- `.any()` 接受一切上传的文件。文件数组将保存在 `req.files`

### storage（存储引擎）

#### 磁盘存储引擎 (DiskStorage)

磁盘存储引擎可以让你控制文件的存储。

```js
var storage = multer.diskStorage({
    // destination 是用来确定上传的文件应该存储在哪个文件夹中。
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  // filename 用于确定文件夹中的文件名的确定。 
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
```

有两个选项可用，`destination` 和 `filename`。他们都是用来确定文件存储位置的函数。

- `destination` 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 `string` (例如 '/tmp/uploads')。如果没有设置 `destination`，则使用操作系统默认的临时文件夹。
注意: 如果你提供的 `destination` 是一个函数，你需要负责创建文件夹。当提供一个字符串，`multer` 将确保这个文件夹是你创建的。

- `filename` 用于确定文件夹中的文件名的确定。 如果没有设置 `filename`，每个文件将设置为一个随机文件名，并且是没有扩展名的。每个函数都传递了请求对象 (req) 和一些关于这个文件的信息 (file)，有助于你的决定。
  :::warning

  1. Multer 不会为你添加任何扩展名，你的程序应该返回一个完整的文件名。
  2. `req.body` 可能还没有完全填充，这取决于向客户端发送字段和文件到服务器的顺序。
  :::

#### 内存存储引擎 (MemoryStorage)

内存存储引擎将文件存储在内存中的 `Buffer` 对象，它没有任何选项。

```js
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
```

当使用内存存储引擎，文件信息将包含一个 `buffer` 字段，里面包含了整个文件数据。
::: danger
当你使用内存存储，上传非常大的文件，或者非常多的小文件，会导致你的应用程序内存溢出。
:::

### limits(限制大小)

一个对象，指定一些数据大小的限制。Multer 通过这个对象使用 `busboy`，详细的特性可以在 `busboy's page` 找到。

可以使用下面这些:
| Key | Description | Default |
| --- | ----------- | ------- |
| fieldNameSize | field 名字最大长度 | 100 bytes |
| fieldSize | field 值的最大长度 | 1MB |
| fields | 非文件 field 的最大数量 | 无限 |
| fileSize | 在 multipart 表单中，文件最大长度 (字节单位) | 无限 |
| files | 在 multipart 表单中，文件最大数量 | 无限 |
| parts | 在 multipart 表单中，part 传输的最大数量(fields + files) | 无限 |
| headerPairs | 在 multipart 表单中，键值对最大组数 | 2000 |

设置 `limits` 可以帮助保护你的站点抵御拒绝服务 (DoS) 攻击。

### fileFilter（文件过滤）

设置一个函数来控制什么文件可以上传以及什么文件应该跳过，这个函数应该看起来像这样：

```js
function fileFilter (req, file, cb) {

  // 这个函数应该调用 `cb` 用boolean值来
  // 指示是否应接受该文件

  // 拒绝这个文件，使用`false`，像这样:
  cb(null, false)

  // 接受这个文件，使用`true`，像这样:
  cb(null, true)

  // 如果有问题，你可以总是这样发送一个错误：
  cb(new Error('I don\'t have a clue!'))

}
```

### 错误处理机制

当遇到一个错误，`multer` 将会把错误发送给 `express`。你可以使用一个比较好的错误展示页 (express标准方式)。

如果你想捕捉 multer 发出的错误，你可以自己调用中间件程序。如果你想捕捉 Multer 错误，你可以使用 `multer` 对象下的 `MulterError` 类 (即 `err instanceof multer.MulterError`)。

```js
var multer = require('multer')
var upload = multer().single('avatar')

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误
    } else if (err) {
      // 发生错误
    }

    // 一切都好
  })
})
```

## Express & Multer 项目示例

安装模块：

```sh
npm install --save express multer ejs path
```

- `express` http 服务器框架
- `multer` 文件上传模块
- `ejs` 模板引擎
- `path` 文件路径模块

::: details 项目主文件 app.js

```js
// 引入模块
const express = require('express'),     // http 框架
    multer = require('multer'),             // 文件上传模块
    ejs = require('ejs'),    // 模板引擎
    path = require('path'); // 路径模块

// 创建 express 实例 app
const app = express();

// 配置模板引擎为 ejs
app.set('view engine', 'ejs');

// 配置 public 静态文件夹
app.use(express.static('./public'));


// 根据用户访问的路由返回对应的页面
app.get('/', (req, res) => {
    // 渲染 ./views/index.ejs 模板文件
    res.render('index');
})

// 设置磁盘存储引擎（multer 模块）
const storage = multer.diskStorage({
    // 每个函数都传递了请求对象 (req) 和一些关于这个文件的信息 (file)，还有一个回调函数(cb)
    // destination() 是用来确定上传的文件应该存储在哪个文件夹中。
    // 也可以提供一个 string(例如 '/tmp/uploads') 。如果没有设置 destination，则使用操作系统默认的临时文件夹。
    destination(req, file, cb) {
        // 指定上传的文件存储在哪个文件夹下
        cb(null, './public/uploads/');
    },
    // filename() 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
    // 所以必须设置文件的扩展名，可以从第二个参数 file 的 originalname 属性中得到完整的文件名（带有扩展名的）
    // 然后再使用 path.extname() 方法获取到扩展名，最后拼接到自定义的文件名即可。
    filename(req, file, cb) {
        // 通过将文件名 + 时间戳 + 原始文件的扩展名 得到一个独一无二的文件名称，用于存储到 ./public/uploads/
        // console.log(req);
        // console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// 初始化 upload 上传设置，参数为一个对象， storeage 指定存储方式为磁盘存储
// single() 方法接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。
const upload = multer({
    storage: storage,
    // fileFilter() 过滤上传的文件，控制什么文件可以上传以及什么文件应该跳过
    fileFilter(req, file, cb) {
        // 这个函数应该调用 `cb` 用boolean值来指示是否应接受该文件
        // 拒绝这个文件，使用`false`，像这样:
        // cb(null, false)
        // 接受这个文件，使用`true`，像这样:
        // cb(null, true)
        // 如果有问题，你可以总是这样发送一个错误:
        // cb(new Error('I don\'t have a clue!'))

        // 调用 checkFileType 函数来通过扩展名判断文件的类型
        checkFileType(file, cb);
    },
    // limits 一个对象，指定一些数据大小的限制
    limits: {fileSize: 1000000}
}).single('myImage');

// 验证文件类型（过滤函数）
function checkFileType(file, cb) {
    // 允许的文件扩展名格式
    const filetypes = /jpeg|jpg|png|gif/;
    // 验证文件的扩展名
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // 验证minetype文件格式
    const mimetype = filetypes.test(file.mimetype);
    // 如果以上 extname 和 mimetype 都为 true ，就符合上传图片的文件格式

    if (extname && mimetype) {
        // 此文件符合图片类型的规则，返回到回调函数中
        return cb(null, true);
    } else {
        // 此文件不符合图片类型的规则，返回错误信息到回调函数中
        // 此错无信息将会传入到 upload 的第三个参数回调函数的参数 err 中，下面已经对这个 err 做了处理
        cb('错误：只支持图片格式');
    }
}

// 捕获 post 请求方法，获取到提交的图片数据
app.post('/upload', (req, res) => {
    // res.send('test');
    upload(req, res, (err) => {
        if (err) {
            // 有报错信息，将报错信息返回到 index 页面当中
            // 该报错信息由过滤函数 checkFileType 或 limits所返回
            res.render('index', {
                msg: err
            });
        } else {
            // 一切正常，获取上传的图片文件，图片信息都在 req.file 中
            console.log(req.file);
            // {
            //     fieldname: 'myImage',    // 自定义的文件名
            //     originalname: 'img_tree.png',    // 原始的文件名
            //     encoding: '7bit',    // 编码格式
            //     mimetype: 'image/png',   // 文件格式
            //     destination: './public/uploads/',    // 上传到的目录
            //     filename: 'myImage-1589986774057.png',   // 上传后的文件名
            //     path: 'public\\uploads\\myImage-1589986774057.png',  // 上传后的完整路径
            //     size: 5678   // 图片大小
            // }
            if (req.file == undefined) {
                // 用户没有上传文件而直接点击了提交
                // 渲染 index 页面，传递失败的信息到模板
                res.render('index', {
                    msg: '错误：请选择文件后再点击提交'
                });
            } else {
                // 用户选择了文件并点击了提交
                // 渲染 index 页面，传递成功的信息和图片的路径到模板
                res.render('index', {
                    msg: `图片 ‘${req.file.originalname}’ 已经成功上传^-^`,
                    file: `uploads/${req.file.filename}`  
                });
            }
        }
    });
});

// 定义端口
const port = 4000;

// 监听端口，运行服务器
app.listen(port, () => console.log(`服务器在 http://localhost:${port} 运行...`));
```

:::

::: details 项目模板主页 index.ejs

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片上传</title>
     <!-- 引入materialize 第三方CSS样式库 -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
</head>
<body>
    <div class="container">
        <h1>上传图片文件</h1>

            <!-- 表单必须设置 enctype="multipart/form-data"，否则上传文件不会有任何反应 -->
            <!-- 使用 post 方法提交文件数据到本地 /upload 接口 -->
          <form action="/upload" method="POST" enctype="multipart/form-data">
              <div class="file-field input-field">
                  <div class="btn grey">
                      <span>选择图片</span>
                      <input type="file" name="myImage">
                  </div>
                  <div class="file-path-wrapper">
                      <input class="file-path validate" type="text">
                  </div>
              </div>

              <button type="submit" class="btn">确认提交</button>

                <!-- 错误提醒 -->
              <h5> <%= typeof msg != 'undefined' ? msg : '' %></h5>
          </form>

          <br>

          <!-- 上传成功后的图片 -->
          <img src="<%= typeof file != 'undefined' ? file : '' %>" class="responsive-img" alt="">

    </div>

    <!-- 引入 jquery  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
     <!-- 引入 materialize JavaScript -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
</body>
</html>
```

:::

## 单图上传 & 多图上传

文档地址：[https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)

```js
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('./uploads'));


// 设置磁盘存储引擎（multer 模块）
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb('错误：只支持jpeg|jpg|png|gif|webp图片格式');
        }
    },
    limits: { fileSize: 1000000 }
});

// 单张图片上传
app.post('/profile', upload.single('avatar'), (req, res) => {
    console.log('上传单张图片：', req.file);
    console.log('上传单张图片表单：', req.body);
    res.send(req.body);
})

// 多张图片上传
app.post('/profiles', upload.array('photo', 5), (req, res) => {
    console.log('上传多张图片：', req.files);
    console.log('上传多张图片表单：', req.body);
    res.send(req.body);
});

app.get('/', (req, res) => {
    res.send('Hello Express!');
});


app.listen(4500, () => console.log('Server in running...'));
```

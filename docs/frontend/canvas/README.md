<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-14 10:50:41
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-14 10:59:32
-->
# Canvas

使用 `Canvas` 绘图基本步骤：

1. 在页面写 `<canvas></canvas>` 标签；
2. 使用 `dom` 获取 `<canvas>` 元素；
3. 使用 `getContext()` 方法获取画布上下文对象（ctx）；
4. 开始绘图。

## 常用API

`Canvas` 常用 `API`（都是通过画布上下文对象 `ctx` 调用）：

1. `fillStyle` 设置矩形填充的颜色
2. `fillRect()` 绘制矩形
3. `strokeStyle` 设置边框填充的颜色
4. `lineWidth` 设置边框的宽度
5. `strokeRect` 绘制边框
6. `beginPath()` 在钢笔当前所在位置开始绘制一条路径
7. `moveTo()` 将钢笔移动至两一个坐标点，不记录、不留痕迹，只将钢笔跳至新位置
8. `fill()` 通过为当前所绘制路径的区域填充颜色来绘制一个新的填充形状
9. `stroke()` 通过为当前绘制路径的区域描边，来绘制一个只有边框的形状
10. `lineTo()` 绘制一条直线
11. `arc()` 绘制圆形
12. `fillText()` 绘制有填充色的文本
13. `strokeText()` 绘制文本外边框（描边）
14. `font` 设置字体样式（与css font一致）
15. `drawImage()` 将图片绘制在画布上
16. `translate()` 设置画布的顶点

## 示例

###  绘制矩形、边框

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布1</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <canvas id="canvas">
        <p>你的浏览器不支持canvas!</p>
    </canvas>
    <script>
        // 获取画布元素
        const canvas = document.querySelector('#canvas');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        // 获取画布上下文
        let ctx = canvas.getContext('2d');
        // 设置矩形颜色
        ctx.fillStyle = 'rgb(0, 0, 0)';
        // 设置矩形位置，宽高
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(50, 50, 200, 200);
        ctx.fillStyle = 'rgba(0, 0, 255, .6)'
        ctx.fillRect(80, 80, 200, 200);
        // 设置边框颜色
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        // 设置边框宽度 
        ctx.lineWidth = 5;  
        // 设置边框位置，宽高
        ctx.strokeRect(50, 50, 300, 300);
        
    </script>
</body>
</html>
```

### 绘制三角形

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布2</title>
</head>
<body>
    <h1>绘制三角形</h1>
    <canvas id="canvas"></canvas>

    <script>
        const canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(150, 50);
        let triHeight = 50 * Math.tan(degToRad(60));
        ctx.lineTo(100, 50 + triHeight);
        ctx.lineTo(50, 50);
        ctx.fill();
        function degToRad(degrees) {
            return degrees * Math.PI / 180;
        }

    </script>
</body>
</html>
```

### 绘制圆形

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布3</title>
</head>
<body>
    <h1>绘制圆形</h1>
    <canvas id="canvas" width="300" height="300"></canvas>

    <script>
        const canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.beginPath();
        ctx.arc(150, 106, 50, degToRad(360), false);
        ctx.fill();
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
        ctx.lineTo(200, 106);
        ctx.fill();

         function degToRad(degrees) {
                return degrees * Math.PI / 180;
            }
    </script>
</body>
</html>
```

### 绘制字体

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布4</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <canvas id="canvas" width="300" height="300"></canvas>

    <script>
        const canvas = document.querySelector('#canvas');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        // 白色描边字体
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.font = '36px arial';
        ctx.strokeText('Canvas text', 50, 50);
        // 红色填充字体
        ctx.fillStyle = 'red';
        ctx.font = '48px georgia';
        ctx.fillText('Canvas text', 50, 150);
    </script>
</body>
</html>
```

### 绘制图片

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布5</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>

    <script>
        // 绘制图片
        const canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        // 创建 img 元素对象
        let image = new Image();
        image.src = './img/Castle.png';
        // 嵌入图片(在图片载入后)
        image.onload = () => {
            ctx.drawImage(image, 50 ,50)
        };
        let image2 = new Image();
        image2.src = './img/Elf.png';
        image2.onload = () => {
            ctx.drawImage(image2, 200, 50)
        };

    </script>
</body>
</html>
```

### 循环

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布6</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script>
        // 循环
        const canvas = document.querySelector('#canvas');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let ctx = canvas.getContext('2d');
        // 将画布顶点设为正中心（宽的一半，高的一半）
        ctx.translate(width / 2, height / 2);
        
        var length = 300;
        var moveOffset = 1;
        for (var i = 0; i < length; i++) {
            ctx.fillStyle = 'rgba(' + (255 - length) + ', 0, ' + (255 - length) + ', 0.9)';
            ctx.beginPath();
            ctx.moveTo(moveOffset, moveOffset);
            ctx.lineTo(moveOffset + length, moveOffset);
            var triHeight = length / 2 * Math.tan(degToRad(60));
            ctx.lineTo(moveOffset + (length / 2), moveOffset + triHeight);
            ctx.lineTo(moveOffset, moveOffset);
            ctx.fill();

            length--;
            moveOffset += 0.7;
            ctx.rotate(degToRad(5));
        }


        function degToRad(degrees) {
            return degrees * Math.PI / 180;
        };

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + (min);
        }
    </script>
</body>

</html>
```

### 动画

一些 `JavaScript` 函数可以让函数在一秒内重复运行多次，这里最适合的就是 `window.requestAnimationFrame()`。它只取一个参数，即每帧要运行的函数名。下一次浏览器准备好更新屏幕时，将会调用你的函数。如果你的函数向动画中绘制了更新内容，则在函数结束前再次调用 `requestAnimationFrame()`，动画循环得以保留。只有在停止调用 `requestAnimationFrame()` 时，或 `requestAnimationFrame()` 调用后、帧调用前调用了 `window.cancelAnimationFrame()` 时，循环才会停止。

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>画布7</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script>
        // 动画
        const canvas = document.querySelector('#canvas');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let ctx = canvas.getContext('2d');
        ctx.translate(width / 2, height / 2);
        let image = new Image();
        image.src = './img/Elf.png';
        image.onload = draw;
        let sprite = 0;
        let posX = 0;
        function draw() {
            ctx.fillRect(-(width / 2), -(height / 2), width, height);
            ctx.drawImage(image, (sprite * 102), 0, 102, 148, 0 + posX, -74, 102, 148);
            if (posX % 13 === 0) {
                if (sprite === 1) {
                    sprite = 0;
                } else {
                    sprite++;
                }
            }
            if (posX > width / 2) {
                newStartPos = -((width / 2) + 102);
                posX = Math.ceil(newStartPos / 13) * 13;
                console.log(posX);
            } else {
                posX += 2;
            }
            window.requestAnimationFrame(draw);
        }


    </script>
</body>

</html>
```

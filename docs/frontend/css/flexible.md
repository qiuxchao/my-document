<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-07-22 10:30:31
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-07-22 10:39:13
-->
# Flexible.js 自适应方案

flexible.js 适配方案采用 `rem` 布局，根据屏幕分辨率大小不同，调整根元素 `html` 的 `font-size`，从而达到每个元素宽高自动变化，适配不同屏幕

## 使用 flexible

1. 拿到设计稿，查看稿纸宽度
2. 页面引入 flexible.js 文件
3. 自己默认将页面根字体大小设为稿纸宽度的10分之1（不需要显示的手动设置，因为 flexible 会根据屏幕大小自动设置）
4. 将稿纸上的 px 单位转换为 rem 单位：`稿纸单位 / 1rem（十分之一的稿纸单位） = 实际rem`

> 例如：
>
> 1. 拿到设计稿，查看宽度为 1000px
> 2. 页面引入 flexible.js 文件
> 3. 自己默认将页面根字体大小设为稿纸宽度的10分之1，即 1000 / 10 = 100px = 1rem
> 4. 稿纸上元素的宽高为 200px\*200px，转为 rem 为：200px / 1rem(100px) = 2rem，即 2rem*2rem

示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="yes" name="apple-touch-fullscreen" />
    <meta content="telephone=no,email=no" name="format-detection" />
    <meta content="maximum-dpr=2" name="flexible" />
    <title>Flexible Demo</title>
    <script src="flexible.js"></script>
    <style>
        .warp1 {
            /*width: 200px;*/
            /*height: 200px;*/
            width: 2rem;
            height: 2rem;
            background: lawngreen;
        }
        .warp2 {
            width: 1.81rem;
            height: 1.81rem;
            background: indianred;
        }
    </style>
</head>
<body>
    <!--使用flexible：-->
        <!--1. 拿到设计稿，查看稿纸宽度-->
        <!--2. 页面引入 flexible.js 文件-->
        <!--3. 自己默认将页面根字体大小设为稿纸宽度的10分之1（不需要显示的手动设置，因为 flexible 会根据屏幕大小自动设置）-->
        <!--4. 将稿纸上的px单位转换为rem单位：稿纸单位 / 1rem（十分之一的稿纸单位） = 实际rem-->

    <!--例如：-->
        <!--1. 拿到设计稿，查看宽度为 1000px-->
        <!--2. 页面引入 flexible.js 文件-->
        <!--3. 自己默认将页面根字体大小设为稿纸宽度的10分之1，即 1000 / 10 = 100px = 1rem-->
        <!--4. 稿纸上元素的宽高为 200px*200px，转为 rem 为：200px / 1rem(100px) = 2rem，即 2rem*2rem-->

    <div class="warp1">
        稿纸宽度1000px中宽高为 200px*200px
        转为rem为：2rem*2rem
    </div>

    <div class="warp2">
        稿纸宽度1100px中宽高为 200px*200px
        转为rem约为：1.81rem*1.81rem
    </div>
</body>
</html>
```

## 源码

flexible.js 源码

```js
;(function(win, lib) {
    var doc = win.document
    var docEl = doc.documentElement
    var metaEl = doc.querySelector('meta[name="viewport"]')
    var flexibleEl = doc.querySelector('meta[name="flexible"]')
    var dpr = 0
    var scale = 0
    var tid
    var flexible = lib.flexible || (lib.flexible = {})

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例')
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
        if (match) {
            scale = parseFloat(match[1])
            dpr = parseInt(1 / scale)
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content')
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1])
                scale = parseFloat((1 / dpr).toFixed(2))
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1])
                scale = parseFloat((1 / dpr).toFixed(2))
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi)
        var isIPhone = win.navigator.appVersion.match(/iphone/gi)
        var devicePixelRatio = win.devicePixelRatio
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2
            } else {
                dpr = 1
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1
        }
        scale = 1 / dpr
    }

    docEl.setAttribute('data-dpr', dpr)
    if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute(
            'content',
            'initial-scale=' +
            scale +
            ', maximum-scale=' +
            scale +
            ', minimum-scale=' +
            scale +
            ', user-scalable=no'
        )
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl)
        } else {
            var wrap = doc.createElement('div')
            wrap.appendChild(metaEl)
            doc.write(wrap.innerHTML)
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width
        if (width / dpr > 540) {
            width = 540 * dpr
        }
        var rem = width / 10
        docEl.style.fontSize = rem + 'px'
        flexible.rem = win.rem = rem
    }

    win.addEventListener(
        'resize',
        function() {
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 300)
        },
        false
    )
    win.addEventListener(
        'pageshow',
        function(e) {
            if (e.persisted) {
                clearTimeout(tid)
                tid = setTimeout(refreshRem, 300)
            }
        },
        false
    )

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px'
    } else {
        doc.addEventListener(
            'DOMContentLoaded',
            function(e) {
                doc.body.style.fontSize = 12 * dpr + 'px'
            },
            false
        )
    }

    refreshRem()

    flexible.dpr = win.dpr = dpr
    flexible.refreshRem = refreshRem
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px'
        }
        return val
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem'
        }
        return val
    }
})(window, window['lib'] || (window['lib'] = {}))
```

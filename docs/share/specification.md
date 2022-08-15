<!--
 * @Descripttion: 
 * @version: 
 * @Author: qiuxchao
 * @Date: 2022-08-12 11:31:03
 * @LastEditors: qiuxchao
 * @LastEditTime: 2022-08-12 13:52:34
-->
# 微信小程序代码规范

## WXML 规范

- wxml标签可以单独出现的情况，尽量单独出现，如 `<input />` `<g-load-more />`

- 控制每行HTML的代码数量在80个字符以内，方便阅读浏览，多余的代码进行换行处理，标签所带属性每个属性间进行换行。

  ```html
  <view
      class="page-deliver-container mb-10"
      wx:if="{{batchState.batchList.length > 1}}"
      bind:tap="handleOpenBatchPop"
    >
    选择团购批次
    </view>
  ```

- 页面内容分块，每一块注释出其功能，并在其上下空出一行与其他代码进行区分。

  ```html

  <!-- 头部tab -->
  <view class="tab">
  </view>

  <!-- 内容 -->
  <view class="content">
  </view>
  ```

## CSS 规范

- 在开发过程中`rpx`和`px`均可能用到，如通常情况下间距使用`rpx`，字体大小和边框等使用`px`，开发者根据实际情况而定

  ```css
  width: 100rpx;
  border: 1px solid #fff;
  ```

- CSS代码需有明显的代码缩进。每一个样式类之间空出一行

  ```css
  .tag{  
    width: 100%;
  }

  .container{  
    width: 100%;
  }
  ```

- 尽量使用简写属性，并且同一属性放置在一起，避免散乱

  ```css
  /**使用简写属性**/
  .image{  
    margin: 0 auto;
  }

  /**同一属性放在一块**/
  .tag{  
    margin-left: 10rpx;  
    margin-right: 10rpx;
  }
  ```

- 采用`flex`进行布局，禁止使用`float`以及`vertical-align`

  ```css
  .container{  
    disaplay: flex;  
    flex-dirextion: row;
  }
  ```

- 成组的wxss规则之间用块状注释。请勿在代码后面直接注释

  ```css
  /** 修改button默认的点击态样式类**/
  .button-hover{  
    background-color: red;
  }
  ```

## JS 规范

### 命名规范

变量名以及函数名统一采用驼峰命名法，正常情况下函数名前缀需加上清晰的动词表示函数功能，私有函数或者属性以下划线开头表明。常量需用 `const` 声明。类的命名首字母需大写。

采用ES6 关键字 `let` 定义变量，尽量不使用 `var`

```js
//定义常量
const a = 1
//定义变量
let imageContent =  res.data
//函数命名
getInfo(){  
  return '';
}
//私有函数
_getInfo(){  
  return '';
}
```

事件命名规范，事件函数命名方式为:

- 页面中使用 `handle` + 事件名，例如：`handleGoPage`
- 组件中使用 `bind` + 事件名，例如：`bindChange`

### 数据绑定变量定义规范

所有涉及到数据绑定的变量均需在 `data` 中初始化。禁止在不定义的情况下直接 `setData`。
> 不用于页面渲染的变量不要放在 `data` 中，可以放在 `this` 中

```js
Pages({  
  data:{     
    id : ''  
  },  

  onLoad(options){    
    this.setData({
      id: options.id || '',
    });
  }
})
```

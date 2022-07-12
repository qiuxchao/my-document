# react-router-dom

`react-router-dom` 是 `react` 的路由模块，本文介绍了 `react-router-dom` 的基本使用方法。

基本使用步骤：

1. 安装：`yarn add react-router-dom`
2. 在`src/index.js`引入：`import { Route, BrowserRouter } from 'react-router-dom'`
3. 使用：用包裹需要使用路由的部分（例如：`render` 函数返回的标签）

## BrowserRouter 组件和 Route 组件

`BrowserRouter` 和 `Route` 组件是 `react-router-dom` 的基本组件

- `BrowserRouter`  组件包裹需要使用路由的部分
- `Route`  组件用于将路径与组件相关联

```javascript
// src/index.js
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
// 引入react路由
import { Route, BrowserRouter } from 'react-router-dom'

class App extends Component {
 render() {
  return (
   // BrowserRouter 组件包裹需要使用路由的部分，Route 组件用于将路径与组件相关联
   <BrowserRouter>
                    
    <div className='App'>
                         
     <Navbar />
                         
     {/* exact 开启精准匹配，根路径必须开启此配置，否则只要匹配到带有 / 的路由都会显示出根路径页面 */}
                         
     <Route exact path='/' component={Home} />
                         
     <Route path='/about' component={About} />
                         
     <Route path='/contact' component={Contact} />
                     
    </div>
                
   </BrowserRouter>
  )
 }
}

export default App
```

## 声明式导航

`Link` 和 `NavLink` 导航组件:

```javascript
// src/pages/Navbar.js
import React from 'react'
// 引入react-router-dom 路由跳转组件 Link
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
 return (
  <nav className='nav-wrapper red darken-3'>
               
   <div className='container'>
                    
    <Link to='/' className='brand-logo'>
     React路由
    </Link>
                    
    <ul className='right'>
                         
     <li>
      <Link to='/'>Home</Link>
     </li>
                         
     {/* Link 组件跳转时就只是跳转页面，NavLink 跳转时会在渲染出的 a 标签上加上 active 的 className */}
                         
     <li>
      <NavLink to='/about'>About</NavLink>
     </li>
                         
     <li>
      <Link to='/contact'>Contact</Link>
     </li>
                     
    </ul>
                
   </div>
           
  </nav>
 )
}

export default Navbar
```

## 编程式导航

被 `<BrowserRouter></BrowserRouter>` 包裹的组件的 `props` 会默认传入 `history`、`location` 和 `match` 这三个对象，`history` 对象类似 `bom`(浏览器对象模型)中的 `history` 对象；

- `history` 对象中包含一些用于操作地址栏 `url` 的 `api`，常用的有：`push`、`replace`、`go`
- `push` 用于跳转页面，会在页面栈尾部新增一条记录
- `replace` 用于重定向页面，会将当前页面从页面栈中清除，不会留下痕迹
    `go` 方法接受一个数字作为参数，例如 `go(-1)` 表示返回上一条路由记录

```javascript
// src/pages/Contact.js
import React from 'react'

const Contact = (props) => {
 console.log(props)
 setTimeout(() => {
  // push 和 replace 的区别是：
  // push 会在页面栈尾部添加新的页面，可以通过浏览器的返回按钮回到之前的页面
  // replace 会从页面栈中删除当前的页面，再跳转到新的页面
  props.history.push('/') // 跳转
  props.history.replace('/') // 重定向
 }, 2000)
 return (
  <div className='container'>
               <h3>Contact</h3>
           
  </div>
 )
}

export default Contact
```

不被 `<BrowserRouter></BrowserRouter>` 包裹的组件的 `props` 中就不会有 `history` 路由对象，要想让这种组件中拥有路由对象，则可以使用 `react-router-dom` 中的 `withRouter` 高阶组件：

```javascript
//  src/pages/Navbar.js
import React from 'react'
// 引入react-router-dom 路由跳转组件 Link
// 引入 withRouter 高阶组件并将组件作为参数导出后此组件才能使用 history api
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = ({ history }) => {
 console.log(history)
 return (
  <nav className='nav-wrapper red darken-3'>
               
   <div className='container'>
                    
    <Link to='/' className='brand-logo'>
     React路由
    </Link>
                    
    <ul className='right'>
                   
     <li>
      <Link to='/'>Home</Link>
     </li>              
     {/* Link 组件跳转时就只是跳转页面，NavLink 跳转时会在渲染出的 a 标签上加上 active 的 className */}
                    
     <li>
      <NavLink to='/about'>About</NavLink>
     </li>
               
     <li>
      <Link to='/contact'>Contact</Link>
     </li>
                     
    </ul>
                
   </div>
           
  </nav>
 )
}

// 使用 withRouter 高阶组件后此组件将可以使用 history api
export default withRouter(Navbar)
```

## 路由传参

声明路由时使用 `:xxx` 的方式，然后在组件中通过 `props.match.params.xxx` 来获取

声明路由参数：

```javascript
// src/index.js
// BrowserRouter 组件包裹需要使用路由的部分，Route 组件用于将路径与组件相关联
<BrowserRouter>
         
 <div className='App'>
              
  <Navbar />
              {/* 被 Switch 包裹的路由只会渲染第一个匹配到的路径 */}
              <Switch>
                   
   {/* exact 开启精准匹配，根路径必须开启此配置，否则只要匹配到带有 / 的路由都会显示出根路径页面 */}
                   
   <Route exact path='/' component={Home} />
                   
   <Route path='/about' component={About} />
                   
   <Route path='/contact' component={Contact} />
   {/* id 表示路由参数 */}
                   
   <Route path='/:id' component={PostDetail} />
               
  </Switch>
          
 </div>
</BrowserRouter>
```

获取路由参数：

```javascript
// src/pages/PostDetail.js
componentDidMount() {
    const { match } = this.props
    // 从 match 对象中获取路由参数
    match.params.id && (this.setState({ id: match.params.id}))
    axios.get('http://jsonplaceholder.typicode.com/posts/' + match.params.id)
        .then(res => {
            res.data && this.setState({ post: res.data })
        })
}
```

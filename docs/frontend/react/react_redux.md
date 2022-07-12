# react-redux

`react-redux` 是一个用于连接 `React` 和 `Redux` 的 `npm` 模块，本文介绍了 `react-redux` 的基本使用方法。

## 基本使用

`react-redux` 用于将 `React App` 和 `Redux` 相连接，以下是连接步骤：

1. 在 `index.js` 中引入 `react-redux` 中的 `Provider` 组件，使用此组件包裹 `App` 组件，并传入 `redux store` 实例：

```javascript
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// react-redux 中的 Provider 组件用于将 App 与 Redux 相关联
import { Provider } from 'react-redux'
// 引入 store
import store from './store'

ReactDOM.render(
 <React.StrictMode>
  <Provider store={store}>
   <App />
  </Provider>
 </React.StrictMode>,
 document.getElementById('root')
)
```

2. 组件中引入 `react-redux` 中的 `connect` 方法，该方法返回一个高阶组件，具体细节看代码：

```javascript
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// 引入 react-redux 中的 connect 用于在组件中使用 redux
import { connect } from 'react-redux'

class Home extends Component {
 render() {
  // 此时 props 中的 posts 是由 redux -> store -> state 得来的
  // 除此之外，props 对象中还会得到一个 dispatch 方法，该方法用于更新 store 中的 state
  const { posts } = this.props
  const postList = posts.length ? (
   posts.map((post) => (
    <div className='col' key={post.id}>
     <div className='card red darken-1 white-text'>
      <div className='card-content'>
       <Link to={`/${post.id}`}>
        <span className='card-title white-text'>
         {post.title}
        </span>
       </Link>
       <p>{post.body}</p>
      </div>
     </div>
    </div>
   ))
  ) : (
   <div className='center'>没有帖子</div>
  )
  return (
   <div className='container'>
    <div className='row'>{postList}</div>
   </div>
  )
 }
}

// 该方法作为 connect 方法的参数传入，然后该方法的参数将会接收到 store 中的 state
// 最后该方法要将需要的数据返回，返回后将会变成组件的 props 被组件所接收
// state 是 store 中的 state
// ownProps 是当前组件的 props
const mapStateToProps = (state, ownProps) => {
 return {
  posts: state.posts
 }
}

// connect 方法返回一个高阶组件，必须将组件作为高阶组件的参数传入后再导出
export default connect(mapStateToProps)(Home)
```

## 使用 dispatch 更新 state 的两种方法

1. 使用组件 `props` 中的 `dispatch` 方法:

```javascript
// src/index.js
import React, { Component } from 'react';
import { connect } from 'react-redux'
class PostDetail extends Component {
    deletePost = async () => {
        const { post, dispatch, history } = this.props
        // 使用 react-redux 中的 connect 方法返回的高阶组件包裹该组件后，
        // props 中将会自动传入 dispatch 方法
        await dispatch({
            type: 'DELETE',
            id: post.id
         })
        history.replace('/')
    }

    render () {
        ...
    }
}
export default connect()(PostDetail);
```

2. 使用 `mapDispatchToProps` 传入 `connect` :

```javascript
// src/index.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
class PostDetail extends Component {
 delPost = async () => {
  // deletePost 是通过 mapDispatchToProps 传到 this.props 中的
  const { post, deletePost, history } = this.props
  await deletePost(post.id)
  history.replace('/')
 }
 render() {
  const { post } = this.props
  const renderPost = post ? (
   <div className='post'>
    <h3>{post.title}</h3>
    <h5>{post.body}</h5>
    <div className='right'>
     <div
      className='waves-effect waves-light btn pink'
      onClick={this.delPost}>
      删除
     </div>
    </div>
   </div>
  ) : (
   <div className='progress'>
    <div className='indeterminate'></div>
   </div>
  )
  return <div className='container'>{renderPost}</div>
 }
}

// state 是 store 中的 state
// ownProps 是当前组件的 props
const mapStateToProps = (state, ownProps) => {
 const { match } = ownProps
 const id = match.params.id || ''
 const post = state.posts.find((post) => post.id === Number(id))
 return {
  post
 }
}

// 该方法作为 connect 方法的第二个参数传入
// 该方法的参数会得到 store 中的 dispatch 方法和当前组件的 props
// 该方法需要返回一个包含各种 dispatch 方法的对象，
// 最终返回的对象中的方法会被放到组件的 props 中，可以直接使用，从而提交对 state 的更新
const mapDispatchToProps = (dispatch, ownProps) => {
 return {
  deletePost: (id) =>
   dispatch({
    type: 'DELETE',
    id
   })
 }
}

// connect 第一个参数处理 State，第二个参数处理 Dispatch
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
```

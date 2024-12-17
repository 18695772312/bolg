---
title: 【dva】入门
date: 2021-02-03 14:38
categories:
 - javaScript
tags:
 - js
 - React
---
## 什么是dva
dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

它相当于Vue中的vuex,是一个公用的仓库，公用存放state的仓库

> 安装
```
yarn add dva
```
## 在入口文中使用dva

```js
// index.js
import React from 'react';
import dva from 'dva';
import App from './App';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const app = dva({
  history,
});
// 注册视图
app.router(() => <App />);
// 加载model模块
app.model(require('./models/song').default);// song.js模块
app.model(require('./models/login').default); //login.js
// 启动应用
app.start('#root');

```

> 概念

::: right
 参考文档 [掘金](https://juejin.cn/post/6844903745885569038)
[简书](https://www.jianshu.com/p/21f8ed30e761)
:::


## model
model是使用DVA的核心，基本的属性如下：
- namespace：model 的命名空间，只能用字符串。一个大型应用可能包含多个 model，通过namespace区分。
- state：当前 model 状态的初始值，表示当前状态。
- reducers：用于处理同步操作，可以修改 state，由 action 触发。
- effects：用于处理异步操作（例如：与服务端交互）和业务逻辑，也是由 action 触发。但是，它不可以修改 state，要通过触发 action 调用 reducer 实现对 state 的间接操作。
- action：是 reducers 及 effects 的触发器
> 示例

```js
const Model = {
  namespace: 'count',
  state: 0,
  reducers: {
    add  (count) { return count + 1 },
    minus(count) { return count - 1 },
  },
}
```
## effects

参考实例
```js
 *fetchSong(_, { call, put, select }) {
    //getSongDetail 接口名
    //payload 参数
    const response = yield call(getSongDetail, payload)
    // 调用reducers方法修改state
    yield put({
      type: 'getSongs',
      payload: {
        data:response.songs,
      }
    });
 }
```

## connect

connect的存在，就是为了让组件获取两样东西：model中的数据，驱动model改变的方法。
connect 接收两个参数，做的就是这两件事：

- mapStateToProps：获取model中的数据
- mapDispatchToProps：驱动model改变的方法

> 示例

```js
const App = connect(({ count }) => ({
  count
}))(function(props) {
  return (
    <div>
      <TestError />
      <h2>{ props.count }</h2>
      <button key="add" onClick={handleAdd}>+</button>
      <button key="minus" onClick={handleMinus}>-</button>
    </div>
  );
});
// 或者写成
export default connect(({ user }) => ({
  user
}))(Login);
```

## dispatch
 
dispatch 函数接受一个 对象 作为入参，在概念上我们称它为 action，唯一强制要包含的是 type 字段，string 类型，用来告诉 dva 我们想要干什么。
```js
// 加
const handleAdd = () {
  props.dispatch({type: 'count/add'})
}
// 减
const handleMinus  = () {
  props.dispatch({type: 'count/minus'})
}
// 若带参数
props.dispatch({
  type: 'user/saveUser',
  payload: { data: res, isLogin: true }
});
// 可以调用user中的reducers下的saveUser方法
reducers: {
    saveUser(state, { payload}){
      return {
        ...state,
        user:payload.data,
        isLogin:payload.isLogin
      }
    },
  }
```



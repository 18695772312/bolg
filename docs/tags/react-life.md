---
title: react中的生命周期（旧）
date: 2021-02-07
categories: javaScript
tags:
- js
- React
---

## componentWillMount（组件将要挂载）
## render （初始化渲染、状态更新之后）
## componentDidMount（组件挂载完毕）
## componentWillUnmount（组件将要卸载）
## shouldComponentUpdate (控制组件更新的阀门，必须有返回值)
## componentWillUpdate (组件将要更新)
## componentDidUpdate (组件更新完毕)
1. 初始阶段：由ReactDOM.render()触发----初次渲染

  - constructor()
  - componentWillMount()
  - render() ----必用
  - componentDidMount()
  ----常用，一般用来做初始化，例如网络请求
2. 跟新阶段：由组件内部this.setState()或父组件重新render触发
  - shouldComponentUpdate()
  - componentWillUpdate()
  - render()
  - componentDidUpdate()
3. 卸载组件： 由ReactDOM.unmountComponentAtNode()触发
   - componentWillUnmount()
  ------常用，一般用来做一些首尾的事，例如，关闭定时器，取消订阅消息

## 新的生命周期和旧的生命周期的区别
- 和新生命周期相比，旧的生命周期即将废弃三个钩子`componentWillMount`，`componentWillReceiveProps`，`componentWillUpdate`
- 新增两个钩子`getDerivedStateFromProps`,`getSnapshotBeforeUpdate`

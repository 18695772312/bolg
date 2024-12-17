---
title: react中的ref
date: 2021-02-07
categories: javaScript
tags:
- js
- React
---

react中的ref重要是，当我们想获取子组件实例或者dom元素，按我们自己的方式来操作元素的行为，这个时候就需要用到ref来获取子组件或者dom元素

## 字符串式的ref的使用

```js
class App extends React.Component {
  handleClick = () => {
    console.log(this.refs)
  }
  render() {
    return (
      <div className="App">
        <input ref='input1' />
        <button onClick={this.handleClick}>点我 进行</button>
      </div>
    );
  }
}
```
> 在新版本的react中，这种形式被废弃了，不推荐使用
## 回调式ref


```js
class App extends React.Component {
  handleClick = () => {
    const {input1} = this
    console.log(input1)
  }
  // 这样写的形式在更新时就不会多次执行
  saveInput = (c) =>{
    this.input1 = c
  }
  render() {
    return (
      <div className="App">
        {/*<input ref={(c)=>{this.input1 = c}} />*/}
        <input ref={this.saveInput} />
        <button onClick={this.handleClick}>点我 进行</button>
      </div>
    );
  }
}
```
> ref回调形式如果是以内联函数的方式定义的，在更新时会执行两次！第一次null，第二次才是节点
## createRef()


```js
class App extends React.Component {
  // React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点，（专人专用）
  myRef = React.createRef()
  handleClick = () => {
    console.log(this.myRef.current)
  }
  render() {
    return (
      <div className="App">
        <input ref={this.myRef} />
        <button onClick={this.handleClick}>点我 进行</button>
      </div>
    );
  }
}
```

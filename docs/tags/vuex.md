---
title: vuex的使用和详解
date: 2021-02-04
categories:
 - javaScript
tags:
 - js
 - Vue
---

## vuex使用

```js
// store.js 使用vuex，
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    catList:[]
  },
  getter: {
    cartList(state){
      return state.catList
    },
    
  },
  mutations: {
    addCount(state , payload){
      payload.count++
    }
  },
  actions: {
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        const oldCart = context.state.catList.find(item => {
          return item.iid == payload.iid;
        });
        // console.log(context.state.catList);
        if (oldCart) {
          context.commit('addCount',oldCart )
          resolve('商品数量+1')
        }else{
          payload.count = 1 
          context.commit('addToCart',payload )
          resolve('加入购物车成功')
          
        }
      })

    
    }
  }
})
//main.js 注入到根实例

import store from './store/index'
new Vue({
  store,
  components:{
    App
  },
  render: h => h(App),
}).$mount('#app')
```
## vuex详解

- state

state是用来存放数据的，组件调用 `$store.state`
- mutation

mutation 是用来修改state 里的数据，只能是同步操作,组件调用时两种写法

`this.$store.commit('mutation中的方法'，参数)`或
`this.$store.commit({type:'mutation中的方法',payload:'参数'}))`

- getters

getters类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。

- action

action 异步操作放在这里执行，action不能直接修改修改state的数据，需要通过mutation来修改。他有两个参数context,payload，其中context中的commit用来调用mutation的方法修改state，`context.commit('addCount',oldCart )`.payload是参数。

调用时,使用以下store.dispatch方法触发操作
`store.dispatch('increment')`

- modules
  
modules模块的意思，每个模块中同样有state、mutation、getters、action、modules。
当应用变得非常复杂时，这时我们可以将 store 分割为模块（module）

## 为了简便起见，Vuex 提供了四个辅助函数方法用来方便的将这些功能结合进组件。

1. mapState
2. mapGetters
3. mapMutations
4. mapActions
   
```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        // 使用对象展开运算符将此对象混入外部对象中
      ...mapState({
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        count(state) {
          return state.count + this.localCount
        }
      }),
      ...mapGetters({
        getterCount(state, getters) {
          return state.count + this.localCount
        }
      })
    }
    methods: {
      ...mapMutations({
          // 如果想将一个属性另取一个名字，使用以下形式。注意这是写在对象中
           add: 'increment' // 将 `this.add()` 映射为`this.$store.commit('increment')`
        }),
      ...mapActions({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
    }
    // 如果结合进组件之后不想改变名字，可以直接使用数组的方式。
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
}
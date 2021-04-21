---
title: el-cascader的使用和坑
date: 2021-04-21
categories: other
tags:
- js
- element UI
---
element UI 的联动下拉框正常只能选择到子级，很多时候有个需求，就是选择到每一个选项
此时就需要加上一个配置，官网提供的:props="{ checkStrictly: true }"解除父子节点互相关联。

## 问题来了。。。不想要前面的单选按钮，并且直接点击lable即可选中效果。
1. 首先要解决不要单选框，查看官网并没有相关api，这样看来我们只能从修改样式入手了，想到的办法就是css将其隐藏
```css
.el-radio {  
  color: #606266;  
  cursor: pointer;  
  visibility: hidden; // 加上这一行  
  margin-right: 30px;  
}  
```
2. 怎么让点击文字也有选中效果呢,在span上手动注册组件去调用radio的事件就行了
```js
mounted () {  
setInterval(function () {  
document.querySelectorAll('.el-cascader-node__label').forEach(el => {  
el.onclick = function () {  
if (this.previousElementSibling) this.previousElementSibling.click()  
}  
})  
}, 1000)  
}, 
```
1. 结果又遇到了另一个问题，是选中之后下拉马上收起，但是现有的组件不支持,所以，解决办法就是去监听选择的属性

```js
watch: {
    'form.city_id'(newVal, oldVal) {
      if (this.$refs.cascader) {
        this.$refs.cascader.dropDownVisible = false
      }
    }
  },
```

附上HTML
```html
```````<el-cascader
          ref="cascader"
          v-model="form.city_id"
          clearable
          :show-all-levels="false"
          :options="$store.state.menu.city"
          :props="{
            expandTrigger: 'hover',
            value: 'id',
            label: 'city_name',
            children: 'childTree',
            checkStrictly: true
          }"
        />
```

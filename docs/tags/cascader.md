---
title: el-cascader的使用和坑
date: 2021-04-21
categories: other
tags:
- js
- element UI
---


# 联动下拉单选
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
# 联动下拉多选

现在有个需求就是选择想去的城市，那么这时是程序需要省市区三级联动，又要能够复选，所以，
1. 需要配置`multiple = true` 来开启多选模式
2. 配置严格的遵守父子节点不互相关联，`checkStrictly: true`
3. 配置框中不显示选中值的完整路径 `:show-all-levels="false"`

#### HTML
```html
<el-form-item label="去过的城市">
            <el-cascader
              v-model="been_city"
              :options="$store.state.menu.city"
              :show-all-levels="false"
              :props="{
                expandTrigger: 'hover',
                multiple: true,
                checkStrictly: true,
                value: 'id',
                label: 'city_name',
                children: 'childTree',
              }"
              clearable
            />
          </el-form-item>
```
这样的下拉框就处理好了，之后需要考虑一个问题，选择城市之后，拿到的数据是数组套数组类型

![](https://i.loli.net/2021/06/02/diqneIW2zwtRKYL.png)

因为后端需要的是逗号隔开的字符串，所以我们需要处理一下数据

```js
      const wantArr = []
      data.want_city.map(item => {
        // 取数组的最后一个
        wantArr.push(item[item.length - 1])
      })
      // wantArr.toString()  数组转字符串
      data.other = JSON.stringify({ want_city: wantArr.toString() })
```
把处理好的数据丢给后端就好了吗？其实还需要考虑到回显的问题，这一步才是最难的，
因为后端提供的数据是字符串，所以我们尝试把 他转化成数组，

```js
const want = other.want_city.split(',')
// ["150000", "150400", "150404"]
```
这样拿到的数据是城市子级的数据原本以为这样就够了？但其实，这样还是回显不了，需要再处理数据，找到对应的父级id

所以需要写一个方法来处理数组

```js
changeDetSelect(key, treeData) {
      const arr = [] // 在递归时操作的数组
      let returnArr = [] // 存放结果的数组
      let depth = 0 // 定义全局层级
      // 定义递归函数
      function childrenEach(childrenData, depthN) {
        for (var j = 0; j < childrenData.length; j++) {
          depth = depthN // 将执行的层级赋值 到 全局层级
          arr[depthN] = childrenData[j].id
          if (childrenData[j].id === key) {
            returnArr = arr.slice(0, depthN + 1) // 将目前匹配的数组，截断并保存到结果数组，
            break
          } else {
            if (childrenData[j].childTree) {
              depth++
              childrenEach(childrenData[j].childTree, depth)
            }
          }
        }
        return returnArr
      }

      return childrenEach(treeData, depth)
    },
```

然后利用这个方法整理需要的数组格式

```js
      const nowWant = []
        want.forEach((item) => {
          const idArr = this.changeDetSelect(parseInt(item), this.$store.state.menu.city)
          nowWant.push(idArr)
        })
```




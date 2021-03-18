---
title: 关于使用antd树形控件遇到的问题
date: 2021-03-17
categories:
 - javaScript
tags:
 - js
 - React
 - antd
---

## Tree树形控件的几本使用

```js
    <Tree
      checkable //节点前添加 Checkbox 复选框
      onExpand={onExpand} //展开/收起节点时触发
      expandedKeys={expandedKeys} //（受控）展开指定的树节点
      autoExpandParent={autoExpandParent} //是否自动展开父节点
      onCheck={onCheck} //点击复选框触发
      checkedKeys={checkedKeys} //受控）选中复选框的树节点
      onSelect={onSelect} //点击树节点触发
      selectedKeys={selectedKeys} //（受控）设置选中的树节点
      treeData={treeData} //treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
    />
```
> checkedKeys注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 checkable 和 checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
::: right
 参考文档 [antd](https://ant.design/components/tree-cn/)
:::

现在有一个需求，后台动态分配菜单，所以会用用树

选择带复选框带树

```js
<Tree
  showIcon //显示每个节点图标
  treeData={menuData}
  checkable
  checkedKeys={this.state.checkedKeys}
  onCheck={this.onCheck}
/>

```
> 注意这边的图标需要特殊处理
```js
import * as allIcons from '@ant-design/icons'; // 获取所有图标
// 菜单递归处理
const loopMenuIcon = (menus) => {
  menus.forEach((item) => {
    const Obj = item;
    if (typeof item.icon === 'string' && !(item.icon === '' || item.icon === null)) {
      Obj.icon = React.createElement(allIcons[item.icon]); //每个icon图标处理
    }

    Obj.key = item.id; //给菜单添加一个key
    if (item.children?.length > 0) {
      loopMenuIcon(item.children);
    }
  });
  return menus;
};
// 做到这一部到时候就可以把树都列表渲染出来了
```

下一步，我们需要渲染默认选中的复选框
上面提到checkedKeys的传入时，父子节点有关联，如果传入父节点 key，则子节点自动选中；所以我们这边就要洗一下数据
我的思路是，当点击开发展示树的显示框的按钮时，把数据洗完，利用ref把洗完的数据放到写树的组件中。

数据是怎么洗的
```js
//处理一下默认选择的id，1.取出后端提供树的数组的所有子节点的数据
 this.state.menuData.forEach((item) => {
      if (item.children.length === 0) {
        childId.push(item.id);
      }
      if (item.children.length > 0) {
        item.children.forEach((val) => {
          childId.push(val.id);
        });
      }
    });

// 取出两个数组相同的元素

// 取出两个数组的相同元素
const getArrEqual = (arr1, arr2) => {
  const newArr = [];
  arr2.forEach((item) => {
    arr1.forEach((val) => {
      if (val === item) {
        newArr.push(val);
      }
    });
  });
  return newArr;
};

const allChecked = record.menus === null ? [] : JSON.parse(record.menus);//获取当前用户的所有菜单id包括fid和子id。
// 然后比较两个数组，取出相同的id，就是该用户默认选中复选框的子id
const filterChildId = getArrEqual(allChecked, childId);
// 然后把这个过滤好的数据交给子组件的checkedKeys
```
做到这里基本把渲染部分做完了，那就要开始做动态修改，但这里有个问题就是onCheck里面取到
checkedKeys要和info.halfCheckedKeys一起
所以可以这样做
```js
onCheck = (checkedKeys, info) => {
    const key = [...checkedKeys, ...info.halfCheckedKeys]
    this.setState({
      checkedKeys: checkedKeys,
      lastKeys:key
    })
  }
// 这样拿到的key就是最后需要传给后台的key
```
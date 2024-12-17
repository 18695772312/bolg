---
title: git 常用到到的一些命令（一）
date: 2021-10-27
categories: other
tags:
 - git
---

## 基本提交代码和提取代码

```js
git add . // 添加文件
git commit -m '需要编写的描述'
git push //提交代码
git push origin '远程分支' //提交到远程分支

git pull //拉取代码
git pull origin master //拉取master分支的代码
```

## 代码回退

回退到某个版本并提交到远程仓库

```js
git log // 查看历史提交的commit id
git reset --hard 'commit id' //回退到某次提交
git push -f // 提交代码git push --force


```
## 将指定的提交（commit）应用于其他分支。

```js
git cherry-pick 'commit id'

```
## 查看版本号

```js
npm view 包名 versions

```

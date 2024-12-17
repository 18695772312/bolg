---
title: Vue3项目的创建和配置
date: 2023-03-03
categories: javaScript
tags:
 - js
 - Vue3
---

## 创建项目

``` js
vue create vue3-ts-cms
```
选择vue版本3.x
## 配置.prettierrc


```js
// 安装插件
"eslint-plugin-prettier": "^3.3.1",
"eslint-plugin-vue": "^7.0.0",
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
// package.json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "prettier": "prettier --write .", // 配置这行
    "prepare": "husky install"
  },
```
## 配置 .prettierignore

```js
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*

```
## 解决eslint 和prettier冲突
```js
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'  // 加个这个
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

```
## 配置husky  代码提交前自动化修复

1. 安装 npm install husky -D
2. 初始化 npx husky-init   生成.husky文件
3. 配置 pre-commit文件

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
```
## 配置提交规范
1. 安装 `npm install commitizen -D`
2. 初始化  `npx commitizen init cz-conventional-changelog` --save-dev --save-exact
3. 生成
```js
// package.json
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
```
4. 使用

执行 npx cz

### 常见的type类型

1. feat：新功能
2. fix：Bug 修复

3. docs：文档更新

4. style：代码样式更改，例如空格、格式、缺少分号等

5. refactor：重构代码

6. perf：性能优化

7. test：添加缺失或修正测试代码

8. chore：构建相关的代码或工具库，如文档生成等

## 配置commitlint 提交不规范时不允许提交
1. 安装  `npm install @commitlint/cli @commitlint/config-conventional -D`
2. 在根目录创建commitlint.config.js文件，配置commitlint
```js
module.exports = {
    extends: ['@commitlint/config-conventional']
}
```
3. 使用husky生成commit-msg文件，验证提交信息：

`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`
4. 配置 package.json  `"commit": "cz"`   执行npm run commit 就是提交了

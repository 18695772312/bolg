---
title: vue-tinymce富文本编辑器组件的使用
date: 2021-06-02
categories: javaScript
tags:
 - Vue
---

## 安装

```npm
yarn add @packy-tang/vue-tinymce
# or
npm install @packy-tang/vue-tinymce
```
::: right
来自 [vue-tinymce库](https://github.com/lpreterite/vue-tinymce)
:::

直接上代码

```html
<vue-tinymce
  v-model="detail"
  :setting="setting"
/>
```

```js
data() {
  return {
    detail: '',
    setting: {
        menubar: true,
        toolbar: ['fontselect formatselect fontsizeselect bold italic underline strikethrough forecolor backcolor', 'alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscriptcode  bullist numlist image charmap preview emoticons fullscreen'],
        toolbar_drawer: 'sliding',
        quickbars_selection_toolbar: 'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
        plugins: [' axupimgs advlist anchor autolink autosave code codesample  directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textpattern visualblocks visualchars wordcount '],
        language: 'zh_CN', // 本地化设置
        height: 400
      },
  }
}
```

但你可能需要配置

1. 下载完可以先在public下面建个目录tinymce，下载tinymce完成后在node_modules 中找到 tinymce/skins目录，将其复制到public\tinymce目录下面
   
![](https://i.loli.net/2021/06/02/VU5Ha3DbAmhfGPE.png)

2. 下载语言包 
::: right
来自 [下载地址](https://www.tiny.cloud/get-tiny/language-packages/)
:::

下载好的语言包需要放在

![](https://i.loli.net/2021/06/02/J32KLpsSoRhyj45.png)

3. 引用

![](https://i.loli.net/2021/06/02/923yjZANMVdDIig.png)

4. main.js中引入
```js
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
Vue.prototype.$tinymce = tinymce
Vue.use(VueTinymce)
```

## 如果想本地上传图片就需要自定义上传按钮了

![](https://i.loli.net/2021/06/02/BjZeEuhk4wmcOWi.png)

上传图片可根据element 多图上传的组件配合使用

 上传成功回调的URL 处理

 ```js
 submit(data) {
      const nowImg = data.map(item => {
        return `<img src="${item}">`
      })
      this.detail += nowImg
      this.visible = false
    }
```

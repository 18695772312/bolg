---
title: web播放视频流 flv
date: 2021-06-11
categories: javaScript
tags:
- js
- vue
- Alipayer
---
Alipayer 是阿里云Web端播放器SDK，同时支持Flash和H5两种播放技术。
但目前浏览器好像不支持Flash，所以只有h5播放了
他支持
#### H5 模式：
- 视频格式：MP4、FLV、M3U8
- 视频编码：H.264
- 音频编码：AAC
- 音频格式：MP3

官网文档链接
::: right
[Alipayer](https://help.aliyun.com/document_detail/125570.html)
:::

vue-alipayer-v2是基于Alipayer 开发并封装成vue组件的播放器.vue中使用Alipayer,播放flv,m3u8,mp4视频

## vue-alipayer-v2的使用

- 安装

```js
npm i vue-aliplayer-v2 --save
or
yarn add vue-aliplayer-v2
```
- 全局注册 main.js

```js
import VueAliplayerV2 from 'vue-aliplayer-v2';

Vue.use(VueAliplayerV2);

//可选全局配置
//Vue.use(VueAliplayerV2,{
    // cssLink: 'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css',
    // scriptSrc: 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js'
//});
```

- 局部注册 App.vue

```js
//推荐第一种(仅v1.2.3)及以上的版本可用
import VueAliplayerV2 from 'vue-aliplayer-v2';
components:{ VueAliplayerV2 }

//或者 
components:{ VueAliplayerV2: VueAliplayerV2.Player }
```
- 组件中使用.我们用这个

```html
<div id="app">
      <template v-if="!isShowMultiple && show">
        <vue-aliplayer-v2
          ref="VueAliplayerV2"
          :source="source"
          :options="options"
        />
      </template>
      <div v-if="isShowMultiple && show" class="show-multiple">
        <template
          v-for="x in 5"
        >
          <vue-aliplayer-v2
            :key="x"
            ref="VueAliplayerV2"
            class="multiple-player"
            :source="source"
            :options="options"
          />
        </template>
      </div>
      <p v-if="!show" class="remove-text">播放器已销毁!</p>
      <div class="player-btns">
        <template v-if="!isShowMultiple && show">
          <el-button size="mini" @click="play()">播放</el-button>
          <el-button size="mini" @click="pause()">暂停</el-button>
          <el-button size="mini" @click="replay()">重播</el-button>
        </template>
        <el-button size="mini" @click="show = !show">{{ show ? "销毁" : "重载" }}</el-button>
      </div>

    </div>
```
```js
data() {
    return {
      options: {
        source: '',
        isLive: true // 切换为直播流的时候必填
        // format: 'm3u8'  //切换为直播流的时候必填
      },
      source: '',
      // source: '//ivi.bupt.edu.cn/hls/cctv1.m3u8',
      show: true,
      isShowMultiple: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    play() {
      this.$refs.VueAliplayerV2.play()
    },

    pause() {
      this.$refs.VueAliplayerV2.pause()
    },

    replay() {
      this.$refs.VueAliplayerV2.replay()
    }
  }
  ```



::: right
[vue-aliplayer-v2文档](https://www.npmjs.com/package/vue-aliplayer-v2)
:::
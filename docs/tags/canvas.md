---
title: 微信小程序实现生成海报并分享给好友
date: 2021-05-31
categories: 微信小程序
tags:
- 微信小程序
---

```html
  <view class="poster-box" wx:if="{{canvasHidden}}" catch:tap="shareNoop">
     <canvas style="width:279px;height:495px;position:relative;z-index:10;" canvas-id="myCanvas"></canvas>
  </view>
```
## 如果是网图需要先下载图片

```js
// 下载海报
  downLoad: function (e) {
    var that = this;
    that.setData({
      canvasHidden:true
    })
    wx.showLoading({
      title: '正在绘制图片',
    })
    var bgImgPath = ''
    that.data.background.forEach((item,index) => {
      if(that.data.currentIndex === index){
        bgImgPath = item.imgCode;//封面大图
      }
    })
    this.setData({
      bgImgPath: bgImgPath
    })
    //缓存canvas背景图
    wx.getImageInfo({
      src: that.data.bgImgPath,//网络路径
      success: function (res3) {
        //背景图
        that.setData({
          bgImgPath: res3.path
        })
        that.drawimg();//绘图的函数
        // 结束加载中提示
        wx.hideLoading()
      }
    })
  },
```
## 然后绘制海报

```js
 // 生成海报
  drawimg(){
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas');
    var nickName =wx.getStorageSync('openidMsg').user_id;//昵称
    var bgImgPath = that.data.bgImgPath;//封面大图
    var xcxcode = that.data.codeImg;//二维码
    // （封面大图）
    ctx.drawImage(bgImgPath, 0, 0, 279,495);
    //绘制id
    ctx.setFontSize(8.5);
    ctx.setFillStyle('#fff');
    ctx.fillText("ID:"+nickName, 59, 455);
    // 
    ctx.setFontSize(8.5);
    ctx.setFillStyle('#fff');
    ctx.fillText("扫码了解详情", 59, 469);
    ctx.setFontSize(8.5);
    ctx.setFillStyle('#fff');
    ctx.fillText("TEL：0592-5613010", 59, 483);
    //绘制二维码
    ctx.drawImage(xcxcode, 13, 445, 42, 42);
    ctx.draw();
  },
```
## 保存海报

```js
// 保存二维码
  hanldeSave(){
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'myCanvas',
      success: function (res) {
        //调取小程序当中获取图片
        console.log(res.tempFilePath);
        that.setData({
          tempFilePath:res.tempFilePath
        })
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '图片保存成功！',
              content: '请将前往相册查看',
              showCancel: false,
              confirmText: '知道了',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.setData({
                    hideshare:true
                  })
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
        console.log(2)
      }
    })
  },
  ```

  ## 分享图片

  ```js
   shareNoop(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'myCanvas',
      success: function (res) {
        //调取小程序当中获取图片
        wx.previewImage({
          current: res.tempFilePath, // 当前显示图片的http链接
          urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })
      }
    })
  },
  ```

#### 这里需要注意的是获取二维码图片是base64的图片需要转换，不然真机上显示不出来

```js
base64Save(base64File) { //base64File 需要加前缀
    const fsm = wx.getFileSystemManager();//获取全局文件管理器
    
    let extName = base64File.match(/data\:\S+\/(\S+);/)
    if (extName) {
      //获取文件后缀
        extName = extName[1]
    }
    
    //获取自1970到现在的毫秒 + 文件后缀 生成文件名
    let fileName = Date.now() + '.' + extName
    
    return new Promise((resolve, reject) => {
      //写入文件的路径
      let filePath = wx.env.USER_DATA_PATH + '/' + fileName
      
      fsm.writeFile({
        filePath,
        data: base64File.replace(/^data:\S+\/\S+;base64,/, ''), //替换前缀为空
        encoding: 'base64',
        success:(res)=>{
          console.log('filePath',filePath); //路径：http://user.....
          this.setData({
            codeImg: filePath
          })
          resolve(filePath);
        },
        fail() {
          reject('写入失败');
        },
      });
    });
  },
```
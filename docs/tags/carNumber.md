---
title: 小程序车牌号输入（自定义键盘）
date: 2021-02-21 10:20
categories: 微信小程序
tags:
- 微信小程序
---

## 先看效果图
![效果图](https://i.loli.net/2021/02/21/qi4yQwODLpvjgER.png)

废话不多说，先上代码
wxml部分
```html
<view class="plate-input-body">
	<block wx:if="{{flag}}">
		<view class="plate-input-content">
			<view class="{{inputOnFocusIndex=='0'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="0">{{inputPlates.index0}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='1'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="1">{{inputPlates.index1}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='2'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="2">{{inputPlates.index2}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='3'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="3">{{inputPlates.index3}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='4'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="4">{{inputPlates.index4}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='5'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="5">{{inputPlates.index5}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='6'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="6">{{inputPlates.index6}}</text>
			</view>
		</view>
		<view class='plate-input-flag' bindtap='changeplate'>
			<text>切换新能源车牌</text>
		</view>
	</block>
	<block wx:else>
		<view class="new-plate-input-content">
			<view class="{{inputOnFocusIndex=='0'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="0">{{inputPlates.index0}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='1'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="1">{{inputPlates.index1}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='2'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="2">{{inputPlates.index2}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='3'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="3">{{inputPlates.index3}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='4'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="4">{{inputPlates.index4}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='5'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="5">{{inputPlates.index5}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='6'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="6">{{inputPlates.index6}}</text>
			</view>
			<view class="{{inputOnFocusIndex=='7'?'plate-nums-foc':'plate-nums-first'}}">
				<text bindtap="inputClick" class="plate-num-text" data-id="7">{{inputPlates.index7}}</text>
			</view>
		</view>
		<view class='plate-input-flag' bindtap='changeplate1'>
			<text>切换普通车牌</text>
		</view>
	</block>
</view>
<!--键盘-->
<view class="keyboard" wx:if="{{isKeyboard}}">
	<view class="kb_top">
		<text catchtap="tapSpecBtn" data-index="1" style="position:absolute;right:0;display:block;height:74rpx;padding:0 34rpx; color:#FF6A00;line-height:74rpx; font-size: 30rpx;">关闭</text>
	</view>
	<view style="width:100%; text-align:center;" wx:if="{{!isNumberKB}}">
		<view style="width:99%;display:flex;text-align:center;margin:0 auto">
			<view catchtap="tapKeyboard" class="td td_nor" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx<=9}}" wx:for="{{keyboard1}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="display:flex;text-align:center; width:90%;margin:0 auto">
			<view catchtap="tapKeyboard" class="td td_nor" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx<=18&&idx>9}}" wx:for="{{keyboard1}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="display:flex;text-align:center; width:70%;margin:0 auto">
			<view catchtap="tapKeyboard" class="td td_nor" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx<=25&&idx>18}}" wx:for="{{keyboard1}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="display:flex; width:50%;margin:0 auto;text-align:center;">
			<view catchtap="tapKeyboard" class="td td_nor" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx>25}}" wx:for="{{keyboard1}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view bindtap="tapSpecBtn" class="del-first" data-index="0" hoverClass="del-hover" hoverStartTime="0" hoverStayTime="80">
			<image class="del-img" data-index="0" mode="scaleToFill" src="./images/delete.png"></image>
		</view>
	</view>
	<view style="width:100%; text-align:center;" wx:if="{{isNumberKB}}">
		<view style="width:99%;display:flex;text-align:center;margin:0 auto">
			<view class="td td_num board_bg" wx:if="{{!tapNum&&idx<=9}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="width:99%;display:flex;text-align:center;margin:0 auto">
			<view catchtap="tapKeyboard" class="td td_num" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{tapNum&&idx<=9}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="width:99%;display:flex;text-align:center;margin:0 auto">
			<view catchtap="tapKeyboard" class="td td_num" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx>9&&idx<=19}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="width:99%;display:flex;text-align:center;margin:0 auto">
			<view catchtap="tapKeyboard" class="td td_num" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx>19&&idx<=29}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view style="width:69%;display:flex;text-align:left; margin-left:5rpx;">
			<view catchtap="tapKeyboard" class="td td_num" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{idx>29&&idx<=33}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
			<view class="td td_num board_bg" wx:if="{{!isText&&idx>33}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
			<view catchtap="tapKeyboard" class="td td_num" data-index="{{idx}}" data-val="{{itemName}}" hoverClass="board_bg" hoverStartTime="0" hoverStayTime="80" wx:if="{{isText&&idx>33}}" wx:for="{{keyboardNumber}}" wx:for-index="idx" wx:for-item="itemName" wx:key="index">
				{{itemName}}
			</view>
		</view>
		<view bindtap="tapSpecBtn" class="del-first" data-index="0" hoverClass="del-hover" hoverStartTime="0" hoverStayTime="80">
			<image class="del-img" data-index="0" mode="scaleToFill" src="./images/delete.png"></image>
		</view>
	</view>
</view>
```
wxss部分
```css
.plate-input-content {
  display: flex;
  flex-direction: row;
  height: 80rpx;
}
.plate-nums-foc{
    flex: 1;
    border: 2rpx solid #FF6A00;
    margin-right: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8rpx;
    background-color: #fff;
}
 
.plate-nums-first{
     flex: 1;
    border: 2rpx solid #999;
    margin-right: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8rpx;
    background-color: #fff;
}
.plate-num-text {
    flex: 1;
    line-height: 80rpx;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8rpx;
    font-size: 40rpx;
    font-weight: normal;
}
 
.new-plate-input-content{
  display: flex;
  flex-direction: row;
  height: 80rpx;
}
 
 
.kb_top {
    align-content: relative;
    width: 100%;
    height: 74rpx;
    background: #fff;
    border-top: solid #ebebeb 2rpx;
    border-bottom: 15rpx solid #d7d8dc;
}
 
.keyboard {
    z-index: 9999;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    background: #d7d8dc;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 15rpx solid #d7d8dc;
}
 
.td {
    font-family: "微软雅黑";
    flex-grow: 1;
    text-align: center;
    font-size: 34rpx;
    height: 86rpx;
    line-height: 80rpx;
    background: #fff;
    margin: 10rpx 5rpx;
    color: #333;
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    box-shadow: 0rpx 2rpx 0rpx #a9a9a9;
}
 
.td_nor {
    flex: 1 1 6%;
}
 
.td_num {
    flex: 1 1 8%;
}
 
.td_spec {
    flex: 1 1 12%;
}
 
.board_bg {
    box-shadow: 0 0 0 #e5e5e5;
    background: #e5e5e5;
}
 
.del-first {
    position: absolute;
    bottom: 10rpx;
    right: 10rpx;
    width: 137rpx;
    height: 86rpx;
    background-color: #fff;
    box-shadow: 0rpx 2rpx 0rpx #a9a9a9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
}
 
.del-hover {
    position: absolute;
    bottom: 10rpx;
    right: 10rpx;
    width: 137rpx;
    height: 86rpx;
    background-color: #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    box-shadow: 0 0 0 #e5e5e5;
}
 
.del-img {
    display: block;
    width: 46rpx;
    height: 38rpx;
}
/* 拍照识别 */
.taken-img{
  display: flex;
  justify-content: flex-end;
}
.plate-nums-first:last-of-type{
  margin-top: 0;
}
/* 切换的按钮 */
.plate-input-flag{
  margin: 30rpx 0 0 0;
  color: #FF6A00;
  float: right;
}
```
js部分
```js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isKeyboard: !1,
    isNumberKB: !1,
    tapNum: !1,
    isText: !1,
    disableKey: "1234567890港澳学",
    keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学",
    keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新",
    inputPlates: {
      index0: "",
      index1: "",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: ""
    },
    inputOnFocusIndex: "",
    flag: true,
    carNum: '', //最后车牌号
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //切换新能源车牌
    changeplate: function () {
      var that = this;
      that.setData({
        flag: false,
        isKeyboard: false,
        inputOnFocusIndex: '',
        inputPlates: {
          index0: "",
          index1: "",
          index2: "",
          index3: "",
          index4: "",
          index5: "",
          index6: "",
          index7: ""
        },
      })
    },
    //切换普通车牌
    changeplate1: function () {
      var that = this;
      that.setData({
        flag: true,
        isKeyboard: false,
        inputOnFocusIndex: '',
        inputPlates: {
          index0: "",
          index1: "",
          index2: "",
          index3: "",
          index4: "",
          index5: "",
          index6: ""
        },
      })
    },
    //  点击输入框输入文字
    inputClick: function (t) {
      var that = this;
      that.setData({
        inputOnFocusIndex: t.target.dataset.id,
        isKeyboard: !0
      })
      "0" == this.data.inputOnFocusIndex ? that.setData({
        tapNum: !1,
        isNumberKB: !1,
        isText: !1
      }) : "1" == this.data.inputOnFocusIndex ? that.setData({
        tapNum: !1,
        isNumberKB: !0,
        isText: !1
      }) : "1" == this.data.inputOnFocusIndex ? that.setData({
        tapNum: !1,
        isNumberKB: !0,
        isText: !1
      }) : "6" == this.data.inputOnFocusIndex && that.data.flag ? that.setData({
        tapNum: !0,
        isNumberKB: !0,
        isText: !0
      }) : that.setData({
        tapNum: !0,
        isNumberKB: !0,
        isText: !1
      });

    },
    //键盘点击事件
    tapKeyboard: function (t) {
      t.target.dataset.index;
      var a = t.target.dataset.val;
      switch (this.data.inputOnFocusIndex) {
        case "0":
          this.setData({
            "inputPlates.index0": a,
            inputOnFocusIndex: "1"
          });
          break;

        case "1":
          this.setData({
            "inputPlates.index1": a,
            inputOnFocusIndex: "2"
          });
          break;

        case "2":
          this.setData({
            "inputPlates.index2": a,
            inputOnFocusIndex: "3"
          });
          break;

        case "3":
          this.setData({
            "inputPlates.index3": a,
            inputOnFocusIndex: "4"
          });
          break;

        case "4":
          this.setData({
            "inputPlates.index4": a,
            inputOnFocusIndex: "5"
          });
          break;

        case "5":
          this.setData({
            "inputPlates.index5": a,
            inputOnFocusIndex: "6"
          });
          break;

        case "6":
          this.setData({
            "inputPlates.index6": a,
            inputOnFocusIndex: "7"
          });
          break;

        case "7":
          this.setData({
            "inputPlates.index7": a,
            inputOnFocusIndex: "7"
          });

      }
      if (this.data.flag) {
        var n = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6
      } else {
        var n = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6 + this.data.inputPlates.index7
      }
      this.setData({
        carNum: n
      })
      // console.log(n)
      // 收起键盘
      if((this.data.flag && n.length == 7) || (!this.data.flag && n.length == 8)){
        this.setData({
          isKeyboard: !1
        })
      }
      this.checkedSubmitButtonEnabled();
      this.triggerEvent('getcarnum',{car:n,type:this.data.flag})
    },
    //键盘关闭按钮点击事件
    tapSpecBtn: function (t) {
      var a = this,
        e = t.target.dataset.index;
      if (0 == e) {
        switch (parseInt(this.data.inputOnFocusIndex)) {
          case 0:
            this.setData({
              "inputPlates.index0": "",
              inputOnFocusIndex: "0"
            });
            break;

          case 1:
            this.setData({
              "inputPlates.index1": "",
              inputOnFocusIndex: "0"
            });
            break;

          case 2:
            this.setData({
              "inputPlates.index2": "",
              inputOnFocusIndex: "1"
            });
            break;

          case 3:
            this.setData({
              "inputPlates.index3": "",
              inputOnFocusIndex: "2"
            });
            break;

          case 4:
            this.setData({
              "inputPlates.index4": "",
              inputOnFocusIndex: "3"
            });
            break;

          case 5:
            this.setData({
              "inputPlates.index5": "",
              inputOnFocusIndex: "4"
            });
            break;

          case 6:
            this.setData({
              "inputPlates.index6": "",
              inputOnFocusIndex: "5"
            });
            break;

          case 7:
            this.setData({
              "inputPlates.index7": "",
              inputOnFocusIndex: "6"
            });
        }
        this.checkedSubmitButtonEnabled();
      } else 1 == e && a.setData({
        isKeyboard: !1,
        isNumberKB: !1,
        inputOnFocusIndex: ""
      });
    },
    //键盘切换
    checkedKeyboard: function () {
      var t = this;
      "0" == this.data.inputOnFocusIndex ? t.setData({
        tapNum: !1,
        isNumberKB: !1
      }) : "1" == this.data.inputOnFocusIndex ? t.setData({
        tapNum: !1,
        isNumberKB: !0
      }) : "6" == this.data.inputOnFocusIndex && t.data.flag ? t.setData({
        tapNum: !0,
        isNumberKB: !0,
        isText: !0
      }) : this.data.inputOnFocusIndex.length > 0 && t.setData({
        tapNum: !0,
        isNumberKB: !0
      });
    },

    checkedSubmitButtonEnabled: function () {
      this.checkedKeyboard();
      var t = !0;
      for (var a in this.data.inputPlates)
        if ("index7" != a && this.data.inputPlates[a].length < 1) {
          t = !1;
          break;
        }
    },
  }
})
```

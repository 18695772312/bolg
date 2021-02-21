---
title: 小程序自定义时间滚动选择器picker
date: 2021-02-21 10:20
categories: 微信小程序
tags:
- 微信小程序
---
前言： 因为原生小程序的picker不支持自定义样式，而且原生的picker样式不美观，对开发人员造成不必要的麻烦，所以，自定义滚动器就很重要了。
## 先看效果
![效果图](https://i.loli.net/2021/02/21/L1Onj4GVqhXxErC.png)

下面贴上代码
1. wxml

```html
<view class="mask">
  <view class="modalDlg">
    <view class="header-title">请选择入场时间</view>
    <picker-view indicator-class="chiose-style"
      class="view_picker picker-view" value="{{value}}" bindchange="bindChange">

      <picker-view-column>
        <view wx:for="{{years}}" wx:key='index' class="view_picker_text">{{item}}年</view>
      </picker-view-column>

      <picker-view-column>
        <view wx:for="{{months}}" wx:key='index' class="view_picker_text">{{item}}月</view>
      </picker-view-column>

      <picker-view-column>
        <view wx:for="{{days}}" wx:key='index' class="view_picker_text">{{item}}日</view>
      </picker-view-column>

      <picker-view-column>
        <view wx:for="{{hours}}" wx:key='index' class="view_picker_text">{{item}}点</view>
      </picker-view-column>

      <picker-view-column>
        <view wx:for="{{minutes}}" wx:key='index' class="view_picker_text">{{item}}分</view>
      </picker-view-column>
    </picker-view>

    <view class="btn" bindtap="go">确定</view>
    <view class="cancel-btn" bindtap="cancel">取消</view>
  </view>
</view>
```
2. wxss

```css
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
}
.header-title{
  color: #333;
  background-color: #fff;
  font-size: 36rpx; 
  font-weight: 700;
  align-items: center;
  height: 104rpx;
  line-height: 104rpx;
}
.picker-view{
  width: 100%; 
  height: 372rpx;
}
.modalDlg {
  width: 692rpx;
  height: 582rpx;
  position: fixed;
  bottom: 146rpx;
  left: 29rpx;
  z-index: 9999;
  right: 29rpx;
  background-color: #fff;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time_text {
  text-align: center;
  font-size: 60rpx;
}

.view_picker {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  width: 640rpx;
}

.view_picker_text {
  /* padding-left:35rpx; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.chiose-style{
  height: 92rpx;
  font-size: 40rpx;
  color: #333;
}
.btn{
  color:#FF5B00;
  height: 104rpx;
  line-height: 104rpx;
  border-top: 2rpx solid #E9E9E9;
  width: 100%;
  text-align: center;
  font-size: 36rpx;
}
.cancel-btn{
  height: 104rpx;
  width: 692rpx;
  text-align: center;
  line-height: 104rpx;
  color: #333;
  font-size: 36rpx;
  position: fixed;
  bottom: 21rpx;
  background-color: #fff;
  border-radius: 20rpx;
}
```
3. js

```js
var dateTimePicker = require('../../utils/time.js');
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
    // 年
    years: dateTimePicker.yearArr(),
    year: null,
    // 月
    months: dateTimePicker.monthArr(),
    month: null,
    // 日
    days: dateTimePicker.dayArr(),
    day: null,
    // 当前时间
    value: dateTimePicker.getNowTime(),
    // 时
    hours: dateTimePicker.hourArr(),
    hour: null,
    //分
    minutes: dateTimePicker.minuteArr(),
    minute: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    go() {
      let val = ''
      if (!this.data.year) {
        val = `${new Date().getFullYear()}-${dateTimePicker.withData(dateTimePicker.getNowTime()[1]+1)}-${dateTimePicker.withData(dateTimePicker.getNowTime()[2]+1)} ${dateTimePicker.withData(dateTimePicker.getNowTime()[3])}:${dateTimePicker.withData(dateTimePicker.getNowTime()[4])}`
      } else {
        val = `${this.data.year}-${dateTimePicker.withData((this.data.month))}-${dateTimePicker.withData(this.data.day)} ${dateTimePicker.withData(this.data.hour)}:${dateTimePicker.withData(this.data.minute)}`
      }
      this.triggerEvent('confirm', val)
    },
    // 取消
    cancel() {
      console.log(1)
      this.triggerEvent('cancel')
    },
    //判断元素是否在一个数组
    contains: function (arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    },

    setDays: function (day) {
      const temp = [];
      for (let i = 1; i <= day; i++) {
        temp.push(i)
      }
      this.setData({
        days: temp,
      })

    },

    //选择滚动器改变触发事件
    bindChange: function (e) {
      const val = e.detail.value
      //判断月的天数
      const setYear = this.data.years[val[0]];
      const setMonth = this.data.months[val[1]];
      const setDay = this.data.days[val[2]];
      const setHour = this.data.hours[val[3]];
      const setMinute = this.data.minutes[val[4]];
      //闰年
      if (setMonth === 2) {
        if (setYear % 4 === 0 && setYear % 100 !== 0) {
          this.setDays(29);
        } else {
          this.setDays(28);
        }

      } else {
        //大月
        if (this.contains(dateTimePicker.bigMonth, setMonth)) {
          this.setDays(31)
        } else {
          this.setDays(30)
        }
      }
      this.setData({
        year: setYear,
        month: setMonth,
        day: setDay,
        hour: setHour,
        minute: setMinute
      })

    }
  }
})
```
4. time.js

```js
const bigMonth = [1, 3, 5, 7, 8, 10, 12]

function withData(param) {
  return param < 10 ? '0' + param : '' + param;
}


const yearArr = () => {
  //年
  const years = []
  let getYear = new Date().getFullYear()
  for (let i = getYear - 20; i <= getYear + 20; i++) {
    years.push(i);
  }
  return years
}
const monthArr = () => {
  //月
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months
}
const dayArr = () => {
  const days = []
  //日
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days
}
const hourArr = () => {
  const hours = []
  // 获取小时
  for (let i = 0; i <= 23; i++) {
    var k = i;
    if (0 <= i && i < 10) {
      k = "0" + i
    }
    hours.push(k)
  }
  return hours
}
const minuteArr = () => {
  const minutes = []
  // 获取分钟
  for (let i = 0; i <= 59; i++) {
    var k = i;
    if (0 <= i && i < 10) {
      k = "0" + i
    }
    minutes.push(k)
  }
  return minutes
}
// 获取当前时间
const getNowTime = () => {
  const date = new Date(); //获取系统日期
  let getYear = date.getFullYear()
  let getMonth = date.getMonth()
  let getDate = date.getDate()
  let hour = date.getHours()
  let minu = date.getMinutes()
  let yIndex = 0
  for(let i = 0;i<yearArr().length;i++){
    if(yearArr()[i] == getYear) {
      yIndex = i
    }
  }
  return [yIndex,getMonth,getDate-1,hour,minu]
}
module.exports = {
  yearArr: yearArr,
  monthArr: monthArr,
  dayArr: dayArr,
  hourArr: hourArr,
  minuteArr: minuteArr,
  getNowTime: getNowTime,
  withData: withData,
  bigMonth: bigMonth,
}
```
引用组件
```html
<w-time-picker wx:if="{{showModal}}" bind:confirm="confirm" bind:cancel="cancel"/>
```
> 这里需要注意picker-view嵌入页面的滚动选择器。其中只可放置 picker-view-column组件，其它节点不会显示。indicator-class设置选择器中间选中框的类名


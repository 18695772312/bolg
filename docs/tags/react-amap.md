---
title:  React使用高德地图 （react-amap）
date: 2021-02-04
categories:
 - javaScript
tags:
 - js
 - 高德地图
 - React
---

## react-amap 安装
```
<!-- 使用npm进行安装 -->
npm install --save react-amap
```
::: right
 参考文档 [官网](https://elemefe.github.io/react-amap/articles/start)
:::

## 使用
```jsx
import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'react-amap';
let geocoder = null;

const Amap = (props) => {
  const { click, initData } = props;
  const [position, setPosition] = useState({ longitude: 118.125326, latitude: 24.464227 }); // 当前显示到地方
  const [zoom, setZoom] = useState(10); //地图展示的范围

  useEffect(() => {
    if (geocoder)
      geocoder.getLocation(initData, (status, result) => {
        console.log(initData);
        console.log(status);
        console.log(result);
        if (status === 'complete' && result.info === 'OK') {
          const { lng, lat } = result.geocodes[0].location;
          setPosition({
            longitude: lng,
            latitude: lat,
          });
          setZoom(19);
        }
      });
  }, [initData]);

  const mapEvents = {
    created() {
      window.AMap.plugin('AMap.Geocoder', () => {
        geocoder = new window.AMap.Geocoder({
          radius: 500, // 范围，默认：500
        });
      });
    },
    click(e) {
      const { lnglat } = e;
      console.log(lnglat)
      setPosition({ longitude: lnglat.lng, latitude: lnglat.lat });
      console.log(geocoder)
      if (geocoder)
      
        geocoder.getAddress(lnglat, (status, result) => {
          console.log(status)
          console.log(result)
          if (status === 'complete') {
            if (click) {
              click({ e, result });
            }
          } else {
            click({});
          }
        });
    },
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '600px',
      }}
    >
      <Map
        zoom={zoom}
        center={position}
        amapkey="高德web key"
        events={mapEvents}
        plugins={["ToolBar", 'Scale']}
      >
        <Marker position={position} />
      </Map>
    </div>
  );
};

export default Amap;
```
给 Map 组件传入 amapkey 属性（因为 React 框架本身对 key 属性有其他作用，所以不能用 key，所以我们用 amapkey）

> react-amap-plugin-geolocation，定位组件。可进官网查看详情

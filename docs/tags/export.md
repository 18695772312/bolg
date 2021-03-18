---
title: react 表格导出Excel
date: 2021-03-17
categories:
 - javaScript
tags:
 - js
 - React
---

> 很多后台其实都有做导出的的功能，js-export-excel其实就很牛了

## 安装

```js
npm install js-export-excel // npm
yarn add js-export-excel //yarn
```

## 使用

```js
// 引入
import ExportJsonExcel from 'js-export-excel';
//按钮
<button onClick={exportExcel}>导出</button>

// 数据导出
  const exportExcel = () => {
    const datas = data; // 表格数据
    const option = {};
    const dataTable = []; // 新建数组放数据
    datas.forEach((val) => {
      if (val) {
        const obj = {
          id: val.id,
          status: val.status,
          order_number: val.order_number,
          duration: val.duration,
          car_number: val.car_number,
          lots_name: val.lots_name,
          total_amount: val.total_amount,
          actual_payment: val.actual_payment,
          start_time: val.start_time,
          end_time: val.end_time,
        };
        dataTable.push(obj);
      }
    });

    option.fileName = '停车场订单'; // 下载文件名(默认：download)
    option.datas = [
      {
        sheetData: dataTable, // 数据
        sheetName: '停车场订单', // sheet名字
        // sheetFilter: [dataTable.id, dataTable.name],//列过滤
        // sheetFilter 列过滤(只有在 data 为 object 下起作用)(可有可无)
        sheetHeader: [
          'ID',
          '订单状态',
          '订单号',
          '停车时长',
          '车牌号',
          '停车场名称',
          '总金额',
          '实付金额',
          '进场时间',
          '离场时间',
        ],
      },
    ];
    const toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel(); // 保存
  };
```
- sheetName sheet 名字(可有可无)(默认 sheet1)
- sheetHeader 标题（excel 第一行数据）
- columnWidths 列宽 非必须

```js
// number 屏幕宽度为100 20即为 1/5屏幕大小
columnWidths = [20, ""];
```
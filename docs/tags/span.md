---
title: element 合并单元格
date: 2023-02-23
categories: javaScript
tags:
 - js
 - element UI
---

## ElementUI el-table合并单元格-行合并

1. getSpanArr(data)方法 data就是我们从后台拿到的数据，通常是一个数组；
2. spanArr是一个空的数组，用于存放每一行记录的合并数；
3. pos是spanArr的索引。
如果是第一条记录（索引为0），向数组中加入１，并设置索引位置；
如果不是第一条记录，则判断它与前一条记录是否相等，
如果相等，则向spanArr中添入元素0，并将前一位元素＋１，表示合并行数＋１，
以此往复，得到所有行的合并数，0即表示该行不显示

```js
tableData: [],
spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
pos: 0, // spanArr 的索引

'span-method': o => this.tableSpanMethod(o)

getSpanArrFunc(data) {
            this.spanArr = [];
            let pos;
            /* eslint-disable*/
            for (let i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    pos = 0;
                } else if (
                    data[i].genname &&
                    data[i].genname === data[i - 1].genname && 
                    data[i].dosformName && data[i].dosformName === data[i - 1].dosformName
                ) {
                    this.spanArr[pos] += 1;
                    this.spanArr.push(0);
                } else {
                    this.spanArr.push(1);
                    pos = i;
                }
            }
        },
        tableSpanMethod({ rowIndex, column }) {
            if (column.property === 'genname' || column.property === 'dosformName' || column.property === 'computeTypeDesc') {
                const row = this.spanArr[rowIndex];
                const col = row > 0 ? 1 : 0;
                return {
                    rowspan: row,
                    colspan: col
                };
            }
            return {
                rowspan: 1,
                colspan: 1
            };
        },
```

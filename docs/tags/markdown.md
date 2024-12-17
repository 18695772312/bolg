---
title: markdown入门
date: 2021-02-21
categories: other
tags:
- other
- markdown
---
## 段落与换行
1. 段落的前后必须是空行：

空行指的是行内什么都没有，或者只有空白符（空格或制表符）

相邻两行文本，如果中间没有空行 会显示在一行中（换行符被转换为空格）

2. 如果需要在段落内加入换行（<br>）：

可以在前一行的末尾加入至少两个空格
然后换行写其它的文字

3. Markdown 中的多数区块都需要在两个空行之间。
   
## 标题
1. Setext 形式

``` 
H1
====

H2
----
= 和 - 的数量是没有限制的。通常的做法是使其和标题文本的长度相同，这样看起来比较舒服。或者可以像我一样，用四个 - 或 =。
Setext 形式只支持 h1 和 h2 两种标题。

```
H1
====

H2
----
2. atx 形式
   
```
① 可以用对称的 # 包括文本：
####H4####
#####H5#####
② 成对的 # 左侧和只在左边使用的 # 左侧都不可以有任何空白，但其内侧可以使用空白。
#### 内侧使用了空格
```
#### H4
##### H5
## 引用
1. 引用内容
```
>引用内容
```
>引用内容
2. 多行引用

```
> 多行引用
> 
> 可以在每行前加 `>`
```
> 多行引用
> 
> 可以在每行前加 `>`

3. 嵌套引用

```
>也可以在引用中
>>使用嵌套的引用
```
>也可以在引用中
>>使用嵌套的引用
## 列表
1. 无序列表

```
* 可以使用 `*` 作为标记
+ 也可以使用 `+`
- 或者 `-`
```
* 可以使用 `*` 作为标记
+ 也可以使用 `+`
- 或者 `-`
2. 有序列表

```
1. 有序列表以数字和 `.` 开始；
3. 数字的序列并不会影响生成的列表序列；
4. 但仍然推荐按照自然顺序（1.2.3...）编写。
```
1. 有序列表以数字和 `.` 开始；
3. 数字的序列并不会影响生成的列表序列；
4. 但仍然推荐按照自然顺序（1.2.3...）编写。
3. 嵌套的列表

```
1. 第一层
  + 1-1
  + 1-2
2. 无序列表和有序列表可以随意相互嵌套
  1. 2-1
  2. 2-2
```
1. 第一层
  + 1-1
  + 1-2
2. 无序列表和有序列表可以随意相互嵌套
  1. 2-1
  2. 2-2
## 分隔线
1. 可以在一行中使用三个或更多的 *、- 或 _ 来添加分隔线（<hr>）：

```
***
------
___
```
***
------
___
2. 多个字符之间可以有空格（空白符），但不能有其他字符：

```
* * *
- - -
```
* * *
- - -
## 超链接
① 普通链接：
```
[Google](http://www.google.com/)
```
[Google](http://www.google.com/)

② 指向本地文件的链接：
```
[icon.png](./images/icon.png)
```
[icon.png](./images/icon.png)

③ 包含 'title' 的链接:
```
[Google](http://www.google.com/ "Google")
```
[Google](http://www.google.com/ "Google")
## 自动链接
使用 <> 包括的 URL 或邮箱地址会被自动转换为超链接：
```
<http://www.google.com/>

<123@email.com>
```
<http://www.google.com/>

<123@email.com>
## 图像
1. 行内式

```
![GitHub](https://avatars2.githubusercontent.com/u/3265208?v=3&s=100 "GitHub,Social Coding")
方括号中的部分是图片的替代文本，括号中的 'title' 部分和链接一样，是可选的。
```
![GitHub](https://avatars2.githubusercontent.com/u/3265208?v=3&s=100 "GitHub,Social Coding")

2. 参考式

```
![GitHub][github]

[github]: https://avatars2.githubusercontent.com/u/3265208?v=3&s=100 "GitHub,Social Coding"
```
![GitHub][github]

[github]: https://avatars2.githubusercontent.com/u/3265208?v=3&s=100 "GitHub,Social Coding"

3. 指定图片的显示大小
```
<img src="https://avatars2.githubusercontent.com/u/3265208?v=3&s=100" alt="GitHub" title="GitHub,Social Coding" width="50" height="50" />
```
<img src="https://avatars2.githubusercontent.com/u/3265208?v=3&s=100" alt="GitHub" title="GitHub,Social Coding" width="50" height="50" />

## 强调
1. 使用 * * 或 _ _ 包括的文本会被转换为 <em></em> ，通常表现为斜体：


2. 使用 ** ** 或 __ __ 包括的文本会被转换为 <strong></strong>，通常表现为加粗：
3. 用来包括文本的 * 或 _ 内侧不能有空白，否则 * 和 _ 将不会被转换（不同的实现会有不同的表现）：
4. 如果需要在文本中显示成对的 * 或 _，可以在符号前加入 \ 即可：
5. *、**、_ 和 __ 都必须 成对使用 

```
这是用来 *演示* 的 _文本_
这是用来 **演示** 的 __文本__
这是用来 * 演示* 的 _文本 _
这是用来 \*演示\* 的 \_文本\_
```
这是用来 *演示* 的 _文本_
这是用来 **演示** 的 __文本__
这是用来 * 演示* 的 _文本 _
这是用来 \*演示\* 的 \_文本\_

## 删除线
```
这就是 ~~删除线~~
```
这就是 ~~删除线~~
## 表格
使用 | 来分隔不同的单元格，使用 - 来分隔表头和其他行：
```
name | age
---- | ---
LearnShare | 12
Mike |  32
```
name | age
---- | ---
LearnShare | 12
Mike |  32
---
title: php 使用mysql的增删改查
date: 2021-02-20
categories: other
tags:
- mysql
---

* *MySQL默认端口3306，默认账号密码都是root
* cmd(环境下的MySQL)，找到集成环境bin目录下有一个mysql.exe复制路径到cmd加mysql -u 账号 回车 输入密码，  
  - 输入show databases;   (查看所有数据库) 
  - use 数据库名 （用这个数据库）
  - show tables;(查看所有表)
  - **注意 mysql 系统数据库不能删**

##### sql时间日期格式

* datetime
* timestamp

#### char 定长  varchar 不定长

## 连接数据库

```php
$obj = new mysqli("127.0.0.1","root","root","数据库名");
if($obj->connect_errno == 0){
   echo '数据库连接成功';
   $obj->query("set names utf8");//设置查询编码格式
    $sql = "INSERT INTO cts_class (name,time) VALUES ($className,'2020-11-20 12:00:00')";
    $result = $obj->query($sql);//运行sql语句
    file_put_contents("sql.txt",$sql.PHP_EOL,FILE_APPEND);//PHP_EOL换行，FILE_APPEND追加
    
    $classList = !empty($result) && $result->num_rows>=0 ? $result->fetch_all(MYSQLI_ASSOC) : $result;//所有数据，返回二维数组
    $classList = !empty($result) && $result->num_rows>=0 ? $result->fetch_assoc() : $result;//单条 返回一维数组
}
```





## 封装数据库的增删改查

```php
class db{
    public $obj;
    public function __construct(){
        $this->obj = new mysqli("127.0.0.1","root","root","数据库名");
        if($this->obj->connect_errno == 0){
            $this->obj->query("set names utf8");
        }
    }
    public function saveLog($sql){
      file_put_contents("sql.txt",$sql.PHP_EOL,FILE_APPEND);//换行，追加
    }
    /**
     * 增
     */
    public function add($tableName,$fields,$values){
        $sql = "INSERT INTO $tableName ($fields) VALUES ($values)";
        $this->saveLog($sql);
        return $this->obj->query($sql);
    } 
    /**
     * 删
     */ 
    public function del($tableName,$where){
        if($where){
            $sql = "delete from $tableName where $where";
            $this->saveLog($sql);
            return $this->obj->query($sql);
        }else{
            return false;
        }
    } 
    /**
     * 查
     */
    public function all($tableName,$fields = "*",$where ='',$order='',$limit=''){
        $where = $where ? " where $where " : '';
        $order = $order ? " order by $order " : '';
        $limit = $limit ? " limit $limit " : '';
        
        $sql = "select $fields from $tableName $where $order $limit";
        $this->saveLog($sql);
        $result = $this->obj->query($sql);
        return !empty($result) && $result->num_rows >= 0 ? $result->fetch_all(MYSQLI_ASSOC) : $result;

    } 
    /**
     * 查1条
     */
    public function find($tableName,$fields = "*",$where ='',$order=''){
        $where = $where ? " where $where " : '';
        $order = $order ? " order by $order " : '';
        $sql = "select $fields from $tableName $where $order limit 1";
        $this->saveLog($sql);
        $result = $this->obj->query($sql);
        return !empty($result) && $result->num_rows >= 0 ? $result->fetch_assoc() : $result;

    } 
    /**
     * 改
     */
    public function edit($tableName,$set,$where){
        if($set && $where){
            $sql = "UPDATE  $tableName SET $set WHERE $where";
            $this->saveLog($sql);
            return $this->obj->query($sql);
        }else{
            return false;
        }
    }  
    
    /**
     * 多表
     */
    public function execSql($sql,$num = 0){
        $this->saveLog($sql);
        $result = $this->obj->query($sql);
        if($num){
            return !empty($result) && $result->num_rows >= 0 ? $result->fetch_assoc() : $result;
        } else{
            return !empty($result) && $result->num_rows >= 0 ? $result->fetch_all(MYSQLI_ASSOC) : $result;
        }
        

    } 
}
```


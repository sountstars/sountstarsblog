# Es6 新特性等

[[TOC]]

## let/const 变量

## 字符串模板

## 对象解构

## 新数据类型 Symbol

## 新数据结构Map/Set/WeakMap/WeakSet

## [Proxy](https://github.com/lukehoban/es6features#proxies)  [Reflect](https://www.cnblogs.com/zczhangcui/p/6486582.html)

## 扩展
+ 字符串填充（padStart 和 padEnd）
+ Array
    - Array.from()
    - Array.of()
    - Array.copyWithin()
    - Array.find()
    - Array.findIndex()
    - Array.fill()
    - Array.includes()
+ Object
  - Object.keys()
  - Object.values()
  - Object.entries()
  - Object.assign()
  - Object. is()

## 异步
+ Promise
    - Promise.prototype.then
    - Promise.prototype.catch
    - Promise.prototype.finally
    - Promise.all()
    - Promise.rece()
+ [Iterator](https://github.com/lukehoban/es6features#iterators--forof)
    - Iterator接口
    - for of
+ [Generator](https://github.com/lukehoban/es6features#generators)
    - yield*
+ async/await

## Class类
+ class
+ extends
+ decorator

## Module
+ import
+ export
```js
// export default 方式
import defaultName from 'modules.js';

// export type 方式
import { export1, export2 } from 'modules';
import { export1 as ex1, export2 as ex2 } from 'moduls.js'; // as 关键字
import * as moduleName from 'modules.js';

// 同时引入export default 和export type
import defaultName, { expoprt1, export2 } from 'modules';
import defaultName， * as moduleName from 'modules';

// 引入无输出模块
import 'modules';
```
 




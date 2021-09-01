# Deno

[[TOC]]

## Deno VS Node
|  | **Node** | **Deno** | 
| --| -- |
| API 引入方式 |  模块引入 | 全局对象| 
| 模块系统| CommonJS & 新版 node 实验性 ES Module | ES Module 浏览器实现|
| Typescript| 第三方，如通过 ts-node 支持 | 原生支持 | 
| 包管理 | npm + node_modules | 原生支持 | 
| 异步操作 | 回调 | Promise |
| 包分发 | 中心化 npmjs.com	| 去中心化 import url |
|入口 | package.json配置 | import url 直接引入 |
|打包、测试、格式 | 第三方eslint、gulp、webpack、babel | 原生支持 |

## 内置 API 引用方式不同
### node 模块导入
```js
//node 内置 API 通过模块导入的方式引用
const fs = require('fs');
fs.readFileSync("./data.txt");
```

### deno 全局对象
```js
//deno 则是一个全局对象 Deno 的属性和方法：
Deno.readFileSync("./data.txt");
```

## 模块系统
node 采用的是 CommonJS 规范，而 deno 则采用的是 ES Module 的浏览器实现

## 支持 Typescript


## deno 没有 node_modules,那么它是怎么进行包管理的呢？
```js
// index.js
 import {white, bgRed} from "https://deno.land/std/fmt/colors.ts";
 console.log(bgRed(white("hello,world")));

//  > deno run index.js
// Download https://deno.land/std/fmt/colors.ts
// Compile https://deno.land/std/fmt/colors.ts
// hello world!
```

### 每次都要执行下载吗？
只需要 再执行一次就明白了，不需要每次下载。

### 没网络了怎么办？





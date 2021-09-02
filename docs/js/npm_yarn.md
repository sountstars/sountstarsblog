#  npm & yarn  

[[TOC]]

## node升级
```js
1、window系统升级node就只有到node官网下载window安装包来覆盖之前的node
2、mac升级node版本
   npm i -g n 
   n 12.9.1 //指定版本升级
   n latest //安装最新版本
   n stable //安装最稳定的版本
```

## 升级包
```js
npm install -g npm-check    //安装全局的包
npm update <name> -g        //全部安装不建议用
npm update <name>           //单个安装
```

##yarn 切换源
```js
1、`查看一下当前源`
yarn config get registry
2、`切换为淘宝源`
yarn config set registry https://registry.npm.taobao.org
3、`或者切换为自带的`
yarn config set registry https://registry.yarnpkg.com
```

## npm 切换源
```js
1、`全局配置切换到淘宝源`
 npm config set registry https://registry.npm.taobao.org  
2、`检测是否切换到了淘宝源`
 npm info underscore
```

## 你必须知道的yarn
[yarn起源](https://code.fb.com/web/yarn-a-new-package-manager-for-javascript/)已经解释了为什么要创建一个新的javascript包管理器，这里笔者也推荐大家从npm切换为yarn。npm4就不说了，速度太慢了，npm5借鉴了很多yarn的机制，比如简单的版本锁、重写cache模块等，减少了与yarn的差距。但依然有些地方做的不如yarn,[这篇文章](https://jobs.stratsys.com/blog/posts/9244-npm5-vs-yarn-which-one-is-better)(opens new window)记录了npm5和yarn的实验对比，结论是：在没有缓存时，yarn和npm5速度差不多；在有缓存时，yarn比npm5快2倍。

###  yarn优势
+ `yarn 离线安装`。 下载的时候 Yarn 缓存了所有的包以至于不需要再次从网络下载
+ `yarn并行下载，使得时间更快`。 通过并行操作最大限度地提高资源利用率，以至于再次下载的时候安装时间比之前更快。npm5之前是等上一个安装完后再执行下一个，串行下载。
+ `yarn锁包yarn-lock，保证引用包正确。` yarn.lock 文件准确的锁定了所有被下载和项目依赖的包版本。通过这个文件，你能确定你的工程师团队的每一位成员都能安装准确的包，并且可以更容易的部署，而没有意外 bug出现。

### yarn指令
```js
* `yarn bin`, 打印出执行脚本的位置，可以被yarn run执行。相当于npm bin
* `yarn login/yarn publish` npm登录和发布。相当于npm login/npm publish
* `yarn cache clean`，清除缓存，相当于npm cache clean。
* `yarn list` 列出当前所有依赖的包
* `yarn config list` 显示所有配置设置
``` 

## 参考文章
[5 things you can do with Yarn](https://auth0.com/blog/five-things-you-can-do-with-yarn/)
[npm script 小书](https://juejin.cn/post/6844903887531409422)
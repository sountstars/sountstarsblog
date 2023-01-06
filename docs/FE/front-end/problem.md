# 遇到的问题

## 基础配置
1.  `子系统路由 base，值和qiankun的 activeRule`是否相同。如（activeRule:'/systeam/health'）(base:'/systeam/health/')
2.  qiankun配置registerMicroApps(apps, lifeCycles?)
3.  子项目配置新增 `public-path.js `文件，用于修改运行时的 publicPath
4.  在入口文件最顶部引入 public-path.js
5.  webpack 打包，允许开发环境跨域和 umd 打包
6.  子项目在qiankun环境中配置路由base 与 pblicPath



## You need to export the functional lifecycles in xxx entry
+  [抛出这个错误是因为无法从微应用的 entry js 中识别出其导出的生命周期钩子](https://qiankun.umijs.org/zh/faq#application-died-in-status-loading_source_code-you-need-to-export-the-functional-lifecycles-in-xxx-entry)


## 微应用加载的资源会 404？
+ webpack 加载资源时未使用正确的`publicPath`

## 微应用静态资源一定要支持跨域吗？
`是的`
+ qiankun 是通过 fetch 去获取微应用的引入的静态资源的，所以必须要求这些静态资源支持跨域
+ 是自己的脚本，可以通过开发服务端跨域来支持。如果是三方脚本且无法为其添加跨域头，可以将脚本拖到本地，由自己的服务器 serve 来支持跨域。

+ 参考：[Nginx 跨域配置](https://segmentfault.com/a/1190000012550346)
```js
location / {  
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    if ($request_method = 'OPTIONS') {
        return 204;
    }
} 
```

## 微应用之间如何跳转？ 
+ 主应用和微应用都是`hash`模式，主应用根据`hash`来判断微应用，则不用考虑这个问题
+ 根据`path`来判断微应用
    -   `history`模式的微应用之间的跳转，或者微应用跳主应用页面，直接使用微应用的路由实例是不行的，原因是微应用的路由实例跳转都基于路由的`base`
    -   `history.pushState()`
    -   主应用的路由实例通过`props`传给微应用，微应用这个路由实例跳转

## 子应用避免使用通配符配置
+ 子应用路由避免使用通配符

## vue-router的版本最好统一
多个版本 vue-router 会导致一些问题
+ 子路由会监听路由变化，然后发出重复的路由跳转，导致主路由被动的响应
+ 修改子路由的 vue-router ，在判断到不属于自己的路由变化时，阻止路由跳转行为
+ 低版本的 vue-router 在 pushState 的时候，会覆盖丢失主路由的 history.state，导致主路由跳转异常
+ 修改子路由的 vue-router ，在 pushState 的时候，把当前的 history.state 传递回去
[参考](https://github.com/umijs/qiankun/issues/1361)

## 子项目要支持https
+ `子项目要支持https访问`

## 复用公用依赖
[参考](https://github.com/umijs/qiankun/issues/627)
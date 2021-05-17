# Webpack的使用

[[TOC]]

## 优化
```js
1.异步加载模块
2.提取第三库
3.代码压缩
4.去除不必要的插件
5.图片base64
6.按需加载
7.开启Gzip压缩
```

## splitChunks拆包
+  Webpack4之SplitChunksPlugin
+  Webpack3的CommonsChunkPlugin（已废弃）
```js
```

## 定义全局变量(DefinePlugin)
```js
//eslint 设置通过
 "globals": {
     "ENV": true
 },
 new webpack.DefinePlugin({
     //必须 JSON.stringify()，然后在eslint里面，global()通过一下
    ENV: JSON.stringify(process.env.ENV), // 执行环境
}),
```

## webpack代理
+  webpack-dev-server
```js
//在配置文件webpackDevServer.config.js添加，
//新版本直接在package.json 里面添加，但是只能添加一个并且是字符串，也可在src下添加setupProxy.js

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy("/pic", {
            "target": "http://120.79.229.197:9000",
            "changeOrigin": true,
            "secure": false,
            "pathRewrite": {"^/pic": ""}
        })
    );
    app.use(
        proxy("/self", {
            "target": "http://localhost:9999",
            "changeOrigin": true,
            "secure": false,
            "pathRewrite": {"^/self": ""}
        })
    );
};
```

## .babelrc
```js
```

## .env
定义一些环境变量，可以通过process.env.[name]拿取出来
```js
```

## 优化输出的文件

## webpack对图片做了什了？（面试题）

## webpack用到的插件

## require.context是什么






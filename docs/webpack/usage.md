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
//新的版本已经支持在package.json里面直接修改
{{
   "presets": [
     [
     "@babel/preset-env", {
       "targets": {
         "chrome": 58,
         "ie": 11
       }
     }
   ], "react-app"],
   "plugins": [
     ["import", {
         "libraryName": "antd",
         "libraryDirectory": "es",
         "style": "css"
       }
     ],
     ["@babel/plugin-proposal-decorators", { "legacy": true }],  //用于转换装饰器代码的插件。
     [
       "@babel/plugin-transform-runtime",
       {
         "absoluteRuntime": false,
         "corejs": 2,
         "helpers": true,
         "regenerator": true,
         "useESModules": false
       }
     ]
   ],
   "env": {
     "production": {
       "plugins":  ["transform-remove-console"]
     }
   }
 }

```

## .env
定义一些环境变量，可以通过process.env.[name]拿取出来
```js
GENERATE_SOURCEMAP=false  //禁止输出.map文件
```

## 优化输出的文件
```js
/**
* hash:hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改
* 采用hash计算的话，每一次构建后生成的哈希值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要换另一种哈希值计算方式，即chunkhash。
*
* chunkhash:根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
* 我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
* 
* filename:决定了entry入口文件输出文件的名称。 (main.js)
* 
* chunkFilename:决定了非入口(non-entry) chunk 文件的名称,比如按需加载（异步）模块的时候 (组件打包的js)
*/
//js文件的输出
output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
},
//css文件的输出
miniCssExtractPluginOption: {
    filename: 'css/[name].[hash:8].css',
    chunkFilename: 'css/[name].[chunkhash:8].css'
},
//img文件的输出
imageUrlLoaderOption: {
    limit: 1024*50,
    name: 'static/images/[name].[hash:8].[ext]'
},
```


## webpack用到的插件

## require.context是什么






# Webpack配置详解

[[TOC]]


主要配置
```js
module.exports = {
    mode: 'development', // 模式配置,webpack4.0新增
    entry: '', // 入口文件
    output: {}, // 出口文件
    module: {
        rules: [/*loader setting*/]
    }, // 配置modules，包括loader
    plugins: [], // 对应的插件
    devServer: {}, // 开发服务器配置
    optimization: {}, // 最佳实践
    devtool: '',
    resolve: { alias: {}},
}
```

## mode

设置了 mode 之后会把 process.env.NODE_ENV 也设置为 development 或者 production。然后在 production 模式下，会默认开启 UglifyJsPlugin 等一堆插件。
```js
 mode :development || production
```

## entry & output
```js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js', './src/login.js'],
    // 2.真正实现多入口和多出口需要写成对象的方式
    entry: {
        index: path.resolve(__dirname,'./src/index.js'),
        login: path.resolve(__dirname,'./src/login.js')
    },
    output: {
        // 1. filename: 'bundle.js', 'bundle.[hash:4].js',   
        // 2. [name]就可以将出口文件名和入口文件名一一对应
        filename: '[name].[hash:8].js',      // 打包后会生成index.313eerrd.js和login.dsfcersx.js文件
        path: path.resolve(__dirname,'../dist')   //打包后的目录
    },
     plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./public/index.html'),   // 用哪个html作为模板 , react一般在在src目录下public里创建一个index.html页面当做模板来用
            filename: 'index.html', //  要打包输出的文件名
            chunks: ['manifest','index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./public/login.html'),
            filename: 'login.html', 
            chunks: ['manifest','login']   // 对应关系,login.js对应的是login.html
        })
    ]
}

```

## mudule - rules 
必须使用rules。rules 配置模块的读取和解析规则， 通常用来配置loader， 其类型是一个数组， 数组里每一项都描述了如何去处理部分文件

+  配置一项rules大致通过以下方式：
+    条件匹配： 通过test、include、exclude三个配置来命中Loader要应用的规则文件。(三个配置都可以是正则，也支持数组)
+    应用规则： 对选中后的文件通过use配置项来应用loader，可以应用一个loader或者按照从后往前的顺序应用一组loader。同时还可以分别给loader传入参数。
+    重置顺序： 一组loader的执行顺序默认是从右到左执行，通过exforce选项可以让其中一个loader的执行顺序放到最前或者是最后。
```js
module.exports = {
   //...
   module: {
       rules: [
           {
               test: /\.css$/,     // 解析css
               exclude: /node_modules/,
               use: ['style-loader', 'css-loader'] // 从右向左解析
               /* 
                   也可以这样写，这种方式方便写一些配置参数
                   use: [
                       {loader: 'style-loader'},
                       {
                           loader: require.resolve('postcss-loader'),   //这里是加上浏览器的前缀
                           options: {
                               ident: 'postcss',
                               plugins: () => [
                                   require('postcss-flexbugs-fixes'), //修复Flexbugs
                                   require('postcss-preset-env')({ //postcss-preset-env包括autoprefixer
                                       autoprefixer: {
                                           flexbox: 'no-2009',
                                       },
                                       stage: 3,
                                   }),
                               ]
                           },
                      }
                   ]
               */
           }
       ]
   }
}
```

## optimization
根据mode（production/development）的不同，配置项默认值不同，具体有以下：

+ **optimization.minimize：** 是否自动压缩打包后的代码。mode = production时，为true。 压缩默认使用terser-webpack-plugin插件(更加兼容ES6)，如果想要使用别的压缩插件，可以使用```optimization.minimizer```设置。


```js
```

## plugins
```js
//常用
HtmlWebpackPlugin 自动在html中加载打包后的js文件
DLLPlugin/DllReferencePlugin 提高打包速度
    DLLPlugin：创建一个只有dll的bundle
    DllReferencePlugin： 打包生成的dll文件引用到需要的预编译依赖上来
happyPack 多进程打包，加快打包速度。
webpack.DefinePlugin webpack4设置mode会自动使用
uglifyjs-webpack-plugin webpack4 mode = production默认使用
WebpackBar
webpack-bundle-analyzer
clean-webpack-plugin 清除dist文件夹里会残留上次打包的文件

```

## devServer
devServer配置基于webpack-dev-server集成的插件。该插件提供了proxy代理配置，基于express中间件 http-proxy-middleware实现，该中间件又基于node http-proxy
```js
devServer: {
    // 提供静态文件目录地址
    // 基于express.static实现
    contentBase: path.join(__dirname, 'dist'),
    // 任意的 404 响应都被替代为 index.html
    // 基于node connect-history-api-fallback包实现
    historyApiFallback: true,
    // 是否一切服务都启用 gzip 压缩
    // 基于node compression包实现
    compress: true,
    // 是否隐藏bundle信息
    noInfo: true,
    // 发生错误是否覆盖在页面上
    overlay: true,
    // 是否开启热加载
    // 必须搭配webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
    // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
    hot: true,
    // 热加载模式
    // true代表inline模式，false代表iframe模式
    inline: true, // 默认是true
    // 是否自动打开
    open: true,
    // 设置本地url和端口号
    host: 'localhost',
    port: 8080,
    // 代理
    // 基于node http-proxy-middleware包实现
    proxy: {
        // 匹配api前缀时，则代理到3001端口
        // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
        // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3001
        '/api': 'http://localhost:3001',
        // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
        // 主要解决跨域问题
        changeOrigin: true,
        // 针对代理https
        secure: false,
        // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
        pathRewrite: {'^/api' : ''}
    }
}
```
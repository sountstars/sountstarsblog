# Babel-polyfill

[[TOC]]

### @babel/preset-env, @babel/polyfill和@babel/plugin-transform-runtime
这可以说是babel官方的得意之作，最早的时候没有这个包，有的是babel-preset-es2015这样的包，后来每次新标准发布之后，就要新加一个包。
babel顺应民意，发布了babel-preset-env这个包，它一次性囊括了已发布的所有标准包。
首先我们需要明确一下，preset-env的首要作用，不是帮我们把ES6+代码转成ES5.它的首要作用是认读ES6+代码。
在使用preset-env之前，babel是无法认识ES6+代码的，运行时会报Token错误。在使用preset-env之后，babel才能认识这些代码语法，并将它们抽象出AST树。
preset-env本身包含了一大堆plugin，并通过配置来控制插件，从而控制转码效果
```js
```

### polyfill
babel 编译时只转换语法，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM里面不兼容的API
比如 Promise,Set,Symbol,Array.from,Array.is,async 等等的一些API
这时候就需要 polyfill 来转转化这些API
babel 转译语法需要一些plugin
如babel-preset-es2015,stage-0,stage-1等等
其中的 es2015 表示 babel会加载 es6 相关的编译模块，然后 stage-0 表示的是什么呢？
stage 系列集合了一些对 es7 的草案支持的插件，由于是草案，所以作为插件的形式提供。
```js
stage-0 - Strawman: just an idea, possible Babel plugin.
stage-1 - Proposal: this is worth working on.
stage-2 - Draft: initial spec.
stage-3 - Candidate: complete spec and initial browser implementations.
stage-4 - Finished: will be added to the next yearly release.
```

polyfill 有三种：
babel-runtime
babel-plugin-transform-runtime(推荐-默认依赖于babel-runtime)
babel-polyfill

在webpack中，babel-plugin-transform-runtime 实际上是依赖babel-runtime
因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，
这些polyfill包就是在babel-runtime这个包里 core-js 、regenerator等 polyfill。
babel-runtime和 babel-plugin-transform-runtime的区别是，相当一前者是手动挡而后者是自动挡，每当要转译一个api时都要手动加上require('babel-runtime')，
而babel-plugin-transform-runtime会由工具自动添加，主要的功能是为api提供沙箱的垫片方案，不会污染全局的api，因此适合用在第三方的开发产品中。


### babel7中 corejs 和 corejs2 的区别
最近在给项目升级babel7，有一些改变但是变化不大,在升级中发现 babel7 变化挺大的，包括插件和包。 其中一项功能特别赞，就是 @babel/preset-env 中的 useBuiltIns 选项，如果你设置了 usage ，babel 编绎的时候就不用整个 polyfills , 只加载你使用 polyfills，这样就可以减少包的大小。 在使用 babel 中还想减少代码，就需要引入 babel 的运行时：



runtime转换器插件主要做了三件事：
```js
当你使用generators/async方法、函数时自动调用babel-runtime/regenerator
当你使用ES6 的Map或者内置的东西时自动调用babel-runtime/core-js
移除内联babel helpers并替换使用babel-runtime/helpers来替换


transform-runtime优点
    不会污染全局变量
    多次使用只会打包一次
    依赖统一按需引入,无重复引入,无多余引入

transform-runtime缺点
   不支持实例化的方法Array.includes(x) 就不能转化
   如果使用的API用的次数不是很多，那么transform-runtime 引入polyfill的包会比不是transform-runtime时大

babel-polyfill则是通过改写全局prototype的方式实现，比较适合单独运行的项目。
    开启babel-polyfill的方式，可以直接在代码中require，或者在webpack的entry中添加，也可以在babel的env中设置useBuildins为true来开启。
    但是babel-polyfill会有近100K，
    打包后代码冗余量比较大，
    对于现代的浏览器,有些不需要polyfill，造成流量浪费
    污染了全局对象

@babel/runtime-corejs2包含三个文件夹：
    core-js  引用core-js这个npm包
    helpers  定义了一些处理新的语法关键字的帮助函数
    regenerator  仅仅是引用regenerator-runtime这个npm包
```


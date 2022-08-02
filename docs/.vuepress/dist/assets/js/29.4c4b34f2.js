(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{421:function(t,s,a){"use strict";a.r(s);var n=a(46),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"deno"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deno"}},[t._v("#")]),t._v(" Deno")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#deno-vs-node"}},[t._v("Deno VS Node")])]),a("li",[a("a",{attrs:{href:"#内置-api-引用方式不同"}},[t._v("内置 API 引用方式不同")]),a("ul",[a("li",[a("a",{attrs:{href:"#node-模块导入"}},[t._v("node 模块导入")])]),a("li",[a("a",{attrs:{href:"#deno-全局对象"}},[t._v("deno 全局对象")])])])]),a("li",[a("a",{attrs:{href:"#模块系统"}},[t._v("模块系统")])]),a("li",[a("a",{attrs:{href:"#支持-typescript"}},[t._v("支持 Typescript")])]),a("li",[a("a",{attrs:{href:"#deno-没有-node-modules-那么它是怎么进行包管理的呢"}},[t._v("deno 没有 node_modules,那么它是怎么进行包管理的呢？")]),a("ul",[a("li",[a("a",{attrs:{href:"#每次都要执行下载吗"}},[t._v("每次都要执行下载吗？")])]),a("li",[a("a",{attrs:{href:"#没网络了怎么办"}},[t._v("没网络了怎么办？")])])])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"deno-vs-node"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deno-vs-node"}},[t._v("#")]),t._v(" Deno VS Node")]),t._v(" "),a("p",[t._v("|  | "),a("strong",[t._v("Node")]),t._v(" | "),a("strong",[t._v("Deno")]),t._v(" |\n| --| -- |\n| API 引入方式 |  模块引入 | 全局对象|\n| 模块系统| CommonJS & 新版 node 实验性 ES Module | ES Module 浏览器实现|\n| Typescript| 第三方，如通过 ts-node 支持 | 原生支持 |\n| 包管理 | npm + node_modules | 原生支持 |\n| 异步操作 | 回调 | Promise |\n| 包分发 | 中心化 npmjs.com\t| 去中心化 import url |\n|入口 | package.json配置 | import url 直接引入 |\n|打包、测试、格式 | 第三方eslint、gulp、webpack、babel | 原生支持 |")]),t._v(" "),a("h2",{attrs:{id:"内置-api-引用方式不同"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#内置-api-引用方式不同"}},[t._v("#")]),t._v(" 内置 API 引用方式不同")]),t._v(" "),a("h3",{attrs:{id:"node-模块导入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-模块导入"}},[t._v("#")]),t._v(" node 模块导入")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//node 内置 API 通过模块导入的方式引用")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fs "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nfs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("readFileSync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./data.txt"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"deno-全局对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deno-全局对象"}},[t._v("#")]),t._v(" deno 全局对象")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//deno 则是一个全局对象 Deno 的属性和方法：")]),t._v("\nDeno"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("readFileSync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./data.txt"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"模块系统"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块系统"}},[t._v("#")]),t._v(" 模块系统")]),t._v(" "),a("p",[t._v("node 采用的是 CommonJS 规范，而 deno 则采用的是 ES Module 的浏览器实现")]),t._v(" "),a("h2",{attrs:{id:"支持-typescript"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#支持-typescript"}},[t._v("#")]),t._v(" 支持 Typescript")]),t._v(" "),a("h2",{attrs:{id:"deno-没有-node-modules-那么它是怎么进行包管理的呢"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deno-没有-node-modules-那么它是怎么进行包管理的呢"}},[t._v("#")]),t._v(" deno 没有 node_modules,那么它是怎么进行包管理的呢？")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("white"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" bgRed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://deno.land/std/fmt/colors.ts"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bgRed")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("white")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello,world"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  > deno run index.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Download https://deno.land/std/fmt/colors.ts")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Compile https://deno.land/std/fmt/colors.ts")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// hello world!")]),t._v("\n")])])]),a("h3",{attrs:{id:"每次都要执行下载吗"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#每次都要执行下载吗"}},[t._v("#")]),t._v(" 每次都要执行下载吗？")]),t._v(" "),a("p",[t._v("只需要 再执行一次就明白了，不需要每次下载。")]),t._v(" "),a("h3",{attrs:{id:"没网络了怎么办"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#没网络了怎么办"}},[t._v("#")]),t._v(" 没网络了怎么办？")])])}),[],!1,null,null,null);s.default=e.exports}}]);
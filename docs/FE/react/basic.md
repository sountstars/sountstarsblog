# react基本用法

[[TOC]]


## 路由传递参数
```js
<Link to={{
        pathname:"/",
        search:"?lx=1",
        hash:"#AA",
        state: {id: id} 
    }} exact >
     首页
 </Link>
```
1.问号传参 基于location来完成处理 let {data, location: {search}} = this.props

2.地址栏传参基于match的params来完成处理 let {data, match: {params}} = this.prop

3.Link传参 循环进来的，此参数传参在浏览器看不见 let {data, location: {state}} = this.propsÎ



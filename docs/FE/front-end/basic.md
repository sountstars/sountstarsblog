# 微前端

[[TOC]]

## 微前端

1.问号传参 基于 location 来完成处理**let {data, location: {`search`}} = this.props**

```js
<Route path='/frame' component={Frame} />
<NavLink  to='/frame?name=yydbb' >
```

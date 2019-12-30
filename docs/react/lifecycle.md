# 生命周期

[[TOC]]


## 挂载阶段
```js
omponentWillMount()
在组件挂载之前调用，且全局只调用一次

componentDidMount()
在组件挂载完成后调用，且全局只调用一次。
可以在这里使用refs，获取真实dom元素
```

## 更新阶段
```js
react组件更新机制
setState引起的state更新或父组件重新render引起的props更新
更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render

componentWillReceiveProps(nextProps )

```




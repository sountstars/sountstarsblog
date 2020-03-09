# 事件委托（事件流）

[[TOC]]

## 事件流
```js
事件流描述的是从页面中接受事件的顺序
1.捕获阶段
2.目标阶段
3.冒泡阶段

stopPropagation
  event.stopPropagation();  这是Event对象的一个方法，用来阻止事件进一步传播。
使用了stopPropagation()之后，事件就不能进一步传播了，即使是在div上，捕获和冒泡被认为是两个步骤，
所以在捕获阶段传播被阻止时同节点上的冒泡也不会触发。

stopImmediatePropagation
这是Event对象的一个方法，一旦调用这个方法，则该元素上未触发的监听都不会被触发，事件也不会进一步传播。

```

## addEventListener
```js
target.addEventListener(type, listener[, options]);  第三个参数类型支持object


```

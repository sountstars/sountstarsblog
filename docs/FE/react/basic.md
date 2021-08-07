# react基本用法

[[TOC]]


## 路由传递参数
1.问号传参 基于location来完成处理 let {data, location: {search}} = this.props  qqq
```js
<Route path='/frame' component={Frame} />
<NavLink  to='/frame?name=yydbb' >    
```

2.地址栏传参基于match的params来完成处理 let {data, match: {params}} = this.prop
```js
<Route path='/home/:id' component={Home} />
<NavLink  to='/home/1' >     
//props取值
props.match.params.id
```

3.地址栏不可见，刷新不存在  let {data, location: {state}} = this.props
```js
<Route path='/note' component={Note} />
<NavLink className="right-link" to={{pathname:'/note',state:{id:12}}}  />           
```


## children
通过 JSX 嵌套，将任意组件作为子组件传递给它们
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
    </FancyBorder>
  );
}
```

## PropTypes
```js
//JavaScript 是弱类型语言，所以请尽量声明 propTypes 对 props 进行校验，以减少不必要的问题
import PropTypes from "prop-types"
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.any
PropTypes.shape
```

## 缓存路由
```js
```

<!-- ## 获取实际的DOM
```js
ReactDOM.findDOMNode(this.sildeWrapper).clientWidth;   //废弃  改用ref
``` -->

## 添加DOM
```js
<div dangerouslySetInnerHTML={{__html: '<p>123</p>'}} />
```

## createPortal
适用 `toast，通知，警告 ` 等
```js
//第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
//第二个参数（container）/是一个 DOM 元素。
ReactDOM.createPortal(child, container)
```
## StrictMode
```js
```

## Error Boundaries
`错误边界`是一种React组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。 错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

**static getDerivedStateFromError(error)**

当后代组件抛出错误时，首先会调用这个方法，并将抛出的错误作为参数。无论这个方法返回什么值，都将用于更新组件的状态。

在后代组件抛出错误之后，也会调用**componentDidCatch**方法除了抛出的错误之外，还会有另一个参数，这个参数包含了有关错误的更多信息
+ getDerivedStateFromError是在reconciliation阶段触发，所以getDerivedStateFromError进行捕获错误后进行组件的状态变更，不允许出现副作用。
+ componentDidCatch因为在commit阶段，因此允许执行副作用。 它应该用于记录错误之类的情况

::: warning
**注意**
错误边界无法捕获以下场景中产生的错误：
+ 事件处理（了解更多）
+ 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
+ 服务端渲染
+ 它自身抛出来的错误（并非它的子组件）

** 只有 class 组件才可以成为错误边界组件 **
自React16起，任何未被错误边界捕获的错误将会导致整个React组件树被卸载。
错误边界的`粒度`由你来决定，可以将其包装在`最顶层的路由`组件并为用户展示一个 “Something went wrong” 的错误信息， 就像服务端框架经常处理崩溃一样。 你也可以将`单独的部件`包装在错误边界以保护应用其他部分不崩溃。
::: 
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```
## ref(非受控)
```js
```



## import()
```js
```

## React.lazy
```js
```




# react基本用法

[[TOC]]


## 路由传递参数
1.问号传参 基于location来完成处理**let {data, location: {`search`}} = this.props**
```js
<Route path='/frame' component={Frame} />
<NavLink  to='/frame?name=yydbb' >    
```

2.地址栏传参基于match的params来完成处理**let {data, match: {`params`}} = this.prop**
```js
<Route path='/home/:id' component={Home} />
<NavLink  to='/home/1' >     
//props取值
props.match.params.id
```

3.地址栏不可见，刷新不存在**let {data, location: {state}} = this.props**  
**state 传参的方式只`支持Browserrouter`路由，不支持hashrouter**
```js
<Route path='/note' component={Note} />
<NavLink className="right-link" to={{pathname:'/note',state:{id:12}}}  />           
```

4.地址栏不可见，query传参(刷新页面后参数消失)

## 发起 AJAX 请求
应当将AJAX 请求放到`componentDidMount`函数中执行  
+ componentsDidMount里面请求数据此时dom已经渲染上去，从用户友好角度来讲，我们更愿意让用户先看到一个没有数据的方式，再通过一个spin的动画，来加载数据;componentsWillMount里面请求数据，拿到数据之后setState的时机是不确定的，可能是render之前，也可能是render之后，并不是下一个时间段，这依赖于ajax的返回时间，所以不能准时的出现loading图，所以说会出现较长白屏的现象. 
+ React16 调和`算法Fiber`会通过开始或停止渲染的方式优化应用性能，其会影响到`componentWillMount的触发次数`。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount

## PropTypes
`JavaScript 是弱类型语言，所以请尽量声明 propTypes 对 props 进行校验，以减少不必要的问题。`
+ PropTypes.array
+ PropTypes.bool
+ PropTypes.func
+ PropTypes.number
+ PropTypes.object
+ PropTypes.string
+ PropTypes.any
+ PropTypes.shape
```js
import PropTypes from "prop-types"

static defaultProps = {
    a: 0,
    b: 0,
};
static propTypes = {
    a: PropTypes.number,
    b: PropTypes.number,
    store: PropTypes.shape({
           subscribe: PropTypes.func.isRequired,
           dispatch: PropTypes.func.isRequired,
           getState: PropTypes.func.isRequired
    }),
    data: PropTypes.array.isRequired//必须有
};
```
[参考链接](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html)



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

## 缓存路由
[参考文章](https://www.cnblogs.com/aloneMing/p/12849859.html)

## 获取实际的DOM
```js
ReactDOM.findDOMNode(this.sildeWrapper).clientWidth;   //废弃  改用ref
```

## 添加DOM
```js
<div dangerouslySetInnerHTML={{__html: '<p>123</p>'}} />
```

## createPortal
Portals提供了一种脱离#app的组件。  
适用 `toast，通知，警告 ` 等
```js
//第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
//第二个参数（container）/是一个 DOM 元素。
ReactDOM.createPortal(child, container)
```
## StrictMode
开发模式会调用多次

StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告
```js
import React from "react";
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
**StrictMode 目前有助于：**
+ 识别不安全的生命周期
+ 关于使用过时字符串 ref API 的警告（React.createRef();）
+ 关于使用废弃的 findDOMNode 方法的警告（貌似没有）
+ 检测遗留 context API
+ 检测意外的副作用

react 在检测意外的副作用时可能重复调用某些生命周期方法、hooks 或者 render 方法，其包括：

class 组件的 constructor，render 以及 shouldComponentUpdate 方法 class 组件的生命周期方法 getDerivedStateFromProps 函数组件 状态更新函数 (即 setState 的第一个参数） 函数组件中 useState，useMemo 或者 useReducer 中的函数 当 React 发现在重复调用这些方法时出现了内存泄漏、无限循环或者其他奇怪的表现时会在控制台输出错误，以供程序员快速定位错误。

简单来说就是我们在使用`hooks或者在某些生命周期函数中不应该使用有副作用的代码`。在开发模式的 StrictMode 下，React 会帮助我们发现这些不好的代码并给予提示。

StrictMode 的这个重复调用的特性只使用于开发模式，在生产模式下不会触发多次调用

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

**只有 class 组件才可以成为错误边界组件**  
自React16起，任何未被错误边界捕获的错误将会导致整个React组件树被卸载。  
**错误边界的`粒度`由你来决定，可以将其包装在`最顶层的路由`组件并为用户展示一个 “Something went wrong” 的错误信息， 就像服务端框架经常处理崩溃一样。 你也可以将`单独的部件`包装在错误边界以保护应用其他部分不崩溃。**
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
React的ref有4种用法：
+ 字符串(已废弃)
通过this.refs[refName]来引用真实的dom节点
```js
<input ref="inputRef" /> //this.refs['inputRef']来访问
```
+ 回调函数
函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问
```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
+ **React.createRef()**
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
+ Hooks useRef() 
```js
const Example = () => {
    let inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <input type="text" ref={inputRef}/>
    )
};
```




## Code Splitting
**import()**
适用于函数
```js
//add.js
export const sum = (a, b) => a + b;

//index.js
import React from 'react';
function Index() {
    const handleClick = async () => {
        const {sum} = await import('./add');
        console.log(sum(1, 2));
    };
    return (
        <button onClick={handleClick}>点击</button>
    );
}
export default Index;
```

**React.lazy**
适用于组件 目前不支持服务端渲染
```js
const Foo = React.lazy(() => import('../components/Foo'));
render() {
    return (
            <Suspense fallback={<div>loading...</div>}>
                <Foo/>
            </Suspense>
        )
}
```
`React.lazy 目前只支持默认导出（default exports)`你可以创建一个中间模块，来重新导出为默认模块
```js
//a.jsx
export const A = /* ... */;
export const B = /* ... */;
//middle.js
export { A as default } from "./a";   //A就相当于默认导出
//index.jsx
import React, { lazy } from 'react';
const A = lazy(() => import("./middle"));

<Suspense fallback={<div>loading...</div>}>
    <A/>
</Suspense>
```




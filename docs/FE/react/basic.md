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

## import()
```js
```

## React.lazy
```js
```




# Route原理

[[TOC]]

## react-router 和 react-router-dom区别
+ react-router是浏览器和原生应用的通用部分。
+ react-router-dom是用于浏览器的。
+ react-router-native是用于原生应用的。
+ react-router-native是用于原生应用的。

## react-router的基本原理
实现`URL与UI`界面的同步。其中在`react-router`中，`URL对应Location`对象，而`UI是由react components`来决定的，这样就转变成`location与components`之间的同步问题.

`react-router `还用到了 `history` 库，这个库主要是对 `hash `路由、`history` 路由、`memory`路由的封装

**示例：**
```js
const App=()=> {
  let [UI, setUI] = useState('Login');
  let onClickLogin = () => {
    setUI('Login')
  }
  let onClickRegister = () => {
    setUI('Register') 
  }
  let showUI = () => {
    switch(UI) {
      case 'Login':
        return <Login/>
      case 'Register':
        return <Register/>
    }
  }
  return (
    <div className="App">
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
      <div>
          {showUI()}
      </div>
    </div>
  );
}
```

## 使用 hash 来切换
希望看到的是,不同 url -> 不同页面 -> 不同组件
```js
onst App=()=> {
  // 进入页面时，先初始化当前 url 对应的组件名
  let hash = window.location.hash
  let initUI = hash === '#login' ? 'login' : 'register'

  let [UI, setUI] = useState(initUI);
  let onClickLogin = () => {
    setUI('login')
    window.location.hash = 'login'
  }
  let onClickRegister = () => {
    setUI('register') 
    window.location.hash = 'register'
  }
  let showUI = () => {
    switch(UI) {
      case 'login':
        return <Login/>
      case 'register':
        return <Register/>
    }
  }
  return (
    <div className="App">
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
      <div>
          {showUI()}
      </div>
    </div>
  );
}
```

## 使用 history 切换
幸运的是`H5`提供了一个好用的`history`API，使用`window.history.pushState()`使得我们即可以修改`url`也可以不刷新页面，一举两得。
需要注意的是调用`history.pushState()或history.replaceState()不会触发popstate`事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）
```js
const App=()=> {
  // 进入页面时，先初始化当前 url 对应的组件名
  let pathname = window.location.pathname
  let initUI = pathname === '/login' ? 'login' : 'register'

  let [UI, setUI] = useState(initUI);
  let onClickLogin = () => {
    setUI('login')
    window.history.pushState(null, '', '/login')
  }
  let onClickRegister = () => {
    setUI('register') 
    window.history.pushState(null, '', '/register')
  }
  let showUI = () => {
    switch(UI) {
      case 'login':
        return <Login/>
      case 'register':
        return <Register/>
    }
  }
  return (
    <div className="App">
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
      <div>
          {showUI()}
      </div>
    </div>
  );
}
```
一个`Router`就已经被我们实现了。这就是` Vue Router 和 React Router `的思想，他们是基于此来开发更多的功能而已。

## react-router使用
+ `BrowserRouter`这是对Router接口的实现。使得页面和浏览器的history保持一致。如：window.location。
+ `HashRouter` 和上面的一样，只是使用的是url的hash部分，比如：window.location.hash。
### Route
+ `path`属性，字符串类型，它的值就是用来匹配url的。
+ `component`属性，它的值是一个组件。在path匹配成功之后会绘制这个组件。
+ `exact`属性，这个属性用来指明这个路由是不是排他的匹配。
+ `render`属性，一个返回React组件的方法。传说中的rencer-prop就是从这里来的。

### Redirect
重定向路由：from 是从哪个组件来，to 表示要定向到哪里。
```js
<Redirect from={'/'} exact to={'/home/index'}/>;
```

### exact
react路由会匹配到所有能匹配到的路由组件，exact能够使得路由的匹配更严格一些。
```js
<Route path='/' component={Home} />
<Route path='/page' component={Page}>
//这种情况下，如果匹配路由path='/page'，那么会把Home也会展示出来。
//既路由path='/page'会匹配路由path='/'和路由path='/page'
```

### Switch
Switch 只会渲染第一次匹配的路由，为了防止书写顺序要配合exact一块使用

### Link组件后路由系统中到底发生了哪些变化
`Link`组件最终会渲染为`HTML`标签 `<a>`，它的`to、query、hash`属性会被组合在一起并渲染为`href`属性。虽然`Link`被渲染为超链接，但在内部实现上使用脚本`拦截了浏览器的默认行为`，然后调用了`history.pushState`方法.
```js
<Link to={{
  pathname: '/me',
  search: '?sort=asc',
  hash: '#hash',
  state: { fromHome: true }
}} />
```

## hash模式和history模式的区别
+ hash虽然出现在URL中，但`不会被包括在HTTP请求中`，对后端完全没有影响，因此改变hash不会重新加载页面;history会
+ pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
+ pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中
+ history模式需要后端配合将所有访问都重定向到index.html，否则用户刷新页面，会导致404错误

**原生基于发布订阅实现**
**HASH**
```js
class Router {
    constructor(){
        this.routers = []  //存放我们的路由配置
    }
    add(route,callback){
        this.routers.push({
            path:route,
            render:callback
        })
    }
    listen(callback){
        window.onhashchange = this.hashChange(callback);   //监听onhashchange方法
        this.hashChange(callback)()  //首次进入页面的时候没有触发hashchange，必须要就单独调用一下
    }
    hashChange(callback){
        let self = this
        return function () {
            let hash = location.hash
            console.log(hash)
            for(let i=0;i<self.routers.length;i++){
                let route = self.routers[i]
                if(hash===route.path){
                    callback(route.render())
                    return
                }
            }
        }
    }
}
//使用
let router = new Router()
router.add('#index',()=>{
    return '<h1>这是首页内容</h1>'
})
router.add('#news',()=>{
    return  '<h1>这是新闻内容</h1>'
})
router.listen((renderHtml)=>{
    let app = document.getElementById('app')
    app.innerHTML = renderHtml
})
```
**HISTORY**
```js
renderHtml(path){
    for(let i=0;i<this.routers.length;i++){
        let route = this.routers[i]
        if(path===route.path){
            callback(route.render())
            return
        }
    }
}

window.onpopstate = ()=>{} //检测前进后退
//点击跳转，在react找那个用的合成的方法，每次执行this.props.history.push(）等，都会执行pushState的方法
pushState(path,data={}){
    window.history.pushState(data,'',path)
    this.renderHtml(path)
}
```
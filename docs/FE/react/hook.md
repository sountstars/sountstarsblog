# hooks 16.8版本后

[[TOC]]

## 基础Hook 

### useState
```js
const [state, setState] = useState(initialState);
```

### useEffect
useEffect相当于 
componentDidMount，
componentDidUpdate,
componentWillUnmount这三个生命周期函数的`组合`
```js
useEffect(()=>{},[依赖项])
//第一个参数是一个回调函数，第二个参数是一个数组，这个数组中的元素都是依赖，每当依赖发生改变，就会触发第一个函数的执行
```


### useContext
React16中更新了Context API，Context主要用于爷孙组件的传值问题，新的Context API使用订阅发布者模式方式实现在爷孙组件中传值

React Hooks出现之后也对Context API出了响应的Hook useContext。同样也是解传值的问题

```js
const stateContext = createContext('default');

//父组件
<stateContext.Provider
    value={"Hello React"}
>
    <ContextComponent/>
</stateContext.Provider>
//子组件 
const ContextComponent = () => {
    const value = useContext(stateContext);
    return (
        <>
            <h1>{value}</h1>
        </>
    );
}
```
## 额外Hook 

### useReducer
更好的管理状态state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state等。 
使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
::: warning
React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。
::: 

`第三个参数(惰性初始化)`
useReducer的第三个参数接受一个函数作为参数，并把第二个参数当作函数的参数执行。主要作用是初始值的惰性求值，把一些对状态的逻辑抽离出来，有利于重置state。
```js
const initialState = {count: 0};
function init(s) {
    console.log(s);
    return {...s};
}
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}
function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState, init);
    return (
        <Fragment>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'reset', payload: initialState})}>重置</button>
        </Fragment>
    );
}
```

### useCallback
返回一个[memoized](https://en.wikipedia.org/wiki/Memoization)回调函数  
该回调函数仅在某个`依赖项改变`时才会更新

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```


### useMemo
返回一个`memoized`值。

useMemo和useCallback很像，唯一不同的就是

公用的方法用useCallback,若是直接渲染值则用useMemo，用useCallback的话也是每次都要执行的，但是useMemo是直接把值记忆存储了（前面的都是废话，其实都能实现，不过这样更符合习惯）
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### useRef
useRef返回一个`可变的ref对象`，其.current 属性被初始化为传入的参数（initialValue）。返回的ref对象在组件的整个生命周期内`保持不变`。
```js
const refContainer = useRef(initialValue);
```


### useImperativeHandle
useImperativeHandle可以让你在`使用ref时自定义暴露给父组件`的实例值。  
应当避免使用ref这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
```js
//渲染<FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
### useLayoutEffect
在`所有的DOM变更之后`同步调用 effect。可以使用它来读取DOM布局并同步触发重渲染。  
在`浏览器执行绘制之前`，useLayoutEffect 内部的更新计划将被同步刷新。


### useDebugValue
可用于在 React `开发者工具中显示自定义 hook 的标签`。  

暂时没用到过这个api
```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

# hooks

[[TOC]]

## useContext
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

## useReducer
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

## useCallback


## useMemo
```js
返回一个memoized值。

useMemo和useCallback很像，唯一不同的就是

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

公用的方法用useCallback,若是直接渲染值则用useMemo，用useCallback的话也是每次都要执行的，但是useMemo是直接把值记忆存储了（前面的都是废话，其实都能实现，不过这样更符合习惯）

```

## useRef
本质上useRef就像是可以在其.current属性中保存一个可变值的“盒子”，useRef(null)返回值是不可拓展的属性,.current可以。

**这是因为它创建的是一个普通Javascript对象。而useRef()和自建一个 {current: ...}对象的唯一区别是，useRef会在每次渲染时返回同一个ref对象。**

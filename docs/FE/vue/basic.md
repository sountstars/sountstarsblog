# vue基本用法

[[TOC]]

## 常用指令
| 常用指令 | 描述 |
| -- | -- |
| v-model | 双向数据绑定 把表单元素的value和data中的属性绑定到一起，表单的value发生变化，data的属性也会跟着变化【v-model.number // 直接转换成数字】 |
| v-text | 把data（不只是data）中的属性值绑定到DOM元素中，会覆盖元素中原有的内容；并且不能识别字符串中的html标签 | 
| v-html | 把data（不只是data）中的属性值绑定到DOM元素中；并且可以识别字符串中的html标签| 
| v-if / v-else | 如果v-if绑定的值为true，就显示对应的元素；如果为false，显示v-else对应的元素；注意：v-else不是必选项，但必须结合v-if使用，而v-if可以单独使用 |
| v-show | 如果值为true，对应的元素就会展示，如果为false，则隐藏； |
| v-bind | 绑定动态属性，动态绑定后就可以使用data中的该属性的值；v-bind可以简写为 :| 
| v-for	 | 列表渲染 |
| v-on | 事件绑定，可简写为@ |
| is | 配合`<component>`可动态控制展示那个组件，也可以摆脱html模板的限制 |	

`v-for()`  
vue 可以遍历数组、对象、数组、字符串
```js
<li v-for="(item, key) of items" :key="key">
<li v-for="(item, key) in items" :key="key">
<li v-for="count in 10" :key="count">{{count}}</li>
// 可使用in 和 of 作为分隔符,与react的map不同的是，Vue的v-for都可以用作对象,数组，数字，
// 字符串等等的遍历，默认再js中，对象不能用for of 遍历，但是vue的合成方法中是允许的【Object.keys()】。
```

|事件修饰符|描述|
| -- | -- |
|.prevent|阻止元素的默认行为|
|.stop|阻止事件冒泡|
|.capture|事件在捕获阶段触发|
|.once|事件只会执行一次，执行完后会被移除|
|.self|自身的事件触发时才执行事件函数|
|.passive|事件完成才会触发 例如：@scroll.passive="onScroll"|

```js
 修饰符可以串联 
<a v-on:click.stop.prevent="doThat"></a>
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。
因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
```

|键盘事件|描述|
| -- | -- |
|@keydown/@keyup|修饰符：指定按下哪个按键时/松开时才触发事件函数|
|.enter|回车|
|.esc|esc键|
|.delete|删除/退格|
|.space|空格|
|.tab|tab键|
|.up|上|
|.right|右|
|.down|下|
|.left|左|


## class与style如何动态绑定
```js
<div id="box">
    <p :class="{ active: isActive, 'text-danger': hasError }"></p>
    <p v-bind:class="[isActive ? activeClass : '', errorClass]"></p>
    <!--直接添加样式-->
    <p style="background-color: blue;">sssss</p>
    <!--绑定样式-->
    <p v-bind:style="'background-color: red;'">sssss</p>
    <!--将vue中的属性作为样式设置-->
    <p :style="obj">sssss</p>
    <!--将多个属性作为样式设置-->
    <p :style="[obj,obj1]">sssss</p>
    <!--style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值 -->
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
</div>
<script type="text/javascript">
    var vm=new Vue({
        el:"#box",
        data:{
            isActive: true,
            hasError: false,
            errorClass: 'text-danger',
            obj:{
                backgroundColor:"gold"
            },
            obj1:{
                fontSize: "30px"
            }
        },
    });
</script>
```

## props类型
```vue
 props: {
  title: {
        type: [String, Number],
        default: '标题',
        required: true,
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
}
```

## 组件components
### 局部组件
直接import导入在components里面注册下就能用了
```js
<script>
    import compB from './components/CompA'
    export default {
        components: {
            compA,
        },
      // ...
    }
```

### 全局组件
在main.js里面注册下，就可以全局直接用了
```js
import CompA from "./components/CompA"
Vue.component("com-a", CompA);
```

## 过滤器filter **
### 局部过滤器
在Vue实例中的`filters`内的过滤器是局部过滤器；只能在当前组件可以使用 

+ 过滤器可以连续使用，后面的过滤器的参数，是上一个过滤器的处理结果，数据会展示成最后一个过滤器的结果
+ 过滤器可以传参，参数是传给第二个形参的，第一个参数是`管道符前面的值
```js
{{item.price | toRMB | toFixed(3)}}

data: {
    products: [
        {
            name: 'MAC',
            price: 2000
        },
        {
            name: 'iphoneX',
            price: 1000
        }
    ]
},
filters: { // 写在filters里面的过滤器是局部过滤器
    toRMB (val) {
        return val * 6.832423
    },
    toFixed (val, num = 2) {
        return '¥' + val.toFixed(num)
    }
}
```

### 全局过滤器 
`Vue.filter(过滤器名, callback)` 这种过滤器在任何地方都能使用
```js
// main.js
Vue.filter('toRMB', function(val) {
    return  return val * 6.832423
})
// 组件内部使用
{{item.price | toRMB}}
```

## 自定义全局方法
```js
// mian.js
//  全局的方法
Vue.prototype.$fetch = function (url) {
    return fetch(url).then(e => e.json()).then(val => {
        return val
    })
};

// 自定义全局指令
import Vue from 'vue'

const directives = {
    /**
     * 自动下滑到底部指令
     */
    autoscroll: {
        // componentUpdated:VNode 及其子 VNode 全部更新后调用
        componentUpdated: function(el) {
            let scrollHeight = el.scrollHeight
            let clientHeight = el.clientHeight

            scrollHeight > clientHeight && (el.scrollTop = scrollHeight)
        }
     },
    focus: function (el) {
        el.focus()
    }
}

Object.keys(directives).map(t => {
    Vue.directive(t, directives[t])
})

// 局部自定义的指令
<template>
    <input ref="input" v-focus v-model="val" type="text">
    <strong v-demo="{ color: 'red' }">111默认的slot</strong>
</template>
<script>
    export default {
        // ....
        directives: {
            // 局部自定义指令
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            },
            demo: {
                inserted: function (el, binding) {
                  // el当前的dom
                  //  binding 指令的一些信息 name: "demo"
                  //                       rawName: "v-demo"
                  //                       value: {color: "red"}
                    console.log(el.style.color = binding.value.color)
                }
            }
        },
        // ....
    }
</script>

// 全局组件
Vue.component("counter", About);

// 全局mixin
Vue.mixin(mixin);
```

### VUE自定义指令
```js
Vue.directive('focus',{
    bind() {
      // 当指令绑定到 HTML 元素上时触发.**只调用一次**
      console.log('bind triggerd')
    },
    inserted: (el, binding, vnode) => {
      // 当绑定了指令的这个HTML元素插入到父元素上时触发(在这里父元素是 `div#app`)**.但不保证,父元素已经插入了 DOM 文档.**
      console.log(el, '当前的dom');
      console.log(binding, '指令信息集');
      console.log(vnode, 'dom信息');
      console.log('inserted triggerd')
    },
    updated() {
      // 所在组件的`VNode`更新时调用.
      console.log('updated triggerd')
    },
    componentUpdated() {
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
      console.log('componentUpdated triggerd')
      
    },
    unbind() {
      // 只调用一次，指令与元素解绑时调用.
      console.log('unbind triggerd')
    }
})
```
<!-- 
**钩子函数参数**

指令钩子函数会被传入以下参数：
+ `el`：指令所绑定的元素，可以用来直接操作 DOM 。
+ `binding `：一个对象，包含以下属性：
    - `name`：指令名，不包括 v- 前缀。 -->


### mixins

两个非常相似的组件，它们的功能极其相似，但它们局部稍有不同，现在你的做法是将它们分成两个不同的组件？还是只保留一个组件，局部差异的部分采用`props`控制呢？

如果将它们拆分为两个不同的组件，这时功能发生变化，那么必须在两个地方修改它们，如果用props来区分它们，那么后期维护起来将会很复杂，可能减慢你开发的速度

Vue中的`Mixins`基本上是一块定义的逻辑，由Vue以特定的规定方式存储，可以反复使用，为Vue实例和组件添加功能。因此，`Vue mixins`可以在多个Vue组件之间共享，而无需重复代码块。使用过SASS的CSS预处理器的人对mixin应该有很好的了解。

组件内部有跟mixins里面一样的方法时，组件内部的优先级高与mixins

#### 局部mixins
```js
//assets/mixins/mixin.js
export const toggle = {
  data() {
    return {
      "show": false
    }
  },
  methods: {
    changeState() {
      this.show = !this.show;
    }
  },
  created() {
      // 默认每次都会执行
      console.log('created', 'mixins');
  },
  mounted() {
      console.log('mounted', 'mixins');
  }
};
```
```js
template>
  <div>
     <h1 @click="changeState">mixins</h1>
     <h2 v-if="show">toast</h2>
  </div>
</template>

<script>
import {toggle} from './mixins/toggle'

export default {
  mixins: [toggle]
  // ... 
  //这里面可以正常写，优先级高于mixin的方法。
}
</script>
```

#### 全局mixins
```js
// main.js
const mixin = {
    methods: {
        formatDate(dateTime) {
            return dateTime
        }
    }
};
Vue.mixin(mixin);

// 组件里面使用
console.log(this.formatDate(new Date()),'mixins');
```
注意：请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项

#### extends 和 mixins 区别
+ extends 和 mixins 类似，通过暴露一个 extends 对象到组件中使用。
+ extends 会比 mixins 先执行。执行顺序：extends > mixins > 组件
+ extends 只能暴露一个 extends 对象，暴露多个 extends 不会执行

## vue 组件间通信
### props/$emit
适用 父子组件通信
```js
// 父组件
<template>
    <div id="app">
        <div @click="onMore('值')">
            父组件
        </div>
        <compB
            :title.sync="value"
            @more="onMore"
        />
    </div>
</template>

<script>
    import compB from './components/CompB'

    export default {
        name: 'App',
        components: {
            compB
        },
        data() {
            return {
                value: '',
            }
        },
        methods: {
            onMore(val) {
                console.log(val);
                // this.value = val
            }
        }
    }
</script>

// 子组件
<template>
    <div>
        <div class="title">{{title}}</div>
        <div @click="handleMore">子组件修改父组件的值</div>
        <!--<div @click="$emit('update:title', 'false')">子组件修改父组件的值</div>-->
    </div>
</template>

<script>
    export default {
        name: 'Comb',
        components: {},
        props: {
            title: {
                type: [String, Number],
                default: '标题'
            },
            moreBtn: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleMore() {
                this.$emit('update:title', 'sync方式修改');
                this.$emit('more', 111);
            }
        }
    }
</script>
```

### $emit/$on
适用于 父子、隔代、兄弟组件通信
**最近在思考一个问题为什么一定要在created中写this.$on，可以放在mounted中吗?**
1.如果触发和监听组件在页面上都创建了，并没有进行数据传输，那么可以放在mounted中
这种情况在实际工作中比较常见，如果在触发的组件实际触发之前，监听组件mouted方法执行了，那么就没有任何问题

2.如果触发和监听组件在页面上依次创建，那么要放在created中放在created中最主要的原因是组件的生命周期执行顺序决定的， 下面做一个控制不同子组件显示隐藏的问题，a是现在的组件，b是即将显示的组件，那么执行顺序是b先created，beforeMount, 然后才是a的beforeDestroy,destroyed钩子执行,b的mounted最后执行,针对这种业务你想一下，你在a的beforeDestroy钩子中触发emit， 如果在b的mounted中监听，这时候b的生命周期还没有执行到那一步所以，你的触发是不会生效的，所以更通用的情况是放在created钩子中

**总结就是 $emit 要放在 $on监听 之后**






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
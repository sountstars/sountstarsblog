# Es6

[[TOC]]

## new map

```js
Map 是 ES6 中新增的数据结构，Map 类似于对象，但普通对象的 key 必须是字符串或者数字，
而 Map 的 key 可以是任何数据类型

const map = new Map();
const obj = {p: 'Hello World'};

map.set(obj, 'OK')  //设置成员 key 和 value
map.get(obj) // "OK"   //获取成员属性值
map.has(obj) // true  //判断成员是否存在
map.delete(obj) // true  //删除成员
map.has(obj) // false

size：获取成员的数量
clear：清空所有

遍历方法
keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。

for (let key of map.keys()) {   //map.values
  console.log(key);             // value
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}

map.forEach((x,y)=>{
    console.log(x,y);
})
```
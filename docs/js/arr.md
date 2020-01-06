# Array方法 

[[TOC]]


## slice()
```js
slice()：返回从原数组中指定开始下标到结束下标之间的项组成的新数组
```

## splice()
```js
splice()：可以实现删除、插入和替换
```

## join()
```js
join()   将数组的元素组起一个字符串
var arr = [1,2,3];
console.log(arr.join()); // 1,2,3

可以实现重复字符串，只需传入字符串以及重复的次数
function repeatString(str, n) {
return new Array(n + 1).join(str);
}
console.log(repeatString("abc", 3)); // abcabcabc
```

## push()和pop()
```js
push(): 可以接收任意数量的参数，把它们添加到数组末尾，并返回修改后数组的长度
pop()：数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项
```

## shift() 和 unshift()
```js
shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 
unshift(): 将参数添加到原数组开头，并返回数组的长度 
```

## sort()
```js
sort() 按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。
在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串
```

## reverse()  
```js
reverse()：反转数组项的顺序
```

## concat()
```js
concat() ：将参数添加到原数组中
在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本
```



## indexOf()和 lastIndexOf()
```js
没找到的情况下返回-1
indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引
lastIndexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引
```

## forEach()
```js
forEach() 没有返回值，只针对每个元素调用func
```

## map()
```js

```

## filter()
```js
filter()：“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组

```

## every()
```js
every()：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true

```

## some()
```js
some()：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true
```

## reduce()和 reduceRight()
```js
filter()：“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组

```




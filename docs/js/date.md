# Date时间

[[TOC]]

```js
// 时间戳
Date.now()
new Date().getTime();
new Date().valueOf()

// 设置时间
new Date("2019-06-16 07:55:55"); // Sun Jun 16 2019 07:55:55 GMT+0800 (中国标准时间)

// 时间格式化 
date2 = new Date().toISOString().slice(0,10);   // 2019-06-16

typeof date2 // 'object'
```

##  时间戳转标准时间
```js
// 方法一
/*
** 时间戳转换成指定格式日期
** eg.
** dateFormat(1626750568413, 'Y年m月d日 H时i分')
** → "2021年07月20日 11时09分"
*/
const dateFormat = (timestamp, formats) => {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分s秒
    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    let myDate = timestamp? new Date(timestamp): new Date();

    let year = myDate.getFullYear();
    let month = zero(myDate.getMonth() + 1);
    let day = zero(myDate.getDate());

    let hour = zero(myDate.getHours());
    let minite = zero(myDate.getMinutes());
    let second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};

// 方法二
const dateFormat = (timeStamp) => {
    let date = new Date(timeStamp);
    return date.getFullYear() + "年"
        + (date.getMonth() + 1).toString().padStart(2, 0) + "月"
        + (date.getDate()).toString().padStart(2, 0) + "日 "
        + (date.getHours()).toString().padStart(2, 0) + ":"
        + (date.getMinutes().toString().padStart(2, 0));
}
```

## 倒计时时间格式化
```js
function format_time(timeStamp) {
    let day = Math.floor(timeStamp / (24 * 3600 * 1000));
    let leave1 = timeStamp % (24 * 3600 * 1000);
    let hours = Math.floor(leave1 / (3600 * 1000));
    let leave2 = leave1 % (3600 * 1000);
    let minutes = Math.floor(leave2 / (60 * 1000));
    let leave3 = leave2 % (60 * 1000);
    let seconds = Math.floor(leave3 / 1000);
    if (day) return day + "天" + hours + "小时" + minutes + "分";
    if (hours) return hours + "小时" + minutes + "分" + seconds + "秒";
    if (minutes) return minutes + "分" + seconds + "秒";
    if (seconds) return seconds + "秒";
    return "时间到！";
}
```

## 距离现在多久
```js
const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function formatToInterval(timestamp) {
    let now = Date.now()
    let value = now - timestamp
    value = value < 1 ? 1 : value

    if (value < MINUTE) {
      return Math.floor(value / SECOND) + '秒前'
    }
    if (value < HOUR) {
      return Math.floor(value / MINUTE) + '分钟前'
    }
    if (value < DAY) {
      return Math.floor(value / HOUR) + '小时前'
    }
    return format(timestamp, 'MM月DD日')
}
```
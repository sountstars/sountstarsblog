# Fetch和Axios的区别

[[TOC]]

## AJAX
```js
const xhr = new XMLHttpRequest();
xhr.withCredentials = true; // 添加cookie
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let keyText = xhr.responseText;
        console.log(keyText);
    }
};
xhr.onprogress = function (event) {
    console.log(event.position); //进度条
    console.log(event.totalSize);//数据的字节
};
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/octet-stream");
xhr.setRequestHeader("Authorization", `UpToken ${uptoken}`);
xhr.send({});

xhr.abort()//终止请求
```

## Axios
```js
//全局的一些配置
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

//axios.defaults.baseURL = 'https://xxxxx.xx.cn;
//axios.defaults.headers.Authorization = `${getCookie('token')}`;   //这里添加这个可能导致出现options导致跨域

//普通用法
const baseUrl = `${DEVURL}/shop/${id}/productOrders`;
const CancelToken = axios.CancelToken;
axios.post(baseUrl, {
    data,
    timeout: 3000,
    onUploadProgress:(progress)=>{//进度条
        // total 字节大小
        // loaded 加载的字节
        console.log(Math.round(progress.loaded / progress.total * 100) + '%');
    },
    cancelToken: new CancelToken(cancel=> { //取消请求
        // 封装的时候，添加一个形参，然后执行的时时候，方便页面请求的时候储存这次取消函数，方便下一次执行
        // if (typeof cb === 'function') {
        //   cb(c)
        // }
        setTimeout(() => {
            //cancel就是CancelToken构造函数里面自带的取消请求的函数，参数会在reject里面拿到
            console.log(cancel('取消请求'));
        }, 100)
    })
});

//构造函数用法
axios({
    url: baseUrl,
    method: 'get',
    params: params, //如果不是get请求用 data
    onDownloadProgress: (progress) => {//进度条
         console.log(Math.round(progress.loaded / progress.total * 100) + '%');
    },
    headers: {
        'Content-Type': `application/octet-stream`,
        'Authorization': `UpToken `  //这里可以修改默认的token
    }
});

//修改token
const instance = axios.create({
    baseURL: `${url}`
});
instance.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
axios.post(baseUrl,{data:{}})
```

## Fetch
```js
fetch('http://xxxxx/xx.cn', 
     { 
        method: "POST",
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "q=参数q",
        cache?: RequestCache;
        credentials?: RequestCredentials;
        integrity?: string;
        keepalive?: boolean;
        mode?: RequestMode;
        redirect?: RequestRedirect;
        referrer?: string;
        referrerPolicy?: ReferrerPolicy;
        signal?: AbortSignal | null;
        window?: any;
     }
)
```

## Fetch vs Axios  
### 浏览器支持
`Fetch暂时不支持所有版本的IE`
与成熟的XHR对象相比，Fetch API较新，预计未来几年会进行一定的维护工作,可能后期会返工。

你也可以选择将Fetch polyfill与Promise polyfill结合使用，以便在IE中执行Fetch代码
### Fetch默认无Cookie
与`XMLHttpRequest不同,Fetch并不会默认发送Cookie`，因此应用的身份验证可能会失败,可以通过更改第二个参数中传递的初始值来解决此问题
```js
fetch('http://xxxxx/xx.cn', 
     { 
        method: 'GET', 
        credentials: 'same-origin' 
     }
 )
```

### 错误不会被拒绝
HTTP错误（例如404 500）不会导致 Fetch返回的Promise标记为reject，.catch()也不会被执行。 想要精确的判断fetch是否成功，需要包含 promise.resolved 的情况，此时再判断 response.ok是不是为 true。
```js
fetch('http://xxxxx/xx.cn', {method: 'GET'}).then(response => {
    if (response.ok) { //这里添加一个判断
        return response.json();
    }
    throw new Error('Network response was not ok.');
}).then(json => console.log(json)).catch(error => console.error('error:', error));
```
仅当请求无法完成时才触发reject，例如网络故障或请求被阻止。这会使错误捕获更加复杂。

### 不支持超时
Fetch不支持超时，只要浏览器允许，请求将继续。解决方法是可以将Fetch包装在一个 Promise中，例如:
```js
const fetchTimeout = (url, init, timeout = 3000) => {
    return new Promise((resolve, reject) => {
        fetch(url, init).then(resolve).catch(reject);
        setTimeout(reject, timeout);
    })
};
```
或者 Promise.race([])
```js
const fetchTimeout = (url, init, timeout = 30) => {
    return Promise.race(
        [
            fetch(url, init),
            new Promise(resolve => setTimeout(resolve, timeout))  //想要更具体的捕获这次超时，需要加具体的判断
        ]
    ).then(response => response.json()); 
};
```

### 中止Fetch
通过xhr.abort()很容易结束一个XHR请求，另外也可以通过xhr.onabort函数监测事件解决。

之前一直无法中止一个Fetch请求，但是现在实现了AbortController API的浏览器可以支持它。这将触发一个信号，该信号可以传递给Fetch启动对象：

```js
const controller = new AbortController();
fetch('http://xxxx/xx.cn', {
    method: 'GET',
    signal: controller.signal
}).then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Error:', error));
```
可以通过调用**controller.abort()**来中止,Promise被标记reject后，会调用.catch()函数。

### 没有 progress
到目前为止Fetch仍不支持进度事件，因此，不可能显示文件上传或大型表单提交的进度状态。

## 封装Fetch
```js
// 请求超时时间设置
const REQUEST_TIEM_OUT = 10 * 1000;
// loading延迟时间设置
const LOADING_TIME_OUT = 2000;


class ProxyFetch {
  static fetchInstance: any;
  fetchInstance: any;
  headers: any;
  init: Object;
  requestCount: number;
  isLoading: boolean;
  loadingTimer: any;
  ossClient: any;
  token: string | null = 'AppAnonymous';

  constructor() {
    this.fetchInstance = null;
    this.headers = { 'Content-Type': 'application/json', Role: 'mentee' };
    this.init = { credentials: 'include', mode: 'cors' };
    // 处理loading
    this.requestCount = 0;
    this.isLoading = false;
    this.loadingTimer = null;
  }

  setToken(token: string) {
    this.token = token;
  }

  /**
   * 请求2s内没有响应显示loading
   */
  showLoading() {
    if (this.requestCount === 0) {
      this.loadingTimer = setTimeout(() => {
        this.isLoading = true;
        this.loadingTimer = null;
      }, LOADING_TIME_OUT);
    }
    this.requestCount++;
  }

  hideLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      if (this.loadingTimer) {
        clearTimeout(this.loadingTimer);
        this.loadingTimer = null;
      }
      if (this.isLoading) {
        this.isLoading = false;
      }
    }
  }

  /**
   * 获取proxyFetch单例对象
   */
  static getInstance() {
    if (!this.fetchInstance) {
      this.fetchInstance = new ProxyFetch();
    }
    return this.fetchInstance;
  }

  /**
   * get请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async get(url: string, params: any, settings: Settings) {
    const options = { method: 'GET' };
    if (params) {
      let paramsArray: string[] = [];
      // encodeURIComponent
      Object.keys(params).forEach((key: string) => {
        if (params[key] instanceof Array) {
          const value = params[key].map((item: any) => '"' + item + '"');
          paramsArray.push(key + '=[' + value.join(',') + ']');
        } else if (params[key] !== undefined) {
          paramsArray.push(key + '=' + params[key]);
        }
      });
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }
    return await this.dofetch(url, options, settings);
  }

  /**
   * post请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async post(url: string, params = {}, settings: Settings) {
    const options = { method: 'POST', body: '' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * patch请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async patch(url: string, params = {}, settings: Settings) {
    const options = { method: 'PATCH', body: '' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * put请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async put(url: string, params = {}, settings: Settings) {
    const options = { method: 'PUT', body: '' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * delete请求
   * @param {String} url
   * @param {Object} params
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  async delete(url: string, params = {}, settings: Settings) {
    const options = { method: 'DELETE', body: '' };
    options.body = JSON.stringify(params);
    return await this.dofetch(url, options, settings);
  }

  /**
   * fetch主函数
   * @param {*} url
   * @param {*} options
   * @param {Object} settings: { isServer, noLoading, cookies }
   */
  dofetch(
    url: string,
    options: any,
    settings: Settings = {
      isServer: false,
      noLoading: false,
      cookies: {},
      noClientCookies: false,
      textContent: false,
      noPrefix: false,
    },
  ) {
    const {
      noLoading,
      cookies = {},
      noClientCookies,
      textContent,
      noPrefix,
    } = settings;
    if (!noLoading) {
      this.showLoading();
    }
    const init = noClientCookies ? { mode: 'cors' } : this.init;
    if (this.token) {
      this.headers['CUserToken'] = this.token;
    }
    __DEV__ &&
      console.log('request', url, {
        headers: textContent ? { 'Content-Type': 'text/plain' } : this.headers,
        ...init,
        ...options,
      });
    return Promise.race([
      fetch(url, {
        headers: textContent ? { 'Content-Type': 'text/plain' } : this.headers,
        ...init,
        ...options,
      }),
      new Promise((resolve, reject) => {
        setTimeout(
          () =>
            reject(
              new Error(JSON.stringify({ errmessage: '请求超时，请稍后再试' })),
            ),
          REQUEST_TIEM_OUT,
        );
      }),
    ]).then(async (response: any) => {
      !noLoading && this.hideLoading();

      if (
        response.status !== 200 &&
        response.status !== 201 &&
        response.status !== 204
      ) {
        const res = await response.json();
        __DEV__ && console.log('response', response, res);
        throw new Error(JSON.stringify(res));
      }
      if (response.status === 204) {
        return { success: true };
      } else {
        const result = await response.json();
        __DEV__ && console.log('response', response, result);
        // set登录凭证
        if (response.headers?.map['login-authorization']) {
          result.data.token = response.headers?.map['login-authorization'];
        }
        return result;
      }
    });
  }
}
```

## 参考文档
[analysis](https://www.sitepoint.com/xmlhttprequest-vs-the-fetch-api-whats-best-for-ajax-in-2019/)


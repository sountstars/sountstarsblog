# URL 输入到页面加载过程

[[TOC]]

1. 系统层
   1. 发起 http 请求，解析域名
   2. DNS  
       1. Chrome 搜索自身 DNS 缓存。`chrome输入chrome://net-internals/#dns`可查看到  
       2. 搜索操作系统自身 DNS 缓存  
       3. 读取本地 HOST 文件  
       4. 以上都查询不到时，浏览器发送一个 DNS 的系统调用，DNS 请求到达宽带运营商服务器。  
       5. 宽带运营商服务器查询自身缓存  
       6. 没查询时，发起一个迭代（顶级域--次级域名--...）的 DNS 解析请求,直到获取到域名对应的 IP 地址。  
    3. 拿到域名对应的 IP 并缓存  
       1. 宽带运营商服务器缓存 DNS  
       2. 结果返回操作系统并缓存 DNS  
       3. 结果返回浏览器并缓存 DNS 
    4. 得到目标 IP，发起 Http“三次握手”，建立起 TCP/IP 连接  
       1. 客户端发送一个带有 SYN 标志的数据包给服务端 
       2. 服务器发回确认包 SYN/ACK 标志的数据  
       3. 客户端再发送确认包 ACK 标志的数据包给服务端
    5. 连接成功后，浏览器向服务器发起标准Http请求
       1. 构建Http请求报文
        + 请求行
            - 格式：Method Request-URL HTTP-Version CRLF，如：GET index.html HTTP/1.1
            - Method可选项：GET, POST, PUT, DELETE, OPTIONS, HEAD
        + 请求报头
            - 允许客户端向服务器传递请求的附加信息
            - 常见请求报头：Content-Type, Cache-Control,CookieAccept-Encoding,Accept-Language,等
        + 请求正文
            - 当使用POST, PUT等方法时，通常需要客户端向服务器传递数据。
        2. 通过TCP协议，发送到服务器指定端口（Http协议默认80端口、Https协议默认443）
    6. 服务器收到请求后，经过后端处理返回结果。（前后端分离）
       + 响应报文
          + 状态码
             - 1xx:指示信息–表示请求已接收，继续处理。
             - 2xx：成功–表示请求已被成功接收、理解、接受。
             - 3xx：重定向–要完成请求必须进行更进一步的操作。
             - 4xx：客户端错误–请求有语法错误或请求无法实现。
             - 5xx：服务器端错误–服务器未能实现合法的请求。
          + 响应报头
          + 响应报文
    7. 返回Html页面等资源，html包含css/js等资源，重复以上http请求
2. 渲染层   
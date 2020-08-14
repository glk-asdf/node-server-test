# web服务器：node 和 appche http server 对比

## 区别

1. 线程

    * apache 是多线程机制，他为每一个访问用户建立单独的线程，彼此互不影响，但是线程占用内存，访问量大内存会吃不消
    
    * nodejs 的单线程机制，不同的用户使用同一个线程，采用非阻塞I/O和事件驱动 有效提高了服务器的并发数上限（同时在线人数）


## 性能对比

> [巨头终极对决，Apache、Nginx 与 Node.js 之争](https://www.oschina.net/news/79567/apache-vs-nginx-vs-node-js)
  
* 单从性能来看，Apache 是强于 nodejs 的。  
  
  网站较小时，或使用较少时，各 web 服务器差别不大



# node-server 用于部署的的 node 服务器

> 主要是为了测试 vue 项目的部署问题

## express

> 开发基于 express 插件，一个 node.js Web 应用框架

## 使用方法

1. 将 base-vue 打包（npm run build-all），然后将 dist 文件夹中文件复制到此项目（node-server）的 webApp 中

2. 添加当前 vue 项目的系统信息

3. 运行 server.js 文件
    ~~~
    node server.js
    // 获取
    npm run server
    ~~~

4. 访问 localhost:3000/

## node 部署

1. 将 打包的 vue 项目放在 webApp 中

2. 将 node 放在部署好的 node 环境的服务器中

3. 安装依赖
    ~~~
    npm install
    ~~~

4. 测试运行
    ~~~
    npm run server
    ~~~

5. [后台运行](https://www.cnblogs.com/hiit/p/11922348.html)

## 重定向

> 前端开发时，是基于页面在根目录的情况下。  
  而部署可能会将打包的代码放在任意位置，所以需要重定向

* index.html 重定向

    1. 在history 模式下，只是动态的通过js 操作window.history 来改变有浏览器地址栏里的路径，并没有发起http请求  
       所以，所有页面路径都应该指向 index.html 文件
    2. index.html 可能存放在任意位置，所以需要重定向

* /static 重定向

    1. 在history 模式下，如果静态文件使用相对路径，就会在子路由下，指向不同的文件，所以要使用绝对路径  
    2. /static 可能存放在任意位置，所以需要重定向

## 根目录

> 如果需要给路径添加根目录，就需要修改 vue-router 和 static 的引用

* vue-router
    > 添加 base
    ~~~
    {
        mode: 'history',
        base: '/bdp',
        routers
    }
    ~~~

* static
    > 在使用静态文件的地方添加根目录
    ~~~
    <link rel="shortcut icon" href="/bdp/static/img/logo.png" type="image/x-icon">
    ~~~

## 关于按模块打包部署

* 可以将每个模块放在一个根目录下，每个根目录下的页面就重定向至对应根目录下的 index.html，静态资源就在对应 static
  1. 将每个模块的菜单按模块合并，模块内的菜单生成路由，模块外的菜单通过 location （src 为 base + route）跳转至其余模块
  2. 同一 ip 和端口使用同一 sessionStorage，即可以使用 token 保持多模块间的登录状态
  3. 登录页和导航页可以单独作为一个模块（base），跳转登录就通过 location 跳至登录模块  
     有导航页就按导航跳至对应模块，没有导航页，登陆跳转至默认模块的默认页面
     后台默认跳至默认模块的默认页面
  4. 不在根目录下的页面，通过 location 跳至对应页面
  5. 每个模块只有一个顶级页面，每个模块的默认页面就是顶级页面


## /api/index.js 中的 rf 中的路径搞不懂（可能是从 server.js 的角度出发的）

> '../json' 和 '/json' 都不对，'./json' 才是对的

* 并不是因为是 index.js 就忽略了，而从 /api（而不是 /api/index） 的角度出发。因为更改了 index.js 的名字也没发生变化  
  可能是因为是从调用的角度，也就是 app.js 的角度


## 项目结构

    ├── webpack/                    # vue 打包的项目存放的位置  
    
    │   ├── static/                 # vue 打包项目的静态文件
    
    │       └── ...  
    
    │   └── index.html              # vue 打包项目的静态文件  
    
    ├── api/                        # 接口
    
        └── ...  
    
    ├── json/                       # json 数据
    
        └── ...  
    
    ├── .app.js                     # express 的实例对象，并做预处理
    
    ├── .server.js                  # node 运行的后台服务的文件
      
    ├── .package.json               # NPM软件包元文件,包含所有构建依赖项和构建命令  
    
    ├── .README.md                  # 默认自述文件  
    
    └── .webServer.md               # web 服务器对比  

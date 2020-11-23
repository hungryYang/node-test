## express api

1. express.static()
    读取目录下的静态文件，当访问对应路径时会读取目录下的文件
    ``` express.static()
    app.use(express.static(filePath))
    ```

2. express.json()
    在body中上传的json数据，会采用stream的方式进行读取，该中间件对body中上传的数据进行处理可以直接通过`req.body`拿到
    
3. express.urlencoded()
    可以对`x-www-form-urlencoded`形式数据进行处理，通过`req.body`拿到。
    

## app api

1. app.use()

    对写在其中的函数当做中间件处理（中间件：当发生请求时都加执行次函数进行处理），当请求路径与基本路径匹配时，将执行后面函数。
    
2. app.get(), app.post()等

    处理http请求的简易写法
    
3. app.set()

    可以设置指定变量数值，并通过`app.get('test')`获取对应值。或者设置对应的views文件夹，再通过`app.render()`渲染页面
    ```
        app.set('views', 'public')
        app.set('view engine', 'ejs')
        
        app.get('/test', (req, res) => {
            res.render('test')
        })
    ```

4. app.locals()

    设置本地全局变量，在中间件中可以通过`req.app.locals().title`获取
    
## req api

1. req.params

    获取路由中参数`/users/:userId`, 获取对应userId，返回一个对象

2. req.range
    
    对于响应头中`Accept-Ranges`不为`none`的可以进行范围请求（分片请求）。例如较大文件我们可以设置同时通过多个线程对文件进行分片请求最后再进行拼合。
    
## res api

1. res.send

   对任务进行响应，将自动设置`content-type`响应头
   
2. res.status
    
    设置HTTP status.

3. res.set/res.get

    设置/获取响应头

4. res.format

    可以根据同一路径不同的request headers来响应不同的内容
    

## Router 

    路由语法糖，用法见`/routes`文件夹以及app中的`app.get('/users/:userId/books/:bookId', User)`

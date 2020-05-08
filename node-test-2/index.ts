import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
const dirPath = path.resolve(__dirname, './public')
const server = http.createServer();
// 每一次的文件请求都会重新发起request请求
server.on('request', (request:IncomingMessage, response:ServerResponse) => {
    let { url: reqUrl, method: reqMethod} = request
    let pathname = url.parse(reqUrl).pathname
    pathname = pathname.substr(1)
    // response.end不会终止程序运行
    fs.readFile(path.resolve(dirPath, pathname), (errnoError,data) => {
        if (errnoError) {
            fs.readFile(path.resolve(dirPath, '404.html'), 'utf-8', (error, dt) => {
                response.statusCode = 404
                response.end(dt)
            })
        } else {
            response.end(data)
        }
    });
})
server.listen('8889', () => {
    console.log('server listen')
})

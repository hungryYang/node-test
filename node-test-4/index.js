const fs = require('fs')
const http = require('http')
const server = http.createServer()
server.on('request', (request, response) => {
    const stream = fs.createReadStream('./file.txt')
    stream.pipe(response)
}).listen(8888)



import express from 'express'
const app = express()

app.get('/', (request, response) => {
    response.end('尼玛的')
})

app.listen('3333')

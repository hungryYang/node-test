import express from 'express'
const app = express()
import User from './routes/user'

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('xxx'))
app.locals.title = '111111'

app.get('/users/:userId/books/:bookId', User)

app.use((req, res, next) => {
    console.log(req.body, req.app.locals.title);
    /**
    * 默认走stream
    **/
    // req.on('data', (chunk) => {
    //     console.log(chunk.toString());
    // })
    res.send('fuck')
})

app.listen('3333')

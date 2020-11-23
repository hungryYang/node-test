import express from 'express'
const router = express.Router()

router.get('/users/:userId/books/:bookId', (req, res, next) => {
    console.log(req.params)
    // res.write('a')
    res.send('fuck 2')
})

export default router

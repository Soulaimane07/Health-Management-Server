const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /users"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Handling POST requests to /users"
    })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    if(id === "hello"){
        res.status(200).json({
            message: 'hello world',
            id: id
        })
    } else {
        res.status(200).json({
            message: "no id"
        })
    }
})

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId

    res.status(200).json({
        message: 'Update user', 
        id: id
    })
})

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId

    res.status(200).json({
        message: "Delete user",
        id: id
    })
})

module.exports = router
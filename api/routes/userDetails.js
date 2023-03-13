const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Get users details"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "users details created"
    })
})

router.get('/:userDetailsId', (req, res, next) => {
    const id = req.params.userDetailsId

    res.status(201).json({
        message: "user details",
        id: id
    })
})

router.patch('/:userDetailsId', (req, res, next) => {
    const id = req.params.userDetailsId

    res.status(201).json({
        message: "Update user details",
        id: id
    })
})

router.delete('/:userDetailsId', (req, res, next) => {
    const id = req.params.userDetailsId

    res.status(201).json({
        message: "Delete user details",
        id: id
    })
})

module.exports = router
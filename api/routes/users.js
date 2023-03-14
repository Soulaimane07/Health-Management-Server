const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/Users')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /users"
    })
})

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        pass: req.body.pass,
    })
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /users",
            user: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
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
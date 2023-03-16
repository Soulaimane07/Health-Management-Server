const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/Users')

router.get('/', (req, res, next) => {
    User.find()
        .select("_id email fname lname pass")
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
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
    user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
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

router.get('/getByEmail/:userEmail', (req, res, next) => {
    const Useremail = req.params.userEmail
    User.findOne({email: Useremail})
        .select("_id email fname lname pass")
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.get('/getById/:userId', (req, res, next) => {
    const id = req.params.userId
    
    User.findById(id)
        .select("_id email fname lname pass")
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    User.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId

    User.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result,{
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router
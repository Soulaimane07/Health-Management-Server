const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

const UsersProgress = require('../models/UsersProgress')
const Users = require('../models/Users')

router.get('/', (req, res, next) => {
    UsersProgress.find()
        .select("_id userId calories steps water day")
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/getByUserID/:userId', (req, res, next) => {
    const Id = req.params.userId

    UsersProgress.find({userId: Id})
        .select("_id userId calories steps water day")
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.post('/', (req, res, next) => {
    const userProgress = new UsersProgress({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        calories: req.body.calories,
        steps: req.body.steps,
        water: req.body.water,
        day: req.body.day
    })
    
    userProgress.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
           
})

router.delete('/:userProgressId', (req, res, next) => {
    const id = req.params.userProgressId

    UsersProgress.deleteOne({_id: id})
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

module.exports = router
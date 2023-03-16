const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

const UserDetails = require('../models/UserDetails')
const User = require("../models/Users")

router.get('/', (req, res, next) => {
    UserDetails.find()
        .select("userId goal sex profile system age height CWeight GWeight activity calories steps water")
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

router.post('/', (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            const h = req.body.height
            console.log(h);
            const userDetails = new UserDetails({
                _id: new mongoose.Types.ObjectId(),
                userId: req.body.userId,  
                goal: req.body.goal,
                sex: req.body.sex,
                profile: req.body.profile,
                system: req.body.system,
                age: req.body.age,
                height: { X: req.body.height.X, Y: req.body.height.Y},
                CWeight: req.body.CWeight,
                GWeight: req.body.GWeight,
                activity: req.body.activity,
                calories: 0,
                steps: 0,
                water: 0,
            })
            return userDetails.save()
        })
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.get('/getByUserID/:userId', (req, res, next) => {
    const Id = req.params.userId

    UserDetails.findOne({userId: Id})
        .select("userId goal sex profile system age height CWeight GWeight activity calories steps water")
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

// router.get('/:userDetailsId', (req, res, next) => {
//     const id = req.params.userDetailsId

//     UserDetails.findById(id)
//         .select("userId goal sex age height CWeight GWeight activity")
//         .exec()
//         .then(doc => {
//             res.status(200).json(doc)
//         })
//         .catch(err => {
//             console.log(err),
//             res.status(500).json({error: err})
//         })
// })

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
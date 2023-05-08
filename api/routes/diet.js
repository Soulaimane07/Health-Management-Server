const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Diet = require('../models/Diet')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Uploads/diets')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
})



router.get('/', (req, res, next) => {
    Diet.find()
        .select("_id title image desc")
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

router.post('/', upload.single('image'), (req, res, next) => {
    const diet = new Diet({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        desc: req.body.desc,
        image: req.file.name || req.file.path,
    })
    diet.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                food: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

// router.get('/getById/:foodId', (req, res, next) => {
//     const FoodId = req.params.foodId

//     Food.findOne({_id: FoodId})
//         .select("_id name image type calories carbs protein fat fiber")
//         .exec()
//         .then(doc => {
//             res.status(200).json(doc)
//         })
//         .catch(err => {
//             console.log(err),
//             res.status(500).json({error: err})
//         })
// })

// router.get('/getByName/:foodName', (req, res, next) => {
//     const FoodName = req.params.foodName

//     Food.findOne({name: FoodName})
//         .select("_id name image type calories carbs protein fat fiber")
//         .exec()
//         .then(doc => {
//             res.status(200).json(doc)
//         })
//         .catch(err => {
//             console.log(err),
//             res.status(500).json({error: err})
//         })
// })

router.patch('/:dietId', (req, res, next) => {
    const id = req.params.dietId

    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Diet.updateOne({_id: id}, {$set: updateOps})
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

router.delete('/:dietId', (req, res, next) => {
    const id = req.params.dietId

    Diet.deleteOne({_id: id})
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
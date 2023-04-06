const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Food = require('../models/Food')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/images/food')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
})



router.get('/', (req, res, next) => {
    Food.find()
        .select("_id name image calories carbs protein fat fiber")
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
    const food = new Food({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path,
        name: req.body.name,
        caloeies: req.body.calories,
        fat: req.body.fat,
        carbs: req.body.carbs,
        protein: req.body.protein,
        fiber: req.body.fiber,
    })
    food.save()
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

router.get('/getById/:foodId', (req, res, next) => {
    const FoodId = req.params.foodId

    Food.findOne({_id: FoodId})
        .select("_id name image calories carbs protein fat fiber")
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.get('/getByName/:foodName', (req, res, next) => {
    const FoodName = req.params.foodName

    Food.findOne({name: FoodName})
        .select("_id name image calories carbs protein fat fiber")
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err),
            res.status(500).json({error: err})
        })
})

router.patch('/:foodId', (req, res, next) => {
    const id = req.params.foodId

    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Food.updateOne({_id: id}, {$set: updateOps})
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

router.delete('/:foodId', (req, res, next) => {
    const id = req.params.foodId

    Food.deleteOne({_id: id})
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
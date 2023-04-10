const mongoose = require("mongoose")

const FoodSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
    protein: {
        type: Number,
        default: 0,
    },
    fat: {
        type: Number,
        default: 0,
    },
    fiber: {
        type: Number,
        default: 0,
    }

})

const FoodModel = mongoose.model("Food", FoodSchema)

module.exports = FoodModel
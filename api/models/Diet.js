const mongoose = require("mongoose")

const DietSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    duree: {
        type: Number,
        required: false,
    },
    carbs: {
        type: Number,
        required: false,
    },
    protein: {
        type: Number,
        required: false,
    },
    fat: {
        type: Number,
        required: false,
    },
})

const DietModel = mongoose.model("Diet", DietSchema)

module.exports = DietModel
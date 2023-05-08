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
    }
})

const DietModel = mongoose.model("Diet", DietSchema)

module.exports = DietModel
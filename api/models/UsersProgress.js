const mongoose = require("mongoose")

const UsersProgressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { 
        type: String,
        required: true, 
    },
    calories:{
        type: Number,
        required: true,
        default: 0,
    },
    steps:{
        type: Number,
        required: true,
        default: 0,
    },
    water:{
        type: Number,
        required: true,
        default: 0,
    },
    day : { type: String  } 
})

const UsersProgress = mongoose.model("UsersProgress", UsersProgressSchema)

module.exports = UsersProgress
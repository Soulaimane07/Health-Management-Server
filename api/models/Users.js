const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type: String,
        required: true,
        unique: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: true
    },
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel
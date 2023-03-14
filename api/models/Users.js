const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type: String,
    },
    fname:{
        type: String,
    },
    lname:{
        type: String,
    },
    pass:{
        type: String,
    },
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel
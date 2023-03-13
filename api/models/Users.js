const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
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
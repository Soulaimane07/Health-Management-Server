const mongoose = require('mongoose')

const userDetailsScheema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    goal: { type: String },
    sex: { type: String },
    profile: { type: Number, default: 0},
    system: { type: String },
    age: { type: Number },
    height: { 
        X: {
            type: Number,   
        },
        Y: {
            type: Number,
        }
    },
    CWeight: { type: Number },
    GWeight: { type: Number },
    activity: { type: String}
})

const UserDetailsModel = mongoose.model("UsersDetails", userDetailsScheema)

module.exports = UserDetailsModel
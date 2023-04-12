const express = require("express")
const app = express()
const morgan = require('morgan')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const usersRoutes = require('./api/routes/users')
const usersDetailsRoutes = require("./api/routes/userDetails")
const foodRoutes = require("./api/routes/food")


mongoose.connect('mongodb+srv://soulaimane:QZv1gkNEYwDfGZ2N@pfe.r42jd4t.mongodb.net/PFE?retryWrites=true&w=majority')
mongoose.Promise = global.Promise

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next( )
})


app.use('/users', usersRoutes)
app.use('/usersDetails', usersDetailsRoutes)
app.use('/food', foodRoutes)
app.use('/uploads', express.static('Uploads'))
app.use('/assets', express.static('View/assets'))

const path = require('path');

app.get('/',function(req,res){      
    res.sendFile(path.join(__dirname,'./View/index.html'));
});

app.use((req, res, next) => {
    const error = new Error('Not fount')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
const express = require("express")
const app = express()
const morgan = require('morgan')

const usersRoutes = require('./api/routes/users')
const usersDetailsRoutes = require("./api/routes/userDetails")

app.use(morgan('dev'))

app.use('/users', usersRoutes)
app.use('/usersDetails', usersDetailsRoutes)

app.use((req, res, next) => {
    const error = new Error('Not fount')
    error.status(404)
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
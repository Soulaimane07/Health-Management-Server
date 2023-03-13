const express = require("express")
const app = express()

const usersRoutes = require('./api/routes/users')
const usersDetailsRoutes = require("./api/routes/userDetails")

app.use('/users', usersRoutes)
app.use('/usersDetails', usersDetailsRoutes)

module.exports = app
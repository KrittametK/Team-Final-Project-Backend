const express = require('express')
const bodyParser = require('body-parser')
const db = require("./models")
const cors = require('cors')
const userService = require('./service/userService')
const passport = require('passport')
const app = express()




app.use(passport.initialize())
require("./config/passport/passport")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.sequelize.sync({ force: false }).then(() => {
    userService(app, db);
    app.listen(8080, () => { console.log("server is running on port  8080") })
})
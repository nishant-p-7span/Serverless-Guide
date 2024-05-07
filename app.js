const express = require('express')
const mongoose = require('mongoose')
const mongo = require('mongodb')
const app = express()
const serverless = require('serverless-http')
const route = require('./Routers') //calling the router file.
require('dotenv').config()
const url = process.env.MONGO;

mongoose.connect(url, {useNewUrlParser:true}) //connect to the database
const con = mongoose.connection // now we are using con to make connection with db.

con.on('open', function(){ // on will fire the turn On command.
    console.log("Connected")
})

app.use(express.json())

app.use('/',route)


// app.listen(9000, function(res){
//     console.log("Server Running... test final")
// })
module.exports.handler = serverless(app);
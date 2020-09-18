'use strict'

const express = require('express')
const app = express()
const base64 = require('base-64');
const users = require('./auth/models/users-model')
const basicAuth = require('./auth/middleware/basic')
const router = require('./auth/routes/auth-router')


// global middleware it get the req.body for you so you can call req.body.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router);



// 404 not found handler
app.use('*', ( req, res, next)=>{
     res.status(404).send('not found')
})
//error handler last express route
// app.use((err, req, res , next)=>{
//     req.status(500).send(err)
// })
module.exports ={
    app,
    start: (port)=> app.listen(port, console.log('up on', port))
}
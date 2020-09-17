'use strict'

const express = require('express')
const users = require('./users-model')
const app = express()

// global middleware it get the req.body for you so you can call req.body.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/signup', async (req, res)=>{
    // username, pw, email, ets..
    // will be on req.body the body of the request to do this add global middleware express.json and exp.urlencoded
    // use the users module to create a new user
    try{
    let obj = {
        username: req.body.username,
        password: req.body.password
    }
    let record = new users(obj);
    let newUser = await record.save()

    let token = record.generateToken();
    console.log({token})
    // prove it
    res.status(201).json(newUser)

    } catch (e){
        next(e.message)
    }
 
})

app.post('/signin', (req, res, next)=>{
    res.send('signin ok')
})



// 404 not found handler
app.use('*', ( req, res, next)=>{
     res.status(404).send('not found')
})
//error handler last express route
app.use( (err, req, res , next)=>{
    req.status(500).send(err)
})
module.exports ={
    app,
    start: (port)=> app.listen(port, console.log('up on', port))
}
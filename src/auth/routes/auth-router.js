'use strict';

const express = require('express')
const users = require('../models/users-model')
const basicAuth = require('../middleware/basic')
const bearerAuth = require('../middleware/bearer')

const router = express.Router();

router.post('/signup', async (req, res, next)=>{
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

    let output = {
        user: newUser,
        token: token
    }
    console.log({output}, 'signup')
    // prove it
    res.status(200).json(output)

    } catch (e){
      next(e.message)
    }
 
})

router.post('/signin', basicAuth,(req, res, next)=>{
    let output = {
        user: req.user,
        token: req.token
    }
    console.log('signed in bruh')
    res.status(200).json(output)
 })

// sets a token
router.get('/users', bearerAuth, async (req, res, next)=>{
    const usersList = await users.find({});
    res.set('auth', req.token);
    console.log('Inside users route using bearer')
    res.status(200).json(usersList);
})

router.get('/secretstuff', basicAuth, (req, res)=>{
    res.status(200).send('In secret stuff')
})
 
 module.exports = router;
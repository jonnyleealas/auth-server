'use strict';

const express = require('express')
const base64 = require('base-64');
const users = require('../models/users-model')
const basicAuth = require('../middleware/basic')
const router = express.Router();
router.post('/signup', async (req, res)=>{
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

router.post('/signin', basicAuth,(req, res, next)=>{
    let output = {
        user: req.user,
        token: req.token
    }
 res.status(200).json(output)
 })
 
 module.exports = router;
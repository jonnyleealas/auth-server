'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonToken = require('jsonwebtoken');

const users = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

users.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 5)
    console.log(' the password is', this.password)
})

users.authenticateBasic = async function (user, password){
    let valid = await bcrypt.compare(password, )
}

users.methods.generateToken = async function(){
    // turns user into an object
    let token = jsonToken.sign({username: this.username}, process.env.SECRET)
    return token;
}

module.exports= mongoose.model('users', users)
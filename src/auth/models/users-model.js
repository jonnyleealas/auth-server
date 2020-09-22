'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonToken = require('jsonwebtoken');
/* set is a js db but we will need to use 
a better storage system for later*/
const usedTokens = new Set();
const users = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})
// hashes and saves
users.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5)
    console.log(' the password is', this.password)
})

// creates a token
users.methods.generateToken = function() {
    let tokenObj = {
        username: this.username,
    }
    let options ={
        expiresIn: '5m'
    }
    // turns user into an object
    let token = jsonToken.sign(tokenObj, process.env.SECRET, options)
    
    return token;
}
//validates
users.statics.validateBasic = async function (username, password){
    let user = await this.findOne({ username: username});    
    let isValid = await bcrypt.compare(password, user.password )

    if(isValid) { return user; }
    else { return undefined; }
}
// checks whether token is in data base
users.statics.authWithToken = function (token) {
    if( usedTokens.has(token)){
    Promise.reject('invalid token')   
    } else {
        let parsedToken = jsonToken.verify(token, process.env.SECRET);
        /* usedTokens.add(token) creates a new token after login so it saves it after the
        fact */
        usedTokens.add(token)
        console.log('Parsed Token:',parsedToken)
        return this.findOne({ username: parsedToken.username})
    }
  }
module.exports= mongoose.model('users', users)
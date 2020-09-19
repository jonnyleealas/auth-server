'use strict'
const users = require('../models/users-model')
//this is middlware that allows/prevents you to use token instead of having to use a pw
module.exports = (req, res, next)=>{
    if(! req.headers.authorization){ next('invalid login')}
    //split creates an array out of the bearer token pop pops off the last thing in the array
    let token = req.headers.authorization.split(' ').pop();
   

    users.authWithToken(token)
    .then(validUser => {
        req.user = validUser;
        req.token = token;
        next();
    })
    .catch(err => next('invalid login'))


}
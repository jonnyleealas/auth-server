'use strict'

const express = require('express')

const bearer = require('./auth/middleware/bearer');

const router = express.Router();

router.get('/secretroute', bearer, (req, res)=>{
    res.status(200).send('welcome to the secret route bearer');
})

module.exports = router;
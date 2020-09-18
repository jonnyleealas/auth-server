'use strict'

const express = require('express')

const bearer = require('./auth/middleware/bearer');

const router = express.Router();

router.get('/secretarea', bearer, (req, res)=>{
    res.status(200).send('welcome to the secret route');
})

module.exports = router;
'use strict'

const express = require('express')
const base64 = require('base-64');
const users = require('./src/auth/models/users-model')
const cors = require('cors')
const basicAuth = require('./src/auth/middleware/basic')
const authRouter = require('./src/auth/routes/auth-router')
const testRoutes = require('./src/auth/routes/test-routes')
const error = require('./src/auth/middleware/404')
const error500 = require('./src/auth/middleware/500')


const app = express()
// global middleware it get the req.body for you so you can call req.body.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(authRouter);
app.use(testRoutes);

// 404 not found handler
app.use('*', (req, res, next) => {
    res.status(404).send('not found');
  });

app.use(error);
app.use(error500);

module.exports ={
    app,
    start: (port)=> app.listen(port, console.log('up on', port))
}
const express = require('express');
const { registerHoster, loginHoster } = require('../Controller/hosters.controller');
const hosterRouter = express.Router();

hosterRouter.post('/register', registerHoster)
hosterRouter.post('/login', loginHoster)

module.exports = {
    hosterRouter
}
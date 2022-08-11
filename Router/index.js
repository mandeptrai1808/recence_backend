const express = require('express');
const { hosterRouter } = require('./hosters.router');

const rootRouter = express.Router();

rootRouter.use('/hosters', hosterRouter)

module.exports = {
    rootRouter
}
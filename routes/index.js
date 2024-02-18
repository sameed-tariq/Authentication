const express = require("express");
const router = express.Router()
const verifyTokenMiddleware = require('../middleware/verifyToken')
const eventRoute = require('./event')
const userRoute = require('./user')
const authRoute = require('./auth')
router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/events',verifyTokenMiddleware,eventRoute)

module.exports = router
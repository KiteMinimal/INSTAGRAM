const express = require("express")
const userMiddleware = require('../middlewares/user.middleware')
const indexController = require('../controllers/index.controller')
const router = express.Router()


router.get('/feed', userMiddleware.authUser, indexController.feedController)


module.exports = router
const express = require('express')
const { RegisterUser, LoginUser } = require('../controller/user')
const router = express.Router()
const  verifyAdmin = require('../middleware/AuthMiddleware')
const { DeleteProduct } = require('../controller/Product')

router.post('/register',RegisterUser)
router.post('/login',LoginUser)



module.exports = router
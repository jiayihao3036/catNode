const userController = require('../controllers/user.controller');
const userMiddel = require('../middel/token')
const express = require('express');
const router = express.Router();

router.post('/signup', userController.signup)
router.post('/signin',userController.signin)
router.post('/issign',userMiddel,userController.issign)

module.exports = router;

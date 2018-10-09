var express = require('express');
var router = express.Router();
const UserController=require('../controllers/userController')




/* GET home page. */
router.post('/signin/google', UserController.loginG );
router.post('/signin', UserController.logindb );
router.post('/signup', UserController.register );

module.exports = router;

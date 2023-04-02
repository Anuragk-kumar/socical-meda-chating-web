const express = require('express');
 const router = express.Router();

 const homeController = require('../controllers/home_controller');

console.log("router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
// for any further routers , access from Here

 module.exports = router;
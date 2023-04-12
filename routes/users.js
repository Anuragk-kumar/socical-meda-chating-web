const express = require('express');
const router = express.Router();


// import passport
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
// router.post('/create-section',usersController.createSection);

//use passport as a middleware to authenticate 
 router.post('/create-section',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    
 ),usersController.createSection);

 router.get('/sign-out', usersController.destroySession);

module.exports = router;
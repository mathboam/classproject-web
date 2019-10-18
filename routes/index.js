const express  = require('express');
const userController = require('../controllers/userController');
const router  = express.Router();
const passport = require('passport')

router.get('/',userController.homepageController);
router.get('/users/register',userController.registerController);
router.post('/users/register',userController.registermiddleware);
router.get('/users/login',userController.loginController);
router.post('/users/login',userController.passportAuthentication);
router.get('/users/dashboard',userController.dashboardcontroller);
router.get('/users/logout',userController.logoutHandle);
router.get('/users/registration',userController.registration,userController.dashboardcontroller);
router.post('/users/regstration',userController.registration);


module.exports = router;
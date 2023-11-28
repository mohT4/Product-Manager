const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);

router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;

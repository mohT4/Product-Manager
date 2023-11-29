const express = require('express');
const authController = require('../controller/authController');
const cardsController = require('../controller/cardsController');

const router = express.Router();

router.get('/', authController.protect, cardsController.filterCards);

module.exports = router;

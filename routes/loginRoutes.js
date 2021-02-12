const express = require('express');
const itemController = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.get('/', itemController.login_index);
loginRouter.post('/', itemController.login_check_credinitials);

module.exports = loginRouter;
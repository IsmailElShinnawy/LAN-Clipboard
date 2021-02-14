const express = require('express');
const userController = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.get('/login', userController.login_index);
usersRouter.post('/login', userController.login_check_credinitials);
usersRouter.get('/logout', userController.logout);
usersRouter.delete('/:id', userController.user_delete);

module.exports = usersRouter;
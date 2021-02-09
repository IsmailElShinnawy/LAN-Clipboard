const express = require('express');
const itemController = require('../controllers/itemController');

const itemsRouter = express.Router();

itemsRouter.get('/', itemController.items_index);

module.exports = itemsRouter;
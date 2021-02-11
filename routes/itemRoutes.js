const express = require('express');
const itemController = require('../controllers/itemController');

const itemsRouter = express.Router();

itemsRouter.get('/', itemController.items_index);
itemsRouter.post('/', itemController.item_paste_post);

module.exports = itemsRouter;
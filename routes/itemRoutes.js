const express = require('express');
const itemController = require('../controllers/itemController');

const itemsRouter = express.Router();

itemsRouter.get('/', itemController.items_index);
itemsRouter.post('/', itemController.item_paste_post);
itemsRouter.delete('/:id', itemController.item_delete);
itemsRouter.get('/user/:id', itemController.items_user_get);

module.exports = itemsRouter;
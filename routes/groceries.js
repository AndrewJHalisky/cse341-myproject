const express = require('express');
const router = express.Router();

const userController = require('../controllers/groceries');

router.get('/', userController.getOneGroceries);
router.get('/:id', userController.getMultipleGroceries);
router.post('/', userController.createItem);
router.put('/:id', userController.updateItem);
router.delete('/:id', userController.deleteItem); 

module.exports = router;
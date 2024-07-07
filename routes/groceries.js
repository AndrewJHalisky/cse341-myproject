const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/authentication');

const userController = require('../controllers/groceries');

router.get('/', userController.getOneGroceries);
router.get('/:id', userController.getMultipleGroceries);
router.post('/', isAuthenticated, userController.createItem);
router.put('/:id', isAuthenticated, userController.updateItem);
router.delete('/:id', isAuthenticated, userController.deleteItem); 

module.exports = router;
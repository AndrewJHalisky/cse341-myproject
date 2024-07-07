const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middleware/authentication');

const userController = require('../controllers/media');

router.get('/', userController.getOneMediaItem);
router.get('/:id', userController.getMultipleMediaItems);
router.post('/', isAuthenticated, userController.createMedia);
router.put('/:id', isAuthenticated, userController.updateMedia);
router.delete('/:id', isAuthenticated, userController.deleteMedia); 

module.exports = router;
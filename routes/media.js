const express = require('express');
const router = express.Router();

const userController = require('../controllers/media');

router.get('/', userController.getOneMediaItem);
router.get('/:id', userController.getMultipleMediaItems);
router.post('/', userController.createMedia);
router.put('/:id', userController.updateMedia);
router.delete('/:id', userController.deleteMedia); 

module.exports = router;
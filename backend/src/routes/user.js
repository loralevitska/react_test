const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getFeeds);
router.post('/', userController.create);
router.post('/login', userController.login);

router.get('/users', userController.findAll);
router.get('/users/:id', userController.findById);
router.put('/users/:id', userController.updateById);
router.delete('/users/:id', userController.deleteById);

module.exports = router;

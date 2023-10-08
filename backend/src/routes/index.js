const express = require('express');

const router = express.Router();

const feedController = require('../controllers/feed');
const userController = require('../controllers/user');

router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/checkauth', userController.verifyJwt, userController.checkAuth);

router.get('/users', userController.verifyJwt, userController.findAll);
router.get('/users/:id', userController.verifyJwt, userController.findById);
router.put('/users/:id', userController.verifyJwt, userController.updateById);
router.delete('/users/:id', userController.verifyJwt, userController.deleteById);

router.get('/', feedController.getFeeds);

module.exports = router;

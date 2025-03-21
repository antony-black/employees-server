const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/current', authMiddleware, UserController.getCurrent);

module.exports = router;

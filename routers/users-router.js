const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const { registrationValidation, loginValidation } = require('../validations/auth-validation');
const validationErrorMiddleware = require('../middlewares/validation-error-middleware');

// TODO: add validation middleware

router.post(
  '/registration',
  registrationValidation,
  validationErrorMiddleware,
  UserController.registration,
);
router.post(
  '/login', 
  loginValidation, 
  validationErrorMiddleware, 
  UserController.login
);
router.post('/logout', UserController.logout);
router.get('/current', authMiddleware, UserController.getCurrent);

module.exports = router;

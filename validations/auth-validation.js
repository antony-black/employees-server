const {body} = require("express-validator");

const registrationValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5}),
  body('name').isLength({ min: 3}),
  body('avatarUrl').optional().isURL(),
];

const loginValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5}),
];

module.exports = {
  registrationValidation,
  loginValidation
}
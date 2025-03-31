const { body } = require('express-validator');

const postEmployeeValidation = [
  body('firstName', 'Fill out the field.').isLength({ min: 3 }).isString(),
  body('lastName', 'Fill out the field.').isLength({ min: 3 }).isString(),
  body('adress', 'Fill out the field.').isLength({ min: 3 }).isString(),
  body('age', 'Fill out the field.').isLength({ min: 2 }),
];

module.exports = {
  postEmployeeValidation,
};

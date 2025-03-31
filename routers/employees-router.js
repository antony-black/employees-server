const express = require('express');
const router = express.Router();

const EmployeesController = require('../controllers/emoloyees-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const { postEmployeeValidation } = require('../validations/post-employee-validation');
const validationErrorMiddleware = require('../middlewares/validation-error-middleware');

router.get('/', authMiddleware, EmployeesController.getAllEmployees);
router.get('/:id', authMiddleware, EmployeesController.getSingleEmployee);
router.post(
  '/add',
  authMiddleware,
  postEmployeeValidation,
  validationErrorMiddleware,
  EmployeesController.add,
);
router.delete('/remove/:id', authMiddleware, EmployeesController.remove);
router.put('/edit/:id', authMiddleware, EmployeesController.edit);

module.exports = router;

const EmployeesService = require('../services/employees-service');

class EmployeesController {
  async getAllEmployees(req, res, next) {
    try {
      const employees = await EmployeesService.getAllEmployees();

      res.json(employees);
    } catch (error) {
      console.error('EmployeesController/getUsers: ', error);
    }
  }

  async getSingleEmployee(req, res, next) {
    try {
      const { id } = req.params;

      const employee = await EmployeesService.getSingleEmployee(id);

      res.json(employee);
    } catch (error) {
      console.error('EmployeesController/getSingleEmployee: ', error);
    }
  }

  async add(req, res, next) {
    try {
      const employeeData = req.body;
      const { id } = req.user;

      const employee = await EmployeesService.add(employeeData, id);

      res.json(employee);
    } catch (error) {
      console.error('EmployeesController/add: ', error);
    }
  }

  async edit(req, res, next) {
    try {
      const data = req.body;

      const {id }= req.params;

     const employee = await EmployeesService.edit(data, id);

      res.json(employee);
    } catch (error) {
      console.error('EmployeesController/edit: ', error);
    }
  }

  async remove(req, res, next) {
    try {
      const {id }= req.params;

      const employee = await EmployeesService.remove(id);

      res.json(employee); 
    } catch (error) {
      console.error('EmployeesController/remove: ', error);
    }
  }
}

module.exports = new EmployeesController();

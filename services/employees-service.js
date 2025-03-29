const { prisma } = require('../prisma/prisma-client');

class EmployeesService {
  async getAllEmployees() {
    return await prisma.employee.findMany();
  }

  async getSingleEmployee(id) {
    return await prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async add(employeeData, id) {
    const employee = await prisma.employee.create({
      data: {
        ...employeeData,
        userId: id,
      },
    });

    return employee;
  }

  async edit(data, id) {
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    return employee;
  }

  async remove(id) {
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw new Error(`Employee with not found.`);
    }

    return await prisma.employee.delete({
      where: {
        id,
      },
    });
  }
}

module.exports = new EmployeesService();

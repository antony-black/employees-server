import { Employee } from '@prisma/client';
import { api } from './api';

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
    }),
    getSingleEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employeeData) => ({
        url: '/employees/add',
        method: 'POST',
        body: employeeData,
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: 'DELETE',
        body: id,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetSingleEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation,
} = employeeApi;

export const {
  endpoints: { 
    getAllEmployees, 
    getSingleEmployee, 
    addEmployee, 
    editEmployee, 
    removeEmployee },
} = employeeApi;

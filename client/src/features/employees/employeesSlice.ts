import { Employee } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { employeeApi } from '../../app/services/employees';
import { RootState } from '../../app/store';

interface IinitialState {
  employees: Employee[] | null;
}

const initialState: IinitialState = {
  employees: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(employeeApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});

export const selectEployees = (state: RootState) => state.employees.employees;

export default employeeSlice.reducer;

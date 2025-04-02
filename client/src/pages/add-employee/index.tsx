import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'antd';
import { Employee } from '@prisma/client';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { catchError } from '../../utils/error-util';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { Layout, EmployeeForm } from '../../components';
import { Paths } from '../../paths';

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [addEmployee] = useAddEmployeeMutation();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Paths.login);
    }
  }, [isAuthenticated, navigate]);

  const handleAddEmployee = async (employeeData: Employee) => {
    try {
      await addEmployee(employeeData).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleAddEmployee}
          btnText="Add"
          title="Add employee"
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default AddEmployee;
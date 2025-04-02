import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Employee } from '@prisma/client';
import { Row } from 'antd';
import { useEditEmployeeMutation, useGetSingleEmployeeQuery } from '../../app/services/employees';
import { catchError } from '../../utils/error-util';
import { Layout, EmployeeForm } from '../../components';
import { Paths } from '../../paths';

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleEmployeeQuery(params.id || '');
  const [editEmployee, editEmployeeResult] = useEditEmployeeMutation();
  const [error, setError] = useState<string>('');

  if (isLoading) {
    return <div>...loading</div>;
  }

  const handleEditEmployee = async (employeeData: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employeeData,
      };

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/updated`);
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleEditEmployee}
          title="Edit employee"
          employee={data}
          btnText="Edit"
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default EditEmployee;

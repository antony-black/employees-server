import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row } from "antd";
import { Layout } from "../../components/layout";
import { useEditEmployeeMutation, useGetSingleEmployeeQuery } from "../../app/services/employees";
import { EmployeeForm } from "../../components/employee-form";
import { catchError } from "../../utils/error-util";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";



export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{id: string}>();
  const { data, isLoading } = useGetSingleEmployeeQuery(params.id || "");
  const [editEmployee, editEmployeeResult] = useEditEmployeeMutation();
  const [error, setError] = useState<string>('');

  if (isLoading) {
    return <div>...loading</div>
  }

  const handleEditEmployee = async (employeeData: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employeeData
      }

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/updated`);
    } catch (error) {
      catchError(error, setError);
    }
  }


  return (
    <Layout>
      <Row align='middle' justify='center'>
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
}


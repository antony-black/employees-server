import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomButton } from "../custom-button";

type TEmployeeForm<T> = {
  onFinish: (value: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
}


export const EmployeeForm: React.FC<TEmployeeForm<Employee>> = ({
  onFinish,
  btnText,
  title,
  error,
  employee
}) => {
  return (
    <Card title={title} style={{width: '30rem'}}>
      <Form name="add-employee" onFinish={onFinish} initialValues={employee}>
        <CustomInput type='text' name='firstName' placeholder="first name"/>
        <CustomInput type='text' name='lastName' placeholder="last name"/>
        <CustomInput type='text' name='adress' placeholder="adress"/>
        <CustomInput type='number' name='age' placeholder="age"/>
        <Space direction='vertical' size='large'>
          <ErrorMessage message={error}/>
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
}


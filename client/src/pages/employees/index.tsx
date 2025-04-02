import { useNavigate } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Employee } from '@prisma/client';
import { useGetAllEmployeesQuery } from '../../app/services/employees';
import { Layout, CustomButton } from '../../components';
import { Paths } from '../../paths';

const columns: ColumnsType<Employee> = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Address',
    dataIndex: 'adress',
    key: 'adress',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
];

const Employees: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllEmployeesQuery();

  const goToAddEmployee= () => navigate(Paths.employeesAdd);

  return (
    <Layout>
      <CustomButton type="primary" onClick={goToAddEmployee} icon={<PlusCircleOutlined />}>
        Add
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(employee) => employee.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(employee) => {
          return {
            onClick: () => navigate(`${Paths.employees}/${employee.id}`)
          }
        }}
      ></Table>
    </Layout>
  );
};

export default Employees;

import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useGetSingleEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { Paths } from '../../paths';
import { catchError } from '../../utils/error-util';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/authSlice';
import { Layout, CustomButton, ErrorMessage } from '../../components';

const Employee = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (!data) {
    return <Navigate to={Paths.home} />;
  }

  const handleShowModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRemoveEmployee = async () => {
    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <Layout>
      <Descriptions title="Employee info" bordered>
        <Descriptions.Item label="Name" span={3}>
          {`${data?.firstName} ${data?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {data?.age}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {data?.adress}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">What's next?</Divider>
          <Space>
            <Link to={`${Paths.employeesEdit}/${data.id}`}>
              <CustomButton 
              shape="round" 
              type="default" 
              icon={<EditOutlined 
              />}>
                Edit
              </CustomButton>
            </Link>
            <CustomButton shape="round" danger onClick={handleShowModal} icon={<DeleteOutlined />}>
              Remove
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Would you like to delete this employee?"
        open={isModalOpen}
        onOk={handleRemoveEmployee}
        onCancel={handleShowModal}
        okText="Yes"
        cancelText="No"></Modal>
    </Layout>
  );
};

export default Employee;
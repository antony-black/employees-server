import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Card, Space, Typography } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/auth/authSlice';
import { TUserData, useRegistrationMutation } from '../../app/services/auth';
import { catchError } from '../../utils/error-util';
import {
  Layout,
  CustomButton,
  CustomInput,
  PasswordInput,
  ErrorMessage,
} from '../../components';
import { Paths } from '../../paths';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [error, setError] = useState<string>('');
  const [getUserRegistration, registrationResult] = useRegistrationMutation();

  useEffect(() => {
    if (user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);

  const registration = async (userData: TUserData) => {
    await getUserRegistration(userData).unwrap();

    navigate(Paths.login);
    try {
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Registration" style={{ width: '30rem' }}>
          <Form onFinish={registration}>
            <CustomInput type="name" name="name" placeholder="name" />
            <CustomInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <PasswordInput name="confirmPassword" placeholder="repeat password" />
            <CustomButton type="primary" htmlType="submit" loading={registrationResult.isLoading}>
              Registration
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have got already registration? <Link to={Paths.login}>Login</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;

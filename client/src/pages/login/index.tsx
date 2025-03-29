import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input';
import { CustomButton } from '../../components/custom-button';
import { Paths } from '../../paths';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { TUserData, useLoginMutation } from '../../app/services/auth';
import { catchError } from '../../utils/error-util';
import { ErrorMessage } from '../../components/error-message';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [error, setError] = useState<string>('');
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Paths.home);
    }
  }, [isAuthenticated, navigate]);

  const login = async (userData: TUserData) => {
    try {
      await loginUser(userData).unwrap();

      navigate(Paths.home);
    } catch (error) {
      catchError(error, setError);
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <CustomButton type="primary" htmlType="submit" loading={loginUserResult.isLoading}>
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Still have not registration? <Link to={Paths.registration}>Get registration</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

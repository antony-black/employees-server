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
import { selectUser } from '../../features/auth/authSlice';
import { TUserData, useLoginMutation } from '../../app/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { ErrorMessage } from '../../components/error-message';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [error, setError] = useState('');
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const login = async (data: TUserData) => {
    try {
      await loginUser(data).unwrap();

      navigate('/');
    } catch (error) {
      const isErorHasMessage = isErrorWithMessage(error);

      if (isErorHasMessage) {
        setError(error.data.message);
      } else {
        setError("Unknown error.");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="password" />
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Still have not registration? <Link to={Paths.registration}>Get registration</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

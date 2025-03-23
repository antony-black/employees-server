import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input';
import { CustomButton } from '../../components/custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Login: React.FC = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Login' style={{width: '30rem'}}>
          <Form onFinish={() => null}>
            <CustomInput type='email' name='email' placeholder='email'/>
            <PasswordInput name='password' placeholder='password'/>
            <CustomButton type='primary' htmlType='submit'>Login</CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Still have not registration? <Link to={Paths.registration}>Get registration</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

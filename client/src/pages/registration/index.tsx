import {Link } from "react-router-dom";
import {Form, Row, Card, Space, Typography } from "antd";
import { Layout } from '../../components/layout';
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input";
import { Paths } from "../../paths";


export const Registration: React.FC = () => {
  return (
    <Layout>
    <Row align='middle' justify='center'>
      <Card title='Registration' style={{width: '30rem'}}>
        <Form onFinish={() => null}>
          <CustomInput type='name' name='name' placeholder='name'/>
          <CustomInput type='email' name='email' placeholder='email'/>
          <PasswordInput name='password' placeholder='password'/>
          <PasswordInput name='confirmPassword' placeholder='repeat password'/>
          <CustomButton type='primary' htmlType='submit'>Registration</CustomButton>
        </Form>
        <Space direction='vertical' size='large'>
          <Typography.Text>
            Have got already registration? <Link to={Paths.login}>Login</Link>
          </Typography.Text>
        </Space>
      </Card>
    </Row>
  </Layout>
  );
}


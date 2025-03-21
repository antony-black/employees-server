import { Link } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import { CustomButton } from '../custom-button';
import { Paths } from '../../paths';

export const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="link">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};

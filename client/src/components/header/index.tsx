import { Link, useNavigate } from 'react-router-dom';
import { Layout, Space, Typography } from 'antd';
import { LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import { CustomButton } from '../custom-button';
import { Paths } from '../../paths';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

export const Header: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  // const dispatch = useAppDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate(Paths.login);
  };

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
      {isAuthenticated ? (
        <Space>
          <CustomButton type="link" icon={<LogoutOutlined />} onClick={handleLogout}>
            <Typography.Title>Logout</Typography.Title>
          </CustomButton>
        </Space>
      ) : (
        <Space>
          <Link to={Paths.registration}>
            <CustomButton type="link">
              <Typography.Title level={5}>Registration</Typography.Title>
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="link">
              <Typography.Title level={5}>Login</Typography.Title>
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

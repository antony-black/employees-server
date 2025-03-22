import { Layout as AntLayout } from 'antd';
import styles from './layout.module.css';
import { Header } from '../header';
type TLayout = {
  children: React.ReactNode;
};

export const Layout: React.FC<TLayout> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header/>
      <AntLayout.Content style={{height: '100%'}}>
        {children}
      </AntLayout.Content>
    </div>
  );
};

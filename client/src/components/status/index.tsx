import { Result, Row } from 'antd';
import { CustomButton } from '../custom-button';
import { Link, useParams } from 'react-router-dom';
import { Paths } from '../../paths';
import { Statuses } from '../statuses';

export const Status: React.FC = () => {
  const {status} = useParams();

  return (
    <Row align="middle" justify="center" style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'Something goes wrong.'}
        extra={[
          <Link to={Paths.home} key={Paths.home}>
            <CustomButton type='dashed'>Employees table</CustomButton>
          </Link>,
        ]}
      />
    </Row>
  );
};

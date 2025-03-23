import { Form, Input } from 'antd';

type TCustomInput = {
  name: string;
  placeholder: string;
  type: string;
};

export const CustomInput: React.FC<TCustomInput> = ({
  name,
  placeholder,
  type = 'text'
}) => {
  return (
    <Form.Item
      name={name}
      rules={[{required: true, message: 'Required field.'}]}
      shouldUpdate={true}
    >
      <Input 
        type={type}
        placeholder={placeholder}
        size='large'
      />
    </Form.Item>
  );
};

import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type TPasswordInput = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
}

export const PasswordInput: React.FC<TPasswordInput> = ({
  name,
  placeholder,
  dependencies
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[{
        required: true,
        message: 'Required field.'
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value ) {
            return Promise.resolve();
          }

          if (name === 'confirmPassword') {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error('Passwords must match.')
            );
          } else {
            if (value.length < 6) {
              return Promise.reject(
                new Error('Password length must be at least 6 symbols.')
              );
            }

            return Promise.resolve();
          }
        },
      }),
    ]}
    >
      <Input.Password placeholder={placeholder} size="large"/>
    </Form.Item>
  );
}

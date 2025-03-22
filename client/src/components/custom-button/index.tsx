import { Button, Form } from "antd";

type TCustomButton = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  type: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  shape?: "default" | "circle" | "round" | undefined;
  danger?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const CustomButton: React.FC<TCustomButton> = ({
  children,
  icon,
  htmlType = "button",
  type,
  shape,
  danger,
  loading,
  onClick
}) => {
  return (
    <Form.Item>
      <Button
      icon={icon}
      htmlType={htmlType}
      type={type}
      shape={shape}
      danger={danger}
      loading={loading}
      >
        {children}
      </Button>
    </Form.Item>
  )
};

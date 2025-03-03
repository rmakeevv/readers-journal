import { Button, Form, Input } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';

type FieldType = {
    username?: string;
    password?: string;
};

interface AuthFormProps {
    onFinish: (values: FieldType) => void;
    onFinishFailed: (errorInfo: ValidateErrorEntity<FieldType>) => void;
}

export default function AuthForm({ onFinish, onFinishFailed }: AuthFormProps) {
    return (
        <Form
            name="basic"
            style={{ maxWidth: '400px' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item<FieldType>
                label="Имя пользователя"
                name="username"
                rules={[
                    { required: true, message: 'Пожалуйста, укажите логин!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[
                    { required: true, message: 'Пожалуйста, укажите пароль!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" size="middle">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
}

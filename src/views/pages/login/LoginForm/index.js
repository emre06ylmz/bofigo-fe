import React, {useEffect, useRef } from 'react'
import { useAuthentication } from "../../../../Authentication";
import { Form, Input, Button, Checkbox, Card } from 'antd';
import "./style.css"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function LoginForm(){
    const form = useRef(null);
    const { login, loggingIn, isAuthenticated } = useAuthentication();

    const onFinish = values => {
        login(values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        isAuthenticated();
    }, []);

    return(
        <div className="panel-login-form-container">
            <Card title="Login Ekranı" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Kullanıcı"
                        name="name"
                        rules={[{ required: true, message: 'Kullanıcı adı giriniz!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Şifre"
                        name="password"
                        rules={[{ required: true, message: 'Şifre giriniz!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Beni Hatırla</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit"> LOGIN </Button>
                    </Form.Item>
                </Form>
            </Card>

            
        </div>
    );
}


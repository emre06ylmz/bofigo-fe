import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';
  import { QuestionCircleOutlined } from '@ant-design/icons';
  import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../utils/formUtil';

  const { Option } = Select;
  
  const residences = [
    {
      value: 'turkey',
      label: 'Türkiye',
      children: [
        {
          value: 'ankara',
          label: 'Ankara',
          children: [
            {
              value: 'etimesgut',
              label: 'Etimesgut',
            },
            {
                value: 'balgat',
                label: 'Balgat',
              }
          ],
          
        },
        {
            value: 'istanbul',
            label: 'İstanbul',
            children: [
              {
                value: 'tuzla',
                label: 'Tuzla',
              },
              {
                  value: 'pendik',
                  label: 'Pendik',
                }
            ],
            
          }
      ],
    }
  ];

  const TestPage = () => {
    const [form] = Form.useForm();
  
    const onFinish = values => {
      console.log('Received values of form: ', values);
    };
  
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="90">+90</Option>
        </Select>
      </Form.Item>
    );
  
    return (
      <Form
        {...FORM_ITEM_LAYOUT}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="nickname"
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            { type: 'array', required: true, message: 'Please select your habitual residence!' },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
  
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>
  
        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: 'Please input website!' }]}
        >
          <AutoComplete placeholder="website">
            <Input />
          </AutoComplete>
        </Form.Item>
  
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
  
        <Form.Item name="agreement" valuePropName="checked" {...TAIL_FORM_ITEM_LAYOUT}>
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
          <Button type="primary" htmlType="submit">
          Kaydet
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default TestPage;

import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import callApi from "../../../../utils/callApi";
import { ENDPOINT } from "../UserPage"
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;


export default function UserForm(props) {
  const form = useRef(null);
  const [userTypeList, setUserTypeList] = useState([]);

  useEffect(() => {
    getUserTypes();
  }, []);

  async function getUserTypes() {
    let response = await callApi({
      endpoint: `/api/usertypes`,
      method: "GET"
    });
    if (response) {
      setUserTypeList(response);
    }
  }

  async function onFinish(values) {
    try {
      let response = await callApi({
        endpoint: ENDPOINT,
        method: "POST",
        body: values
      });
      if (response) {
        message.success("Kayıt işlemi başarıyla tamamlandı.");
        props.handleClose();
        getUserTypes();
      }
    } catch (error) {
      message.error(error && error.messages);
    }
  }

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
      ref={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your Username!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your Name!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="surname"
        label="Surname"
        rules={[
          {
            required: true,
            message: "Please input your Surname"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: "Please input your Role!"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="userTypeId"
        label="User Type"
        rules={[
          {
            required: true,
            message: "Please select your User Type!"
          }
        ]}
      >
        <Select>
          {userTypeList.map(item => (
            <Option value={item.id}> {item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

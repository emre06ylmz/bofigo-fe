import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import callApi from "../../../../utils/callApi";
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function UserUpdateForm(props) {
  const form = useRef(null);
  const [userTypeList, setUserTypeList] = useState([]);

  function setFormValues(data) {
    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  useEffect(() => {
    getUserTypes();
    setFormValues(props.data);
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
      const { id } = props.data;
      let response = await callApi({
        endpoint: `/api/users/${id}`,
        method: "PUT",
        body: values
      });
      if (response) {
        message.success("Kayıt güncelleme başarıyla tamamlandı.");
        props.handleClose();
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
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your FirstName!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your LastName!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input />
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
        <Select defaultValue={props.data.userType.id}>
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

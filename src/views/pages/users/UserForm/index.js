import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import callApi from "../../../../utils/callApi";
import { ENDPOINT } from "../UserPage"
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_USERTYPE } from '../../usertypes/UserTypePage';

const { Option } = Select;


export default function UserForm(props) {
  const form = useRef(null);
  const [roleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      let roleResponse = await callApi({ endpoint: ENDPOINT_USERTYPE });
      setRoleList(roleResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
        getData();
      }
    } catch (error) {
      //message.error(error && error.messages);
    }
  }

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
        name="password"
        label="Şifre"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Rol"
        rules={[
          {
            required: true,
            message: "Please select your User Role"
          }
        ]}
      >
        <Select>
          {roleList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
        Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

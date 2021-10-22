import React, { useRef } from "react";
import { Form, Input, Button, message, Select } from "antd";
import callApi from "../../../../utils/callApi";
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function MenuForm(props) {
  const form = useRef(null);

  var items = [];
  for (let i = 0; i < props.mainMenuList.length; i++) {
    items.push(
      <Option key={props.mainMenuList[i].id}>
        {props.mainMenuList[i].name}
      </Option>
    );
  }
  const [mainMenuList] = items;

  const onFinish = async values => {
    try {
      let response = await callApi({
        endpoint: "/api/menus",
        method: "POST",
        body: values
      });
      if (response) {
        message.success("Kayıt işlemi başarıyla tamamlandı.");
        props.handleClose();
      }
    } catch (error) {
      //message.error(error.toString());
    }
  };

  return (
    <Form
      {...FORM_ITEM_LAYOUT}
      ref={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
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
        name="route"
        label="Route"
        rules={[
          {
            required: true,
            message: "Please input your Route!"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="detail"
        label="Detail"
        rules={[
          {
            required: true,
            message: "The input is not valid Detail!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="parentId" label="Parent">
        <Select>{mainMenuList}</Select>
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
        Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

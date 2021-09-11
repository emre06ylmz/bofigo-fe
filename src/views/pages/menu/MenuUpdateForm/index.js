import React, { useRef, useEffect } from "react";
import { Form, Input, Button, message, Select } from "antd";
import callApi from "../../../../utils/callApi";
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function MenuUpdateForm(props) {
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

  console.log(props.data);
  //const [selectedParent] = 1//;props.data.parent.id;

  function setFormValues(values) {
    form.current.setFieldsValue(values);
  }

  useEffect(() => {
    setFormValues(props.data);
  });

  const onFinish = async values => {
    try {
      values.parentId = Number(values.parentId.key);
      let response = await callApi({
        endpoint: `/api/menus/${props.data.id}`,
        method: "PUT",
        body: values
      });
      if (response) {
        message.success("Güncelleme işlemi başarıyla tamamlandı.");
        props.handleClose();
      }
    } catch (error) {
      //message.error(error.messages);
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
        <Select
          labelInValue
          defaultValue={{
            key: props.data.parent ? props.data.parent.name : ""
          }}
        >
          {mainMenuList}
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

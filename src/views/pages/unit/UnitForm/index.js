import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import callApi from "../../../../utils/callApi";
import { ENDPOINT } from "../UnitPage"
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function UnitForm(props) {
  const form = useRef(null);

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
        name="name"
        label="Birim Name"
        rules={[
          {
            required: true,
            message: "Please input Name!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="explanation"
        label="Açıklama"
        rules={[
          {
            required: true,
            message: "Please input Explanation!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>

        <Button type="primary" htmlType="submit">
        Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

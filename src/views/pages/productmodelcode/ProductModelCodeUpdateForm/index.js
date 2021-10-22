import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import callApi from "../../../../utils/callApi";
import { ENDPOINT } from "../ProductModelCodePage"
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;


export default function ProductModelCodeUpdateForm(props) {
  const form = useRef(null);

  function setFormValues(data) {
    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  useEffect(() => {
    setFormValues(props.data);
  }, []);

  async function onFinish(values) {
    try {
      const { id } = props.data;
      let response = await callApi({
        endpoint: `${ENDPOINT}/${id}`,
        method: "PUT",
        body: values
      });
      if (response) {
        message.success("Kayıt güncelleme başarıyla tamamlandı.");
        props.handleClose();
      }
    } catch (error) {
      //call api katmanında handle edeilecek
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
        label="Kategori Adı"
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

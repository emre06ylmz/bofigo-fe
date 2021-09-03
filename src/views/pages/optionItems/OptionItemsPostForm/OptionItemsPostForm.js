import React, { useRef } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import callApi from "../../../../utils/callApi";

export default function OptionItemsPostForm(props) {
  const form = useRef(null);

  function reset(e) {
    form.current.resetFields();
  }

  const onFinish = async (values) => {
    try {
      const { parentId } = props;
      values = { ...values, parentId: Number(parentId) };
      let response = await callApi({
        endpoint: `/api/option/items`,
        method: "POST",
        body: values,
      });
      if (response) {
        message.success("Kayıt işlemi başarıyla tamamlandı.");
        props.handleClose();
      }
    } catch (error) {
      message.error(error.toString());
    }
  };

  return (
    <Form ref={form} name="options-register" onFinish={onFinish}>
      <Form.Item
        name="name_TR"
        label="Name TR"
        rules={[
          {
            required: true,
            message: "Please input your Name TR!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name_EN"
        label="Name EN"
        rules={[
          {
            required: true,
            message: "Please input your Name EN!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name_FR"
        label="Name FR"
        rules={[
          {
            required: true,
            message: "Please input your Name FR!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name_AR"
        label="Name AR"
        rules={[
          {
            required: true,
            message: "Please input your Name AR!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Row gutter={24}>
        <Col>
          <Form.Item>
            <Button type="primary" onClick={reset}>
              Temizle
            </Button>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

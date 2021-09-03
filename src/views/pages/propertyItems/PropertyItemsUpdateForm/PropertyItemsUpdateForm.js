import React, { useRef, useEffect } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import callApi from "../../../../utils/callApi";

export default function PropertyItemsUpdateForm(props) {
  const form = useRef(null);

  function setFormValues(data) {
    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  useEffect(() => {
    setFormValues(props.data);
  }, []);

  function reset(e) {
    form.current.resetFields();
  }

  const onFinish = async (values) => {
    try {
      const { id } = props.data;
      const { parentId } = props;
      values = { ...values, parentId: Number(parentId) };
      let response = await callApi({
        endpoint: `/api/property/items/${id}`,
        method: "PUT",
        body: values,
      });
      if (response) {
        message.success("Kayıt güncelleme işlemi başarıyla tamamlandı.");
        props.handleClose();
      }
    } catch (error) {
      message.error(error.toString());
    }
  };

  return (
    <Form ref={form} name="propertyItems-update-form" onFinish={onFinish}>
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

import React, { useRef, useEffect } from "react";
import { Form, Input, Button, Row, Col, Tabs, message, Select } from "antd";
import callApi from "../../../utils/callApi";

const { TabPane } = Tabs;
const { Option } = Select;

export default function IyzicoSettings(props) {
  const form = useRef(null);

  function setFormValues(values) {
    form.current.setFieldsValue(values);
  }

  useEffect(() => {
    getData();
  });

  async function getData() {
    try {
      let response = await callApi({ endpoint: "/api/settings/iyzico" });
      if (response) {
        setFormValues(response);
      }
    } catch (error) {
      message.error(error.messages);
    }
  }

  async function onFinish(values) {
    try {
      let response = await callApi({
        endpoint: "/api/settings/iyzico",
        method: "PUT",
        body: values
      });
      if (response) {
        message.success("Güncelleme işlemi başarıyla tamamlandı.");
        getData();
      }
    } catch (error) {
      message.error(error.messages);
    }
  }

  function reset(e) {
    form.current.resetFields();
  }

  return (
    <Tabs>
      <TabPane tab="Genel Bilgiler" key="1">
        <Form ref={form} name="IyzicoSettingsForm" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <label>Entegrasyon ismi</label>
                <Form.Item
                  name="integrationName"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Entegrasyon ismi giriniz!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Kodlama Anahtarı</label>
                <Form.Item
                  name="masterKey"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Kodlama Anahtarı ismi giriniz!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item>
                <label>Dönüş Adresi</label>
                <Form.Item
                  name="returnAddress"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Dönüş Adresi ismi giriniz!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <label>Entegrasyon ismi Test</label>
                <Form.Item
                  name="integrationNameTest"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Entegrasyon ismi Test giriniz!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Kodlama Anahtarı Test</label>
                <Form.Item
                  name="masterKeyTest"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Kodlama Anahtarı Test ismi giriniz!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item>
                <label>Dönüş Adresi Test</label>
                <Form.Item
                  name="returnAddressTest"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Dönüş Adresi Test ismi giriniz!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
            <Form.Item>
                <label>Ortam</label>
                <Form.Item
                name="environment"
                label="Ortam"
                noStyle
                rules={[
                    {
                    required: true,
                    message: "Dönüş Adresi Test ismi giriniz!"
                }
                ]}
                >
                <Select>
                    <Option value="TEST">TEST</Option>
                    <Option value="LIVE">LIVE</Option>
                </Select>
              </Form.Item>
              </Form.Item>

            </Col>

          </Row>

          <Row gutter={24}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Kaydet
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="secondary" onClick={reset}>
                  Temizle
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </TabPane>
    </Tabs>
  );
}

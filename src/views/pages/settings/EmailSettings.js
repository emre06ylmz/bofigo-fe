import React, { useRef, useEffect } from "react";
import { Form, Input, Button, Row, Col, Tabs, message, Select } from "antd";
import callApi from "../../../utils/callApi";

import { withLocalize, Translate } from "react-localize-redux";
import translations_en from "./translations/en.json";
import translations_tr from "./translations/tr.json";

const { TabPane } = Tabs;
const { Option } = Select;

export function EmailSettings(props) {
  const form = useRef(null);

  props.addTranslationForLanguage(translations_en, "en");
  props.addTranslationForLanguage(translations_tr, "tr");

  function setFormValues(values) {
    form.current.setFieldsValue(values);
  }

  useEffect(() => {
    getEmailData();
  });

  async function getEmailData() {
    try {
      let response = await callApi({ endpoint: "/api/settings/email" });
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
        endpoint: "/api/settings/email",
        method: "PUT",
        body: values,
      });
      if (response) {
        message.success("Güncelleme işlemi başarıyla tamamlandı.");
        getEmailData();
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
        <Form ref={form} name="emailSettingsForm" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <label>
                  <Translate id="email.form.mailAddress" />
                </label>
                <Form.Item
                  name="mailAddress"
                  noStyle
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>
                  <Translate id="email.form.mailPassword" />
                </label>
                <Form.Item
                  name="mailPassword"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Mail Server</label>
                <Form.Item name="mailServer" noStyle>
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <label>Mail Port</label>
                <Form.Item name="mailPort" noStyle>
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Sipariş Maillerinin Gönderim Adresi</label>
                <Form.Item
                  name="mailAddressOrder"
                  noStyle
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Diğer Maillerin Gönderim Adresi</label>
                <Form.Item
                  name="mailAddressOther"
                  noStyle
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
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
                <label>Yönetici Mail Adresi 1</label>
                <Form.Item
                  name="mailAddressAdmin"
                  noStyle
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Yönetici Mail Adresi 2</label>
                <Form.Item
                  name="mailAddressAdmin2"
                  noStyle
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <label>Şifreli Bağlantı</label>
                <Form.Item name="mailSecureConnection" noStyle>
                  <Select>
                    <Option value="HTTPS">HTTPS</Option>
                    <Option value="TLS">TLS</Option>
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

export default withLocalize(EmailSettings);

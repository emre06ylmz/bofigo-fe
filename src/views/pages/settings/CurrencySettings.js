import React, { useRef, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Tabs, message, Select } from 'antd';
import callApi from '../../../utils/callApi';

const { TabPane } = Tabs;
const ENDPOINT = '/api/settings/currency';

export function CurrencySettings(props) {
  const form = useRef(null);

  function setFormValues(values) {
    form.current.setFieldsValue(values);
  }

  useEffect(() => {
    getCurrencyData();
  });

  async function getCurrencyData() {
    try {
      let response = await callApi({ endpoint: ENDPOINT });
      if (response && response.data) {
        setFormValues(response.data[0]);
      }
    } catch (error) {
      //message.error(error.messages);
    }
  }

  async function onFinish(values) {
    try {
      let response = await callApi({
        endpoint: ENDPOINT,
        method: 'PUT',
        body: values,
      });
      if (response) {
        message.success('Güncelleme işlemi başarıyla tamamlandı.');
        getCurrencyData();
      }
    } catch (error) {
      //message.error(error.messages);
    }
  }

  function reset(e) {
    form.current.resetFields();
  }

  return (
    <Form ref={form} name="currencySettingsForm" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item>
            <label>Dolar</label>
            <Form.Item
              label="Dolar"
              name="dollar"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input Dollar!',
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
            <label>Euro</label>
            <Form.Item
              label="Euro"
              name="euro"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input Euro!',
                },
              ]}
            >
              <Input />
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
  );
}

export default CurrencySettings;

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import callApi from '../../../../utils/callApi';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_PRODUCT } from '../../product/ProductPage';
import { ENDPOINT } from '../ProducionPage';

const { Option } = Select;

export default function ProductUpdateForm(props) {
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const [productList, setProductList] = useState([]);

  function setFormValues(data) {
    data.productId = data.product.id;

    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  async function getData() {
    try {
      setLoading(true);
      let productResponse = await callApi({ endpoint: ENDPOINT_PRODUCT });
      setProductList(productResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
    setFormValues(props.data);
  }, []);

  async function onFinish(values) {
    try {
      const { id } = props.data;
      let response = await callApi({
        endpoint: `${ENDPOINT}/${id}`,
        method: 'PUT',
        body: values,
      });
      if (response) {
        message.success('Kayıt güncelleme başarıyla tamamlandı.');
        props.handleClose();
      }
    } catch (error) {
      //call api katmanında handle edeilecek
    }
  }
  
  return (
    <Form {...FORM_ITEM_LAYOUT} ref={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="productId" label="Ürün">
        <Select defaultValue={props.data.product.id}>
          {productList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="count"
        label="Miktar"
        rules={[
          {
            required: true,
            message: 'Please input Amount!',
          },
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
            message: 'Please input Explanation!',
          },
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

export { ENDPOINT };

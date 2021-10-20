import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import callApi from '../../../../utils/callApi';
import { ENDPOINT } from '../ProductSalePage';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_PRODUCTCATEGORY } from '../../productcategory/ProductCategoryPage';
import { ENDPOINT as ENDPOINT_PRODUCTMODELCODE } from '../../productmodelcode/ProductModelCodePage';

const { Option } = Select;

export default function ProductForm(props) {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);

  const [productCategoryList, setProductCategoryList] = useState([]);
  const [productModelCodeList, setProductModelCodeList] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      let productCategoryResponse = await callApi({ endpoint: ENDPOINT_PRODUCTCATEGORY });
      setProductCategoryList(productCategoryResponse.data);

      let productModelCodeResponse = await callApi({ endpoint: ENDPOINT_PRODUCTMODELCODE });
      setProductModelCodeList(productModelCodeResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function onFinish(values) {
    values.cost_TL = 0;
    values.cost_USD = 0;
    values.cost_EURO = 0;
    values.stock = 0;
    try {
      let response = await callApi({
        endpoint: ENDPOINT,
        method: 'POST',
        body: values,
      });
      if (response) {
        message.success('Kayıt işlemi başarıyla tamamlandı.');
        props.handleClose();
      }
    } catch (error) {
      //message.error(error && error.messages);
    }
  }

  return (
    <Form {...FORM_ITEM_LAYOUT} ref={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="productCategoryId" label="Ürün Kategori">
        <Select>
          {productCategoryList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item name="productModelCodeId" label="Model Kodu">
        <Select>
          {productModelCodeList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input Name!',
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
      <Form.Item
        name="tax"
        label="KDV"
        rules={[
          {
            required: true,
            message: 'Please input Tax!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="cargo"
        label="Kargo"
        rules={[
          {
            required: true,
            message: 'Please input Kargo!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="barcode"
        label="Barkod"
        rules={[
          {
            required: true,
            message: 'Please input Barcode!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stok"
        rules={[
          {
            required: true,
            message: 'Please input Stok!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

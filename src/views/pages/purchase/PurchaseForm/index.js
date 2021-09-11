import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import callApi from '../../../../utils/callApi';
import { ENDPOINT } from '../PurchasePage';

import { ENDPOINT as ENDPOINT_RAWMATERIAL } from '../../rawmaterial/RawMaterialPage';
import { ENDPOINT as ENDPOINT_SUPPLIER } from '../../supplier/SupplierPage';

import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function PurchaseForm(props) {
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [unit, setUnit] = useState([]);
  const [rawMaterialList, setRawMaterialList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      let url = window.location.href;
      const rawMaterialId = url.substring(url.lastIndexOf('/') + 1);

      let rawMaterialSelectedResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIAL + '/' + rawMaterialId });
      setRawMaterial(rawMaterialSelectedResponse.data);
      setUnit(rawMaterialSelectedResponse.data.unit);

      let rawMaterialResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIAL });
      setRawMaterialList(rawMaterialResponse.data);

      let supplierResponse = await callApi({ endpoint: ENDPOINT_SUPPLIER });
      setSupplierList(supplierResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function onFinish(values) {
    try {
      values.rawMaterialId = rawMaterial.id;
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
      <Form.Item label="Hammadde Adı">
        <span className="ant-form-text"> {rawMaterial.name} </span>
      </Form.Item>

      <Form.Item name="supplierId" label="Tedarikçi">
        <Select>
          {supplierList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="price"
        label="Fiyat"
        rules={[
          {
            required: true,
            message: 'Please input Price!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="amount"
        label="Miktar"
        rules={[
          {
            required: true,
            message: 'Please input Amount!',
          },
        ]}
      >
        <Input addonAfter={unit.name} />
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import callApi from '../../../../utils/callApi';
import { ENDPOINT } from '../RawMaterialPage';

import { ENDPOINT as ENDPOINT_RAWMATERIALCATEGORY } from '../../rawmaterialcategory/RawMaterialCategoryPage';
import { ENDPOINT as ENDPOINT_UNIT } from '../../unit/UnitPage';

import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function RawMaterialForm(props) {
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const [rawMaterialCategoryList, setRawMaterialCategoryList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [selectedRawMaterialCategory, setSelectedRawMaterialCategory] = useState([]);

  async function getData() {
    try {
      setLoading(true);

      let url = window.location.href;
      const categoryId = url.substring(url.lastIndexOf('/') + 1);

      if (!isNaN(categoryId)) {
        let selectedRawMaterialCategoryResponse = await callApi({
          endpoint: ENDPOINT_RAWMATERIALCATEGORY + '/' + categoryId,
        });
        setSelectedRawMaterialCategory(selectedRawMaterialCategoryResponse.data);
      }

      let rawMaterialCategoryResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIALCATEGORY });
      setRawMaterialCategoryList(rawMaterialCategoryResponse.data);

      let unitResponse = await callApi({ endpoint: ENDPOINT_UNIT });
      setUnitList(unitResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function onFinish(values) {
    values.stock = 0;
    values.lastPrice = 0;
    debugger;
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
      <Form.Item
        name="name"
        label="Hammadde Adı"
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

      <Form.Item name="rawMaterialCategoryId" label="Kategori">
        <Select defaultValue={selectedRawMaterialCategory.id}>
          {rawMaterialCategoryList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item name="unitId" label="Birim">
        <Select>
          {unitList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item name="selectedCurrency" label="Para Birimi">
        <Select>
          <Option value="TL">TL</Option>
          <Option value="USD">USD</Option>
          <Option value="EURO">EURO</Option>
        </Select>
      </Form.Item>

      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

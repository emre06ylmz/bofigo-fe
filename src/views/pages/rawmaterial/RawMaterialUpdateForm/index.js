import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import callApi from '../../../../utils/callApi';

import { ENDPOINT } from '../RawMaterialPage';
import { ENDPOINT as ENDPOINT_RAWMATERIALCATEGORY } from '../../rawmaterialcategory/RawMaterialCategoryPage';
import { ENDPOINT as ENDPOINT_UNIT } from '../../unit/UnitPage';

import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';

const { Option } = Select;

export default function RawMaterialUpdateForm(props) {
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const [rawMaterialCategoryList, setRawMaterialCategoryList] = useState([]);
  const [unitList, setUnitList] = useState([]);

  async function getData() {
    try {
      setLoading(true);

      let rawMaterialCategoryResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIALCATEGORY });
      setRawMaterialCategoryList(rawMaterialCategoryResponse.data);

      let unitResponse = await callApi({ endpoint: ENDPOINT_UNIT });
      setUnitList(unitResponse.data);
    } finally {
      setLoading(false);
    }
  }

  function setFormValues(data) {
    data.rawMaterialCategoryId = data.rawMaterialCategory.id;
    data.unitId = data.unit.id;
    form.current.resetFields();
    form.current.setFieldsValue(data);
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
      <Form.Item
        name="name"
        label="Hammamde Adı"
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
        <Select>
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

      <Form.Item name="stock" label="Stok">
        <Input disabled />
      </Form.Item>

      <Form.Item name="lastPrice" label="Son Fiyat">
        <Input disabled />
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
        Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

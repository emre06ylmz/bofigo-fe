import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import callApi from '../../../../utils/callApi';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_RAWMATERIALCATEGORY } from '../../rawmaterialcategory/RawMaterialCategoryPage';
import { ENDPOINT as ENDPOINT_RAWMATERIAL } from '../../rawmaterial/RawMaterialPage';
const ENDPOINT = '/api/productmaterial';

const { Option } = Select;

export default function ProductUpdateForm(props) {
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const [unit, setUnit] = useState([]);
  const [rawMaterialCategoryList, setRawMaterialCategoryList] = useState([]);
  const [rawMaterialList, setRawMaterialList] = useState([]);

  function setFormValues(data) {
    data.rawMaterialId = data.rawMaterial.id;
    data.rawMaterialCategoryId = data.rawMaterialCategory.id;

    handleChange(data.rawMaterialCategoryId);
    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  async function getData() {
    try {
      setLoading(true);
      let rawMaterialCategoryResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIALCATEGORY });
      setRawMaterialCategoryList(rawMaterialCategoryResponse.data);
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
      values.productId = id;
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

  async function handleChange(rawMaterialCategoryId) {
    try {
      setLoading(true);
      let rawMaterialResponse = await callApi({
        endpoint: ENDPOINT_RAWMATERIAL + '/listByCategoryId/' + rawMaterialCategoryId,
      });
      setRawMaterialList(rawMaterialResponse.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeRawMaterial(rawMaterialId) {
    const rawMaterial = rawMaterialList.find(u => u.id === rawMaterialId);
    setUnit(rawMaterial.unit);
  }

  return (
    <Form {...FORM_ITEM_LAYOUT} ref={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="rawMaterialCategoryId" label="Hammadde Kategori">
        <Select defaultValue={props.data.rawMaterialCategory.id} onChange={handleChange}>
          {rawMaterialCategoryList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item name="rawMaterialId" label="Hammadde">
        <Select defaultValue={props.data.rawMaterial.id} onChange={handleChangeRawMaterial}>
          {rawMaterialList.map((item, index) => {
            return <Option value={item.id}>{item.name}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Miktar"
        rules={[
          {
            required: true,
            message: 'Please input Name!',
          },
        ]}
      >
        <Input addonAfter={unit.name} />
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

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message, Popconfirm, Table } from 'antd';
import callApi from '../../../../utils/callApi';
import { Fragment } from 'react';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_PRODUCT } from '../../product/ProductPage';
import { ENDPOINT } from '../DeliveryPage';

const { Option } = Select;

export default function ProductRawMaterialForm(props) {
  const form = useRef(null);
  const [operationType, setOperationType] = useState(["ADD"]);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  
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
  }, []);

  async function onDeleteClick(id, event) {
    try {
      let response = await callApi({
        endpoint: `${ENDPOINT}/${id}`,
        method: 'DELETE',
      });
      if (response) {
        //getData();
        message.success('Kayıt Başarılı Şekilde Silindi.');
      }
    } catch (error) {
      //message.error(error.messages);
    }
  }

  function onUpdateClick(record, event) {
    event.preventDefault();
    setOperationType("UPDATE");
    setFormValues(record);
  }

  function setFormValues(data) {
    data.productId = data.product.id;
    
    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  async function onFinish(values) {
    try {
      const { id } = props.data;
      values.productId = id; 
      let response = await callApi({
        endpoint: ENDPOINT,
        method: 'POST',
        body: values,
      });
      if (response) {
        message.success('Kayıt ekleme başarıyla tamamlandı.');
        props.handleClose();
      }
    } catch (error) {
      //call api katmanında handle edeilecek
    }
  }

  return (
    <Fragment>
      <Form {...FORM_ITEM_LAYOUT} ref={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item name="productId" label="Ürün">
          <Select>
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
    </Fragment>
  );
}

export { ENDPOINT };
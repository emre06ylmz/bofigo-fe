import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message, Popconfirm, Table } from 'antd';
import callApi from '../../../utils/callApi';
import { Fragment } from 'react';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_RAWMATERIALCATEGORY } from '../rawmaterialcategory/RawMaterialCategoryPage';
import { ENDPOINT as ENDPOINT_RAWMATERIAL } from '../rawmaterial/RawMaterialPage';

const { Option } = Select;

const ENDPOINT = '/api/delivery';

export default function ProductionPage(props) {
  const form = useRef(null);
  const [operationType, setOperationType] = useState(['ADD']);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawMaterialCategoryList, setRawMaterialCategoryList] = useState([]);
  const [rawMaterialList, setRawMaterialList] = useState([]);

  const standart_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Ürün',
      dataIndex: 'product',
      render: product => <div>{product.name}</div>,
    },
    {
      title: 'Miktar',
      dataIndex: 'count',
    },
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: '',
      dataIndex: 'edit',
      key: 'x',
      render: (text, record) => (
        <Button type="primary" onClick={e => onUpdateClick(record, e)}>
          Güncelle
        </Button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'x',
      render: (text, record) => (
        <Popconfirm
          title="Silme işlemini onaylıyor musunuz？"
          okText="Evet"
          cancelText="Hayır"
          onConfirm={e => {
            onDeleteClick(record.id, e);
          }}
        >
          <Button type="danger" link="#">
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  async function getData() {
    try {
      setLoading(true);
  
      const { id } = props.data;
      let productionResponse = await callApi({ endpoint: ENDPOINT + '/listByProductId/' + id });
      setItems(productionResponse.data);
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
  
  function onPostClick() {
    props.onPostClick();
  }

  function onUpdateClick(record, event) {
    event.preventDefault();
    props.onUpdateClick(record);
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
      <Button type="primary" onClick={onPostClick}>
        Sevkiyat Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />
    </Fragment>
  );
}

export { ENDPOINT };

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message, Popconfirm, Table } from 'antd';
import callApi from '../../../utils/callApi';
import { Fragment } from 'react';
import { ENDPOINT as ENDPOINT_RAWMATERIALCATEGORY } from '../rawmaterialcategory/RawMaterialCategoryPage';
import { ENDPOINT as ENDPOINT_RAWMATERIAL } from '../rawmaterial/RawMaterialPage';
import { financial } from '../../../utils/formUtil';

const { Option } = Select;

const ENDPOINT = '/api/productmaterial';

export default function ProductRawMaterialList(props) {
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
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Hammadde Kategori',
      dataIndex: 'rawMaterialCategory',
      render: rawMaterialCategory => <div>{rawMaterialCategory.name}</div>,
      sorter: (a, b) => {return a.rawMaterialCategory.name.localeCompare(b.rawMaterialCategory.name)},
    },
    {
      title: 'Hammadde',
      dataIndex: 'rawMaterial',
      render: rawMaterial => <div>{rawMaterial.name}</div>,
      sorter: (a, b) => {return a.rawMaterial.name.localeCompare(b.rawMaterial.name)},
    },
    {
      title: 'Miktar',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Son Fiyat',
      dataIndex: 'rawMaterial',
      render: rawMaterial => <div>{rawMaterial.lastPrice}</div>,
      sorter: (a, b) => a.rawMaterial.lastPrice - b.rawMaterial.lastPrice,
    },
    {
      title: 'Toplam',
      dataIndex: 'rawMaterial',
      render: (text, record, index) => <div>{financial (record.amount * record.rawMaterial.lastPrice) + " " + record.rawMaterial.selectedCurrency} </div>,
      sorter: (a, b) => (a.amount * a.rawMaterial.lastPrice) - (b.amount * b.rawMaterial.lastPrice),
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
          G??ncelle
        </Button>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'x',
      render: (text, record) => (
        <Popconfirm
          title="Silme i??lemini onayl??yor musunuz???"
          okText="Evet"
          cancelText="Hay??r"
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
      let rawMaterialCategoryResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIALCATEGORY });
      setRawMaterialCategoryList(rawMaterialCategoryResponse.data);

      const { id } = props.data;
      let productMaterialResponse = await callApi({ endpoint: ENDPOINT + '/listByProductId/' + id });
      setItems(productMaterialResponse.data);
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
        message.success('Kay??t Ba??ar??l?? ??ekilde Silindi.');
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
    data.rawMaterialId = data.rawMaterial.id;
    data.rawMaterialCategoryId = data.rawMaterialCategory.id;

    handleChange(data.rawMaterialCategoryId);

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
        message.success('Kay??t ekleme ba??ar??yla tamamland??.');
        props.handleClose();
      }
    } catch (error) {
      //call api katman??nda handle edeilecek
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

  return (
    <Fragment>
      <Button type="primary" onClick={onPostClick}>
        ??r??n Hammadde Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} pagination={{ pageSize: 20 }}  />
    </Fragment>
  );
}

export { ENDPOINT };

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message, Popconfirm, Table } from 'antd';
import callApi from '../../../utils/callApi';
import { Fragment } from 'react';

import CsvCreator from 'react-csv-creator';

const { Option } = Select;

const ENDPOINT = '/api/production';

export default function ProductionPage(props) {
  const form = useRef(null);
  const [items, setItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const standart_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      id: 'id',
      display: 'Id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Ürün',
      dataIndex: 'product',
      id: 'product',
      display: 'Ürün',
      render: product => <div>{product.name}</div>,
      sorter: (a, b) => {return a.product.name.localeCompare(b.product.name)},
    },
    {
      title: 'Miktar',
      dataIndex: 'count',
      id: 'Miktar',
      display: 'count',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: 'Giriş Yapan',
      dataIndex: 'createdBy',
      id: 'createdBy',
      display: 'Giriş Yapan',
      sorter: (a, b) => {return a.createdBy.localeCompare(b.createdBy)},
    },
    {
      title: 'Son Değişiklik',
      dataIndex: 'updatedBy',
      id: 'updatedBy',
      display: 'Son Değişiklik',
      sorter: (a, b) => {return a.updatedBy.localeCompare(b.updatedBy)},
    },
    {
      title: 'Giriş Tarihi',
      dataIndex: 'createDate',
      id: 'createDate',
      display: 'Giriş Tarihi',
      sorter: (a, b) => {return a.createDate.localeCompare(b.createDate)},
    },
    {
      title: 'Açıklama',
      dataIndex: 'explanation',
      id: 'explanation',
      display: 'Açıklama',
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

      setTableData(
        productionResponse.data.map(item => {
          return {
            id: item.id,
            product: item.product.name,
            count: item.count,
            createdBy: item.createdBy,
            updatedBy: item.updatedBy,
            createDate: item.createDate,
            explanation: item.explanation,
          };
        })
      );
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
        Üretim Ekle
      </Button>

      <Button type="primary" style={{ marginLeft: 10 }}>
        <CsvCreator filename="productions" headers={standart_columns} rows={tableData}>
          <p>Export</p>
        </CsvCreator>
      </Button>

      <Table loading={loading} dataSource={items} columns={manager_columns} />
    </Fragment>
  );
}

export { ENDPOINT };

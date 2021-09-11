import React, { useState, useEffect } from 'react';
import { Table, Modal, Popconfirm, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import callApi from '../../../utils/callApi';
import RawMaterialForm from './RawMaterialForm';
import RawMaterialUpdateForm from './RawMaterialUpdateForm';

const ENDPOINT = '/api/rawmaterial';

export default function RawMaterialPage(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    type: null,
    selected: null,
  });

  const standart_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Hammadde Adı',
      dataIndex: 'name',
    },
    {
      title: 'Açıklama',
      dataIndex: 'explanation',
    },
    {
      title: 'Kategori',
      dataIndex: 'rawMaterialCategory',
      render: rawMaterialCategory => <div>{rawMaterialCategory.name}</div>,
    },
    {
      title: 'Birim',
      dataIndex: 'unit',
      render: unit => <div>{unit.name}</div>,
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
    },
    {
      title: 'Para Birimi',
      dataIndex: 'selectedCurrency',
    },
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: '',
      dataIndex: 'purchase',
      key: 'x',
      render: (text, record) => (
        <Button type="primary" onClick={e => onPurchaseClick(record, e)}>
          Satın Alma
        </Button>
      ),
    },
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

  async function onDeleteClick(id, event) {
    try {
      let response = await callApi({
        endpoint: `${ENDPOINT}/${id}`,
        method: 'DELETE',
      });
      if (response) {
        getData();
        message.success('Kayıt Başarılı Şekilde Silindi.');
      }
    } catch (error) {
      //message.error(error.messages);
    }
  }

  function hideModal(e) {
    setModalInfo({ visible: false });
    getData();
  }

  function onPostClick() {
    setModalInfo({
      visible: true,
      type: 'POST',
      selected: null,
    });
  }

  function onPurchaseClick(record, event) {
    event.preventDefault();
    history.push(`/pages/purchase/${record.id}`);
  }

  function onUpdateClick(record, event) {
    setModalInfo({
      visible: true,
      type: 'UPDATE',
      selected: record,
    });
  }

  async function getData() {
    try {
      setLoading(true);

      let url = window.location.href;
      const rawMaterialCategoryId = url.substring(url.lastIndexOf('/') + 1);

      let endPoint = ENDPOINT;

      if (!isNaN(rawMaterialCategoryId)) {
        endPoint = ENDPOINT + '/listByCategoryId/' + rawMaterialCategoryId;
      }

      let response = await callApi({ endpoint: endPoint });
      setItems(response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <Button type="primary" onClick={onPostClick}>
        Hammadde Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === 'POST' && (
        <Modal visible={modalInfo.visible} title="Hammadde Ekleme Ekranı" onCancel={hideModal} footer={null}>
          <RawMaterialForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'UPDATE' && (
        <Modal visible={modalInfo.visible} title="Hammadde Güncelleme Ekranı" onCancel={hideModal} footer={null}>
          <RawMaterialUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

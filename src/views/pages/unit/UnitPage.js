import React, { useState, useEffect } from 'react';
import { Table, Modal, Popconfirm, Button, message } from 'antd';
import callApi from '../../../utils/callApi';
import UnitForm from './UnitForm';
import UnitUpdateForm from './UnitUpdateForm';

import CsvCreator from 'react-csv-creator';

const ENDPOINT = '/api/unit';

export default function UnitPage(props) {
  const [items, setItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    type: null,
    selected: null,
  });

  const standart_columns = [
    {
      id: 'id',
      display: 'Id',
      title: 'Id',
      dataIndex: 'id',
    },
    {
      id: 'name',
      display: 'Birim Adı',
      title: 'Birim Adı',
      dataIndex: 'name',
    },
    {
      id: 'explanation',
      display: 'Açıklama',
      title: 'Açıklama',
      dataIndex: 'explanation',
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
      let response = await callApi({ endpoint: ENDPOINT });
      setItems(response.data);

      setTableData(response.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          explanation: item.explanation
        }
      }));

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
        Birim Ekle
      </Button>

      <Button type="primary" style={{marginLeft: 10}} >
        <CsvCreator filename="units" headers={standart_columns} rows={tableData}>
          <p>Export</p>
        </CsvCreator>
      </Button>

      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === 'POST' && (
        <Modal visible={modalInfo.visible} title="Birim Ekranı" onCancel={hideModal} footer={null}>
          <UnitForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'UPDATE' && (
        <Modal visible={modalInfo.visible} title="Birim Güncelleme Ekranı" onCancel={hideModal} footer={null}>
          <UnitUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

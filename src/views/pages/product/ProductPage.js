import React, { useState, useEffect } from 'react';
import { Table, Modal, Popconfirm, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import callApi from '../../../utils/callApi';
import ProductForm from './ProductForm';
import ProductUpdateForm from './ProductUpdateForm';
import ProductRawMaterialForm from '../productmaterial/ProductRawMaterialForm';
import ProductRawMaterialUpdateForm from '../productmaterial/ProductRawMaterialUpdateForm';
import ProductRawMaterialList from '../productmaterial/ProductRawMaterialPage';

import ProductionForm from '../production/ProductionForm';
import ProductionUpdateForm from '../production/ProductionUpdateForm';
import ProductionList from '../production/ProducionPage';

const ENDPOINT = '/api/product';

const styles = {
  margin: '0 0 0 10px',
};

export default function ProductPage(props) {
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
      title: 'Ürün Adı',
      dataIndex: 'name',
    },
    {
      title: 'Açıklama',
      dataIndex: 'explanation',
    },
    {
      title: 'Maliyet',
      dataIndex: 'cost_TL',
      render: (cost_TL, item) => (
        <div>
          {item.cost_TL} TL - {item.cost_USD} USD - {item.cost_EURO} EURO
        </div>
      ),
    },
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: '',
      dataIndex: 'rawMaterial',
      key: 'x',
      render: (text, record) => (
        <Button type="primary" onClick={e => onRawMaterialClick(record, e)}>
          Hammaddeler
        </Button>
      ),
    },
    {
      title: '',
      dataIndex: 'production',
      key: 'x',
      render: (text, record) => (
        <Button type="primary" onClick={e => onProductionClick(record, e)}>
          Üretim
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
      message.error(error.messages);
    }
  }

  function onRawMaterialClick(record, event) {
    setModalInfo({
      visible: true,
      type: 'MATERIALS',
      selected: record,
    });
  }

  function onProductionClick(record, event) {
    setModalInfo({
      visible: true,
      type: 'PRODUCTIONS',
      selected: record,
    });
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

  async function onCalculateClick() {
    let response = await callApi({ endpoint: ENDPOINT + '/calculate' });
    getData();
    message.success('Başarıyla güncellendi.');
  }

  function onUpdateClick(record, event) {
    setModalInfo({
      visible: true,
      type: 'UPDATE',
      selected: record,
    });
  }

  function onPostMaterialClick() {
    setModalInfo({
      visible: true,
      type: 'MATERIALS_POST',
      selected: modalInfo.selected,
    });
  }

  function onUpdateMaterialClick(record) {
    setModalInfo({
      visible: true,
      type: 'MATERIALS_UPDATE',
      selected: record,
    });
  }

  function onPostProductionClick() {
    setModalInfo({
      visible: true,
      type: 'PRODUCTIONS_POST',
      selected: modalInfo.selected,
    });
  }

  function onUpdateProductionClick(record) {
    setModalInfo({
      visible: true,
      type: 'PRODUCTIONS_UPDATE',
      selected: record,
    });
  }

  async function getData() {
    try {
      setLoading(true);
      let response = await callApi({ endpoint: ENDPOINT });
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
        Ürün Ekle
      </Button>
      <Button type="secondary" onClick={onCalculateClick} style={styles}>
        Maliyetleri Hesapla
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === 'POST' && (
        <Modal visible={modalInfo.visible} title="Ürün Ekleme Ekranı" onCancel={hideModal} footer={null}>
          <ProductForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'UPDATE' && (
        <Modal visible={modalInfo.visible} title="Ürün Güncelleme Ekranı" onCancel={hideModal} footer={null}>
          <ProductUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'MATERIALS_POST' && (
        <Modal
          width={600}
          visible={modalInfo.visible}
          title="Ürün Hammedde Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <ProductRawMaterialForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'MATERIALS_UPDATE' && (
        <Modal
          width={600}
          visible={modalInfo.visible}
          title="Ürün Hammedde Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <ProductRawMaterialUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'MATERIALS' && (
        <Modal width={600} visible={modalInfo.visible} title="Ürün Hammedde Listesi" onCancel={hideModal} footer={null}>
          <ProductRawMaterialList
            onUpdateClick={onUpdateMaterialClick}
            onPostClick={onPostMaterialClick}
            data={modalInfo.selected}
            handleClose={hideModal}
          />
        </Modal>
      )}

      {modalInfo.type === 'PRODUCTIONS_POST' && (
        <Modal width={600} visible={modalInfo.visible} title="Üretim Ekleme Ekranı" onCancel={hideModal} footer={null}>
          <ProductionForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'PRODUCTIONS_UPDATE' && (
        <Modal
          width={600}
          visible={modalInfo.visible}
          title="Üretim Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <ProductionUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'PRODUCTIONS' && (
        <Modal width={600} visible={modalInfo.visible} title="Üretim Listesi" onCancel={hideModal} footer={null}>
          <ProductionList
            onUpdateClick={onUpdateProductionClick}
            onPostClick={onPostProductionClick}
            data={modalInfo.selected}
            handleClose={hideModal}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

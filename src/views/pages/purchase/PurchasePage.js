import React, { useState, useEffect } from "react";
import { Table, Modal, Popconfirm, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import callApi from "../../../utils/callApi";
import PurchaseForm from "./PurchaseForm";
import PurchaseUpdateForm from "./PurchaseUpdateForm";

const ENDPOINT = "/api/purchase"

export default function PurchasePage(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    type: null,
    selected: null
  });

  const standart_columns = [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Hammadde",
      dataIndex: "rawMaterial",
      render: rawMaterial => <div>{rawMaterial.name}</div>,
    },
    {
      title: "Tedarikçi",
      dataIndex: "supplier",
      render: supplier => <div>{supplier.name}</div>,
    },
    {
      title: "Fiyat",
      dataIndex: "price"
    },
    {
      title: "Miktar",
      dataIndex: "amount"
    },
    {
      title: "Açıklama",
      dataIndex: "explanation"
    }
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: "",
      dataIndex: "edit",
      key: "x",
      render: (text, record) => (
        <Button type="primary" onClick={e => onUpdateClick(record, e)}>
          Güncelle
        </Button>
      )
    },

    {
      title: "",
      dataIndex: "delete",
      key: "x",
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
      )
    }
  ];

  async function onDeleteClick(id, event) {
    try {
      let response = await callApi({
        endpoint: `${ENDPOINT}/${id}`,
        method: "DELETE"
      });
      if (response) {
        getData();
        message.success("Kayıt Başarılı Şekilde Silindi.");
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
      type: "POST",
      selected: null
    });
  }

  function onUpdateClick(record, event) {
    setModalInfo({
      visible: true,
      type: "UPDATE",
      selected: record
    });
  }

  async function getData() {
    try {
      setLoading(true);

      let url = window.location.href;
      const rawMaterialId = url.substring(url.lastIndexOf('/') + 1);

      let endPoint = ENDPOINT;

      if (!isNaN(rawMaterialId)) {
        endPoint = ENDPOINT + '/listByMaterialId/' + rawMaterialId;
      }

debugger;

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
        Satın Alma Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === "POST" && (
        <Modal
          visible={modalInfo.visible}
          title="Satın Alma Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <PurchaseForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === "UPDATE" && (
        <Modal
          visible={modalInfo.visible}
          title="Satın Alma Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <PurchaseUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

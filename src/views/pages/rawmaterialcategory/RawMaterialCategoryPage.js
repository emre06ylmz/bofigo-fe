import React, { useState, useEffect } from "react";
import { Table, Modal, Popconfirm, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import callApi from "../../../utils/callApi";
import RawMaterialCategoryForm from "./RawMaterialCategoryForm";
import RawMaterialCategoryUpdateForm from "./RawMaterialCategoryUpdateForm";

const ENDPOINT = "/api/rawmaterialcategory"

export default function RawMaterialCategoryPage(props) {
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
      title: "Kategori Adı",
      dataIndex: "name"
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
      dataIndex: "rawMaterial",
      key: "x",
      render: (text, record) => (
        <Button type="primary" onClick={e => onRawMaterialClick(record, e)}>
          Hammaddeler
        </Button>
      )
    },
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
      message.error(error.messages);
    }
  }

  function onRawMaterialClick(record, event) {
    event.preventDefault();
    history.push(`/pages/rawmaterial/${record.id}`);
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
        Hammadde Kategori Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === "POST" && (
        <Modal
          visible={modalInfo.visible}
          title="Hammadde Kategori Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <RawMaterialCategoryForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === "UPDATE" && (
        <Modal
          visible={modalInfo.visible}
          title="Hammadde Kategori Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <RawMaterialCategoryUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

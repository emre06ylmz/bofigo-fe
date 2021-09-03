import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, message, Modal } from "antd";
import callApi from "../../../utils/callApi";
import PropertyItemsPostForm from "./PropertyItemsPostForm/PropertyItemsPostForm";
import PropertyItemsUpdateForm from "./PropertyItemsUpdateForm/PropertyItemsUpdateForm";

let parentId = null;

export default function PropertyItems(props) {
  const [items, setItems] = useState([]);

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    type: null,
    selected: null,
  });

  const standart_columns = [
    {
      title: "Id",
      dataIndex: "id",
    },

    {
      title: "Name TR",
      dataIndex: "name_TR",
    },

    {
      title: "Name EN",
      dataIndex: "name_EN",
    },

    {
      title: "Name TR",
      dataIndex: "name_FR",
    },

    {
      title: "Name AR",
      dataIndex: "name_AR",
    },
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: "",
      dataIndex: "edit",
      render: (text, record) => (
        <Button type="primary" onClick={(e) => onUpdateClick(record, e)}>
          Güncelle
        </Button>
      ),
    },

    {
      title: "",
      dataIndex: "delete",
      render: (text, record) => (
        <Popconfirm
        title="Silme işlemini onaylıyor musunuz？"
        okText="Evet"
        cancelText="Hayır"
          onConfirm={(e) => {
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
        endpoint: `/api/property/items/${id}`,
        method: "DELETE",
      });
      if (response) {
        message.success("Kayıt Başarılı Şekilde Silindi.");
        props.handleClose();
      }
    } catch (error) {
      message.error(error.messages);
    }
  }

  function onUpdateClick(record, event) {
    setModalInfo({
      visible: true,
      type: "UPDATE",
      selected: record,
    });
  }

  function onPostClick() {
    setModalInfo({
      visible: true,
      type: "POST",
      selected: null,
    });
  }

  function hideModal(e) {
    setModalInfo({ visible: false });
    props.handleClose();
  }

  useEffect(() => {
    const { child, id } = props.data;
    parentId = id;
    setItems(child);
  }, []);

  return (
    <React.Fragment>
      <Button type="primary" onClick={onPostClick}>
        Yeni Kayıt Ekle
      </Button>
      <Table dataSource={items} columns={manager_columns} />

      {modalInfo.type === "POST" && (
        <Modal
          visible={modalInfo.visible}
          title="PropertyItems Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <PropertyItemsPostForm handleClose={hideModal} parentId={parentId} />
        </Modal>
      )}

      {modalInfo.type === "UPDATE" && (
        <Modal
          visible={modalInfo.visible}
          title="PropertyItems Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <PropertyItemsUpdateForm
            handleClose={hideModal}
            data={modalInfo.selected}
            parentId={parentId}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { Table, Modal, Popconfirm, Button, message } from "antd";
import callApi from "../../../utils/callApi";
import UserForm from "./UserForm";
import UserUpdateForm from "./UserUpdateForm";

const ENDPOINT = "/api/user"

export default function UserPage(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
      title: "Kullanıcı Adı",
      dataIndex: "username"
    },

    {
      title: "Ad",
      dataIndex: "name"
    },

    {
      title: "Soyad",
      dataIndex: "surname"
    },

    {
      title: "Rol",
      dataIndex: "role"
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
      message.error(error.messages);
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
        Yeni Kullanıcı Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === "POST" && (
        <Modal
          visible={modalInfo.visible}
          title="Kullanıcı Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <UserForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === "UPDATE" && (
        <Modal
          visible={modalInfo.visible}
          title="Kullanıcı Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <UserUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };
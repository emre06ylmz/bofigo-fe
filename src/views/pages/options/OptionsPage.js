import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, message, Modal } from "antd";
import callApi from "../../../utils/callApi";
import OptionsPostForm from "./OptionsPostForm/OptionsPostForm";
import OptionsUpdateForm from "./OptionsUpdateForm/OptionsUpdateForm";
import OptionItems from "../optionItems/OptionItems";

export default function OptionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <Button type="primary" onClick={(e) => onItemsDisplay(record, e)}>
          Items Göster
        </Button>
      ),
    },

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
        endpoint: `/api/options/${id}`,
        method: "DELETE",
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

  function onItemsDisplay(record, event) {
    setModalInfo({
      visible: true,
      type: "ITEMS",
      selected: record,
    });
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

  async function getData() {
    try {
      setLoading(true);
      let response = await callApi({ endpoint: `/api/options` });
      if (response) {
        let data = response.map((item) => ({
          id: item.id,
          name_TR: item.name_TR,
          name_EN: item.name_EN,
          name_FR: item.name_FR,
          name_AR: item.name_AR,
          child: item.children,
        }));
        setItems(data);
      }
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
        Yeni Kayıt Ekle
      </Button>
      <Table loading={loading} dataSource={items} columns={manager_columns} />

      {modalInfo.type === "POST" && (
        <Modal
          visible={modalInfo.visible}
          title="Option Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <OptionsPostForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === "UPDATE" && (
        <Modal
          visible={modalInfo.visible}
          title="Option Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <OptionsUpdateForm
            handleClose={hideModal}
            data={modalInfo.selected}
          />
        </Modal>
      )}

      {modalInfo.type === "ITEMS" && (
        <Modal
          visible={modalInfo.visible}
          title="OptionItems Ekranı"
          onCancel={hideModal}
          footer={null}
          width={1000}
        >
          <OptionItems handleClose={hideModal} data={modalInfo.selected} />
        </Modal>
      )}
    </React.Fragment>
  );
}

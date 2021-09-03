import React, { useState, useEffect } from "react";
import { Table, Popconfirm, Button, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import callApi from "../../../utils/callApi";

export default function CategoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let { id } = useParams();

  const standart_columns = [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Code",
      dataIndex: "code"
    },    
    {
      title: "NameTR",
      dataIndex: "name_TR"
    }
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: "",
      dataIndex: "sub",
      fixed: "right",
      width: "50px",
      render: (text, record) => (
        <Button type="primary" onClick={e => onSubClick(record, e)}>
          Alt Kategoriler
        </Button>
      )
    },

    {
      title: "",
      dataIndex: "update",
      fixed: "right",
      width: "50px",
      render: (text, record) => (
        <Button type="primary" onClick={e => onUpdateClick(record, e)}>
          Güncelle
        </Button>
      )
    },

    {
      title: "",
      dataIndex: "delete",
      fixed: "right",
      width: "50px",
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
        endpoint: `/api/categories/${id}`,
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

  function onPostClick(e) {
    e.preventDefault();
    history.push("/pages/category/add");
  }

  function onUpdateClick(record, e) {
    e.preventDefault();
    history.push(`/pages/category/update/${record.id}`);
  }

  function onSubClick(record, e) {
    e.preventDefault();
    history.push(`/pages/categories/${record.id}`);
  }

  async function getData(id) {
    try {
      setLoading(true);

      if(id){
        let response = await callApi({ endpoint: `/api/categories/byParent${id}` });
        setItems(response);
      }else{
        let response = await callApi({ endpoint: `/api/categories` });
        setItems(response);
      }

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(id);
  }, []);

  return (
    <React.Fragment>
      <Button type="primary" onClick={onPostClick}>
        Yeni Kayıt Ekle
      </Button>
      <Table
        loading={loading}
        columns={manager_columns}
        dataSource={items}
        indentSize={0}
      />
    </React.Fragment>
  );
}

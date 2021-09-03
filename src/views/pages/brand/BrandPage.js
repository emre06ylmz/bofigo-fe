import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import callApi from "../../../utils/callApi";

export default function Brands(props) {
  const { Column, ColumnGroup } = Table;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  async function onDeleteClick(id, event) {
    try {
      let response = await callApi({
        endpoint: `/api/brands/${id}`,
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
    history.push("/pages/brand/add");
  }

  function onUpdateClick(record, e) {
    e.preventDefault();
    history.push(`/pages/brand/update/${record.id}`);
  }

  async function getData() {
    try {
      setLoading(true);
      let response = await callApi({ endpoint: `/api/brands` });
      setItems(response);
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
      <Table
        loading={loading}
        dataSource={items}
        pagination={{ pageSize: 50 }}
        scroll={true}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="URL" dataIndex="url" key="url" />
        <ColumnGroup name="Action">
          <Column
            title="Edit"
            key="edit"
            fixed="right"
            width="100"
            render={(text, record) => (
              <Button
                type="primary"
                onClick={e => {
                  onUpdateClick(record, e);
                }}
              >
                Update
              </Button>
            )}
          />
          <Column
            title="Delete"
            key="delete"
            fixed="right"
            width="100"
            render={(text, record) => (
              <Popconfirm
                title="Silme işlemini onaylıyor musunuz？"
                okText="Evet"
                cancelText="Hayır"
                onConfirm={e => {
                  onDeleteClick(record.id, e);
                }}
              >
                <Button type="danger" link="#">
                  Delete
                </Button>
              </Popconfirm>
            )}
          />
        </ColumnGroup>
        <ColumnGroup title="NAME">
          <Column title="TR" dataIndex="name_TR" key="name_TR" />
          <Column title="EN" dataIndex="name_EN" key="name_EN" />
          <Column title="FR" dataIndex="name_FR" key="name_FR" />
          <Column title="AR" dataIndex="name_AR" key="name_AR" />
        </ColumnGroup>
        <ColumnGroup title="DESCRIPTION">
          <Column title="TR" dataIndex="description_TR" key="description_TR" />
          <Column title="EN" dataIndex="description_EN" key="description_EN" />
          <Column title="FR" dataIndex="description_FR" key="description_FR" />
          <Column title="AR" dataIndex="description_AR" key="description_AR" />
        </ColumnGroup>
        <ColumnGroup title="SEO">
          <Column title="TR" dataIndex="seo_TR" key="seo_TR" />
          <Column title="EN" dataIndex="seo_EN" key="seo_EN" />
          <Column title="FR" dataIndex="seo_FR" key="seo_FR" />
          <Column title="AR" dataIndex="seo_AR" key="seo_AR" />
        </ColumnGroup>
        <ColumnGroup title="IMAGE">
          <Column title="TR" dataIndex="image_TR" key="image_TR" />
          <Column title="EN" dataIndex="image_EN" key="image_EN" />
          <Column title="FR" dataIndex="image_FR" key="image_FR" />
          <Column title="AR" dataIndex="image_AR" key="image_AR" />
        </ColumnGroup>
      </Table>
    </React.Fragment>
  );
}

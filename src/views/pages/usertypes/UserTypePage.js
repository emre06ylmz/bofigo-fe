import React, { useEffect, useState } from "react";
import callApi from "../../../utils/callApi";

import { Table } from "antd";

import { withLocalize, Translate } from "react-localize-redux";
import translations_en from "./translations/en.json";
import translations_tr from "./translations/tr.json";

const ENDPOINT = "/api/userType"

function UserTypePage(props) {
  props.addTranslationForLanguage(translations_en, "en");
  props.addTranslationForLanguage(translations_tr, "tr");

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const columns = [
    {
      title: 'Id',
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: 'Rol',
      dataIndex: "name",
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
    },

    {
      title: 'Açıklama',
      dataIndex: "detail",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let response = await callApi({
        endpoint: ENDPOINT,
        method: "GET",
      });
      setItems(response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Table loading={loading} dataSource={items} columns={columns} />
    </React.Fragment>
  );
}
export default withLocalize(UserTypePage);

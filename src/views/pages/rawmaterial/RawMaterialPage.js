import React, { useState, useEffect } from 'react';
import { Table, Modal, Popconfirm, Button, message, Input, Space } from 'antd';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import callApi from '../../../utils/callApi';
import RawMaterialForm from './RawMaterialForm';
import RawMaterialUpdateForm from './RawMaterialUpdateForm';
import CsvCreator from 'react-csv-creator';

const ENDPOINT = '/api/rawmaterial';

export default function RawMaterialPage(props) {
  const [items, setItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState([]);

  let history = useHistory();

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
           // this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        //setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    type: null,
    selected: null,
  });

  const standart_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      display: 'Id',
      id: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Hammadde Adı',
      dataIndex: 'name',
      display: 'Hammadde Adı',
      id: 'name',
      sorter: (a, b) => {return a.name.localeCompare(b.name)},
        ...getColumnSearchProps('name'),
    },
    {
      title: 'Açıklama',
      dataIndex: 'explanation',
      display: 'Açıklama',
      id: 'explanation',
    },
    {
      title: 'Kategori',
      dataIndex: 'rawMaterialCategory',
      display: 'Kategori',
      id: 'rawMaterialCategory',
      render: rawMaterialCategory => <div>{rawMaterialCategory.name}</div>,
      sorter: (a, b) => {return a.rawMaterialCategory.name.localeCompare(b.rawMaterialCategory.name)},
    },
    {
      title: 'Birim',
      dataIndex: 'unit',
      display: 'Birim',
      id: 'unit',
      render: unit => <div>{unit.name}</div>,
      sorter: (a, b) => {return a.unit.localeCompare(b.unit)},
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      display: 'Stok',
      id: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Para Birimi',
      dataIndex: 'selectedCurrency',
      display: 'Para Birimi',
      id: 'selectedCurrency',
      sorter: (a, b) => {return a.selectedCurrency.localeCompare(b.selectedCurrency)},
    },
    {
      title: 'Son Fiyat',
      dataIndex: 'lastPrice',
      sorter: (a, b) => a.lastPrice - b.lastPrice,
    },
  ];

  const manager_columns = [
    ...standart_columns,
    {
      title: '',
      dataIndex: 'purchase',
      key: 'x',
      render: (text, record) => (
        <Button type="primary" onClick={e => onPurchaseClick(record, e)}>
          Satın Alma
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

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

  function onPurchaseClick(record, event) {
    event.preventDefault();
    history.push(`/pages/purchase/${record.id}`);
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

      let url = window.location.href;
      const rawMaterialCategoryId = url.substring(url.lastIndexOf('/') + 1);

      let endPoint = ENDPOINT;

      if (!isNaN(rawMaterialCategoryId)) {
        endPoint = ENDPOINT + '/listByCategoryId/' + rawMaterialCategoryId;
      }

      let response = await callApi({ endpoint: endPoint });
      setItems(response.data);
      
      setTableData(response.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          explanation: item.explanation,
          rawMaterialCategory: item.rawMaterialCategory.name,
          unit: item.unit.name,
          stock: item.stock,
          selectedCurrency: item.selectedCurrency
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
        Hammadde Ekle
      </Button>
      
      <Button type="primary" style={{marginLeft: 10}} >
        <CsvCreator filename="rawmaterials" headers={standart_columns} rows={tableData}>
          <p>Export</p>
        </CsvCreator>
      </Button>

      <Table loading={loading} dataSource={items} columns={manager_columns} />
      {modalInfo.type === 'POST' && (
        <Modal visible={modalInfo.visible} title="Hammadde Ekleme Ekranı" onCancel={hideModal} footer={null}>
          <RawMaterialForm handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'UPDATE' && (
        <Modal visible={modalInfo.visible} title="Hammadde Güncelleme Ekranı" onCancel={hideModal} footer={null}>
          <RawMaterialUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

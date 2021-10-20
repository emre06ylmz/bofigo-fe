import React, { useState, useEffect } from 'react';
import { Form, Input, Table, Modal, Popconfirm, Button, message, Space, InputNumber } from 'antd';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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

import DeliveryForm from '../delivery/DeliveryForm';
import DeliveryUpdateForm from '../delivery/DeliveryUpdateForm';
import DeliveryList from '../delivery/DeliveryPage';

import { financial } from '../../../utils/formUtil';
import CsvCreator from 'react-csv-creator';

const ENDPOINT = '/api/product';

const styles = {
  margin: '0 0 0 10px',
};

export default function ProductSalePage(props) {
  const [form] = Form.useForm();

  const [items, setItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState([]);

  const [commission, setCommission] = useState({ commission1: 10, commission2: 5, commission3: 1 });

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
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
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
      title: 'Ürün Adı',
      dataIndex: 'name',
      display: 'Ürün Adı',
      id: 'name',
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Toplam Maliyet',
      dataIndex: 'cost_TL',
      display: 'Toplam Maliyet',
      id: 'cost_Total',
      render: (cost_TL, item) => <div>{financial(item.cost_Total)} TL</div>,
      sorter: (a, b) => {
        return a.cost_Total.localeCompare(b.cost_Total);
      },
      sorter: (a, b) => a.cost_Total - b.cost_Total,
    },
    {
      title: 'Satış',
      dataIndex: 'sale',
      display: 'Satış',
      id: 'sale',
      render: (cost_TL, item) => <div>{financial(item.sale)} TL</div>,
      sorter: (a, b) => {
        return a.sale.localeCompare(b.sale);
      },
      sorter: (a, b) => a.sale - b.sale,
    },
    {
      title: 'Komisyon-%' + commission.commission1,
      dataIndex: 'commission1',
      display: 'Komisyon-' + commission.commission1,
      id: 'commission1',
      render: (cost_TL, item) => (
        <div>
          {calculateCommisonProfit(item.sale, commission.commission1, item.cost_Total)} TL - %
          {calculateCommisonProfitPercent(item.sale, commission.commission1, item.cost_Total)}
        </div>
      )
    },
    {
      title: 'Komisyon-%' + commission.commission2,
      dataIndex: 'commission2',
      display: 'Komisyon-' + commission.commission2,
      id: 'commission2',
      render: (cost_TL, item) => (
        <div>
          {calculateCommisonProfit(item.sale, commission.commission2, item.cost_Total)} TL - %
          {calculateCommisonProfitPercent(item.sale, commission.commission2, item.cost_Total)}
        </div>
      )
    },
    {
      title: 'Komisyon-%' + commission.commission3,
      dataIndex: 'commission3',
      display: 'Komisyon-' + commission.commission3,
      id: 'commission3',
      render: (cost_TL, item) => (
        <div>
          {calculateCommisonProfit(item.sale, commission.commission3, item.cost_Total)} TL - %
          {calculateCommisonProfitPercent(item.sale, commission.commission3, item.cost_Total)}
        </div>
      )
    },
  ];

  const manager_columns = [
    ...standart_columns,
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

  const calculateCommisonProfit = (sale, commission, cost) => {
    let profit = sale - (sale * commission) / 100 - cost;
    debugger;
    return financial(profit);
  };

  const calculateCommisonProfitPercent = (sale, commission, cost) => {
    let profit = sale - (sale * commission) / 100 - cost;
    return financial((100 * profit) / cost);
  };

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

  function onDeliveryClick(record, event) {
    setModalInfo({
      visible: true,
      type: 'DELIVERIES',
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

  function onPostDeliveryClick() {
    setModalInfo({
      visible: true,
      type: 'DELIVERIES_POST',
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

  function onUpdateDeliveryClick(record) {
    setModalInfo({
      visible: true,
      type: 'DELIVERIES_UPDATE',
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

      setTableData(
        response.data.map(item => {
          return {
            id: item.id,
            name: item.name,
            barcode: item.barcode,
            productCategory: item.productCategory.name,
            productModelCode: item.productModelCode.name,
            stock: item.stock,
            cost_TL: item.cost_TL,
            cost_Plus: item.cost_Plus,
            tax: item.tax,
            cost_PlusTax: item.cost_PlusTax,
            cargo: item.cargo,
            cost_Total: item.cost_Total,
          };
        })
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const onNumberChange1 = value => {
    setCommission({
      commission1: value,
      commission2: commission.commission2,
      commission3: commission.commission3,
    });
    getData();
  };

  const onNumberChange2 = value => {
    setCommission({
      commission1: commission.commission1,
      commission2: value,
      commission3: commission.commission3,
    });
    getData();
  };

  const onNumberChange3 = value => {
    setCommission({
      commission1: commission.commission1,
      commission2: commission.commission2,
      commission3: value,
    });
    getData();
  };

  return (
    <React.Fragment>
      <Form
        {...{
          labelCol: { span: 10 },
          wrapperCol: { span: 5 },
        }}
        layout={'inline'}
        form={form}
      >
        <Form.Item label="Komisyon - 1">
          <InputNumber
            min={1}
            max={100}
            defaultValue={commission.commission1}
            placeholder="Komisyon 1"
            onChange={onNumberChange1}
          />
        </Form.Item>
        <Form.Item label="Komisyon - 2">
          <InputNumber
            min={1}
            max={100}
            defaultValue={commission.commission2}
            placeholder="Komisyon 2"
            onChange={onNumberChange2}
          />
        </Form.Item>
        <Form.Item label="Komisyon - 3">
          <InputNumber
            min={1}
            max={100}
            defaultValue={commission.commission3}
            placeholder="Komisyon 3"
            onChange={onNumberChange1}
          />
        </Form.Item>
      </Form>
      <br />
      <Button type="primary" onClick={onPostClick}>
        Ürün Ekle
      </Button>
      <Button type="secondary" onClick={onCalculateClick} style={styles}>
        Maliyetleri Hesapla
      </Button>

      <Button type="primary" style={{ marginLeft: 10 }}>
        <CsvCreator filename="products" headers={standart_columns} rows={tableData}>
          <p>Export</p>
        </CsvCreator>
      </Button>
      <Table scroll={{ x: 1000 }} loading={loading} dataSource={items} columns={manager_columns} />
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
          width={1000}
          visible={modalInfo.visible}
          title="Ürün Hammedde Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <ProductRawMaterialUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'MATERIALS' && (
        <Modal
          width={1000}
          visible={modalInfo.visible}
          title="Ürün Hammedde Listesi"
          onCancel={hideModal}
          footer={null}
        >
          <ProductRawMaterialList
            onUpdateClick={onUpdateMaterialClick}
            onPostClick={onPostMaterialClick}
            data={modalInfo.selected}
            handleClose={hideModal}
          />
        </Modal>
      )}

      {modalInfo.type === 'PRODUCTIONS_POST' && (
        <Modal width={1000} visible={modalInfo.visible} title="Üretim Ekleme Ekranı" onCancel={hideModal} footer={null}>
          <ProductionForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'DELIVERIES_POST' && (
        <Modal
          width={1000}
          visible={modalInfo.visible}
          title="Sevkiyat Ekleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <DeliveryForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'PRODUCTIONS_UPDATE' && (
        <Modal
          width={1000}
          visible={modalInfo.visible}
          title="Üretim Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <ProductionUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'DELIVERIES_UPDATE' && (
        <Modal
          width={1000}
          visible={modalInfo.visible}
          title="Sevkiyar Güncelleme Ekranı"
          onCancel={hideModal}
          footer={null}
        >
          <DeliveryUpdateForm data={modalInfo.selected} handleClose={hideModal} />
        </Modal>
      )}

      {modalInfo.type === 'PRODUCTIONS' && (
        <Modal width={1000} visible={modalInfo.visible} title="Üretim Listesi" onCancel={hideModal} footer={null}>
          <ProductionList
            onUpdateClick={onUpdateProductionClick}
            onPostClick={onPostProductionClick}
            data={modalInfo.selected}
            handleClose={hideModal}
          />
        </Modal>
      )}

      {modalInfo.type === 'DELIVERIES' && (
        <Modal width={1000} visible={modalInfo.visible} title="Sekiyat Listesi" onCancel={hideModal} footer={null}>
          <DeliveryList
            onUpdateClick={onUpdateDeliveryClick}
            onPostClick={onPostDeliveryClick}
            data={modalInfo.selected}
            handleClose={hideModal}
          />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { ENDPOINT };

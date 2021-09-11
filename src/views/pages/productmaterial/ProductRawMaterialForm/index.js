import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Button, message, Popconfirm, Table } from 'antd';
import callApi from '../../../../utils/callApi';
import { Fragment } from 'react';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '../../../../utils/formUtil';
import { ENDPOINT as ENDPOINT_RAWMATERIALCATEGORY } from '../../rawmaterialcategory/RawMaterialCategoryPage';
import { ENDPOINT as ENDPOINT_RAWMATERIAL } from '../../rawmaterial/RawMaterialPage';
import { ENDPOINT } from '../ProductRawMaterialPage';

const { Option } = Select;

export default function ProductRawMaterialForm(props) {
  const form = useRef(null);
  const [operationType, setOperationType] = useState(["ADD"]);
  const [unit, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawMaterialCategoryList, setRawMaterialCategoryList] = useState([]);
  const [rawMaterialList, setRawMaterialList] = useState([]);
  
  
  const standart_columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Hammadde Kategori',
      dataIndex: 'rawMaterialCategory',
      render: rawMaterialCategory => <div>{rawMaterialCategory.name}</div>,
    },
    {
      title: 'Hammadde',
      dataIndex: 'rawMaterial',
      render: rawMaterial => <div>{rawMaterial.name}</div>,
    },
    {
      title: 'Miktar',
      dataIndex: 'amount',
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

  async function getData() {
    try {
      setLoading(true);
      let rawMaterialCategoryResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIALCATEGORY });
      setRawMaterialCategoryList(rawMaterialCategoryResponse.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function onDeleteClick(id, event) {
    try {
      let response = await callApi({
        endpoint: `${ENDPOINT}/${id}`,
        method: 'DELETE',
      });
      if (response) {
        //getData();
        message.success('Kayıt Başarılı Şekilde Silindi.');
      }
    } catch (error) {
      //message.error(error.messages);
    }
  }

  function onUpdateClick(record, event) {
    event.preventDefault();
    setOperationType("UPDATE");
    setFormValues(record);
  }

  function setFormValues(data) {
    data.rawMaterialId = data.rawMaterial.id;
    data.rawMaterialCategoryId = data.rawMaterialCategory.id;
    
    handleChange(data.rawMaterialCategoryId);

    form.current.resetFields();
    form.current.setFieldsValue(data);
  }

  async function onFinish(values) {
    try {
      const { id } = props.data;
      values.productId = id; 
      let response = await callApi({
        endpoint: ENDPOINT,
        method: 'POST',
        body: values,
      });
      if (response) {
        message.success('Kayıt ekleme başarıyla tamamlandı.');
        props.handleClose();
      }
    } catch (error) {
      //call api katmanında handle edeilecek
    }
  }

  async function handleChange(rawMaterialCategoryId) {
    try {
      setLoading(true);
      let rawMaterialResponse = await callApi({ endpoint: ENDPOINT_RAWMATERIAL + '/listByCategoryId/' + rawMaterialCategoryId});
      setRawMaterialList(rawMaterialResponse.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeRawMaterial(rawMaterialId) {
    const rawMaterial = rawMaterialList.find(u => u.id === rawMaterialId);
    setUnit(rawMaterial.unit);
    debugger;
  }

  return (
    <Fragment>
      <Form {...FORM_ITEM_LAYOUT} ref={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item name="rawMaterialCategoryId" label="Hammadde Kategori">
          <Select onChange={handleChange}>
            {rawMaterialCategoryList.map((item, index) => {
              return <Option value={item.id}>{item.name}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item name="rawMaterialId" label="Hammadde">
        <Select onChange={handleChangeRawMaterial}>
            {rawMaterialList.map((item, index) => {
              return <Option value={item.id}>{item.name}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Miktar"
          rules={[
            {
              required: true,
              message: 'Please input Name!',
            },
          ]}
        >
         <Input addonAfter={unit.name} />
        </Form.Item>

        <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
            Ekle/Güncelle
          </Button>        
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export { ENDPOINT };
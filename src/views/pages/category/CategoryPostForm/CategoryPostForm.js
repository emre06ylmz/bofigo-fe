import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Tabs, Select, message } from "antd";
import { useHistory } from "react-router-dom";
import callApi from "../../../../utils/callApi";

const { TabPane } = Tabs;
const { Option } = Select;

export default function CategoryPostForm(props) {
  const form = useRef(null);
  let history = useHistory();
  const [parentList, setParentList] = useState([]);

  async function getParentList() {
    let parent = [
      {
        id: 1,
        name: "Parent - 1"
      },
      {
        id: 2,
        name: "Parent - 2"
      }
    ];
    setParentList(parent);
  }

  async function onFinish(values) {
    try {
      let response = await callApi({
        endpoint: "/api/categories",
        method: "POST",
        body: values
      });
      if (response) {
        message.success("Kayıt işlemi başarıyla tamamlandı.");
      }
    } catch (error) {
      error.messages && message.error(error.messages);
    }
  }

  function onDisplayRecord(e) {
    history.push("/pages/categories");
  }

  function reset(e) {
    form.current.resetFields();
  }

  useEffect(() => {
    getParentList();
  }, []);

  return (
    <React.Fragment>
      <Button type="primary" onClick={onDisplayRecord}>
        Tüm Kayıtları Göster
      </Button>
      
          <Form ref={form} name="KategoriForm" onFinish={onFinish}>
          <Tabs>
            <TabPane tab="Yeni Kategori Bilgiler" key="1">
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item>
                    <label>Name TR</label>
                    <Form.Item
                      name="name_TR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name TR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Name EN</label>
                    <Form.Item
                      name="name_EN"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name EN"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Name FR</label>
                    <Form.Item
                      name="name_FR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name FR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Name AR</label>
                    <Form.Item
                      name="name_AR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name AR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item>
                    <label>Detail TR</label>
                    <Form.Item
                      name="detail_TR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Detail TR"
                        }
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label>Detail EN</label>
                    <Form.Item
                      name="detail_EN"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Detail EN"
                        }
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Form.Item>
                </Col>
                </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item>
                    <label>Detail FR</label>
                    <Form.Item
                      name="detail_FR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Detail FR"
                        }
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <label>Detail AR</label>
                    <Form.Item
                      name="detail_AR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Detail AR"
                        }
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item>
                    <label>Seo TR</label>
                    <Form.Item
                      name="seo_TR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo TR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Seo EN</label>
                    <Form.Item
                      name="seo_EN"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo EN"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Seo FR</label>
                    <Form.Item
                      name="seo_FR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo FR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Seo AR</label>
                    <Form.Item
                      name="seo_AR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo AR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item>
                    <label>Code</label>
                    <Form.Item
                      name="code"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Code"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item>
                    <label>Parent</label>
                    <Form.Item
                      name="parentId"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Parent"
                        }
                      ]}
                    >
                      <Select>
                        {parentList.map(item => (
                          <Option value={item.id}> {item.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

            </TabPane>
            <TabPane tab="Görseller" key="2">
              <Row gutter={24}>
                <Col span={6}>
                  <Form.Item>
                    <label>Image TR</label>
                    <Form.Item
                      name="image_TR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Image TR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Image EN</label>
                    <Form.Item
                      name="image_EN"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Image EN"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Image FR</label>
                    <Form.Item
                      name="image_FR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Image FR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <label>Image AR</label>
                    <Form.Item
                      name="image_AR"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Image AR"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Seo Ayarları" key="3">
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item>
                    <label>Seo Header</label>
                    <Form.Item
                      name="seoHeader"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo Header"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    <label>Seo Detail</label>
                    <Form.Item
                      name="seoDetail"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo Detail"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    <label>Seo Keywords</label>
                    <Form.Item
                      name="seoKeywords"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Seo Keywords"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>          
            <TabPane tab="Üst İçerik" key="4">
            <Row gutter={24}>
               
                <Col span={24}>
                  <Form.Item>
                    <label>Top Content</label>
                    <Form.Item
                      name="topContent"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input your Top Content"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
              </TabPane>
              <TabPane tab="Alt İçerik" key="5">
                <Row gutter={24}>
                  <Col span={6}>
                    <Form.Item>
                      <label>Bottom Content</label>
                      <Form.Item
                        name="bottomContent"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input your Bottom Content"
                          }
                        ]}
                      >

                      </Form.Item>
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Diğer Ayarlar" key="">
                <Row gutter={24}>
              
                  <Col span={8}>
                    <Form.Item>
                      <label>Category Order Type</label>
                      <Form.Item
                        name="categoryOrderTypeModelId"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input your Category Order Type"
                          }
                        ]}
                      >
                        <Select>
                          {parentList.map(item => (
                            <Option value={item.id}> {item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <label>Category Installment Type</label>
                      <Form.Item
                        name="categoryInstallmentTypeId"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please input your Category Installment Type"
                          }
                        ]}
                      >
                        <Select>
                          {parentList.map(item => (
                            <Option value={item.id}> {item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <label>Google Merchant Category Name</label>
                      <Form.Item
                        name="googleMerchantCategoryName"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input your Google Merchant Category Name"
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>
        </Tabs>

        
            <Row gutter={24}>
             
              <Col>
                <Form.Item>
                  <label></label>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Kaydet
                    </Button>
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <label></label>
                  <Form.Item>
                    <Button type="secondary" onClick={reset}>
                      Temizle
                    </Button>
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
          </Form>
      
    </React.Fragment>
  );
}

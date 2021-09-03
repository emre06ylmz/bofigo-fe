import React, { useRef, useState } from "react";
import { Form, Input, Button, Row, Col, Tabs, Upload, message } from "antd";
import { useHistory } from "react-router-dom";
import callApi from "../../../../utils/callApi";

const { TabPane } = Tabs;

export default function BrandPostForm(props) {
  const form = useRef(null);
  let history = useHistory();
  const [imageList, setImageList] = useState([]);

  async function onFinish(values) {

    imageList.forEach(file => {
      values.append('files[]', file);
    });

    try {
      let response = await callApi({
        endpoint: "/api/brands",
        method: "POST",
        body: values
      });
      if (response) {
        message.success("Kayıt işlemi başarıyla tamamlandı.");
      }
    } catch (error) {
      message.error(error.messages);
    }
  }

  function onDisplayRecord(e) {
    history.push("/pages/brands");
  }

  function reset(e) {
    form.current.resetFields();
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    var tmp = imageList;
    tmp[1] = file
    setImageList(tmp)

    return isJpgOrPng && isLt2M;
  }

  function handleChange(info) {
    if (info === undefined || info.file === undefined) {
      //this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageList(imageList)
      );
    }
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  return (
    <React.Fragment>
      <Button type="primary" onClick={onDisplayRecord}>
        Tüm Kayıtları Göster
      </Button>
      <Tabs>
        <TabPane tab="Yeni Marka Bilgiler" key="1">
          <Form ref={form} name="emailSettingsForm" onFinish={onFinish}>
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
              <Col span={6}>
                <Form.Item>
                  <label>Description TR</label>
                  <Form.Item
                    name="description_TR"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your Description TR"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Description EN</label>
                  <Form.Item
                    name="description_EN"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your Description EN"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Description FR</label>
                  <Form.Item
                    name="description_FR"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your Description FR"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <label>Description AR</label>
                  <Form.Item
                    name="description_AR"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your Description AR"
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
                  <label>Image TR</label>                 
                  <Upload
                    name="image_TR"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Image TR"
                      }
                    ]}
                  >
                  <img  alt="avatar" style={{ width: '100%' }} />
                </Upload>
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

            <Row gutter={24}>
              <Col span={6}>
                <Form.Item>
                  <label>Url</label>
                  <Form.Item
                    name="url"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input your URL"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form.Item>
              </Col>
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
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
}

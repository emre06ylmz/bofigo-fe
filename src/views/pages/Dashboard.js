import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { useAuthentication } from '../../Authentication';

function Dashboard(props) {
  const { user } = useAuthentication();
  const heroStyles = {
    padding: '50px 0 70px',
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="home-hero" style={heroStyles}>
            <h1>Sayın {user.name}, bofigo Admin Paneline hoşgeldiniz.</h1>
            <p className="text-muted">Hammadde kontrol Sistemi</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <CardBody className="display-flex">
              <img src={reactFeature} style={{ width: 70, height: 70 }} alt="react.js" aria-hidden={true} />
              <div className="m-l">
                <h2 className="h4">Hammadde Kategori Listesi</h2>
                <p className="text-muted">Hammadde Kategori Listesi</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardBody className="display-flex">
              <img src={bootstrapFeature} style={{ width: 70, height: 70 }} alt="Bootstrap" aria-hidden={true} />
              <div className="m-l">
              <h2 className="h4">Hammadde Listesi</h2>
              <p className="text-muted">Hammadde Listesi</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <CardBody className="display-flex">
              <img src={sassFeature} style={{ width: 70, height: 70 }} alt="Sass" aria-hidden={true} />
              <div className="m-l">
              <h2 className="h4">Ürün Listesi</h2>
              <p className="text-muted">Ürün Listesi</p>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardBody className="display-flex">
              <img src={responsiveFeature} style={{ width: 70, height: 70 }} alt="Responsive" aria-hidden={true} />
              <div className="m-l">
              <h2 className="h4">Tedarikçi Listesi</h2>
              <p className="text-muted">Tedarikçi Listesi</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;

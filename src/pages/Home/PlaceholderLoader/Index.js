import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import Header from "./frame/Header";
import Footer from "./frame/Footer";

const PlaceholderLoader = () => {
  return (
    <>
      <Col>
        <Card className="shadow-md overflow-hidden ">
          <Header />
          <CardBody className="pb-0">
            <h5 className="card-title placeholder-glow mb-3">
              <span className="placeholder col-12 h-250"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-6"></span>
            </p>
            <Footer />
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-md overflow-hidden ">
          <Header />
          <CardBody className="pb-0">
            <p className="card-text placeholder-glow">
              <span className="placeholder col-11"></span>
              <span className="placeholder col-6"></span>
            </p>
            <Footer />
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-md overflow-hidden ">
          <Header />
          <CardBody className="pb-0">
            <h5 className="card-title placeholder-glow mb-3">
              <span className="placeholder col-12 h-250"></span>
            </h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-md overflow-hidden ">
          <Header />
          <CardBody className="pb-0">
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
            </p>
            <Footer />
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-md overflow-hidden ">
          <Header />
          <CardBody className="pb-0">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <i className="ri-checkbox-blank-circle-fill text-muted fs-8"></i>
              </div>
              <div className="flex-grow-1 ms-2 placeholder-glow text-muted">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-10"></span>
                <span className="placeholder col-6"></span>
              </div>
            </div>
            <div className="d-flex mt-2">
              <div className="flex-shrink-0">
                <i className="ri-checkbox-blank-circle-fill text-muted fs-8"></i>
              </div>
              <div className="flex-grow-1 ms-2 placeholder-glow text-muted">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-10"></span>
                <span className="placeholder col-6"></span>
              </div>
            </div>
            <div className="d-flex mt-2">
              <div className="flex-shrink-0">
                <i className="ri-checkbox-blank-circle-fill text-muted fs-8"></i>
              </div>
              <div className="flex-grow-1 ms-2 placeholder-glow text-muted">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-8"></span>
                <span className="placeholder col-10"></span>
                <span className="placeholder col-6"></span>
              </div>
            </div>
            <Footer />
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default PlaceholderLoader;

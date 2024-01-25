import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col xs={6}>{new Date().getFullYear()} © android Arsenal.</Col>
            <Col xs={6}>
              <div className="text-end">
                <Link to="/privacy">Privacy Policy</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

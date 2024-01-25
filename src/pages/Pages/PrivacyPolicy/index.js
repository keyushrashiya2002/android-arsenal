import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import FeatherIcon from "feather-icons-react";
import Header from "../Header";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  document.title = "Privacy Policy | android arsenal";
  return (
    <React.Fragment>
      <Helmet>
        <title>
          Android Aresenal - A categorized directory of libraries and tools for
          Android
        </title>
        <meta name="description" content="Find your solution with us" />
      </Helmet>
      <div className="page-content">
        <Container fluid>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card>
                <div className="bg-soft-info position-relative">
                  <CardBody className="p-5">
                    <div className="text-center">
                      <h3>Privacy Policy</h3>
                    </div>
                  </CardBody>
                  <div className="shape">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      // xmlns:svgjs="http://svgjs.com/svgjs"
                      width="1440"
                      height="60"
                      preserveAspectRatio="none"
                      viewBox="0 0 1440 60"
                    >
                      <g mask='url("#SvgjsMask1001")' fill="none">
                        <path
                          d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z"
                          style={{ fill: "var(--vz-card-bg-custom)" }}
                        ></path>
                      </g>
                      <defs>
                        <mask id="SvgjsMask1001">
                          <rect width="1440" height="60" fill="#ffffff"></rect>
                        </mask>
                      </defs>
                    </svg>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success icon-dual-success icon-xs"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>Personal Information</h5>
                      <p className="text-muted">
                        When you use our services, we may collect certain
                        personally identifiable information, such as your name,
                        email address, and any additional information you
                        voluntarily provide to us.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success icon-dual-success icon-xs"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>Device Information</h5>
                      <p className="text-muted">
                        We may collect information about your mobile device,
                        including its unique device identifier, operating system
                        version, and other technical details, to optimize and
                        improve our services.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success icon-dual-success icon-xs"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>Usage Data</h5>
                      <p className="text-muted">
                        We may collect non-personal information about how you
                        use our application and website, such as the features
                        you access, the pages you visit, and the actions you
                        take. This data is used to analyze trends, administer
                        the services, and improve user experience.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success icon-dual-success icon-xs"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>How We Use Your Information</h5>
                      <p className="text-muted mb-1">
                        Google's advertising requirements can be summed up by
                        Google's Advertising Principles. They are put in place
                        to provide a positive experience for users.
                      </p>
                      <p className="fs-14 mb-1">
                        To Provide and Improve Services:
                      </p>
                      <p className="text-muted">
                        We may use your information to deliver and maintain our
                        services, respond to your inquiries, and personalize
                        your experience. We continuously strive to improve our
                        offerings based on user feedback and usage patterns.
                      </p>
                      <p className="fs-14 mb-1">Communication and Marketing</p>
                      <p className="text-muted">
                        We may use your contact information to communicate with
                        you about our services, updates, promotions, and
                        relevant news. You can opt-out of receiving marketing
                        communications at any time.
                      </p>
                      <p className="fs-14 mb-1">
                        Analytics and Aggregated Data
                      </p>
                      <p className="text-muted">
                        We may analyze and aggregate user data to understand
                        usage patterns, identify trends, and improve our
                        services. This information is anonymized and does not
                        personally identify you.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PrivacyPolicy;

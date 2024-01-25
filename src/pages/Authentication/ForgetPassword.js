import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "../../Components/Common/withRouter";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import mailIcon from "../../assets/images/json/mail.json";
import Lottie from "react-lottie";

const ForgetPasswordPage = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      sendPasswordResetEmail(auth, values.email)
        .then((res) => {
          navigate("/login");
          setSuccessMessage(res);
          console.log("RES ???", res);
        })
        .catch((error) => {
          setError(error);
          console.log("ERROR >>>", error?.message);
        });
    },
  });

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: mailIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const mailStyle = {
    color: "#0ab39c",
  };

  document.title = "Reset Password | android arsenal";
  return (
    <div>
      <Container fluid>
        <Row className="justify-content-center min-vh-100">
          <Col md={8} lg={6} xl={5} className="d-flex align-items-center">
            <Card className="mt-4 w-100 rounded-1">
              <CardBody className="p-4">
                <div className="text-center mt-2">
                  <h5 className="text-primary">Forgot Password?</h5>
                  <p className="text-muted">Reset password with android</p>
                  {/* <lord-icon
                    src="https://cdn.lordicon.com/rhvddzym.json"
                    trigger="loop"
                    colors="primary:#0ab39c"
                    className="avatar-xl"
                    style={{ width: "120px", height: "120px" }}
                  >
                  </lord-icon> */}
                  <Lottie
                    options={LoadingOptions}
                    height={120}
                    width={120}
                    className="avatar-xl"
                    style={mailStyle}
                  />
                </div>

                <div className="p-2">
                  {error ? (
                    <Alert color="danger" style={{ marginTop: "13px" }}>
                      {error?.message}
                    </Alert>
                  ) : successMessage ? (
                    <Alert color="danger" style={{ marginTop: "13px" }}>
                      {successMessage?.message}
                    </Alert>
                  ) : (
                    <Alert
                      className="alert-borderless alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </Alert>
                  )}
                  {/* {forgetSuccessMsg ? (
                    <Alert color="success" style={{ marginTop: "13px" }}>
                      {forgetSuccessMsg}  
                    </Alert>
                  ) : null} */}
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-4">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.email}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="text-center mt-4">
                      <button className="btn btn-success w-100" type="submit">
                        Send Reset Link
                      </button>
                    </div>
                  </Form>
                </div>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Click here{" "}
                    </Link>{" "}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);

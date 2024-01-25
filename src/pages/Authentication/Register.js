import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import firebase from "firebase/compat/app";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validation = useFormik({
    // enableReinitialize: true,

    initialValues: {
      email: "",
      user_name: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please Enter Your Email")
        .matches(
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          "Please enter valid email address"
        ),
      user_name: Yup.string().required("Please Enter Your Username"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirm_password: Yup.string()
        .required("Please Enter Your Confirm Password")
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Confirm Password Isn't Match"
          ),
        }),
    }),
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredentials) => {
          localStorage?.setItem(
            "token",
            userCredentials?._tokenResponse?.idToken
          );

          const details = {
            uid: userCredentials?._tokenResponse?.localId,
            user_name: values.user_name,
            email: values.email,
            password: values.password,
            createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
            lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
            like_list: [],
          };

          const ref = collection(db, "users");
          addDoc(ref, details)
            .then((res) => {
              const userDetails = {
                email: values?.email,
                user_name: values?.user_name,
                id: res?.id,
              };
              localStorage?.setItem("userDetails", JSON.stringify(userDetails));
              setRegistrationSuccess(true);
            })
            .catch((error) => {
              console.log("ERROR >>>", error);
            });
        })
        .catch((error) => {
          setRegistrationError(error);
        });
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (registrationSuccess) {
        navigate("/");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [registrationSuccess]);

  document.title = "Basic SignUp | android arsenal";

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="min-vh-100 justify-content-center">
          <Col lg={7} xl={6} md={9} className="d-flex align-items-center">
            <Card className="mt-4 w-100 rounded-1">
              <CardBody className="p-4">
                <div className="text-center mt-2">
                  <h5 className="text-primary">Create New Account</h5>
                  <p className="text-muted">
                    Get your free android-Arsenal account now
                  </p>
                </div>
                <div className="p-2 mt-4">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    className="needs-validation"
                    action="#"
                  >
                    {registrationSuccess ? (
                      <>
                        {toast("Your Redirect To Login Page...", {
                          position: "top-right",
                          hideProgressBar: false,
                          className: "bg-success text-white",
                          progress: undefined,
                          toastId: "",
                        })}
                        <ToastContainer autoClose={2000} limit={1} />
                        <Alert color="success">
                          Register User Successfully and Your Redirect To Home
                          Page...
                        </Alert>
                      </>
                    ) : registrationError?.message ? (
                      <Alert color="danger">
                        <div>
                          {/* Email has been Register Before, Please Use Another Email Address... */}
                          {registrationError?.message}
                        </div>
                      </Alert>
                    ) : null}
                    <div className="mb-3">
                      <Label htmlFor="useremail" className="form-label">
                        Email <span className="text-danger">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email address"
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
                    <div className="mb-3">
                      <Label htmlFor="username" className="form-label">
                        Username <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="user_name"
                        type="text"
                        placeholder="Enter username"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.user_name || ""}
                        invalid={
                          validation.touched.user_name &&
                          validation.errors.user_name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.user_name &&
                      validation.errors.user_name ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.user_name}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="userpassword" className="form-label">
                        Password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.password}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <Label htmlFor="confirmPassword" className="form-label">
                        Confirm Password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="confirm_password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.confirm_password || ""}
                        invalid={
                          validation.touched.confirm_password &&
                          validation.errors.confirm_password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.confirm_password &&
                      validation.errors.confirm_password ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.confirm_password}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <p className="mb-0 fs-12 text-muted fst-italic">
                        By registering you agree to the android-Arsenal
                        <Link
                          to="/privacy"
                          className="text-primary text-decoration-underline fst-normal fw-medium ms-2"
                        >
                          Terms of Use
                        </Link>
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button
                        type="submit"
                        color="primary"
                        className="btn btn-primary w-100"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="mt-3 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signin{" "}
                    </Link>{" "}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
} from "reactstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "../../Components/Common/withRouter";
import { auth, db } from "../../firebase/config";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import firebase from "firebase/compat/app";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const { user } = useSelector((state) => ({
    user: state.Account.user,
  }));

  const [userLogin, setUserLogin] = useState([]);
  const [loginLoader, setLoginLoader] = useState(false);
  const [loginError, setLoginError] = useState();
  const [authError, setAuthError] = useState();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    if (user && user) {
      setUserLogin({
        email: user.user.email,
        password: user.user.confirm_password,
      });
    }
  }, [user]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "" || "",
      password: userLogin.password || "" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values) => {
      setLoginLoader(true);

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          if (userCredential) {
            const user_email = userCredential?._tokenResponse?.email;
            localStorage?.setItem(
              "token",
              userCredential?._tokenResponse?.idToken
            );
            setLoginLoader(false);

            onSnapshot(collection(db, "users"), (collectionSnapshot) => {
              const users = collectionSnapshot?.docs?.map((doc) => {
                return {
                  createdDtm: doc.data().createdDtm,
                  lastLoginTime: doc.data().lastLoginTime,
                  password: doc.data().password,
                  uid: doc.data().uid,
                  email: doc.data().email,
                  user_name: doc.data().user_name,
                  id: doc?.id,
                };
              });

              users?.forEach((snapshot) => {
                if (snapshot?.email === user_email) {
                  const userDetails = {
                    email: snapshot?.email,
                    user_name: snapshot?.user_name,
                    id: snapshot?.id,
                  };
                  localStorage?.setItem(
                    "userDetails",
                    JSON.stringify(userDetails)
                  );
                }
              });
            });
            navigate("/");
          }
        })
        .catch((error) => {
          setLoginError(error);
          setLoginLoader(false);
        });
    },
  });

  const handleLoginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res?.user;
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      localStorage?.setItem("token", res?._tokenResponse?.idToken);

      if (docs?.docs?.length === 0) {
        const ref = collection(db, "users");
        const details = {
          uid: user?.uid,
          email: user?.email,
          user_name: user?.displayName,
          password: "",
          createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
          lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
          like_list: [],
        };
        await addDoc(ref, details);
      }
      onSnapshot(collection(db, "users"), (collectionSnapshot) => {
        const users = collectionSnapshot?.docs?.map((doc) => {
          return {
            createdDtm: doc.data().createdDtm,
            lastLoginTime: doc.data().lastLoginTime,
            password: doc.data().password,
            uid: doc.data().uid,
            email: doc.data().email,
            user_name: doc.data().user_name,
            id: doc?.id,
          };
        });

        users?.forEach((snapshot) => {
          if (snapshot?.email === user?.email) {
            const userDetails = {
              email: snapshot?.email,
              user_name: snapshot?.user_name,
              id: snapshot?.id,
            };
            localStorage?.setItem("userDetails", JSON.stringify(userDetails));
          }
        });
      });
      navigate("/");
    } catch (error) {
      setAuthError(error);
    }
  };

  const handleLoginWithGithub = async (e) => {
    try {
      const res = await signInWithPopup(auth, githubProvider);

      const user = res?.user;
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      localStorage?.setItem("token", res?._tokenResponse?.idToken);

      if (docs?.docs?.length === 0) {
        const ref = collection(db, "users");
        const details = {
          uid: user?.uid,
          email: user?.email,
          user_name: user?.displayName,
          password: "",
          createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
          lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
          like_list: [],
        };
        await addDoc(ref, details);
      }
      onSnapshot(collection(db, "users"), (collectionSnapshot) => {
        const users = collectionSnapshot?.docs?.map((doc) => {
          return {
            createdDtm: doc.data().createdDtm,
            lastLoginTime: doc.data().lastLoginTime,
            password: doc.data().password,
            uid: doc.data().uid,
            email: doc.data().email,
            user_name: doc.data().user_name,
            id: doc?.id,
          };
        });

        users?.forEach((snapshot) => {
          if (snapshot?.email === user?.email) {
            const userDetails = {
              email: snapshot?.email,
              user_name: snapshot?.user_name,
              id: snapshot?.id,
            };
            localStorage?.setItem("userDetails", JSON.stringify(userDetails));
          }
        });
      });
      navigate("/");
    } catch (error) {
      setAuthError(error);
    }
  };

  document.title = "Basic SignIn | android arsenal";
  return (
    <div>
      <Container fluid>
        <Row className="min-vh-100 justify-content-center">
          <Col lg={7} xl={6} md={9} className="d-flex align-items-center">
            <Card className="mt-4 w-100 rounded-1">
              <CardBody className="p-4">
                <div className="text-center mt-2">
                  <h5 className="text-success">Welcome Back !</h5>
                  <p className="text-muted">
                    Sign in to continue to android-arsenal
                  </p>
                </div>
                {loginError || authError ? (
                  <Alert color="danger">
                    {loginError?.message || authError?.message}
                  </Alert>
                ) : null}
                <div className="p-2 mt-4">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-3">
                      <Label htmlFor="email" className="form-label">
                        Email
                      </Label>
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
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <Label className="form-label" htmlFor="password-input">
                          Password
                        </Label>
                        <Link to="/forgotpassword">Forgot Password?</Link>
                      </div>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <Input
                          name="password"
                          type="password"
                          className="form-control pe-5"
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
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="auth-remember-check"
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="auth-remember-check"
                      >
                        Remember me
                      </Label>
                    </div>

                    <div className="mt-4">
                      <Button
                        disabled={loginLoader}
                        className="btn btn-success w-100"
                        type="submit"
                        color="success"
                      >
                        {loginLoader ? (
                          <div
                            role="status"
                            className="flex-shrink-0 spinner-border-sm me-2 spinner-border"
                          ></div>
                        ) : (
                          ""
                        )}
                        Sign In
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="signin-other-title">
                        <h5 className="fs-13 mb-4 title">Sign In with</h5>
                      </div>
                      <div>
                        <Button
                          color="light"
                          className="btn-icon me-1"
                          type="button"
                          onClick={(e) => handleLoginWithGoogle(e)}
                        >
                          <FcGoogle style={{ fontSize: "22px" }} />
                        </Button>
                        <Button
                          color="light"
                          className="btn-icon"
                          type="button"
                          onClick={(e) => handleLoginWithGithub(e)}
                        >
                          <SiGithub style={{ fontSize: "22px" }} />
                        </Button>{" "}
                      </div>
                    </div>
                  </Form>
                </div>
                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account ?{" "}
                    <Link
                      to="/register"
                      className="fw-semibold text-success text-decoration-underline"
                    >
                      {" "}
                      Signup{" "}
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

export default withRouter(Login);

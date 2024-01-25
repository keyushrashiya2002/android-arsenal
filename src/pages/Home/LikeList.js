import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Masonry from "react-masonry-css";
import { breakpointColumnsObj } from "./DummyData";
import Footer from "./PlaceholderLoader/frame/Footer";
import Header from "./PlaceholderLoader/frame/Header";
import { AiFillHeart } from "react-icons/ai";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";
import Error from "../Pages/Error";
import noData from "../../assets/images/noData.png";

const LikeList = () => {
  const [userData, setUserData] = useState();
  const [pending, setPending] = useState(false);
  const [showData, setShowData] = useState(20);
  const [errorMessage, setErrorMessage] = useState();
  const loginUserData = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    fetchData();

    if (userData?.like_list?.length === undefined) {
      setPending(true);
    }
  }, []);

  const fetchData = () => {
    const docRef = doc(db, "users", loginUserData?.id);

    getDoc(docRef)
      .then((res) => {
        setUserData(res?.data());
        setPending(false);
      })
      .catch((error) => {
        setPending(false);
        setErrorMessage(error);
      });
  };

  const handleUnlike = (e, item) => {
    e.preventDefault();

    let index = userData?.like_list?.findIndex((x) => x?.id === item?.id);
    const docRef = doc(db, "users", loginUserData?.id);
    if (index >= 0) {
      userData?.like_list?.splice(index, 1);
      updateDoc(docRef, {
        like_list: arrayRemove(item),
      });
      fetchData();
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Android Aresenal - A categorized directory of libraries and tools for
          Android
        </title>
        <meta name="description" content="Find your solution with us" />
      </Helmet>
      <div className="page-content">
        <Container fluid className="position-relative">
          <h1 className="h2 mb-4 text-center pb-2">Your Collection</h1>
          {errorMessage ? (
            <Alert color="danger">{errorMessage?.message}</Alert>
          ) : null}
          <Row>
            {pending ? (
              <Col sm={12} className="px-0 px-md-2">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {Array(20)
                    .fill(1)
                    .map((item, key) => {
                      return (
                        <Col key={key}>
                          <Card className="shadow-md overflow-hidden ">
                            <Header />
                            <CardBody className="pb-0">
                              <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                                <span className="placeholder col-4"></span>
                              </p>
                              <Footer />
                            </CardBody>
                          </Card>
                        </Col>
                      );
                    })}
                </Masonry>
              </Col>
            ) : userData?.like_list?.length !== 0 ? (
              <Col sm={12} className="px-0 px-md-2">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {userData?.like_list?.map((item, key) =>
                    key >= showData - 20 && key < showData ? (
                      <Col key={key} className="mb-2">
                        <Card>
                          <CardHeader className="right ribbon-box pb-2">
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                              <a
                                href={`details/${item?.full_name}`}
                                className="flex-wrap"
                              >
                                <h2 className="card-title text-success placeholderItem">
                                  {item?.name}
                                </h2>
                              </a>
                              <Button
                                type="button"
                                id={item?.id}
                                className="btn"
                                color="light"
                                style={{ background: "none", border: "none" }}
                                onClick={(e) => handleUnlike(e, item)}
                              >
                                <AiFillHeart
                                  style={{ fontSize: "18px", color: "red" }}
                                />
                              </Button>
                            </div>
                            <p className="card-subtitle text-muted mb-0 placeholderItem">
                              {item?.language}
                            </p>
                          </CardHeader>
                          <CardBody className="pb-0">
                            {item?.description ? (
                              <p className="card-text fs-14 mb-2 placeholderItem">
                                {item?.description}
                              </p>
                            ) : null}
                            <div>
                              {item?.topics &&
                                item?.topics?.map((item, key) => {
                                  return (
                                    <span
                                      key={key}
                                      className="badge bg-success  me-1 mb-1 placeholderItem"
                                    >
                                      {item}
                                    </span>
                                  );
                                })}
                            </div>
                            <CardFooter
                              className={`d-flex align-items-center justify-content-between px-1 py-2 ${
                                !item?.description &&
                                JSON.stringify(item?.topics) === "[]"
                                  ? "border-0 pt-0"
                                  : "mt-2"
                              }`}
                            >
                              <p className="text-muted d-flex align-items-center mb-0">
                                <span className="placeholderItem placeholder-rounded hw-24 me-1">
                                  <img
                                    alt="..."
                                    className="w-100 h-100 rounded-circle  border"
                                    src={item?.owner?.avatar_url}
                                  />
                                </span>

                                <span className="placeholderItem">
                                  {item?.owner?.login}
                                </span>
                              </p>
                              <p className="text-muted d-flex align-items-center mb-0 ">
                                <i className="ri-calendar-line me-1 fs-5"></i>
                                <span className="placeholderItem">
                                  {item?.updated_at.split("T")[0]}
                                </span>
                              </p>
                            </CardFooter>
                          </CardBody>
                        </Card>
                      </Col>
                    ) : null
                  )}
                </Masonry>
              </Col>
            ) : (
              <Col xs={12}>
                <Card>
                  <CardBody className="text-center py-5">
                    <Error
                      img={noData}
                      title="Sorry, no data Found..!"
                      description="The search result you are looking for is not
                                                                available!"
                    />
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
          {userData?.like_list?.length !== undefined ||
          userData?.like_list?.length !== 0 ||
          !pending ? (
            <Col sm={12}>
              <Pagination
                size="lg"
                listClassName="justify-content-end pagination-separated"
              >
                <PaginationItem>
                  <PaginationLink
                    className={`${showData === 20 ? "disabled" : null}`}
                    hidden={showData === 20}
                    disabled={showData === 20}
                    onClick={() => {
                      setShowData(showData - 20);
                    }}
                  >
                    ← Prev
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={`${showData === 100 ? "disabled" : null}`}
                    hidden={
                      userData?.like_list?.length === undefined ||
                      showData === userData?.like_list?.length ||
                      userData?.like_list?.length < 20 ||
                      userData?.like_list?.length < showData
                    }
                    disabled={showData === userData?.like_list?.length}
                    onClick={() => {
                      setShowData(showData + 20);
                    }}
                  >
                    Next →
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Col>
          ) : null}
        </Container>
      </div>
    </>
  );
};

export default LikeList;

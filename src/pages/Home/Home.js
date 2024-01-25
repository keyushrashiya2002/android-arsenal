import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import "./masonry.css";
import noData from "../../assets/images/noData.png";
import someError from "../../assets/images/error.png";
import Select from "react-select";
import Footer from "./PlaceholderLoader/frame/Footer";
import Header from "./PlaceholderLoader/frame/Header";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store/home/action";
import AdSense from "react-adsense";
import {
  breakpointColumnsObj,
  langArray,
  SingleOptions,
  sortByArray,
} from "./DummyData";
import Error from "../Pages/Error";
import { Helmet } from "react-helmet";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app, db } from "../../firebase/config";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import {
  AdvertisingProvider,
  AdvertisingSlot,
  logVersionInfo,
} from "react-advertising";
import config from "./config";

const Home = () => {
  // logVersionInfo();

  const dispatch = useDispatch();
  const { data, loading, homeError, error } = useSelector((state) => ({
    data: state.Home.data,
    loading: state.Home.loading,
    homeError: state.Home.homeError,
    error: state.Home.error,
  }));

  const randomDigit = Number(
    parseFloat(Math.random() * SingleOptions.length).toFixed(0)
  );
  const [search, setSearch] = useState(SingleOptions[randomDigit]);
  const [languages, setLanguages] = useState("react");
  const [sortBy, setSortBy] = useState("stars");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [showData, setShowData] = useState(20);
  const [isLike, setIsLike] = useState([]);
  const [loginUserData, setLoginUserData] = useState();
  const [token, setToken] = useState();

  const orderType = "desc";
  const limit = 100;
  const googleAdSenseClient = process.env.REACT_APP_ADSENSE_CLIENT || "";
  const googleAdSenseSlot = process.env.REACT_APP_ADSENSE_SLOT || "";

  useEffect(() => {
    const interval = setInterval(() => {
      const getToken = localStorage.getItem("token");
      setToken(getToken);

      const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
      setLoginUserData(loginUserDetails);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (error && homeError !== null) {
    if (homeError.status === 403) {
      console.log("do mail");
      const analytics = getAnalytics(app);
      logEvent(analytics, "select_content", {
        content_type: "image",
        content_id: "P12453",
      });
    }
  }
  const getHomeData = async (lang, sort, sear, pag) => {
    setIsLoading(true);
    setPage(0);
    setShowData(20);
    dispatch(
      getData({
        languages: lang ? lang : languages,
        sortBy: sort ? sort : sortBy,
        q: sear ? sear : "notion" || search.value,
        page: pag ? pag : 0,
        order: orderType,
        per_page: limit,
      })
    );
  };

  const handleSimmer = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (JSON.stringify(data) === "{}") {
      getHomeData();
    }
  }, []);

  // useEffect(() => {
  //   var advertise = document.querySelectorAll("ins[data-side-rail-status='idle']");
  //   var ads = document.querySelectorAll("ins");
  //   console.log("ads >>>>", ads);
  //   console.log("advertise ????", advertise);

  //   if (ads.length !== 0) {
  //     ads[0].style.display = "block";
  //     ads[0].zIndex = "214748";
  //     ads[0].style.opacity = 1;
  //     ads[0].style.left = "100px";
  //     console.log("INS 1 >>>", ads[0]);
  //   }
  //   if (ads.length === 2) {
  //     ads[1].style.display = "block";
  //     ads[1].zIndex = "214748";
  //     ads[1].style.opacity = 1;
  //     ads[1].style.right = "100px";
  //     console.log("INS 2 >>>", ads[1]);
  //   }
  // }, [isLoading]);

  const handleLike = (e, item) => {
    let index = isLike?.findIndex((x) => x?.id === item.id);
    const docRef = doc(db, "users", loginUserData?.id);

    if (index >= 0) {
      isLike?.splice(index, 1);

      updateDoc(docRef, {
        like_list: arrayRemove(item),
      });
    } else {
      isLike?.push(item);

      updateDoc(docRef, {
        like_list: arrayUnion(item),
      });
    }
    setIsLike([...isLike]);
  };

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
        <div className="text-center mb-2">
          {/* <AdvertisingProvider config={config}>
            <AdvertisingSlot id="1" />
          </AdvertisingProvider> */}
          {/* <ins className='adsbygoogle'
            style={{ display: 'block', margin: "10px" }}
            client={googleAdSenseClient}
            slot={googleAdSenseSlot}
            data-ad-format='auto'
            data-full-width-responsive="true"
          >
          </ins> */}
        </div>
        <Container fluid className="position-relative">
          <h1 className="h2 mb-4 text-center pb-2">
            android developer portal with tools, libraries, and apps
          </h1>
          <Row>
            <Col sm={12} className="px-0 px-md-2">
              <Card>
                <CardBody className="py-2">
                  <Row className="align-items-center">
                    <Col md={8} className="mb-3 mb-md-0">
                      <div className="filter-by mb-2 fs-14">
                        Languages :
                        {langArray.map((item, key) => {
                          return (
                            <div key={key} className="d-inline-block">
                              <Button
                                onClick={() => {
                                  if (item.value !== languages) {
                                    setLanguages(item.value);
                                    getHomeData(item.value, false, false);
                                  }
                                }}
                                className={`mx-2 bg-transparent p-0 border-0 ${
                                  item.value === languages
                                    ? "text-success fw-semibold"
                                    : "text-muted"
                                }`}
                              >
                                {item.title}
                              </Button>
                              /
                            </div>
                          );
                        })}
                      </div>
                      <div className="filter-by  fs-14">
                        Sort By :
                        {sortByArray.map((item, key) => {
                          return (
                            <div key={key} className="d-inline-block">
                              <Button
                                onClick={() => {
                                  if (item.value !== sortBy) {
                                    setSortBy(item.value);
                                    getHomeData(false, item.value, false);
                                  }
                                }}
                                className={`mx-2 bg-transparent p-0 border-0 ${
                                  item.value === sortBy
                                    ? "text-success fw-semibold"
                                    : "text-muted"
                                }`}
                              >
                                {item.title}
                              </Button>
                              /
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Select
                        value={search}
                        placeholder="Select Category"
                        onChange={(e) => {
                          setSearch(e);
                          getHomeData(false, false, e.value);
                        }}
                        options={SingleOptions}
                      ></Select>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            {JSON.stringify(data) === "{}" ? (
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
            ) : !error && homeError === null && data?.items?.length !== 0 ? (
              <>
                <Col sm={12} className="px-0 px-md-2">
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {data &&
                      data?.items?.map((item, key) =>
                        key >= showData - 20 && key < showData ? (
                          <Col key={key} className="mb-2">
                            <Card
                              className={`mb-0 shadow-md overflow-hidden ${
                                isLoading ? "placeholderBox" : ""
                              }`}
                            >
                              <CardHeader className="right ribbon-box pb-2">
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                  <Link
                                    to={`details/${item?.full_name}`}
                                    className="flex-wrap"
                                  >
                                    <h2 className="card-title text-success placeholderItem">
                                      {item?.name}
                                    </h2>
                                  </Link>
                                  {token ? (
                                    <button
                                      className="btn"
                                      id={item?.id}
                                      onClick={(e) => handleLike(e, item)}
                                    >
                                      {isLike?.findIndex(
                                        (x) => x?.id === item?.id
                                      ) >= 0 ? (
                                        <AiFillHeart
                                          style={{
                                            fontSize: "18px",
                                            color: "red",
                                          }}
                                        />
                                      ) : (
                                        <AiOutlineHeart
                                          style={{ fontSize: "18px" }}
                                        />
                                      )}{" "}
                                    </button>
                                  ) : null}
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
                    <Col>
                      <AdSense.Google
                        className="mx-auto"
                        responsive="true"
                        client={googleAdSenseClient}
                        slot={googleAdSenseSlot}
                        style={{
                          width: 300,
                          height: 300,
                          display: "block",
                          position: "absolute",
                          zIndex: 999999999,
                        }}
                      />
                    </Col>
                  </Masonry>
                </Col>
              </>
            ) : error && homeError !== null ? (
              <Col xs={12}>
                <Card>
                  <CardBody className="text-center py-5">
                    <Error
                      img={someError}
                      title="oops, something went wrong..!"
                      description="Please refresh the page or try again later"
                    />
                  </CardBody>
                </Card>
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
            {!error && homeError === null && data?.items?.length !== 0 ? (
              <Col sm={12}>
                <Pagination
                  size="lg"
                  listClassName="justify-content-end pagination-separated"
                >
                  <PaginationItem>
                    <PaginationLink
                      className={`${
                        isLoading || (page === 0 && showData === 20)
                          ? "disabled"
                          : null
                      }`}
                      hidden={page === 0 && showData === 20}
                      disabled={isLoading || (page === 0 && showData === 20)}
                      onClick={() => {
                        if (showData === 20) {
                          getHomeData(false, false, false, page - 1);
                          getHomeData();
                          setShowData(100);
                        } else {
                          setShowData(showData - 20);
                          handleSimmer();
                        }
                      }}
                    >
                      ← Prev
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      className={`${
                        isLoading || (page === 10 && showData === 100)
                          ? "disabled"
                          : null
                      }`}
                      hidden={
                        (page === 10 && showData === 100) ||
                        data?.items?.length < 20 ||
                        data?.items?.length < showData
                      }
                      disabled={isLoading || (page === 10 && showData === 100)}
                      onClick={() => {
                        if (showData === 100) {
                          getHomeData(false, false, false, page + 1);
                          setPage(page + 1);
                          setShowData(20);
                        } else {
                          setShowData(showData + 20);
                          handleSimmer();
                        }
                      }}
                    >
                      Next →
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </Col>
            ) : null}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;

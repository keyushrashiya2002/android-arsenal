import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import AdSense from "react-adsense";
import {
  Container,
  Row,
  Card,
  CardBody,
  Table,
  Col,
  CardHeader,
} from "reactstrap";
import {
  getReadme,
  getDetails,
  getBranchDetails,
} from "../../helpers/backend_helper";
import noData from "../../assets/images/noData.png";
import { useSelector } from "react-redux";
import Error from "../Pages/Error";
import { Helmet } from "react-helmet";

document.title = "Details || android arsenal";

const Details = () => {
  const [value, setValue] = useState("");
  const [pageData, setPageData] = useState({});
  const [readMeNotFound, setReadMeNotFound] = useState(false);
  const [gitProfileDetails, setGitProfileDetails] = useState({});
  const [detailsIsLoading, setDetailsIsLoading] = useState(false);
  const [contributorsIsLoading, setContributorsIsLoading] = useState(false);
  const [tagsIsLoading, setTagsIsLoading] = useState(false);
  const [readMeIsLoading, setReadMeIsLoading] = useState(false);
  const [contributorsData, setContributorsData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [detailsIndex, setDetailsIndex] = useState(5);

  const { homeData } = useSelector((state) => ({
    homeData: state.Home.data.items,
  }));
  const googleAdSenseClient = process.env.REACT_APP_ADSENSE_CLIENT || "";
  const googleAdSenseSlot = process.env.REACT_APP_ADSENSE_SLOT || "";

  const { user_name, repository_name } = useParams();
  const END_POINT = "https://github.com/";
  const BASE_URL =
    END_POINT +
    gitProfileDetails.user_name +
    "/" +
    gitProfileDetails.repository +
    "/";

  useEffect(() => {
    getPageDetails();
    if (homeData !== undefined || homeData?.length !== 0) {
      setIndex();
    }
  }, []);

  const setIndex = () => {
    var elementPos = homeData
      ?.map(function (x) {
        return x.id;
      })
      .indexOf(pageData.id);

    if (elementPos !== -1) {
      setDetailsIndex(elementPos);
    }
  };

  const getReadMeData = (data) => {
    getReadme(data)
      .then((res) => {
        setValue(res.data || res);
        setReadMeNotFound(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setReadMeNotFound(true);
        }
      })
      .finally(() => {
        setReadMeIsLoading(false);
      });
  };

  const getPageDetails = () => {
    setDetailsIsLoading(true);
    setContributorsIsLoading(true);
    setReadMeIsLoading(true);
    setTagsIsLoading(true);
    getDetails({ user_name: user_name, name: repository_name })
      .then((res) => {
        setPageData(res.data);
        getReadMeData({
          user_name: res.data.owner.login,
          repository: res.data.name,
          branch: res.data.default_branch,
        });
        setGitProfileDetails({
          user_name: res.data.owner.login,
          repository: res.data.name,
          branch: res.data.default_branch,
        });
        setIndex();
      })
      .catch((err) => {
        setReadMeIsLoading(false);
        if (err.response.status === 403) {
          console.log("do mail");
        }
      })
      .finally(() => {
        setDetailsIsLoading(false);
      });

    getBranchDetails({
      user_name: user_name,
      repository: repository_name,
      type: "contributors",
    })
      .then((res) => {
        setContributorsData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("do mail");
        }
      })
      .finally(() => {
        setContributorsIsLoading(false);
      });

    getBranchDetails({
      user_name: user_name,
      repository: repository_name,
      type: "tags",
    })
      .then((res) => {
        setTagData(res?.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("do mail");
        }
      })
      .finally(() => {
        setTagsIsLoading(false);
      });
  };

  const statusCount = [
    {
      link: BASE_URL + "stargazers" || "/",
      icon: "ri-star-fill",
      count: pageData?.stargazers_count || 0,
    },
    {
      link: BASE_URL + "watchers" || "/",
      icon: "ri-eye-fill",
      count: pageData?.watchers_count || 0,
    },
    {
      link: BASE_URL + "network" || "/",
      icon: "ri-git-branch-fill",
      count: pageData?.network_count || 0,
    },
    {
      link: BASE_URL + "issues" || "/",
      icon: "ri-information-fill",
      count: pageData?.open_issues_count || 0,
    },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>
          <title>
            Android Aresenal - A categorized directory of libraries and tools
            for Android
          </title>
        </title>
        <meta name="description" content="Find your solution with us" />
      </Helmet>
      <div className="page-content">
        <Container fluid style={{ position: "relative" }}>
          <Row>
            <Col sm={12}>
              <Card>
                <CardHeader
                  className={` d-flex align-items-center justify-content-between flex-wrap ${
                    detailsIsLoading ? "placeholderBox" : ""
                  }`}
                >
                  <h4 className="mb-0">
                    <span className="placeholderItem">{repository_name}</span>
                  </h4>
                  <ul className="list-inline mb-0 footer-social-link text-end">
                    {statusCount &&
                      statusCount.map((item, key) => {
                        return (
                          <li className="list-inline-item ms-3 me-0" key={key}>
                            <a
                              href={item.link}
                              target="_blank"
                              className="avatar-xs d-flex align-items-center w-100 placeholderItem"
                              rel="noreferrer"
                            >
                              <i className={`${item.icon} me-1`}></i>
                              {item.count}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </CardHeader>
                <CardBody className="py-2">
                  <Row>
                    {/* <Col sm={12}>
                      <ul className="list-inline mb-0 footer-social-link text-end">
                        {socialIcon &&
                          socialIcon.map((item, key) => {
                            return (
                              <li className="list-inline-item" key={key}>
                                <Link
                                  to={item.link}
                                  className="avatar-xs d-block"
                                >
                                  <div className="avatar-title rounded">
                                    <i className={item.icon}></i>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </Col> */}
                    <Col lg={4} md={6}>
                      <Card className="shadow-none mb-0">
                        <CardHeader className="p-2">
                          <h5 className="mb-0">General</h5>
                        </CardHeader>
                        <CardBody>
                          <div className="table-responsive table-card">
                            <Table className="mb-0 custom-table">
                              <tbody>
                                <tr
                                  className={`${
                                    tagsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">Tag</td>
                                  <td className="px-0">:</td>
                                  <td>
                                    {tagData.length !== 0
                                      ? tagData?.map((item, key) => {
                                          return (
                                            <span
                                              key={key}
                                              className="badge bg-success me-1 mb-1 placeholderItem"
                                            >
                                              {item.name}
                                            </span>
                                          );
                                        })
                                      : "-"}
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    License
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <a
                                      href={`${BASE_URL}blob/master/LICENSE`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="placeholderItem"
                                    >
                                      {pageData?.license?.name || "-"}
                                    </a>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Registered
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <span className="placeholderItem">
                                      {pageData?.pushed_at?.split("T")[0] ||
                                        "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Link
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <a
                                      href={pageData.html_url || "/"}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-break placeholderItem"
                                    >
                                      {pageData.html_url}
                                    </a>
                                  </td>
                                </tr>
                                {homeData !== undefined ? (
                                  <tr
                                    className={`${
                                      detailsIsLoading ? "placeholderBox" : ""
                                    }`}
                                  >
                                    <td className="fw-medium text-md-end">
                                      See also
                                    </td>
                                    <td className="px-0">:</td>
                                    <td>
                                      <ul className="ps-0 list-unstyled mb-0">
                                        {homeData &&
                                          homeData.map((item, key) =>
                                            key > detailsIndex - 3 &&
                                            key < 3 + detailsIndex ? (
                                              <li key={key}>
                                                <Link
                                                  onClick={() => {
                                                    getPageDetails();
                                                  }}
                                                  to={`/details/${item?.full_name}`}
                                                  className="placeholderItem transform"
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ) : null
                                          )}
                                      </ul>
                                    </td>
                                  </tr>
                                ) : null}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg={4} md={6}>
                      <Card className="shadow-none mb-0">
                        <CardHeader className="p-2">
                          <h5 className="mb-0">Additional</h5>
                        </CardHeader>
                        <CardBody>
                          <div className="table-responsive table-card">
                            <Table className="mb-0 custom-table">
                              <tbody>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Language
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <span className="placeholderItem">
                                      {pageData?.language || "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Version
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <span className="placeholderItem">
                                      {pageData?.version || "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Created
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <span className="placeholderItem">
                                      {pageData?.created_at?.split("T")[0] ||
                                        "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Updated
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <span className="placeholderItem">
                                      {pageData?.updated_at?.split("T")[0] ||
                                        "-"}
                                    </span>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Owner
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <a
                                      className="placeholderItem"
                                      href={END_POINT + user_name}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {pageData?.owner?.login || "-"}
                                    </a>
                                  </td>
                                </tr>
                                <tr
                                  className={`${
                                    contributorsIsLoading
                                      ? "placeholderBox"
                                      : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Contributor
                                  </td>
                                  <td className="px-0">:</td>
                                  <td className="d-flex flex-wrap">
                                    {contributorsData !== []
                                      ? contributorsData &&
                                        contributorsData?.map((item, key) =>
                                          key < 36 ? (
                                            <a
                                              key={key}
                                              href={END_POINT + item.login}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="placeholderItem placeholder-rounded"
                                            >
                                              <img
                                                alt="..."
                                                src={item.avatar_url}
                                                className="hw-25 rounded-circle object-fit-contain border me-1 mb-1"
                                              />
                                            </a>
                                          ) : key === 36 ? (
                                            <a
                                              href={`${BASE_URL}graphs/contributors`}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="hw-25 rounded-circle fs-11 bg-soft-dark text-dark d-flex align-items-center justify-content-center p-1"
                                            >
                                              50+
                                            </a>
                                          ) : null
                                        )
                                      : "-"}
                                  </td>
                                </tr>

                                <tr
                                  className={`${
                                    detailsIsLoading ? "placeholderBox" : ""
                                  }`}
                                >
                                  <td className="fw-medium text-md-end">
                                    Clone
                                  </td>
                                  <td className="px-0">:</td>
                                  <td>
                                    <a
                                      href={pageData?.clone_url || "/"}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="placeholderItem"
                                    >
                                      <i className="ri-cloud-line fs-4"></i>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg={4} md={6}>
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
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={12} data-color-mode="light">
                      <Card className="border mb-2">
                        <CardBody className="px-4">
                          {!readMeIsLoading ? (
                            !readMeNotFound ? (
                              <MDEditor.Markdown source={value} />
                            ) : (
                              <Error
                                img={noData}
                                title="Sorry, no data Found..!"
                                description="The search result you are looking for is not
                                    available!"
                              />
                            )
                          ) : (
                            <>
                              <CardBody>
                                <h5 className="card-title placeholder-glow">
                                  <span className="placeholder col-3"></span>
                                </h5>
                                <p className="card-text placeholder-glow">
                                  <span className="placeholder col-7 mb-2"></span>
                                  <span className="placeholder col-4 mb-2"></span>
                                  <span className="placeholder col-4"></span>
                                  <span className="placeholder col-6"></span>
                                </p>
                              </CardBody>
                            </>
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Details;

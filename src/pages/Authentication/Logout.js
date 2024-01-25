import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import withRouter from "../../Components/Common/withRouter";

const Logout = () => {

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    localStorage.removeItem("userDetails");
  }, []);

  if (isUserLogout) {
    return <Navigate to="/" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Logout);
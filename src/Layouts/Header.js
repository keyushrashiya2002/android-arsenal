import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import ProfileDropdown from "../Components/Common/ProfileDropdown";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const [search, setSearch] = useState(false);
  const [token, setToken] = useState(null);
  const [loginUserData, setLoginUserData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"));
      setLoginUserData(JSON.parse(localStorage.getItem("userDetails")));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    //For collapse vertical menu
    if (document.documentElement.getAttribute("data-layout") === "vertical") {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="horizontal-logo">
                <Link
                  className="text-dark fs-20 d-flex align-items-center lh-normal"
                  to="/"
                >
                  <img
                    alt="..."
                    src={logo}
                    className="hw-30 object-fit-contain me-1"
                  />
                  android Arsenal
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center">
              {!token ? (
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              ) : (
                <ProfileDropdown userDetails={loginUserData} />
              )}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

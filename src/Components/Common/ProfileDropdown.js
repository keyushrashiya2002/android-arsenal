import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { AiFillHeart, AiOutlineLogout } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdown = ({ userDetails }) => {

  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));
  const [userName, setUserName] = useState("Admin");
  const nevigate = useNavigate();
  // const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (sessionStorage.getItem("authUser")) {
      const obj = JSON.parse(sessionStorage.getItem("authUser"));
      setUserName(
        process.env.REACT_APP_DEFAULTAUTH === "fake"
          ? obj.username === undefined
            ? user.first_name
              ? user.first_name
              : obj.data.first_name
            : "Admin" || "Admin"
          : process.env.REACT_APP_DEFAULTAUTH === "firebase"
            ? obj.providerData[0].email
            : "Admin"
      );
    }

  }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");

    nevigate("/login");
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="align-items-center">
            <span className="text-start ms-xl-1">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userDetails?.user_name}</span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <div
            className="d-flex align-items-center dropdown-item event-none"
          >
            <span className="text-start ms-xl-2">
              <span className="d-block ms-1 fs-12 text-muted user-name-sub-text text-cover">
                {userDetails?.email}
              </span>
            </span>
          </div>
          <div className="dropdown-divider"></div>
          <Link to="/likelist" className="dropdown-item">
            <AiFillHeart style={{ fontSize: "18px", color: "red" }} />
            <span className="align-middle ms-2" data-key="t-logout">
              Favorites
            </span>
          </Link>
          <button className="dropdown-item mt-1" type="button" onClick={(e) => handleLogout(e)}>
            <AiOutlineLogout style={{ fontSize: "18px" }} />
            <span className="align-middle ms-2" data-key="t-logout">
              Logout
            </span>
          </button>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;

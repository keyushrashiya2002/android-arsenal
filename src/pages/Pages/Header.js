import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";

const Header = () => {
  return (
    <Link
      className="text-dark fs-20 d-flex align-items-center lh-normal mb-3"
      to="/"
    >
      <img alt="..." src={logo} className="hw-30 object-fit-contain me-1" />
      android Arsenal
    </Link>
  );
};

export default Header;

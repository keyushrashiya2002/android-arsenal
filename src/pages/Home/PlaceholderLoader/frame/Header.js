import React from "react";
import { CardHeader } from 'reactstrap';

const Header = () => {
  return (
    <CardHeader className="right ribbon-box">
      <h6 className="card-title text-success placeholder-glow">
        <span className="placeholder col-6"></span>
      </h6>

      <p className="card-subtitle text-muted mb-0 placeholder-glow">
        <span className="placeholder col-4"></span>
      </p>
    </CardHeader>
  );
};

export default Header;

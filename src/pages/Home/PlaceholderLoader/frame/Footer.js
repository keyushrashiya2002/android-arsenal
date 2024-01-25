import React from "react";
import { CardFooter } from "reactstrap";

const Footer = () => {
  return (
    <CardFooter className="d-flex align-items-center justify-content-between px-1 py-2 mt-2">
      <p className="text-muted d-flex align-items-center mb-0 placeholder-glow w-25">
        <span className="hw-24 placeholder rounded-circle me-1"></span>
        <span className="py-2 placeholder w-100"></span>
      </p>
      <p className="text-muted d-flex align-items-center mb-0 placeholder-glow w-25">
        <i className="py-2 placeholder me-1 col-2"></i>
        <span className="py-2 placeholder w-100"></span>
      </p>
    </CardFooter>
  );
};

export default Footer;

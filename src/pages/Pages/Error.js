import React from "react";

const Error = (props) => {
  return (
    <div className="w-100 text-center">
      <img src={props.img} alt="error img" className="img-fluid h-250" />
      <div className="mt-3">
        <h3 className="text-uppercase">{props.title}</h3>
        <p className="text-muted mb-0">{props.description}</p>
      </div>
    </div>
  );
};

export default Error;

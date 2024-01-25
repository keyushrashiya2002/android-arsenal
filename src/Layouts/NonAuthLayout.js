import React, { useEffect } from "react";
import withRouter from "../Components/Common/withRouter";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";

const NonAuthLayout = ({ children }) => {
  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  useEffect(() => {
    if (layoutModeType === "dark") {
      document.body.setAttribute("data-layout-mode", "dark");
    } else {
      document.body.setAttribute("data-layout-mode", "light");
    }
    return () => {
      document.body.removeAttribute("data-layout-mode");
    };
  }, [layoutModeType]);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default withRouter(NonAuthLayout);

import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

function PrivateRoute({ children }) {
    const getToken = localStorage.getItem("token");

    return getToken ? (
        <>
            <Header />
            {children}
            <Footer />
        </>
    ) : <Navigate to="/" />;
}

export default PrivateRoute;

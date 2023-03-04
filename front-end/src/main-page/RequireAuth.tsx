import React from "react";

import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }: any) => {
  const isLoged = localStorage.getItem("logedIN");
  if (!!!isLoged) {
    return <Navigate to="/" />;
  } else return children;
};

export default RequireAuth;

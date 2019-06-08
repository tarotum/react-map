import React from "react";

// Import container
import AuthContainer from "../containers/AuthContainer/AuthContainer";

const Auth = () => {
  return (
    <>
      <h2 className="content__title">Auth</h2>
      <p className="notification">First you need to login</p>
      <AuthContainer />
    </>
  );
};

export default Auth;

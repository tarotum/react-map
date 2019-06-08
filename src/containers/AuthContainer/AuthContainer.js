import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import "./AuthContainer.less";

import { loginAction } from "../../actions/actionCreators";

// Import components
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const AuthContainer = props => {
  const [form, setValues] = useState({
    username: "",
    email: ""
  });

  const authUser = event => {
    event.preventDefault();
    if (form.username && form.email) {
      props.loginAction({ ...form });
      props.history.push("/");
    }
  };

  const handleInput = ({ target }) => {
    setValues({
      ...form,
      [target.name]: target.value
    });
  };

  return (
    <form className="auth-form" onSubmit={authUser}>
      <Input
        className="auth__input"
        type="text"
        name="username"
        placeholder="Name"
        value={form.username}
        onChange={handleInput}
        required
      />
      <Input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleInput}
        required
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

AuthContainer.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(
  connect(
    state => ({
      user: state.user
    }),
    { loginAction }
  )(AuthContainer)
);

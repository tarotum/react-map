import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(state => ({
  user: state.user
}))(PrivateRoute);

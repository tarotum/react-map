import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Header.less";

// Import Action
import { logoutAction } from "../../actions/actionCreators";

// Import components
import Button from "../../components/Button/Button";

const Header = props => {
  const {
    user: { loggedIn, username }
  } = props;

  const logoutHandler = () => props.logoutAction();

  return (
    <nav className="header">
      <ul className="nav-list">
        {loggedIn ? (
          <li>
            <div className="user-name">Hi,{username}</div>
          </li>
        ) : (
          <li>
            <NavLink to="/auth">Authorization</NavLink>
          </li>
        )}
        <li>
          <NavLink exact to="/">
            Main page
          </NavLink>
        </li>
        <li>
          <NavLink to="/autor">About author</NavLink>
        </li>
        {loggedIn && (
          <li>
            <Button onClick={logoutHandler}>Log out</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default connect(
  state => ({
    user: state.user
  }),
  { logoutAction }
)(Header);

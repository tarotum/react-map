/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./Button.less";

const Button = ({
  type,
  children,
  onClick,
  className,
  disabled,
  active,
  ...attrs
}) => {
  const classes = classnames("button", className, { active });

  return (
    <button
      {...attrs}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: "Button",
  className: "",
  type: "button",
  disabled: false,
  active: false,
  onClick: () => {}
};

export default Button;

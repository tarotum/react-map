import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./Input.less";

const Input = ({
  className,
  placeholder,
  value,
  onChange,
  disabled,
  ...attrs
}) => {
  const classes = classnames("input", className, { disabled });

  return (
    <input
      {...attrs}
      className={classes}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Input.defaultProps = {
  className: "",
  placeholder: "input",
  disabled: false,
  value: "",
  onChange: () => {}
};

export default Input;

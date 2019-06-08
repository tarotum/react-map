import React from "react";
import PropTypes from "prop-types";

import "./App.less";

// Import layout
import Header from "../../layout/Header/Header";

const App = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main className="content">{children}</main>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired
};
export default App;

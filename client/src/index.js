import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <App
      loadingDelegate={<div>Loading...</div>}
      opentokClientUrl="https://static.opentok.com/v2/js/opentok.min.js"
    />
  </React.StrictMode>,
  document.getElementById("root")
);

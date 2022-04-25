import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import ExchangeProvider from "./store/ExchangeProvider";

ReactDOM.render(
  <React.StrictMode>
    <ExchangeProvider>
      <App />
    </ExchangeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

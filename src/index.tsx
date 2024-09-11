import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

class WebComponent extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      this
    );
  }
}

if (!customElements.get("liferay-react-examples")) {
  customElements.define("liferay-react-examples", WebComponent);
}

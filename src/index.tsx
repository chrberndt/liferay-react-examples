import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const addressEndpoint = 'http://localhost:8080/o/headless-commerce-admin-account/v1.0/accounts/46944/accountAddresses';
const clientId = 'id-355f4fb2-cdcb-11cf-71e0-41ae7faaed8e';
const clientSecret = 'secret-5d39bdc7-3424-1577-6155-345acdf5fb36';
const grantType = 'client_credentials';
const tokenEndpoint = 'http://localhost:8080/o/oauth2/token';

class WebComponent extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <React.StrictMode>
        <App addressEndpoint={addressEndpoint}
             clientId={clientId}
             clientSecret={clientSecret}
             grantType={grantType}
             tokenEndpoint={tokenEndpoint} />
      </React.StrictMode>,
      this
    );
  }
}

if (!customElements.get("liferay-react-examples")) {
  customElements.define("liferay-react-examples", WebComponent);
}

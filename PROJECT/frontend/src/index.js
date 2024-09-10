import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import { StoreProvider } from "./components/Online-shopping-components/Store";
import { ItemsContextProvider } from "./contexts/inventory-contexts/ItemContext";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ItemsContextProvider>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
          >
            <App />
          </Auth0Provider>
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </ItemsContextProvider>
);

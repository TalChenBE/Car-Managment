import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.REACT_APP_SITE_KEY}
    // language="[optional_language]"
    // useRecaptchaNet="[optional_boolean_value]"
    // useEnterprise="[optional_boolean_value]"
    // scriptProps={{
    //   async: false, // optional, default to false,
    //   defer: false, // optional, default to false
    //   appendTo: "head", // optional, default to "head", can be "head" or "body",
    //   nonce: undefined, // optional, default undefined
    // }}
    // container={{
    //   // optional to render inside custom element
    //   element: "[required_id_or_htmlelement]",
    //   parameters: {
    //     badge: "[inline|bottomright|bottomleft]", // optional, default undefined
    //     theme: "dark", // optional, default undefined
    //   },
    // }}
  >
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </GoogleReCaptchaProvider>
);

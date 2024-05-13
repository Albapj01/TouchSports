import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <GoogleOAuthProvider clientId="">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
);

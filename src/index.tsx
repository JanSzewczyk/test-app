import { StrictMode } from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "report-web-vitals";

import App from "App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

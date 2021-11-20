import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import reportWebVitals from "report-web-vitals";

import App from "App";
import theme from "config/theme";

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

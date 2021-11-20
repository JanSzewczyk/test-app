import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Robo, Arial"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        fontFamily: "Robo, Arial"
      }
    }
  }
});

export default theme;

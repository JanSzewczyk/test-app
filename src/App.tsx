import { FC } from "react";
import { Container } from "@mui/material";

import Calculator from "./components/Calculator";

const App: FC = () => {
  return (
    <Container
      component={"main"}
      maxWidth={"md"}
      sx={{
        py: 6
      }}
    >
      <Calculator />
    </Container>
  );
};

export default App;

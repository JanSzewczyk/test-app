import { FC, useEffect } from "react";
import { Container } from "@mui/material";

import { ExpressionEvaluation } from "utils";

import Calculator from "./components/Calculator";

const App: FC = () => {
  useEffect(() => {
    ExpressionEvaluation.calculate("13/(3*(4/2.0))+34/4*(34)");
  }, []);

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

import { FC, useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

import { EquationResult } from "types";

import CalculatorForm from "./CalculatorForm";
import CalculatorResultView from "./CalculatorResultView";

const Calculator: FC = () => {
  const [equationResultList, setEquationResultList] = useState<EquationResult[]>([]);

  const handleAddNewEquationResult = (newEquationResult: EquationResult): void => {
    setEquationResultList((prevState) => [newEquationResult, ...prevState]);
  };

  return (
    <Paper elevation={6}>
      <Box py={6} px={4}>
        <Typography variant={"h4"} fontWeight={"bold"} align={"center"} mb={2}>
          Parallel Web Calculator
        </Typography>

        <Divider
          sx={{
            mb: 2
          }}
        />

        <CalculatorForm onAddNewEquation={handleAddNewEquationResult} />

        <Divider
          sx={{
            my: 2
          }}
        />

        <CalculatorResultView equationResultList={equationResultList} />
      </Box>
    </Paper>
  );
};

export default Calculator;

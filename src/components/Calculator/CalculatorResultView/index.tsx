import { FC } from "react";
import { Box, Typography } from "@mui/material";

import { EquationResult } from "types";

interface CalculatorResultViewProps {
  equationResultList: EquationResult[];
}

const CalculatorResultView: FC<CalculatorResultViewProps> = ({ equationResultList }) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box>
        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"text.secondary"}>
          Result:
        </Typography>
      </Box>
      <Box>list</Box>
    </Box>
  );
};

export default CalculatorResultView;

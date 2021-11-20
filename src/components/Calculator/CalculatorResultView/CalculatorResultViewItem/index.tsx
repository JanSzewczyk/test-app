import { Box } from "@mui/material";
import { FC } from "react";

import { EquationResult } from "types";

interface CalculatorResultViewItemProps {
  equationResult: EquationResult;
}

const CalculatorResultViewItem: FC<CalculatorResultViewItemProps> = ({ equationResult }) => {
  return <Box pb={2}></Box>;
};

export default CalculatorResultViewItem;

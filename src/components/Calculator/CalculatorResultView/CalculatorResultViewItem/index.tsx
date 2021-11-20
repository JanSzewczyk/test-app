import { FC } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { EquationResult } from "types";

interface CalculatorResultViewItemProps {
  equationResult: EquationResult;
  onRemove: () => void;
}

const CalculatorResultViewItem: FC<CalculatorResultViewItemProps> = ({
  equationResult,
  onRemove
}) => {
  return (
    <>
      <Box pb={2}>
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          justifyItems={"center"}
          pt={1}
        >
          <Typography variant={"body2"} pt={1}>
            {equationResult.timestamp.toLocaleString()}
          </Typography>

          <IconButton aria-label="delete" color={"error"} onClick={onRemove}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>

        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"text.secondary"}>
          Expression
        </Typography>
        <Typography px={2} variant={"subtitle2"} paragraph>
          {equationResult.expression}
        </Typography>

        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"text.secondary"}>
          Result
        </Typography>
        <Typography px={2} variant={"subtitle2"}>
          {equationResult.result}
        </Typography>
      </Box>

      <Divider
        color={"primary.main"}
        sx={{
          borderBottom: 2
        }}
      />
    </>
  );
};

export default CalculatorResultViewItem;

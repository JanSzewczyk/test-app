import { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { EquationResult } from "types";
import CalculatorResultViewItem from "./CalculatorResultViewItem";

interface CalculatorResultViewProps {
  equationResultList: EquationResult[];
  onRemoveEquationResult: (id: string) => void;
}

const CalculatorResultView: FC<CalculatorResultViewProps> = ({
  equationResultList,
  onRemoveEquationResult
}) => {
  return (
    <Box>
      <Accordion variant={"outlined"}>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "primary.contrastText"
              }}
            />
          }
          aria-controls="calculator-history"
          id="calculator-history"
          sx={{
            bgcolor: "primary.light"
          }}
        >
          <Typography color={"primary.contrastText"} fontWeight={"bold"}>
            Calculator history
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              maxHeight: "50vh",
              overflowY: "auto"
            }}
          >
            {equationResultList.length > 0 ? (
              equationResultList.map((equationResult) => (
                <CalculatorResultViewItem
                  key={equationResult.id}
                  equationResult={equationResult}
                  onRemove={() => onRemoveEquationResult(equationResult.id)}
                />
              ))
            ) : (
              <Typography color={"text.disabled"} fontWeight={"bold"} textAlign={"center"} p={4}>
                No History
              </Typography>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CalculatorResultView;

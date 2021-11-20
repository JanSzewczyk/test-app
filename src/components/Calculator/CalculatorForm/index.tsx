import { FC, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import CalculateIcon from "@mui/icons-material/Calculate";
import ClearIcon from "@mui/icons-material/Clear";

import { ExpressionEvaluation } from "utils";
import { EquationResult } from "types";

import AppTextarea from "components/UI/AppTextarea";

interface CalculatorFormState {
  mathematicalExpression: string;
}

interface CalculatorFormProps {
  lastResult: EquationResult | null;
  onAddNewEquation: (newEquationResult: EquationResult) => void;
}

const CalculatorForm: FC<CalculatorFormProps> = ({ onAddNewEquation, lastResult }) => {
  const [result, setResult] = useState<number | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<CalculatorFormState>({
    defaultValues: {
      mathematicalExpression: ""
    }
  });

  const handleCalculate = (formData: CalculatorFormState): void => {
    if (!lastResult || (lastResult && lastResult.expression !== formData.mathematicalExpression)) {
      try {
        const expressionResult = ExpressionEvaluation.calculate(formData.mathematicalExpression);

        setResult(expressionResult);

        onAddNewEquation({
          id: uuidV4(),
          expression: formData.mathematicalExpression,
          result: expressionResult,
          timestamp: new Date()
        });
      } catch (e) {
        const errorMessage = (e as Error).message;

        setError("mathematicalExpression", {
          type: "errorHandler",
          message: errorMessage
        });
      }
    }
  };

  const handleClear = (): void => {
    reset();
    setResult(null);
  };

  return (
    <Box component={"form"}>
      <Typography variant={"subtitle1"} fontWeight={"bold"} color={"text.secondary"}>
        Enter the math equation below:
      </Typography>
      <AppTextarea
        {...register("mathematicalExpression", {
          required: "Required value"
        })}
      />
      {errors.mathematicalExpression && (
        <Typography color={"error.main"} textAlign={"right"} pr={2}>
          {errors.mathematicalExpression.message}
        </Typography>
      )}
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        pt={2}
      >
        <Box>
          <Typography variant={"subtitle1"} fontWeight={"bold"} color={"text.secondary"}>
            Result:
          </Typography>
          <Typography variant={"h5"}>{result}</Typography>
        </Box>
        <Stack direction={"row"} spacing={2}>
          <Button variant={"outlined"} onClick={handleClear} endIcon={<ClearIcon />}>
            Clear
          </Button>
          <Button
            variant={"contained"}
            type={"submit"}
            onClick={handleSubmit(handleCalculate)}
            endIcon={<CalculateIcon />}
          >
            Calculate
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CalculatorForm;

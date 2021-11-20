import { TextareaAutosize, styled } from "@mui/material";

export default styled(TextareaAutosize)(({ theme }) => ({
  resize: "vertical",
  width: "100%",
  minHeight: 100,
  padding: theme.spacing(3, 2),
  fontSize: "1rem"
}));

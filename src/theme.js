import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: {
    0: '0px',
    1: '0px',
  },
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

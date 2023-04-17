import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

 export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    transition: "border-color 0.3s ease-out",
    border: "1px solid transparent",
    "&:hover": {
      // borderColor: "orange",
      // padding: theme.spacing(0.9),
      backgroundColor: "orange",
    }
  }));

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LoginButton from "../loginButton/LoginButton";
import Search from "../search/Search";

export default function LoggedOutNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ color: "orange", background: "#2c3440" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MovieTracker
          </Typography>
          <LoginButton />
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

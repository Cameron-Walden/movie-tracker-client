import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./search/Search";
import { Link } from "react-router-dom";

export default function Header({ search, setSearch, getMovies }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ color: "orange", background: "#2c3440" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MovieTracker
          </Typography>
          <Link to="/" className="home-route" sx={{ color: "white" }}>
            Saved
          </Link>
          <Link to="/saved-film" className="saved-film" sx={{ color: "white" }}>
            Saved
          </Link>
          <Search search={search} setSearch={setSearch} getMovies={getMovies} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

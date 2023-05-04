import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./search/Search";
import { FilmContext } from "../context/FilmContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(null);
  const { setHasUserSearched, setSelectedFromDD } = useContext(FilmContext);

  const handleOpenMenu = (e) => setIsOpen(e.currentTarget);

  const handleCloseMenu = () => setIsOpen(null);

  const goHome = () => {
    handleCloseMenu();
    setHasUserSearched(false);
    setSelectedFromDD(false)
  };

  const switchRoute = () => {
    handleCloseMenu();
    setHasUserSearched(false)
    setSelectedFromDD(false)
  }

  const openMenu = Boolean(isOpen);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ color: "orange", background: "#2c3440" }}>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              id="fade-button"
              aria-controls={openMenu ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={isOpen}
              open={openMenu}
              onClose={handleCloseMenu}
              TransitionComponent={Fade}
            >
              <Link
                to="/"
                className="home-route"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={goHome}>Home</MenuItem>
              </Link>
              <Link
                to="/saved-films"
                className="saved-films"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={switchRoute}>Saved Films</MenuItem>
              </Link>
              <Link
                to="/watchlist"
                className="watchlist"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={switchRoute}>Watchlist</MenuItem>
              </Link>
            </Menu>
          </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MovieTracker
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

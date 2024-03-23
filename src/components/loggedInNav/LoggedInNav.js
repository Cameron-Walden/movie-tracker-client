import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import LogoutButton from "../logoutButton/LogoutButton";
import Search from "../search/Search";
import { GenreContext } from "../../context/GenreContext";
import { SearchContext } from "../../context/SearchContext";
import "./LoggedInNav.css";

export default function LoggedInNav() {
  const [isOpen, setIsOpen] = useState(null);
  const { setSelectedFromDD } = useContext(GenreContext);
  const { setHasUserSearched } = useContext(SearchContext);

  const { user } = useAuth0();

  const handleOpenMenu = (e) => setIsOpen(e.currentTarget);

  const handleCloseMenu = () => setIsOpen(null);

  const goHome = () => {
    handleCloseMenu();
    setHasUserSearched(false);
    setSelectedFromDD(false);
  };

  const switchRoute = () => {
    handleCloseMenu();
    setHasUserSearched(false);
    setSelectedFromDD(false);
  };

  const openMenu = Boolean(isOpen);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ color: "orange", background: "#2c3440" }}>
          <div>
            <Avatar
              className="user-avatar"
              alt="User Avatar"
              src={user.picture}
              sx={{ mr: 2 }}
              aria-controls={openMenu ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleOpenMenu}
            />
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
                to="/profile"
                className="profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={goHome}>Profile</MenuItem>
              </Link>
              <Link
                to="/tracked"
                className="tracked"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={switchRoute}>Tracked</MenuItem>
              </Link>
              <Link
                to="/lists"
                className="lists"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={switchRoute}>Lists</MenuItem>
              </Link>
              <Link
                to="/watchlist"
                className="watchlist"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={switchRoute}>Watchlist</MenuItem>
              </Link>
              <Link
                to="/settings"
                className="settings"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={switchRoute}>Settings</MenuItem>
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
          <LogoutButton />
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

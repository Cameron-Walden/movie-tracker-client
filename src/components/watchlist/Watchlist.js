import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, IconButton, Popover, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Item } from "./watchlistStyle";
import "./Watchlist.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    const updatedWatchlist = watchlist.map((film) => {
      if (film._id === id) {
        return { ...film, anchorEl: e.currentTarget, popoverOpen: true };
      }
      return film;
    });
    setWatchlist(updatedWatchlist);
  };

  const handlePopoverClose = (id) => {
    const updatedWatchlist = watchlist.map((film) => {
      if (film._id === id) {
        return { ...film, anchorEl: null, popoverOpen: false };
      }
      return film;
    });
    setWatchlist(updatedWatchlist);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getWatchlist = async () => {
    try {
      let response = await axios.get("http://localhost:3001/watchlist");
      const updatedWatchlist = response.data.map((film) => ({
        ...film,
        popoverOpen: false,
        anchorEl: null,
      }));
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      const removeFilm = `http://localhost:3001/watchlist/${id}`;
      await axios.delete(removeFilm);
    } catch (error) {
      console.log(error);
    }
    getWatchlist();
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <>
      <div style={{ paddingLeft: "4em", paddingTop: "3em", color: "#9ab" }}>
        {watchlist.length === 0 ? (
          <p>
            you haven't added any movies to your watchlist. Start adding to
            track
          </p>
        ) : watchlist.length === 1 ? (
          <p>you want to watch 1 movie</p>
        ) : (
          <p>you want to watch {watchlist.length} movies</p>
        )}
      </div>
      <Grid className="film-grid" container rowSpacing={3} columnSpacing={2}>
        {watchlist.map((film) => (
          <div key={film._id}>
            <Item
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={(e) => handlePopoverOpen(e, film?._id)}
              onMouseLeave={() => handlePopoverClose(film._id)}
            >
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={film.popoverOpen}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={() => handlePopoverClose(film._id)}
                disableRestoreFocus
              >
                {film.title && film._id && (
                  <Typography sx={{ p: 1 }}>{film.title}.</Typography>
                )}
              </Popover>
              <img
                src={`https://image.tmdb.org/t/p/w500/${film?.poster}`}
                alt={film.title}
                style={{
                  width: "12em",
                  height: "20em",
                  justifyContent: "space-around",
                }}
              />
              <IconButton
                aria-label="remove from watchlist"
                onClick={() => removeFromWatchlist(film._id)}
              >
                <VisibilityIcon />
              </IconButton>
            </Item>
          </div>
        ))}
      </Grid>
    </>
  );
}

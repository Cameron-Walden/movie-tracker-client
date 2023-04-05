import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Popover from "@mui/material/Popover";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    const updatedWatchlist = watchlist.map((film) => {
      if (film._id === id) {
        return { ...film, popoverOpen: true };
      }
      return film;
    });
    setWatchlist(updatedWatchlist);
  };

  const handlePopoverClose = (id) => {
    const updatedWatchlist = watchlist.map((film) => {
      if (film._id === id) {
        return { ...film, popoverOpen: false };
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
      <div style={{ paddingLeft: "3em", paddingTop: "3em" }}>
        <Typography>You want to see {watchlist.length} movies</Typography>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 12, sm: 12, md: 12 }}
        spacing={{ xs: 12, md: 12 }}
        columns={{ xs: 7, sm: 12, md: 12 }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        paddingTop="3em"
      >
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
                style={{ width: "12em", height: "20em" }}
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

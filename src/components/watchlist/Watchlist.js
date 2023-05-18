import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
import {
  Container,
  Grid,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../Header";
import Films from "../films/Films";
import "./Watchlist.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { hasUserSearched } = useContext(FilmContext);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

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
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      console.log(jwtToken)
      try {
        let response = await axios.get("http://localhost:3001/watchlist", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const updatedWatchlist = response.data.map((film) => ({
          ...film,
          popoverOpen: false,
          anchorEl: null,
        }));
        setWatchlist(updatedWatchlist);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromWatchlist = async (id) => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        const removeFilm = `http://localhost:3001/watchlist/${id}`;
        await axios.delete(removeFilm, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        getWatchlist();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {hasUserSearched ? (
        <Films />
      ) : (
        <>
          <Container sx={{ maxWidth: "300px", paddingLeft: 0 }}>
            <div
              className="watchlist-text"
              style={{ paddingTop: "3em", color: "#9ab" }}
            >
              {watchlist.length === 0 ? (
                <p>
                  you haven't added any movies to your watchlist. Start adding
                  to track
                </p>
              ) : watchlist.length === 1 ? (
                <p>you want to watch 1 movie</p>
              ) : (
                <p>you want to watch {watchlist.length} movies</p>
              )}
            </div>
            <Grid
              className="film-grid"
              container
              rowSpacing={4}
              columnSpacing={4}
            >
              {watchlist.map((film) => (
                <div key={film._id}>
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
                  <Link to={`/film/${film.tmdb_id}`} className="movie-link">
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${film?.poster}`}
                      alt={film.title}
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      onMouseEnter={(e) => handlePopoverOpen(e, film?._id)}
                      onMouseLeave={() => handlePopoverClose(film._id)}
                    />
                  </Link>
                  <div className="remove-icon-container">
                    {/* <Popover
                      className="remove-popover"
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={film.popoverOpen}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      onClose={() => handlePopoverClose(film._id)}
                      disableRestoreFocus
                      // onClick={() => removeFromWatchlist(film._id)}
                    > */}
                    <IconButton
                      className="remove-button"
                      aria-label="remove from watchlist"
                      onClick={() => removeFromWatchlist(film._id)}
                    >
                      <VisibilityIcon className="remove-icon" />
                    </IconButton>
                    {/* </Popover> */}
                  </div>
                </div>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

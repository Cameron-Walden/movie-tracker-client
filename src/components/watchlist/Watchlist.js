import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { WatchlistContext } from "../../context/WatchlistContext";
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
import styles from "./Watchlist.module.css";

export default function Watchlist() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredFilmId, setHoveredFilmId] = useState(null);
  const { watchlist, setWatchlist } = useContext(WatchlistContext);
  const { hasUserSearched } = useContext(SearchContext);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const open = Boolean(anchorEl);

  const getWatchlist = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
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
          <Container sx={{ maxWidth: "100%", padding: 0, marginLeft: "8%" }}>
            <div
              className={styles.watchlistText}
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
              className={styles.filmGrid}
              container
              rowSpacing={4}
              columnSpacing={4}
            >
              {watchlist.map((film, e) => (
                <div
                  key={film._id}
                  onMouseOver={() => {
                    setAnchorEl(e.currentTarget);
                    setHoveredFilmId(film._id);
                  }}
                  onMouseOut={() => {
                    setAnchorEl(null);
                    setHoveredFilmId(null);
                  }}
                >
                  <Popover
                    className={styles.mouseOverPopover}
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={hoveredFilmId === film._id}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    disableRestoreFocus
                  >
                    {film.title && film._id && (
                      <Typography sx={{ p: 1 }}>{film.title}.</Typography>
                    )}
                  </Popover>
                  <Link to={`/film/${film.tmdb_id}`} className={styles.movieLink}>
                    <img
                      src={`https://image.tmdb.org/t/p/w185/${film?.poster}`}
                      alt={film.title}
                      aria-owns={open ? "mouse-over-popover" : undefined}
                    />
                  </Link>
                  <div className={styles.removeIconContainer}>
                    <IconButton
                      className={styles.removeButton}
                      aria-label="remove from watchlist"
                      onClick={() => removeFromWatchlist(film._id)}
                    >
                      <VisibilityIcon className={styles.removeIcon} />
                    </IconButton>
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

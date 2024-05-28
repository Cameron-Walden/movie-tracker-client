import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
import { ModalContext } from "../../context/ModalContext";
import { SearchContext } from "../../context/SearchContext";
import { WatchlistContext } from "../../context/WatchlistContext";
import { Container } from "@mui/system";
import {
  Button,
  IconButton,
  Modal,
  Rating,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Header from "../Header";
import Films from "../films/Films";
import CrewTab from "../crewTab/CrewTab";
import MovieModal from "../movieModal/MovieModal";
import styles from "./Film.module.css";

export default function Film() {
  const [filmId, setFilmId] = useState(null);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [openPoster, setOpenPoster] = useState(false);
  const [openAddSnack, setOpenAddSnack] = useState(false);
  const [openRmvSnack, setOpenRmvSnack] = useState(false);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const { setTrackedMovies, setSelectedMovie } = useContext(FilmContext);
  const { setOpenModal, setStarRating } = useContext(ModalContext);
  const { watchlist, setWatchlist, addToWatchlist } =
    useContext(WatchlistContext);

  const { hasUserSearched } = useContext(SearchContext);

  const { id } = useParams();

  const openPosterModal = () => setOpenPoster(true);

  const closePosterModal = () => setOpenPoster(false);

  const handleOpenAddSnack = () => setOpenAddSnack(true);

  const handleCloseAddSnack = (reason) => {
    if (reason === "clickaway") return;
    setOpenAddSnack(false);
  };

  const handleOpenRmvSnack = () => setOpenRmvSnack(true);

  const handleCloseRmvSnack = (reason) => {
    if (reason === "clickaway") return;
    setOpenRmvSnack(false);
  };

  const getFilm = async () => {
    const idTokenClaims = isAuthenticated ? await getIdTokenClaims() : null;
    const jwtToken = isAuthenticated ? idTokenClaims.__raw : null;
    try {
      const movieResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movies/${id}`)

      const watchlistResponse = isAuthenticated
        ? await axios?.get(`${process.env.REACT_APP_API_BASE_URL}/watchlist`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
        : { data: [] };

      const trackedResponse = isAuthenticated
        ? await axios?.get(`${process.env.REACT_APP_API_BASE_URL}/tracked`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
        : { data: [] };

      const filmInWl = watchlistResponse?.data?.find(
        (film) => film.tmdb_id === movieResponse?.data?.id
      );

      const filmIsTracked = trackedResponse.data.find(
        (film) => film.tmdb_id === movieResponse.data.id
      );

      if (filmIsTracked) {
        setFilmId({
          ...movieResponse?.data,
          _id: filmInWl?._id,
          user_rating: filmIsTracked?.user_rating,
        });
      } else {
        setFilmId({
          ...movieResponse?.data,
          _id: filmInWl?._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWatchlist = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/watchlist`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const updatedWatchlist = response.data.map((film) => ({
          ...film,
        }));
        setWatchlist(updatedWatchlist);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setSelectedMovie(filmId);
  };

  const handleCloseModal = () => setOpenModal(false);

  const getFilmCredits = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/movies/${id}/credits`);
      setCrew(response.data.crew);
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const getDirector = () => {
    const directors = crew.filter((member) => member.job === "Director");
    const directorNames = directors.map((director) => director.name);
    setDirector(directorNames.join(", "));
  };

  const getTrackedMovies = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        const trackedMovie = `${process.env.REACT_APP_API_BASE_URL}/tracked`;
        const response = await axios.get(trackedMovie, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setTrackedMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddFilmToWL = () => {
    addToWatchlist(filmId);
    handleOpenAddSnack();
  };

  const removeFromWatchlist = async (id) => {
    try {
      const removeFilm = `${process.env.REACT_APP_API_BASE_URL}/watchlist/${id}`;
      await axios.delete(removeFilm);
      setWatchlist((prevWl) => prevWl.filter((film) => film.tmdb_id !== id));
    } catch (error) {
      console.log(error);
    }
    getWatchlist();
    handleOpenRmvSnack();
  };

  useEffect(() => {
    getFilm();
    getFilmCredits();
    getWatchlist();
    getTrackedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (crew.length > 0) {
      getDirector();
    }
  });

  const isInWatchlist = watchlist.find(
    (movie) => movie?.tmdb_id === filmId?.id
  );

  return (
    <div>
      <Header />
      {hasUserSearched ? (
        <Films />
      ) : (
        <>
          {filmId && (
            <Container className={styles.filmContainer}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${filmId?.backdrop_path}`}
                  alt={filmId.title}
                  className={styles.movieBackdrop}
                />
              </div>
              <div className={styles.posterContainer}>
                <div className={styles.posterDetails}>
                  <>
                    <img
                      className={styles.poster}
                      src={`https://image.tmdb.org/t/p/w342/${filmId?.poster_path}`}
                      alt={filmId?.title}
                      onClick={openPosterModal}
                    />
                    <Modal open={openPoster} onClose={closePosterModal}>
                      <img
                        className={styles.posterModal}
                        src={`https://image.tmdb.org/t/p/w780/${filmId?.poster_path}`}
                        alt={filmId?.title}
                      />
                    </Modal>
                  </>
                  <div className={styles.filmInfo}>
                    <div className={styles.titleRunContainer}>
                      <span className={styles.filmTitle}>{filmId?.title}</span>
                      <span className={styles.runtime}>
                        {filmId.runtime} min.
                      </span>
                    </div>

                    {director && (
                      <div className={styles.directorContainer}>
                        <span className={styles.directedBy}>
                          Directed by:{" "}
                          <span className={styles.directorName}>
                            {director}
                          </span>
                        </span>
                      </div>
                    )}
                    <div className={styles.filmTagline}>
                      {filmId.tagline ? filmId.tagline : ""}
                    </div>
                    <div className={styles.filmOverview}>{filmId.overview}</div>
                  </div>
                  <div className={styles.userContainer}>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 340, backgroundColor: "#456" }}
                        aria-label="customized table"
                        className={styles.table}
                      >
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <RemoveRedEyeIcon
                                className={styles.icon}
                                sx={{ color: "#9ab" }}
                              />
                              <FavoriteBorderIcon
                                className={styles.icon}
                                sx={{ color: "#9ab" }}
                              />
                              {isInWatchlist ? (
                                <div className={styles.removeWatchlist}>
                                  <HighlightOffIcon
                                    className={styles.removeIcon}
                                    sx={{ color: "orange" }}
                                    onClick={() =>
                                      removeFromWatchlist(filmId?._id)
                                    }
                                  />
                                  <span className={styles.removeText}>
                                    Remove
                                  </span>
                                </div>
                              ) : (
                                <div className={styles.addWatchlist}>
                                  <MoreTimeIcon
                                    className={styles.addIcon}
                                    sx={{
                                      color: "#9ab",
                                    }}
                                    onClick={handleAddFilmToWL}
                                  />
                                  <span className={styles.wlText}>
                                    Watchlist
                                  </span>
                                </div>
                              )}
                              <Snackbar
                                open={openAddSnack}
                                autoHideDuration={6000}
                                onClose={handleCloseAddSnack}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                message="Film added to watchlist"
                                action={
                                  <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleCloseAddSnack}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                }
                              />
                              <Snackbar
                                open={openRmvSnack}
                                autoHideDuration={6000}
                                onClose={handleCloseRmvSnack}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                message="Film removed from watchlist"
                                action={
                                  <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleCloseRmvSnack}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                }
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">
                              <Rating
                                name="user_rating"
                                defaultValue={null}
                                precision={0.5}
                                value={filmId?.user_rating}
                                onChange={(e, newVal) => setStarRating(newVal)}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">
                              <Button
                                onClick={() => handleOpenModal(filmId.id)}
                                sx={{ color: "#9ab" }}
                              >
                                Log film....
                              </Button>
                            </TableCell>
                          </TableRow>
                          <MovieModal handleCloseModal={handleCloseModal} />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className={styles.crewTab}>
                    <CrewTab
                      crew={crew}
                      setCrew={setCrew}
                      cast={cast}
                      setCast={setCast}
                      getFilmCredits={getFilmCredits}
                    />
                  </div>
                </div>
              </div>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

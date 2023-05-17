import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
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
import "./Film.css";

export default function Film() {
  const [filmId, setFilmId] = useState(null);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [openPoster, setOpenPoster] = useState(false);
  const [openAddSnack, setOpenAddSnack] = useState(false);
  const [openRmvSnack, setOpenRmvSnack] = useState(false);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const {
    setSavedMovies,
    setStarRating,
    hasUserSearched,
    setOpenModal,
    setSelectedMovie,
    watchlist,
    setWatchlist,
    addToWatchlist,
  } = useContext(FilmContext);

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
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      console.log(idTokenClaims, "idTokenClaims wl in film");
      const jwtToken = idTokenClaims.__raw;
      console.log(jwtToken, "jwt wl in film");
      try {
        const movieResponse = await axios?.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const watchlistResponse = await axios?.get(
          `http://localhost:3001/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const savedResponse = await axios?.get(
          "http://localhost:3001/reviews",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const filmInWl = watchlistResponse?.data?.find(
          (film) => film.tmdb_id === movieResponse?.data?.id
        );

        const filmIsSaved = savedResponse.data.find(
          (film) => film.tmdb_id === movieResponse.data.id
        );

        if (filmIsSaved) {
          setFilmId({
            ...movieResponse?.data,
            _id: filmInWl?._id,
            user_rating: filmIsSaved?.user_rating,
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
    }
  };

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
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API}`
      );
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

  const getSavedMovies = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        const savedMovie = "http://localhost:3001/reviews";
        const response = await axios.get(savedMovie, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setSavedMovies(response.data);
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
      const removeFilm = `http://localhost:3001/watchlist/${id}`;
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
    getSavedMovies();
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
            <Container className="film-container">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${filmId?.backdrop_path}`}
                  alt={filmId.title}
                  className="movie-backdrop"
                />
              </div>
              <div className="poster-container">
                <div className="poster-details">
                  <>
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w342/${filmId?.poster_path}`}
                      alt={filmId?.title}
                      onClick={openPosterModal}
                    />
                    <Modal open={openPoster} onClose={closePosterModal}>
                      <img
                        className="poster-modal"
                        src={`https://image.tmdb.org/t/p/w780/${filmId?.poster_path}`}
                        alt={filmId?.title}
                      />
                    </Modal>
                  </>
                  <div className="film-info">
                    <div className="title-run-container">
                      <span className="film-title">{filmId?.title}</span>
                      <span className="runtime">{filmId.runtime} min.</span>
                    </div>

                    {director && (
                      <div className="director-container">
                        <span className="directed-by">
                          Directed by:{" "}
                          <span className="director-name">{director}</span>
                        </span>
                      </div>
                    )}
                    <div className="film-tagline">
                      {filmId.tagline ? filmId.tagline : ""}
                    </div>
                    <div className="film-overview">{filmId.overview}</div>
                  </div>
                  <div className="user-container">
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 340, backgroundColor: "#456" }}
                        aria-label="customized table"
                        className="table"
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
                                className="icon"
                                sx={{ color: "#9ab" }}
                              />
                              <FavoriteBorderIcon
                                className="icon"
                                sx={{ color: "#9ab" }}
                              />
                              {isInWatchlist ? (
                                <div className="remove-watchlist">
                                  <HighlightOffIcon
                                    className="remove-icon"
                                    sx={{ color: "orange" }}
                                    onClick={() =>
                                      removeFromWatchlist(filmId?._id)
                                    }
                                  />
                                  <span className="remove-text">Remove</span>
                                </div>
                              ) : (
                                <div className="add-watchlist">
                                  <MoreTimeIcon
                                    className="add-icon"
                                    sx={{
                                      color: "#9ab",
                                    }}
                                    onClick={handleAddFilmToWL}
                                  />
                                  <span className="wl-text">Watchlist</span>
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
                  <div className="crew-tab">
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

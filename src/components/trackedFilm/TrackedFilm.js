import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FilmContext } from "../../context/FilmContext";
import { SearchContext } from "../../context/SearchContext.js";
import Header from "../Header";
import Films from "../films/Films.js";
import { formatDate } from "../../formatDate";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Stack,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import styles from './TrackedFilm.module.css';

export default function TrackedFilm() {
  const {
    trackedMovies,
    setTrackedMovies,
    setSelectedMovie,
    starRating,
    setStarRating,
    userReview,
    setUserReview,
    date,
    setDate,
  } = useContext(FilmContext);
  const { hasUserSearched } = useContext(SearchContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const handleOpenEdit = (id) => {
    const findId = trackedMovies?.find((trackedFilm) => trackedFilm._id === id);
    const formattedDate = formatDate(findId.date_watched, "default");
    const selectedMovieCopy = {
      ...findId,
      date_watched: formattedDate,
    };
    setSelectedMovieEdit(selectedMovieCopy);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const getTrackedMovies = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        const trackedMovie = "http://localhost:3001/tracked";
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

  const deleteFromTracked = async (id) => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        await axios.delete(`http://localhost:3001/tracked/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const deleteFilm = trackedMovies.filter((film) => film._id !== id);
        setTrackedMovies(deleteFilm);
        getTrackedMovies();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTracked = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      const config = {
        data: {
          title: selectedMovieEdit.title,
          description: selectedMovieEdit.overview,
          poster: selectedMovieEdit.poster,
          user_rating: starRating || selectedMovieEdit.user_rating,
          user_review: userReview || selectedMovieEdit.user_review,
          date_watched: date || selectedMovieEdit.date_watched,
          tmdb_id: selectedMovieEdit.tmdb_id,
        },
      };
      try {
        const url = `http://localhost:3001/tracked/${selectedMovieEdit._id}`;
        const response = await axios.put(url, config.data, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const updatedMovie = { ...selectedMovieEdit, ...response.data };
        const updatedTrackedMovies = trackedMovies.map((movie) =>
          movie._id === updatedMovie._id ? updatedMovie : movie
        );

        setSelectedMovie(updatedMovie);
        setTrackedMovies(updatedTrackedMovies);
        setDate(updatedMovie.date_watched);
        handleCloseEdit();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sortFilms = trackedMovies.sort((a, b) => {
    const dateA = new Date(a.date_watched);
    const dateB = new Date(b.date_watched);
    return dateB - dateA;
  });

  useEffect(() => {
    getTrackedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {hasUserSearched ? (
        <Films />
      ) : (
        <Container>
          <TableContainer className={styles.tableContainer}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.tHeadCell}>Month</TableCell>
                  <TableCell className={styles.tHeadCell}>Day</TableCell>
                  <TableCell className={styles.tHeadCell}>Film</TableCell>
                  <TableCell className={styles.tHeadCell}></TableCell>
                  <TableCell className={styles.tHeadCell} align="right">
                    Released
                  </TableCell>
                  <TableCell className={styles.tHeadCell} align="left">
                    Rating
                  </TableCell>
                  <TableCell className={styles.tHeadCell} align="right">
                    Like
                  </TableCell>
                  <TableCell className={styles.tHeadCell} align="right">
                    Rewatch
                  </TableCell>
                  <TableCell className={styles.tHeadCell} align="right">
                    Review
                  </TableCell>
                  <TableCell className={styles.tHeadCell} align="right">
                    Delete
                  </TableCell>
                  <TableCell className={styles.tHeadCell} align="right">
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortFilms?.map((film) => (
                  <TableRow key={film?._id} className={styles.tableRow}>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center">
                        <Box sx={{ fontSize: "28px" }}>
                          <CalendarTodayIcon />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          sx={{ ml: 1 }}
                        >
                          <Typography variant="subtitle2">
                            {formatDate(film.date_watched, "monthAndYear")}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <h3> {formatDate(film.date_watched, "day")}</h3>
                    </TableCell>
                    <TableCell>
                      <Link to={`/film/${film.tmdb_id}`} className={styles.movieLink}>
                        <img
                          src={
                            film.poster
                              ? `https://image.tmdb.org/t/p/w500/${film.poster}`
                              : "no poster"
                          }
                          alt={film.title}
                          style={{ width: "4em", height: "6em" }}
                        />
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <h3 className={styles.filmTitle} style={{ color: "white" }}>
                        {film.title}
                      </h3>
                    </TableCell>
                    <TableCell align="right">
                      {formatDate(film.release_date, "year")}
                    </TableCell>
                    <TableCell align="right">
                      <Rating
                        name="user_rating"
                        defaultValue={null}
                        precision={0.5}
                        value={film.user_rating}
                        onChange={(e, newVal) => setStarRating(newVal)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <FavoriteIcon />
                    </TableCell>
                    <TableCell align="right">
                      <LocalMoviesIcon />
                    </TableCell>
                    <TableCell align="right">{film.user_review}</TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        className={styles.deleteIcon}
                        onClick={() => deleteFromTracked(film._id)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        className={styles.editIcon}
                        onClick={() => handleOpenEdit(film?._id)}
                      />
                    </TableCell>
                    <Modal
                      className={styles.editModal}
                      open={openEdit}
                      onClose={handleCloseEdit}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      BackdropProps={{ sx: { backgroundColor: "transparent" } }}
                    >
                      <Box>
                        <Card sx={{ minWidth: 275 }}>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.primary"
                              gutterBottom
                            >
                              {selectedMovieEdit?.title}
                            </Typography>
                            <div>
                              <TextField
                                id="date_watched"
                                label="Date Watched"
                                type="date"
                                value={selectedMovieEdit?.date_watched || ""}
                                onChange={(e) =>
                                  setSelectedMovieEdit({
                                    ...selectedMovieEdit,
                                    date_watched: e.target.value,
                                  })
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </div>
                            <form>
                              <textarea
                                placeholder={selectedMovieEdit?.user_review}
                                onChange={(e) => setUserReview(e.target.value)}
                                rows="4"
                                cols="20"
                              />
                            </form>
                            <Stack spacing={1}>
                              <Rating
                                name="user_rating"
                                defaultValue={null}
                                precision={0.5}
                                value={selectedMovieEdit?.user_rating}
                                onChange={(e, newVal) => setStarRating(newVal)}
                              />
                            </Stack>
                          </CardContent>
                          <CardActions>
                            <Button
                              onClick={(e) => updateTracked(e, film?._id)}
                              variant="contained"
                              color="success"
                            >
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Box>
                    </Modal>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
}

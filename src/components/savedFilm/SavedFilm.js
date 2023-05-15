import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FilmContext } from "../../context/FilmContext";
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
import "./SavedFilm.css";

export default function SavedFilm() {
  const {
    hasUserSearched,
    savedMovies,
    setSavedMovies,
    setSelectedMovie,
    starRating,
    setStarRating,
    userReview,
    setUserReview,
    date,
    setDate,
  } = useContext(FilmContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);

  console.log(savedMovies, "sm");

  const handleOpenEdit = (id) => {
    const findId = savedMovies?.find((savedFilm) => savedFilm._id === id);
    const formattedDate = formatDate(findId.date_watched, "default");
    const selectedMovieCopy = {
      ...findId,
      date_watched: formattedDate,
    };
    setSelectedMovieEdit(selectedMovieCopy);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const getSavedMovies = async () => {
    try {
      const savedMovie = "http://localhost:3001/reviews";
      const response = await axios.get(savedMovie);
      setSavedMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromSaved = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/reviews/${id}`);
      const deleteFilm = savedMovies.filter((film) => film._id !== id);
      setSavedMovies(deleteFilm);
      getSavedMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const updateSaved = async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-type": "application/json" },
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
      const url = `http://localhost:3001/reviews/${selectedMovieEdit._id}`;
      const response = await axios.put(url, config.data);
      const updatedMovie = { ...selectedMovieEdit, ...response.data };
      const updatedSavedMovies = savedMovies.map((movie) =>
        movie._id === updatedMovie._id ? updatedMovie : movie
      );

      setSelectedMovie(updatedMovie);
      setSavedMovies(updatedSavedMovies);
      setDate(updatedMovie.date_watched);
      handleCloseEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const sortFilms = savedMovies.sort((a, b) => {
    const dateA = new Date(a.date_watched);
    console.log(dateA, "dateA");
    const dateB = new Date(b.date_watched);
    console.log(dateB, "dateB");
    return dateB - dateA;
  });

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <>
      <Header />
      {hasUserSearched ? (
        <Films />
      ) : (
        <Container>
          <TableContainer className="table-container">
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell className="thead-cell">Month</TableCell>
                  <TableCell className="thead-cell">Day</TableCell>
                  <TableCell className="thead-cell">Film</TableCell>
                  <TableCell className="thead-cell"></TableCell>
                  <TableCell className="thead-cell" align="right">
                    Released
                  </TableCell>
                  <TableCell className="thead-cell" align="left">
                    Rating
                  </TableCell>
                  <TableCell className="thead-cell" align="right">
                    Like
                  </TableCell>
                  <TableCell className="thead-cell" align="right">
                    Rewatch
                  </TableCell>
                  <TableCell className="thead-cell" align="right">
                    Review
                  </TableCell>
                  <TableCell className="thead-cell" align="right">
                    Delete
                  </TableCell>
                  <TableCell className="thead-cell" align="right">
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortFilms?.map((film) => (
                  <TableRow key={film?._id} className="table-row">
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
                      <Link to={`/film/${film.tmdb_id}`} className="movie-link">
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
                      <h3 className="film-title" style={{ color: "white" }}>
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
                        className="delete-icon"
                        onClick={() => deleteFromSaved(film._id)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        className="edit-icon"
                        onClick={() => handleOpenEdit(film?._id)}
                      />
                    </TableCell>
                    <Modal
                      className="edit-modal"
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
                              onClick={(e) => updateSaved(e, film?._id)}
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

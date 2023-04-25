import { useState, useContext, useEffect } from "react";
import { FilmContext } from "../../context/FilmContext";
import axios from "axios";
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
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { StyledTableCell, StyledTableRow, style } from "./styles";

export default function SavedFilm() {
  const {
    savedMovies,
    setSavedMovies,
    selectedMovie,
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

  const formatDate = (date, format) => {
    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      return "Invalid date";
    }

    switch (format) {
      case "day":
        return dateObj.toLocaleDateString(undefined, {
          day: "numeric",
        });
      case "year":
        return dateObj.toLocaleDateString(undefined, {
          year: "numeric",
        });
      case "monthAndYear":
        return dateObj.toLocaleDateString(undefined, {
          month: "short",
          year: "numeric",
        });
      case "default":
        const month = `${dateObj.getMonth() + 1}`.padStart(2, "0");
        const day = `${dateObj.getDate()}`.padStart(2, "0");
        const year = dateObj.getFullYear();
        return [year, month, day].join("-");
      default:
        throw new Error(`Invalid date format: ${format}`);
    }
  };

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
        release_date: selectedMovieEdit.release_date,
        user_rating: starRating || selectedMovieEdit.user_rating,
        user_review: userReview || selectedMovieEdit.user_review,
        date_watched: date || selectedMovieEdit.date_watched,
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

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>Day</StyledTableCell>
              <StyledTableCell>Film</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">Released</StyledTableCell>
              <StyledTableCell align="left">Rating</StyledTableCell>
              <StyledTableCell align="right">Like</StyledTableCell>
              <StyledTableCell align="right">Rewatch</StyledTableCell>
              <StyledTableCell align="right">Review</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedMovies?.map((film) => (
              <StyledTableRow key={film?._id}>
                <StyledTableCell align="right">
                  {formatDate(film.date_watched, "monthAndYear")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(film.date_watched, "day")}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src={
                      film.poster
                        ? `https://image.tmdb.org/t/p/w500/${film.poster}`
                        : "no poster"
                    }
                    alt={film.title}
                    style={{ width: "4em", height: "6em" }}
                  />
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{
                    maxWidth: "50%",
                    maxHeight: "50%",
                  }}
                >
                  {film.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDate(film.release_date, "year")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Rating
                    name="user_rating"
                    defaultValue={null}
                    precision={0.5}
                    value={film.user_rating}
                    onChange={(e, newVal) => setStarRating(newVal)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <FavoriteIcon />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <LocalMoviesIcon />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {film.user_review}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <RemoveIcon onClick={() => deleteFromSaved(film._id)} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <EditIcon onClick={() => handleOpenEdit(film?._id)} />
                </StyledTableCell>
                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

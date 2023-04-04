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
  Typography,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { DatePicker } from "@mui/x-date-pickers";
import { StyledTableCell, StyledTableRow } from "./styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SavedFilm() {
  const {
    savedMovies,
    setSavedMovies,
    selectedMovie,
    starRating,
    setStarRating,
    userReview,
    setUserReview,
    date,
    setDate,
  } = useContext(FilmContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);

  const handleOpenEdit = (id) => {
    let findId = savedMovies?.find((savedFilm) => savedFilm._id === id);
    setOpenEdit(true);
    setSelectedMovieEdit(findId);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const getSavedMovies = async () => {
    const savedMovie = "http://localhost:3001/reviews";
    const response = await axios.get(savedMovie);
    setSavedMovies(response.data);
  };

  const deleteFromSaved = async (id) => {
    const deleteFilm = `http://localhost:3001/reviews/${id}`;
    await axios.delete(deleteFilm);
    getSavedMovies();
    handleCloseEdit();
  };

  const updateSaved = async (e, res) => {
    e.preventDefault();
    const config = {
      headers: { "Content-type": "application/json" },
      data: {
        title: selectedMovie.title,
        description: selectedMovie.overview,
        poster: selectedMovie.poster_path,
        user_rating: starRating,
        user_review: userReview,
        date_watched: date,
      },
    };
    try {
      const url = "http://localhost:3001/reviews";
      const response = await axios.put(url, config.data);
      setDate(date);
      setUserReview(userReview);
      setStarRating(starRating);
      setSavedMovies([...savedMovies, response.data]);
    } catch (error) {
      res.status(500).send(error);
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
              <StyledTableCell>Film</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">Released</StyledTableCell>
              <StyledTableCell align="right">Rating</StyledTableCell>
              <StyledTableCell align="right">Like</StyledTableCell>
              <StyledTableCell align="right">Rewatch</StyledTableCell>
              <StyledTableCell align="right">Review</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedMovies?.map((film) => (
              <StyledTableRow key={film?._id}>
                <StyledTableCell>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${film.poster}`}
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
                  <CalendarMonthIcon />
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
                          I watched on {selectedMovieEdit?.date_watched}
                          <DatePicker
                            selected={
                              selectedMovieEdit?.date_watched
                                ? new Date(selectedMovieEdit?.date_watched)
                                : null
                            }
                            value={date}
                            onChange={(newDay) => setDate(newDay)}
                          />
                        </div>
                        <form>
                          <textarea
                            value={selectedMovieEdit?.user_review}
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
                          onClick={() => deleteFromSaved(film._id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => updateSaved(film._id)}
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

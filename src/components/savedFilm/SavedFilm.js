import { useState, useContext, useEffect } from "react";
import { FilmContext } from "../../context/FilmContext";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
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
  const { savedMovies, setSavedMovies } = useContext(FilmContext);
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
                ></StyledTableCell>
                <StyledTableCell align="right">
                  <CalendarMonthIcon />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {film.user_rating}
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
                      <CardActions>
                        <p>{selectedMovieEdit?.title}</p>
                      </CardActions>
                    </Card>
                    <Button
                      onClick={() => deleteFromSaved(film._id)}
                      variant="container"
                      color="error"
                    >
                      Delete
                    </Button>
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

import { useContext, useEffect } from "react";
import { FilmContext } from "../../context/FilmContext";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTableCell, StyledTableRow } from "./styles";

export default function SavedFilm() {
  const { savedMovies, setSavedMovies } = useContext(FilmContext);
  
  const getSavedMovies = async () => {
    const savedMovie = "http://localhost:3001/reviews";
    const response = await axios.get(savedMovie);
    setSavedMovies(response.data);
  };

  const deleteFromSaved = async (id) => {
    const deleteFilm = `http://localhost:3001/reviews/${id}`;
    await axios.delete(deleteFilm);
    getSavedMovies();
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
                <StyledTableCell align="right">released tbd</StyledTableCell>
                <StyledTableCell align="right">
                  {film.user_rating}
                </StyledTableCell>
                <StyledTableCell align="right">liked tbd</StyledTableCell>
                <StyledTableCell align="right">rewacth tbd</StyledTableCell>
                <StyledTableCell align="right">
                  {film.user_review}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <EditIcon onClick={() => deleteFromSaved(film?._id)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

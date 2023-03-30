import { useContext, useEffect } from "react";
import { FilmContext } from "../context/FilmContext";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Film</StyledTableCell>
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
                <StyledTableCell component="th" scope="row">
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
    </>
  );
}

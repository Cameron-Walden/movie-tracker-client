import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MovieIcon from "@mui/icons-material/Movie";
import notAvailable from "../../img/no_image.jpeg";
import MovieModal from "../movieModal/MovieModal";
import { formatDate } from "../../formatDate";
import "./Films.css";

export default function Films() {
  const { movies, setOpenModal, setSelectedMovie, setHasUserSearched } =
    useContext(FilmContext);

  const [watchlist, setWatchlist] = useState([]);

  const handleOpenModal = (id) => {
    let findId = movies?.results?.find((movie) => movie.id === id);
    setOpenModal(true);
    setSelectedMovie(findId);
  };

  const handleCloseModal = () => setOpenModal(false);

  const addToWatchlist = async (film, res) => {
    const config = {
      headers: { "Content-type": "application/json" },
      data: {
        title: film.title,
        description: film.overview,
        poster: film.poster_path,
        watched: false,
        tmdb_id: film.id,
      },
    };
    try {
      const url = "http://localhost:3001/watchlist";
      const response = await axios.post(url, config.data);
      setWatchlist([...watchlist, response.data]);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const resetSearch = () => setHasUserSearched(false);

  useEffect(() => {
    handleOpenModal();
  }, []);

  return (
    <Container className="container">
      <TableContainer component={Paper}>
        {movies?.results?.map((movie) => (
          <Table
            key={movie.id}
            sx={{ minWidth: 340, backgroundColor: "#2c3440", marginLeft: 0 }}
            aria-label="customized table"
            className="table"
          >
            <TableBody>
              <TableRow className="table-row">
                <TableCell align="center">
                  <div className="movie-container">
                    <div className="poster-container">
                      <Link
                        to={`/film/${movie.id}`}
                        className="movie-link"
                        onClick={resetSearch}
                      >
                        <img
                          src={
                            movie?.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie?.poster_path}`
                              : notAvailable
                          }
                          alt={movie?.title}
                          className={movie?.poster_path ? "" : "not-available"}
                        />
                      </Link>
                    </div>
                  </div>
                  <TableCell style={{ borderBottom: "none" }}>
                    <div className="movie-title">
                      <p>{movie.title}</p>
                    </div>
                    <div className="release-date">
                      <p>{formatDate(movie.release_date, "year")}</p>
                    </div>
                    <div className="icon-container">
                      <IconButton
                        className="movie-icon"
                        aria-label="add to favorites"
                        onClick={() => handleOpenModal(movie.id)}
                      >
                        <MovieIcon />
                      </IconButton>
                      <IconButton
                        className="visibility-icon"
                        aria-label="add to watchlist"
                        onClick={() => addToWatchlist(movie)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </div>
                    <MovieModal
                      handleCloseModal={handleCloseModal}
                      movie={movie}
                    />
                  </TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </TableContainer>
    </Container>
  );
}

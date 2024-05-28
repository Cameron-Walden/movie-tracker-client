import { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
import { SearchContext } from "../../context/SearchContext";
import { ModalContext } from "../../context/ModalContext";
import { WatchlistContext } from "../../context/WatchlistContext";
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
import styles from "./Films.module.css";

export default function Films() {
  const { setSelectedMovie } = useContext(FilmContext);
  const { movies, setHasUserSearched } = useContext(SearchContext);
  const { addToWatchlist } = useContext(WatchlistContext);
  const { setOpenModal } = useContext(ModalContext);
  
  const handleOpenModal = useCallback((id) => {
    let findId = movies?.results?.find((movie) => movie.id === id);
    setOpenModal(true);
    setSelectedMovie(findId);
  }, [movies, setOpenModal, setSelectedMovie]);

  const handleCloseModal = () => setOpenModal(false);

  const resetSearch = () => setHasUserSearched(false);

  return (
    <Container className={styles.container}>
      <TableContainer component={Paper}>
        {movies?.results?.map((movie) => (
          <Table
            key={movie.id}
            sx={{ minWidth: 340, backgroundColor: "#2c3440", marginLeft: 0 }}
            aria-label="customized table"
            className={styles.table}
          >
            <TableBody>
              <TableRow className={styles.tableRow}>
                <TableCell align="center">
                  <div className={styles.movieContainer}>
                    <div className={styles.posterContainer}>
                      <Link
                        to={`/film/${movie.id}`}
                        className={styles.movieLink}
                        onClick={resetSearch}
                      >
                        <img
                          src={
                            movie?.poster_path
                              ? `https://image.tmdb.org/t/p/w92${movie?.poster_path}`
                              : notAvailable
                          }
                          alt={movie?.title}
                          className={
                            movie?.poster_path ? "" : styles.notAvailable
                          }
                        />
                      </Link>
                    </div>
                  </div>
                  <TableCell style={{ borderBottom: "none" }}>
                    <span className={styles.titleDateContainer}>
                      <span className={styles.movieTitle}>
                        {movie.title}{" "}
                        <small className={styles.releaseDate}>
                          {formatDate(movie.release_date, "year")}
                        </small>
                      </span>
                    </span>
                    <div className={styles.directorContainer}>
                      <span className={styles.director}>
                        Directed by: director name
                      </span>
                    </div>
                    <div className={styles.iconContainer}>
                      <IconButton
                        className={styles.movieIcon}
                        aria-label="add to favorites"
                        onClick={() => handleOpenModal(movie.id)}
                      >
                        <MovieIcon />
                      </IconButton>
                      <IconButton
                        className={styles.visibilityIcon}
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

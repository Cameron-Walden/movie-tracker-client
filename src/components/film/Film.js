import { useState, useContext, useEffect } from "react";
import { FilmContext } from "../../context/FilmContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { Rating } from "@mui/material";
import "./Film.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import CrewTab from "../crewTab/CrewTab";

export default function Film() {
  const [filmId, setFilmId] = useState(null);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const { starRating, setStarRating } = useContext(FilmContext);

  const { id } = useParams();

  const getFilm = async () => {
    try {
      let movieResponse = await axios?.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}`
      );
      setFilmId(movieResponse?.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getFilmCredits();
    getFilm();
  }, [id]);

  useEffect(() => {
    if (crew.length > 0) {
      getDirector();
    }
  });

  return (
    <div>
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
              <img
                src={`https://image.tmdb.org/t/p/w342/${filmId?.poster_path}`}
                alt={filmId?.title}
              />
              <div className="film-info">
                <p className="film-title">{filmId?.title}</p>
                {director && (
                  <p className="directed-by">Directed by: {director}</p>
                )}
                <p className="film-overview">{filmId?.overview}</p>
              </div>
              <div className="user-container">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 340 }} aria-label="customized table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <RemoveRedEyeIcon />
                        </TableCell>
                        <TableCell align="center">
                          <FavoriteBorderIcon />
                        </TableCell>
                        <TableCell align="center">
                          <MoreTimeIcon />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Rating
                            name="user_rating"
                            defaultValue={null}
                            precision={0.5}
                            value={starRating}
                            onChange={(e, newVal) => setStarRating(newVal)}
                          />
                          <TableCell></TableCell>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">Remove or log</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="crew-tab">
                <CrewTab />
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

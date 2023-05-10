import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import "./Popular.css";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getPopularFilms = async () => {
    try {
      let response = await axios?.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=1`
      );
      setPopular(response?.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Grid
        className="popular-grid"
        style={{ paddingLeft: "4em", paddingTop: "3em" }}
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {popular.map((film) => (
          <Link to={`/film/${film.id}`} className="movie-link" key={film.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
              alt={film.title}
            />
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

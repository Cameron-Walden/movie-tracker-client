import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import HomePanel from "../homePanel/HomePanel";
import "./Popular.css";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getPopularFilms = async () => {
    try {
      const pageResponses = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=2`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=3`
        ),
      ]);
      const results = pageResponses.flatMap((response) => response.data.results);
      setPopular(results);
    } catch (error) {
      console.log(error);
    }
  };

  const slicePop = popular.slice(5, 60);

  useEffect(() => {
    getPopularFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="home-pop-container">
      <HomePanel />
      <Grid
        className="popular-grid"
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {slicePop.map((film) => (
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
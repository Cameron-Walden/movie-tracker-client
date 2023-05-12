import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { FilmContext } from "../../context/FilmContext";
import HomePanel from "../homePanel/HomePanel";
import "./Popular.css";

export default function Popular() {

  const { popular } = useContext(FilmContext)

  const slicePop = popular.slice(5, 60);

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
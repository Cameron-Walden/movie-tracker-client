import { useContext } from "react";
import { useLoading } from "../../context/LoadingContext";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { FilmContext } from "../../context/FilmContext";
import HomePanel from "../homePanel/HomePanel";
import "./Popular.css";

export default function Popular() {
  const { popular } = useContext(FilmContext);
  const { isPopLoading } = useLoading();

  const slicePop = popular.slice(5, 30);

  return (
    <Container className="home-pop-container">
      <HomePanel />
      <Grid className="popular-grid" container direction="row">
        {isPopLoading ? (
          <Box className="popProgressBox">
            <CircularProgress />
          </Box>
        ) : (
          slicePop.map((film) => (
            <Link to={`/film/${film.id}`} className="movie-link" key={film.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
                alt={film.title}
              />
            </Link>
          ))
        )}
      </Grid>
    </Container>
  );
}

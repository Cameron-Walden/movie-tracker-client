import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {popular.map((film) => (
            <Item>
              <img
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                alt={film.title}
              />
            </Item>
        ))}
      </Grid>
  );
}

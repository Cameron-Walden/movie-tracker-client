import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const getWatchlist = async () => {
    try {
      let response = await axios?.get("http://localhost:3001/watchlist");
      console.log(response.data, "watch res");
      setWatchlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {watchlist.map((film) => (
          <Item>
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster}`}
              alt={film.title}
              style={{ width: "12em", height: "20em" }}
            />
          </Item>
        ))}
      </Grid>
    </Container>
  );
}

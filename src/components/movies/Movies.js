import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FilmContext } from "../../context/FilmContext";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Collapse,
  Avatar,
  IconButton,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { ExpandMore } from "./expandMore";
import MovieModal from "../movieModal/MovieModal";
import { red } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MovieIcon from "@mui/icons-material/Movie";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import notAvailable from "../../img/no_image.jpeg";
import "./Movies.css";

export default function Movies() {
  const { movies, setOpenModal, setSelectedMovie } = useContext(FilmContext);
  const [expanded, setExpanded] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  const handleExpandClick = (id) =>
    setExpanded((expandTxt) => ({ ...expandTxt, [id]: !expandTxt[id] }));

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

  useEffect(() => {
    handleOpenModal();
  }, []);

  return (
    <Container className="container">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {movies?.results?.map((movie, idx) => (
          <Grid key={idx} item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    user
                  </Avatar>
                }
                title={movie?.title}
                subheader={movie?.release_date}
              />
              <CardMedia
                component="img"
                height="194"
                image={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie?.poster_path}`
                    : notAvailable
                }
                alt={movie?.title}
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {movie?.vote_average
                    ? "vote average: " + movie?.vote_average
                    : ""}
                  <br />
                  {movie?.vote_count ? "vote count: " + movie?.vote_count : ""}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleOpenModal(movie.id)}
                >
                  <MovieIcon />
                </IconButton>
                <IconButton
                  aria-label="add to watchlist"
                  onClick={() => addToWatchlist(movie)}
                >
                  <VisibilityIcon />
                </IconButton>
                <MovieModal handleCloseModal={handleCloseModal} movie={movie} />
                <ExpandMore
                  expand={expanded}
                  onClick={() => handleExpandClick(movie.id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[movie.id]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{movie?.overview}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
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
  Modal,
  Box,
} from "@mui/material";
import { ExpandMore } from "./expandMore";
import { style } from "./style";
import { red } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import notAvailable from "../../img/no_image.jpeg";
import "./Movies.css";

export default function Movies({ movies }) {
  const [expanded, setExpanded] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [savedMovies, setSavedMovies] = useState([])

  const handleExpandClick = (id) => setExpanded((expandTxt) => ({ ...expandTxt, [id]: !expandTxt[id] }));

  const handleOpenModal = (id) => {
    let findId = movies?.results?.find((movie) => movie.id === id);
    setOpenModal(true);
    setSelectedMovie(findId);
  };

  const handleCloseModal = () => setOpenModal(false);

    const addUserReview = async (movieReview) => {
    try {
      let userMovieReview = movies?.results?.find(movie => movie.title === movieReview)
      console.log(userMovieReview, 'umr')
      const config = {
        data: {
          headers: { 'Content-type': 'application/json' },
          title: userMovieReview?.title,
          description: userMovieReview?.overview,
        },
        method: 'post',
        baseUrl: 'http://localhost:3001/reviews'
      }
      console.log(config, 'config before setSavedMovies')
      console.log(savedMovies, 'savedMoviezs before setsave')
      setSavedMovies(savedMovies, config)
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedMovies = async () => {
    const savedMovie = 'http://localhost:3001/reviews';
    const response = await axios.get(savedMovie);
    console.log(response, 'res')
    setSavedMovies(response.data)
  }

  useEffect(() => {
    handleOpenModal();
    addUserReview();
    getSavedMovies();
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
                  <VisibilityIcon />
                </IconButton>
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {selectedMovie?.title}
                      <button onClick={() => addUserReview(movie.title)}>add fave</button>
                    </Typography>
                  </Box>
                </Modal>
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

import { useState, useEffect } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import notAvailable from "../../img/no_image.jpeg";
import "./Movies.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Movies({ movies }) {
  const [expanded, setExpanded] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleExpandClick = (id) => setExpanded((expandTxt) => ({ ...expandTxt, [id]: !expandTxt[id] }));

  const handleOpenModal = (id) => {
    let findId = movies?.results?.find((movie) => movie.id === id);
    setOpenModal(true);
    setSelectedMovie(findId);
  };

  const handleCloseModal = () => setOpenModal(false);

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

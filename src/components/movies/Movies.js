import { useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
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

export default function Movies({ movies }) {
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (id) =>
    setExpanded((expanded) => ({ ...expanded, [id]: !expanded[id] }));

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
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
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

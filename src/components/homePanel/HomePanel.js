import { useContext } from "react";
import { Link } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import "./HomePanel.css";

export default function HomePanel() {
  const { popular } = useContext(FilmContext)

  const loginALert = () => alert("login functionality coming soon");

  const firstFiveMovies = popular.slice(0, 5);

  return (
    <div className="home-panel-container">
      <div className="welcome-text-container" style={{ textAlign: "center" }}>
        <h1>Track films you’ve watched.</h1>
        <h1>Save those you want to watch.</h1>
        <h1>Tell your friends what's worth watching.</h1>
      </div>
      <Button className="get-started-btn" onClick={loginALert}>
        START TRACKING- IT'S FREE!
      </Button>
      <strong className="tagline">
        The movie tracking social network for film enthusiasts.
      </strong>
      <Container>
        <Grid
          className="popular-grid"
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {firstFiveMovies.map((film) => (
            <Link to={`/film/${film.id}`} className="movie-link" key={film.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
              alt={film.title}
            />
            </Link>
          ))}
        </Grid>
      </Container>
      <Grid className="welcome-grid" container spacing={2}>
        <Grid className="grid-panels" item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className="welcome-route"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className="paper">
              {/* <Typography variant="h5" align="center">
                Discover New Films
              </Typography> */}
              <Typography className="description" variant="body1" align="center">
                Find and explore new films and add them to your watchlist.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className="welcome-route"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className="paper">
              {/* <Typography variant="h5" align="center">
                Create Lists
              </Typography> */}
              <Typography className="description" variant="body1" align="center">
                Organize your films by creating lists and sharing them with
                others.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className="welcome-route"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className="paper">
              {/* <Typography variant="h5" align="center">
                Rate and Review
              </Typography> */}
              <Typography className="description" variant="body1" align="center">
                Share your opinions on films by rating and reviewing them.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className="welcome-route"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className="paper">
              {/* <Typography variant="h5" align="center">
                Connect with Friends
              </Typography> */}
              <Typography className="description" variant="body1" align="center">
                Follow and connect with friends to see what they're watching.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className="welcome-route"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className="paper">
              {/* <Typography variant="h5" align="center">
                Get Personalized Recommendations
              </Typography> */}
              <Typography className="description" variant="body1" align="center">
                Get personalized film recommendations based on your viewing
                history.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className="welcome-route"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className="paper">
              {/* <Typography variant="h5" align="center">
                Track Your Watchlist
              </Typography> */}
              <Typography className="description" variant="body1" align="center">
                Keep track of all the films you want to watch in one place.
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

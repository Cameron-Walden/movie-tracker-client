import { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FilmContext } from "../../context/FilmContext";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import notAvailable from "../../img/no_image.jpeg";
import styles from "./HomePanel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePanel() {
  const { popular } = useContext(FilmContext);
  const [recommendations, setRecommendations] = useState([]);
  const [fetchRecs, setFetchRecs] = useState(false);
  const { loginWithRedirect, isAuthenticated, getIdTokenClaims } = useAuth0();

  const firstFiveMovies = popular.slice(0, 5);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const movieRecs = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        let watchlist = await axios.get("http://localhost:3001/watchlist", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const tmdbId = watchlist.data.map((film) => film.tmdb_id);
        for (const id of tmdbId) {
          const idRes = await axios.get(`http://localhost:3001/movies/${id}/recommendations`);
          if (idRes.data.results.length > 0) {
            const randomIdx = Math.floor(
              Math.random() * idRes.data.results.length
            );
            const randomRec = idRes.data.results[randomIdx];
            setRecommendations((prevRecs) => [...prevRecs, randomRec]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setFetchRecs(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (fetchRecs) {
      movieRecs();
      setFetchRecs(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRecs]);

  return (
    <div className={styles.homePanelContainer}>
      <div className={styles.welcomeTextContainer} style={{ textAlign: "center" }}>
        <h1>Track films you’ve watched.</h1>
        <h1>Save those you want to watch.</h1>
        <h1>Tell your friends what's worth watching.</h1>
      </div>
      {isAuthenticated ? (
        <Container>
          <strong className={styles.filmRecsTagline}>
            Today you might be interested in...
          </strong>
          <Slider {...settings}>
            {recommendations?.map((film) => (
              <Link
                to={`/film/${film.id}`}
                className={styles.movieLink}
                key={film.id}
              >
                <img
                  className={styles.movieRecPoster}
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${film.poster_path}`
                      : notAvailable
                  }
                  alt={film.title}
                />
              </Link>
            ))}
          </Slider>
        </Container>
      ) : (
        <Button className={styles.getStartedBtn} onClick={() => loginWithRedirect()}>
          START TRACKING- IT'S FREE!
        </Button>
      )}
      <strong className={styles.tagline}>
        The movie tracking social network for film enthusiasts.
      </strong>
      <Container>
        <Grid
          className={styles.poopularGrid}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {firstFiveMovies.map((film) => (
            <Link to={`/film/${film.id}`} className={styles.movieLink} key={film.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
                alt={film.title}
              />
            </Link>
          ))}
        </Grid>
      </Container>
      <Grid className={styles.welcomeGrid}container spacing={2}>
        <Grid className={styles.gridPanels} item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className={styles.welcomeRoute}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className={styles.paper}>
              <Typography
                className={styles.description}
                variant="body1"
                align="center"
              >
                Find and explore new films and add them to your watchlist.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className={styles.welcomeRoute}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className={styles.paper}>
              <Typography
                className={styles.description}
                variant="body1"
                align="center"
              >
                Organize your films by creating lists and sharing them with
                others.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className={styles.welcomeRoute}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className={styles.paper}>
              <Typography
                className={styles.description}
                variant="body1"
                align="center"
              >
                Share your opinions on films by rating and reviewing them.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className={styles.welcomeRoute}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className={styles.paper}>
              <Typography
                className={styles.descrioption}
                variant="body1"
                align="center"
              >
                Follow and connect with friends to see what they're watching.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className={styles.welcomeRoute}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className={styles.paper}>
              <Typography
                className="description"
                variant="body1"
                align="center"
              >
                Get personalized film recommendations based on your viewing
                history.
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/welcome"
            className={styles.welcomeRoute}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Paper className={styles.paper}>
              <Typography
                className={styles.description}
                variant="body1"
                align="center"
              >
                Keep track of all the films you want to watch in one place.
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

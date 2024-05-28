import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchContext } from "../../context/SearchContext";
import Header from "../Header";
import Films from "../films/Films";
import {
  Autocomplete,
  Button,
  Box,
  CircularProgress,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Profile.module.css";

export default function Profile() {
  const [openPosterModal, setOpenPosterModal] = useState(false);
  const [movieTitles, setMovieTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedTopFive, setSelectedTopFive] = useState(
    Array.from({ length: 5 }, () => null)
  );
  const [userTopFive, setUserTopFive] = useState([]);
  const {
    search,
    setSearch,
    hasUserSearched,
    setHasUserSearched,
    setMovies,
    setTotalResults,
  } = useContext(SearchContext);
  const { user, isLoading, isAuthenticated, getIdTokenClaims } = useAuth0();

  const getMovies = async () => {
    try {
      const movieResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/movies?title=${search}`
      );
      const films = movieResponse.data.results.map((film) => ({
        label: film.title,
        poster_path: film.poster_path,
        id: film.id,
      }));
      setMovieTitles(films || []);
      setMovies(movieResponse?.data);
      setTotalResults(movieResponse?.data?.total_results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearch(input);

    const titles = movieTitles.filter((title) =>
      title.label.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredTitles(titles);
    setHasUserSearched(false);
    getMovies();
  };

  const handleOpenSearch = () => setOpenPosterModal(true);

  const handleCloseSearch = () => setOpenPosterModal(false);

  const handleSelectTopFive = (film) => {
    const emptySlotIndex = selectedTopFive.findIndex((item) => item === null);

    if (emptySlotIndex !== -1) {
      const updatedTopFive = [...selectedTopFive];
      updatedTopFive[emptySlotIndex] = film;
      setSelectedTopFive(updatedTopFive);
    } else {
      const slotToReplace = prompt(
        "You've already selected 5 movies. Please select the slot you want to replace (1, 2, 3, 4, 5) and then click save:"
      );
      const slotIndex = parseInt(slotToReplace) - 1;
      if (slotIndex >= 0 && slotIndex < 5) {
        const updatedTopFive = [...selectedTopFive];
        updatedTopFive[slotIndex] = film;
        setSelectedTopFive(updatedTopFive);
      } else {
        alert("Invalid choice. Please choose a slot number (1, 2, 3, 4, 5).");
      }
    }
    handleCloseSearch();
  };

  const topFive = selectedTopFive.map((selectedFilm, idx) => {
    const userFaveFilm = userTopFive[idx];

    return (
      <Paper
        onClick={handleOpenSearch}
        key={idx}
        className={styles.emptyTopFive}
      >
        {userFaveFilm ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${userFaveFilm.poster_path}`}
            alt={userFaveFilm.label}
            className={styles.topFivePoster}
          />
        ) : selectedFilm ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedFilm.poster_path}`}
            alt={selectedFilm.label}
            className={styles.topFivePoster}
          />
        ) : (
          <AddIcon className={styles.addIcon} />
        )}
      </Paper>
    );
  });

  const saveTopFive = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      const updatedTopFive = selectedTopFive.filter(
        (film) => film !== null && film.label
      );
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/topFive`;
        const payload = { favoriteFilms: updatedTopFive };
        let response;

        if (userTopFive.length > 0) {
          response = await axios.put(url, payload, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
        } else {
          response = await axios.post(url, payload, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
        }

        const responseData = JSON.parse(response.config.data);

        setUserTopFive(responseData.favoriteFilms);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getTopFive = async () => {
      if (isAuthenticated) {
        const idTokenClaims = await getIdTokenClaims();
        const jwtToken = idTokenClaims.__raw;
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/topFive`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          setUserTopFive(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getTopFive();
  }, [isAuthenticated, getIdTokenClaims, setUserTopFive]);

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
        <h3>Loading...</h3>
      </Box>
    );

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Container className={styles.userContainer}>
          <h2 className={styles.welcomeTag}>Welcome back, {user.name}</h2>
          <h3 className={styles.faveFilmsTag}>favorite films</h3>
          <Box className={styles.topFiveBox}>{topFive}</Box>
          {selectedTopFive.filter((film) => film !== null && film.label)
            .length > 0 ? (
            <Button className={styles.saveTopFiveBtn} onClick={saveTopFive}>
              Save Changes
            </Button>
          ) : null}
          <Modal open={openPosterModal} onClose={handleCloseSearch}>
            <Box className={styles.searchModal}>
              <Typography variant="h6" component="h2">
                Pick a Favorite Film
              </Typography>
              <Autocomplete
                disablePortal
                options={filteredTitles}
                getOptionLabel={(option) => option.label}
                value={selectedTopFive[0]}
                onChange={(e, newVal) => handleSelectTopFive(newVal)}
                renderInput={(params) => (
                  <TextField {...params} label="Film" onChange={handleSearch} />
                )}
              />
            </Box>
          </Modal>
        </Container>
      ) : null}
      {hasUserSearched ? <Films /> : null}
    </>
  );
}

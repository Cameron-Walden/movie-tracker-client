import { useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FilmContext } from "../../context/FilmContext";
import Header from "../Header";
import Films from "../films/Films";
import {
  Autocomplete,
  Box,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./Profile.css";

export default function Profile() {
  const [openPosterModal, setOpenPosterModal] = useState(false);
  const [movieTitles, setMovieTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const {
    search,
    setSearch,
    hasUserSearched,
    setHasUserSearched,
    setMovies,
    setTotalResults,
  } = useContext(FilmContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading ...</div>;

  const getMovies = async () => {
    try {
      let movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${search}`
      );
      const titles = movieResponse.data.results.map((film) => ({
        label: film.title,
      }));
      setMovieTitles(titles || []);
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

  const emptyTopFive = Array.from({ length: 5 }, (_, idx) => (
    <Paper
      onClick={handleOpenSearch}
      key={idx}
      className="empty-top-five"
    ></Paper>
  ));
  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Container className="user-container">
          <h2>Welcome back, {user.name}</h2>
          <Box className="top-five-box">{emptyTopFive}</Box>
          <Modal open={openPosterModal} onClose={handleCloseSearch}>
            <Box className="search-modal">
              <Typography variant="h6" component="h2">
                Pick a Favorite Film
              </Typography>
              <Autocomplete
                disablePortal
                options={filteredTitles}
                getOptionLabel={(option) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Movie"
                    onChange={handleSearch}
                  />
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

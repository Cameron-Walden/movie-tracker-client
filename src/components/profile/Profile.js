import { useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FilmContext } from "../../context/FilmContext";
import { Container } from "@mui/material";
import Header from "../Header";
import Films from "../films/Films";
import {
  Modal,
  Paper,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

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

  const getMovies = async () => {
    try {
      let movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${search}`
      );
      const titles = movieResponse.data.results.map((film) => ({
        label: film.title,
      }));
      console.log(titles, "title");
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

  if (isLoading) return <div>Loading ...</div>;

  const handleOpenSearch = () => setOpenPosterModal(true);

  const handleCloseSearch = () => setOpenPosterModal(false);

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

  const emptyTopFive = Array.from({ length: 5 }, (_, idx) => (
    <Paper
      onClick={handleOpenSearch}
      key={idx}
      sx={{
        width: 150,
        height: 225,
        margin: 2,
        backgroundColor: "#678",
        cursor: "pointer",
      }}
    ></Paper>
  ));
  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Container className="user-container">
          <h2>Welcome back, {user.name}</h2>
          <Box display="flex">{emptyTopFive}</Box>
          <Modal open={openPosterModal} onClose={handleCloseSearch}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
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
          {/* <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p> */}
        </Container>
      ) : null}
      {hasUserSearched ? <Films /> : null}
    </>
  );
}

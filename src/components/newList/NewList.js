import { useState, useContext } from "react";
import axios from "axios";
import { FilmContext } from "../../context/FilmContext";
import Header from "../Header";
import Films from "../films/Films";
import Pages from "../pages/Pages";
import { Autocomplete, Box, TextField } from "@mui/material";
import "./NewList.css";

export default function NewList() {
  const [movieTitles, setMovieTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const {
    search,
    setSearch,
    setMovies,
    totalResults,
    setTotalResults,
    hasUserSearched,
    setHasUserSearched,
  } = useContext(FilmContext);

  const getMovies = async () => {
    try {
      let movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${search}`
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

  return (
    <div>
      <Header />
      {hasUserSearched ? (
        <>
          <Films />
          <Pages
            search={search}
            setMovies={setMovies}
            totalResults={totalResults}
          />
        </>
      ) : (
        <>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="input-container">
              <div className="textfield-container">
                <h1 className="new-list-title">New List</h1>
                <TextField
                  className="list-name-input"
                  label="List name"
                  variant="outlined"
                />
                <TextField
                  className="tag-input"
                  label="Tags"
                  variant="outlined"
                />
                <TextField
                  className="view-input"
                  label="Who can view"
                  variant="outlined"
                />
                <Autocomplete
                  disablePortal
                  options={filteredTitles}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Film"
                      onChange={handleSearch}
                    />
                  )}
                />
              </div>
              <div style={{ flex: 0.1 }}></div>
              <textarea
                className="description-input"
                name="list-description-field"
                rows="5"
                cols="55"
              ></textarea>
            </div>
          </Box>
        </>
      )}
    </div>
  );
}

import { useEffect, useContext } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FilmContext } from "../context/FilmContext";
import Popular from "./popular/Popular";
import FilmsByGenre from "./filmsByGenre/FilmsByGenre";

export default function SortFilms() {
  const {
    genres,
    setGenres,
    selectGenre,
    setSelectGenre,
    selectedFromDD,
    setSelectedFromDD,
    setDDMovies,
  } = useContext(FilmContext);

  const getGenres = async (genreId) => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
      if (genreId) {
        url += `&with_genres=${genreId}`;
      }
      const genreResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US`
      );
      const movieResponse = await axios.get(url);
      setGenres(genreResponse.data.genres);
      setDDMovies(movieResponse.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres(selectGenre);
  }, [selectGenre]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5vh",
          paddingTop: "10px",
        }}
      >
        <p style={{ padding: "10px", color: "#9ab" }}>Browse By:</p>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, paddingBottom: 2, color: "#9ab" }}
        >
          <InputLabel style={{ color: "black", zIndex: 1 }} id="genre-label">
            genre
          </InputLabel>
          <Select
            sx={{ background: "#9ab" }}
            labelId="genre-select"
            id="genre-select-id"
            value={selectGenre || ""}
            onChange={(e) => {
              setSelectGenre(e.target.value);
              getGenres(e.target.value);
              setSelectedFromDD(true);
            }}
            label="genre"
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {selectedFromDD ? (
        <>
          <FilmsByGenre />
        </>
      ) : (
        <div style={{ margin: "auto" }}>
          <Popular />
        </div>
      )}
    </div>
  );
}

import { useEffect, useContext } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { GenreContext } from "../context/GenreContext";
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
  } = useContext(GenreContext);

  // const getGenres = async (id) => {
  //   try {
  //     const genreResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/genres`);
  //     const movieResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/discover/${id}`);
  //     setGenres(genreResponse.data.genres);
  //     setDDMovies(movieResponse.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getGenres(selectGenre);
  // }, [selectGenre]);

  useEffect(() => {
    const getGenres = async (id) => {
      try {
        const genreResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/genres`);
        const movieResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/discover/${id}`);
        setGenres(genreResponse.data.genres);
        setDDMovies(movieResponse.data.results);
      } catch (error) {
        console.log(error);
      }
    };
  
    getGenres(selectGenre);
  }, [selectGenre, setGenres, setDDMovies]);

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

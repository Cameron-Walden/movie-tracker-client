import { useState, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchContext } from "../../context/SearchContext";
import Header from "../Header";
import Films from "../films/Films";
import Pages from "../pages/Pages";
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./NewList.module.css";

export default function NewList() {
  const [movieTitles, setMovieTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmList, setFilmList] = useState([]);
  const [listName, setListName] = useState("");
  // TODO
  // const [tags, setTags] = useState("");
  // const [view, setView] = useState();
  const [description, setDescription] = useState("");
  const {
    search,
    setSearch,
    setMovies,
    totalResults,
    setTotalResults,
    hasUserSearched,
    setHasUserSearched,
  } = useContext(SearchContext);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const getMovies = async () => {
    try {
      let movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${search}`
      );
      const films = movieResponse.data.results.map((film) => ({
        label: film.title,
        id: film.id,
        poster_path: film.poster_path,
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

  const handleAddFilm = () => {
    if (selectedFilm) {
      setFilmList([...filmList, selectedFilm]);
      setSelectedFilm(null);
    }
  };

  const handleSaveList = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;

      const listData = {
        title: listName,
        description: description,
        // movies: filmList,
        movies: filmList.map((film) => ({
          id: film.id,
          title: film.label,
          poster: film.poster_path,
        })),
        user: idTokenClaims.sub,
      };

      try {
        await axios.post("http://localhost:3001/lists", listData, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setListName("");
        // TODO
        // setTags("");
        // setView();
        setDescription("");
        setFilmList([]);
      } catch (error) {
        console.log(error);
      }
    }
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
            <div className={styles.inputContainer}>
              <div className={styles.textfieldContainer}>
                <h1 className={styles.newListTitle}>New List</h1>
                <TextField
                  className={styles.listNameInput}
                  label="List name"
                  variant="outlined"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <TextField
                  className={styles.tagsInput}
                  label="Tags"
                  variant="outlined"
                  // TODO:
                  // value={listName}
                  // onChange={(e) => setTags(e.target.value)}
                />
                {/* <TextField
                  className={styles.viewInput}
                  label="Who can view"
                  variant="outlined"
                /> */}
                <Select
                  className={styles.viewInput}
                  label="who can view"
                  //TODO:
                  // value={view}
                  // onChange={(e) => setView(e.target.value)}
                >
                  <MenuItem value={10}>Public</MenuItem>
                  <MenuItem value={20}>Private</MenuItem>
                </Select>
                <div className={styles.buttonSearchContainer}>
                  <Button onClick={handleAddFilm}>Add a film</Button>
                  <Autocomplete
                    disablePortal
                    options={filteredTitles}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      setSelectedFilm(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Film"
                        onChange={handleSearch}
                        style={{ width: "200px" }}
                      />
                    )}
                  />
                </div>
                <div className={styles.listItemsContainer}>
                  <TableBody>
                    {filmList.map((film) => (
                      <TableRow key={film?._id} className="table-row">
                        <TableCell align="right">
                          <Box display="flex" alignItems="center">
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                              sx={{ ml: 1 }}
                            ></Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <img
                            src={
                              film.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                                : "no poster"
                            }
                            alt={film.title}
                            style={{ width: "4em", height: "6em" }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <h3 className="film-title" style={{ color: "white" }}>
                            {film.label}
                          </h3>
                        </TableCell>
                        <TableCell align="right" style={{ width: "100%" }}>
                          <DeleteIcon />
                        </TableCell>
                        <TableCell align="right" style={{ width: "100% " }}>
                          <EditIcon />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </div>
              </div>
              <div style={{ flex: 0.1 }}></div>
              <div className={styles.descriptionContainer}>
                <textarea
                  className={styles.descriptionInput}
                  name="list-description-field"
                  rows="5"
                  cols="55"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className={styles.saveListContainer}>
                  <Button>CANCEL</Button>
                  <Button onClick={handleSaveList}>SAVE</Button>
                </div>
              </div>
            </div>
          </Box>
        </>
      )}
    </div>
  );
}

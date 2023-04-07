import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FilmContext = createContext();

export default function Context(props) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [date, setDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectGenre, setSelectGenre] = useState(null);
  const [selectedFromDD, setSelectedFromDD] = useState(false);
  const [ddMovies, setDDMovies] = useState([]);

  const getMovies = async () => {
    try {
      let movieResponse = await axios?.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${search}`
      );
      setMovies(movieResponse?.data);
      setTotalResults(movieResponse?.data?.total_results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FilmContext.Provider
      value={{
        search,
        setSearch,
        movies,
        setMovies,
        totalResults,
        setTotalResults,
        selectedMovie,
        setSelectedMovie,
        savedMovies,
        setSavedMovies,
        getMovies,
        hasUserSearched,
        setHasUserSearched,
        openModal,
        setOpenModal,
        starRating,
        setStarRating,
        userReview,
        setUserReview,
        date,
        setDate,
        genres,
        setGenres,
        selectGenre,
        setSelectGenre,
        selectedFromDD,
        setSelectedFromDD,
        ddMovies,
        setDDMovies
      }}
    >
      {props.children}
    </FilmContext.Provider>
  );
}

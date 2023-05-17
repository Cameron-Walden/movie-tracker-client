import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
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
  const [watchlist, setWatchlist] = useState([]);
  const [popular, setPopular] = useState([]);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

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

  const addToWatchlist = async (film, res) => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      const config = {
        headers: { "Content-type": "application/json" },
        data: {
          title: film.title,
          description: film.overview,
          poster: film.poster_path,
          watched: false,
          tmdb_id: film.id,
        },
      };
      try {
        const url = "http://localhost:3001/watchlist";
        const response = await axios.post(url, config.data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setWatchlist([...watchlist, response.data]);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  };

  const getPopularFilms = async () => {
    try {
      const pageResponses = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=2`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=3`
        ),
      ]);
      const results = pageResponses.flatMap(
        (response) => response.data.results
      );
      setPopular(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
    getPopularFilms();
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
        setDDMovies,
        watchlist,
        setWatchlist,
        addToWatchlist,
        popular,
        setPopular,
        getPopularFilms,
      }}
    >
      {props.children}
    </FilmContext.Provider>
  );
}

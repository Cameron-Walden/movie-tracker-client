import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const FilmContext = createContext();

export default function FilmProvider(props) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trackedMovies, setTrackedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectGenre, setSelectGenre] = useState(null);
  const [selectedFromDD, setSelectedFromDD] = useState(false);
  const [ddMovies, setDDMovies] = useState([]);
  const [popular, setPopular] = useState([]);

  const getPopularFilms = async () => {
    try {
      const p1Res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=1`
      );
      const p2Res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=2`
      );
      const p3Res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=3`
      );
      const results = [
        ...p1Res.data.results,
        ...p2Res.data.results,
        ...p3Res.data.results,
      ];
      setPopular(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FilmContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        trackedMovies,
        setTrackedMovies,
        genres,
        setGenres,
        selectGenre,
        setSelectGenre,
        selectedFromDD,
        setSelectedFromDD,
        ddMovies,
        setDDMovies,
        popular,
        setPopular,
        getPopularFilms,
      }}
    >
      {props.children}
    </FilmContext.Provider>
  );
}

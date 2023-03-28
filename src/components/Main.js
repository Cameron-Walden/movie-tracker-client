import { useEffect, useState, useContext } from "react";
import { FilmContext } from "../context/FilmContext";
import axios from "axios";
import Header from "./Header";
import Movies from '../components/movies/Movies';
import Pages from "./Pages";

export default function Main() {
  const { search, setSearch }= useContext(FilmContext)
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async () => {
    try {
      let movieResponse = await axios?.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&query=${search}`);
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
    <div>
      <Header search={search} setSearch={setSearch} getMovies={getMovies} />
      <Movies movies={movies} />
      <Pages
        search={search}
        setMovies={setMovies}
        totalResults={totalResults}
      />
    </div>
  );
}
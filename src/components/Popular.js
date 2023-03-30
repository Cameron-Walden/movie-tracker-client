import { useState, useEffect } from "react";
import axios from "axios";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getPopularFilms = async () => {
    try {
      let response = await axios?.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&page=1`
      );
      setPopular(response?.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {popular.map((film) => (
        <div key={film.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
            alt={film.title}
          />
        </div>
      ))}
    </>
  );
}

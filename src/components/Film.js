import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import "./Film.css";

export default function Film() {
  const [filmId, setFilmId] = useState(null);
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);

  const { id } = useParams();

  const getFilm = async () => {
    try {
      let movieResponse = await axios?.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}`
      );
      setFilmId(movieResponse?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilmCredits = async () => {
    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API}`
      );
      setCrew(response.data.crew);
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const getDirector = () => {
    const director = crew.find((member) => member.job === "Director");
    setDirector(director.name);
  };

  useEffect(() => {
    getFilmCredits();
    getFilm();
  }, [id]);

  useEffect(() => {
    if (crew.length > 0) {
      getDirector();
    }
  });

  return (
    <div>
      {filmId && (
        <Container>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${filmId?.backdrop_path}`}
              alt={filmId.title}
              className="movie-backdrop"
            />
          </div>
          <div className="poster-container">
            <div className="poster-details">
              <img
                src={`https://image.tmdb.org/t/p/w342/${filmId?.poster_path}`}
                alt={filmId?.title}
              />
              <div>
                <p className="film-title">{filmId?.title}</p>
                {director && (
                  <p className="directed-by">Directed by: {director}</p>
                )}
                <p className="film-overview">{filmId?.overview}</p>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

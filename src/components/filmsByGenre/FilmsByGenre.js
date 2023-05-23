import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { FilmContext } from '../../context/FilmContext';
import './FilmsByGenre.css'

export default function FilmsByGenre() {
  const { ddMovies } = useContext(FilmContext)
  return (
    <>
      <Grid className="film-grid" container >
        {ddMovies.map((film) => (
          <div key={film._id} className="img-container">
            <Link to={`/film/${film.id}`} className="movie-link">
              <img
                src={`https://image.tmdb.org/t/p/w500/${film?.poster_path}`}
                alt={film.title}
                style={{
                  width: "12em",
                  height: "20em",
                  paddingLeft: "5px"
                }}
              />
            </Link>
          </div>
        ))}
      </Grid>
    </>
  );
}

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { FilmContext } from '../../context/FilmContext';
import styles from './FilmsByGenre.module.css';

export default function FilmsByGenre() {
  const { ddMovies } = useContext(FilmContext)
  return (
    <>
      <Grid className={styles.filmGrid} container >
        {ddMovies.map((film) => (
          <div key={film._id} className={styles.imgContainer}>
            <Link to={`/film/${film.id}`} className={styles.movieLink}>
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

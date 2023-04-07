import { useContext } from 'react';
import { Item } from './genreStyles';
import { Grid } from '@mui/material';
import { FilmContext } from '../../context/FilmContext';

export default function FilmsByGenre() {
  const { ddMovies } = useContext(FilmContext)
  return (
    <>
      <Grid className="film-grid" container rowSpacing={3} columnSpacing={2}>
        {ddMovies.map((film) => (
          <div key={film._id}>
            {console.log(film, "film")}
            <Item>
              <img
                src={`https://image.tmdb.org/t/p/w500/${film?.poster_path}`}
                alt={film.title}
                style={{
                  width: "12em",
                  height: "20em",
                  justifyContent: "space-around",
                }}
              />
            </Item>
          </div>
        ))}
      </Grid>
    </>
  );
}

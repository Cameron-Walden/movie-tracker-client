import { useContext } from "react";
import { FilmContext } from "../context/FilmContext";
import Movies from '../components/movies/Movies';
import Popular from "./Popular";
import Pages from "./Pages";

export default function Main() {
  const { search, setMovies, totalResults } = useContext(FilmContext)
  return (
    <div>
      <Movies />
      <Popular />
      <Pages
        search={search}
        setMovies={setMovies}
        totalResults={totalResults}
      />
    </div>
  );
}
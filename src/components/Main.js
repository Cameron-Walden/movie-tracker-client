import { useContext } from "react";
import { FilmContext } from "../context/FilmContext";
import Movies from '../components/movies/Movies';
import Pages from "./Pages";

export default function Main() {
  const { search, setMovies, totalResults } = useContext(FilmContext)
  return (
    <div>
      <Movies />
      <Pages
        search={search}
        setMovies={setMovies}
        totalResults={totalResults}
      />
    </div>
  );
}
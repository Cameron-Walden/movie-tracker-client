import { useContext } from "react";
import { FilmContext } from "../context/FilmContext";
import Header from "./Header";
import Films from "./films/Films";
import Pages from "./Pages";
import SortFilms from "./SortFilms";
export default function Main() {
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

  return (
    <div>
      <Header />
      {hasUserSearched ? (
        <>
          <Films />
          <Pages
            search={search}
            setMovies={setMovies}
            totalResults={totalResults}
          />
        </>
      ) : (
        <SortFilms />
      )}
    </div>
  );
}

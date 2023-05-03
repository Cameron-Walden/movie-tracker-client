import { useState, useContext } from "react";
import { FilmContext } from "../context/FilmContext";
import Movies from "./films/Films";
import Pages from "./Pages";
import SortFilms from "./SortFilms";
export default function Main() {
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

  return (
    <div>
      {hasUserSearched ? (
        <>
          <Movies />
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

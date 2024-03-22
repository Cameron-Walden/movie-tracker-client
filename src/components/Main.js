import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import Header from "./Header";
import Films from "./films/Films";
import Pages from "./pages/Pages";
import SortFilms from "./SortFilms";
export default function Main() {
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(SearchContext);
    
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

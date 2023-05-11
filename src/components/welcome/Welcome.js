import { useContext } from "react";
import { FilmContext } from "../../context/FilmContext";
import Header from "../Header"
import Films from "../films/Films";
import Pages from "../pages/Pages";


export default function Welcome(){
    const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

    return(
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
          <p style={{color: "white" }}>you are in the welcome page</p>
        )}
      </div>
    )
}
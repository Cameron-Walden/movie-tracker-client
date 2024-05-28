import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const SearchContext = createContext();

export default function SearchProvider(props) {
  const [search, setSearch] = useState("");
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async () => {
    try {
      const movieResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/movies?title=${search}`
      );
      setMovies(movieResponse?.data);
      setTotalResults(movieResponse?.data?.total_results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        hasUserSearched,
        setHasUserSearched,
        movies,
        setMovies,
        getMovies,
        totalResults,
        setTotalResults,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

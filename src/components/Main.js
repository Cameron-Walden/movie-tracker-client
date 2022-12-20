import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import Movies from "./Movies";
import Pages from "./Pages";

export default function Main() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getMovies = async () => {
    try {
      let movieResponse = await axios?.get(
        `http://localhost:3001/movies?title=${search}`
      );

      setMovies(movieResponse?.data);
      setTotalResults(movieResponse?.data?.total_results);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async (page) => {
    try {
      let movieResponse = await axios?.get(
        `http://localhost:3001/movies?title=${search}&page=${page}`
      );

      setMovies(movieResponse?.data);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form search={search} setSearch={setSearch} getMovies={getMovies} />
      <Movies movies={movies} />
      {/* {totalResults > 20 ? ( */}
        <Pages
          totalResults={totalResults}
          currentPage={currentPage}
          nextPage={nextPage}
        />
      {/* ) : null} */}
    </div>
  );
}

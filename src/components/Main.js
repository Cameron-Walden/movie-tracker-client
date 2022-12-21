import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import Movies from "./Movies";
import Pages from "./Pages";

export default function Main() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async () => {
    try {
      let movieResponse = await axios?.get(`http://localhost:3001/movie?title=${search}`);
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
    <div>
      <Form search={search} setSearch={setSearch} getMovies={getMovies} />
      <Movies movies={movies} />
      <Pages
        search={search}
        setMovies={setMovies}
        totalResults={totalResults}
      />
    </div>
  );
}

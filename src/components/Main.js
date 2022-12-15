import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import Movies from "./Movies";

export default function Main() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState({});

  const getMovies = async () => {
    try {
      let movieResponse = await axios.get(
        `http://localhost:3001/movies?title=${search}`
      );
      setMovies(movieResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Form search={search} setSearch={setSearch} getMovies={getMovies} />
      <Movies movies={movies} />
    </div>
  );
}

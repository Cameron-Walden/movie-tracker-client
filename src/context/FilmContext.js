import { createContext, useState, useEffect } from "react";
import { useLoading } from "./LoadingContext";
import axios from "axios";
export const FilmContext = createContext();

export default function FilmProvider(props) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [popular, setPopular] = useState([]);
  const { setIsFirstFiveLoading, setIsPopLoading } = useLoading();

  const getPopularFilms = async () => {
    setIsFirstFiveLoading(true);
    setIsPopLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/movies/popular`
      );
      setPopular(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFirstFiveLoading(false);
      setIsPopLoading(false);
    }
  };

  useEffect(() => {
    getPopularFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FilmContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        popular,
        setPopular,
        getPopularFilms,
      }}
    >
      {props.children}
    </FilmContext.Provider>
  );
}

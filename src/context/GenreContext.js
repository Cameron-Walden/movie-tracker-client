import { createContext, useState } from "react";
export const GenreContext = createContext();

export default function GenreProvider(props) {
  const [genres, setGenres] = useState([]);
  const [selectGenre, setSelectGenre] = useState(null);
  const [selectedFromDD, setSelectedFromDD] = useState(false);
  const [ddMovies, setDDMovies] = useState([]);
  return (
    <GenreContext.Provider
      value={{
        genres,
        setGenres,
        selectGenre,
        setSelectGenre,
        selectedFromDD,
        setSelectedFromDD,
        ddMovies,
        setDDMovies,
      }}
    >
      {props.children}
    </GenreContext.Provider>
  );
}

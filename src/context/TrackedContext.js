import { createContext, useState } from "react";
export const TrackedContext = createContext();

export default function TrackedProvider(props) {
  const [trackedMovies, setTrackedMovies] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMovieEdit, setSelectedMovieEdit] = useState(null);

  return (
    <TrackedContext.Provider
      value={{
        trackedMovies,
        setTrackedMovies,
        openEdit,
        setOpenEdit,
        selectedMovieEdit,
        setSelectedMovieEdit,
      }}
    >
      {props.children}
    </TrackedContext.Provider>
  );
}

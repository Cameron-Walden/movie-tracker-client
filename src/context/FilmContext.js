import { createContext, useState } from "react";

export const FilmContext = createContext();

export default function Context(props) {
  const [search, setSearch] = useState("");
  return (
    <FilmContext.Provider value={{ search, setSearch }}>
      {props.children}
    </FilmContext.Provider>
  );
}

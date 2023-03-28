import { useContext } from "react";
import { FilmContext } from "../../context/FilmContext";
import SearchIcon from "@mui/icons-material/Search";
import { Searchbar } from "./searchStyles";
import { SearchIconWrapper } from "./searchStyles";
import { StyledInputBase } from "./searchStyles";

export default function Search() {
  const { search, setSearch, getMovies } = useContext(FilmContext)
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getMovies();
    }
  };

  return (
    <div>
      <Searchbar onChange={handleSearch} value={search} onKeyDown={handleKeyDown}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Searchbar>
    </div>
  );
}
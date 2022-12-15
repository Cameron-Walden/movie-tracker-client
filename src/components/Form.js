import { FormControl, InputLabel, Input, Button } from "@mui/material";

export default function Form({ search, setSearch, getMovies }) {
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div>
      <FormControl onChange={handleSearch} value={search}>
        <InputLabel htmlFor="my-input">Search movies...</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <Button onClick={getMovies}>Search</Button>
      </FormControl>
    </div>
  );
}

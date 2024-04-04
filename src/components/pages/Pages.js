import { useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import "./Pages.css";

export default function Pages({ search, setMovies, totalResults }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesShown = Math.floor(totalResults / 20);

  const nextPage = async (page) => {
    try {
      const movieResponse = await axios.get(
        `http://localhost:3001/movies?title=${search}&page=${page}`
      );
      setMovies(movieResponse?.data);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {totalResults > 20 ? (
        <Pagination
          className="pagination"
          count={moviesShown + 1}
          page={currentPage}
          onChange={(event, page) => nextPage(page)}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      ) : null}
    </div>
  );
}

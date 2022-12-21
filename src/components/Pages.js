import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function Pages({ search, setMovies, totalResults }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];
  const moviesShown = Math.floor(totalResults / 20);

  const nextPage = async (page) => {
    try {
      let movieResponse = await axios?.get(`http://localhost:3001/movie?title=${search}&page=${page}`);
      setMovies(movieResponse?.data);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  for (let i = 1; i <= moviesShown + 1; i++) {
    pages.push(
      <Button key={i} onClick={() => nextPage(i)}>
        {i}
      </Button>
    );
  }

  return (
    <div>
      {currentPage > 1 ? (
        <Button onClick={() => nextPage(currentPage - 1)}>
          <ArrowCircleLeftIcon />
        </Button>
      ) : (
        ""
      )}
      {totalResults > 20 ? pages : totalResults <= 1 ? '' : ''}
      {currentPage < pages + 1 ? (
        <Button onClick={() => nextPage(currentPage + 1)}>
          <ArrowCircleRightIcon />
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

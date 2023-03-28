import { useContext, useEffect } from "react";
import { FilmContext } from "../context/FilmContext";
import axios from "axios";

export default function SavedFilm(){
    const { savedMovies, setSavedMovies } = useContext(FilmContext)

    const getSavedMovies = async () => {
        const savedMovie = "http://localhost:3001/reviews";
        const response = await axios.get(savedMovie);
        setSavedMovies(response.data);
      };

      useEffect(() => {
        getSavedMovies()
      })

    return (
        <>
        {savedMovies?.map(film => (
            <p>{film.title}</p>
        ))}
        </>
    )
}
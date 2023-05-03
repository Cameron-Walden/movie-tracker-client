import { useContext, useEffect } from "react";
import { FilmContext } from "../../context/FilmContext";
import axios from "axios";
import {
  Modal,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import { style } from "./style";
import { DatePicker } from "@mui/x-date-pickers";

export default function MovieModal({ handleCloseModal }) {
  const {
    savedMovies,
    setSavedMovies,
    selectedMovie,
    openModal,
    starRating,
    setStarRating,
    userReview,
    setUserReview,
    date,
    setDate,
  } = useContext(FilmContext);

  const addUserReview = async (e, res) => {
    e.preventDefault();
    const config = {
      headers: { "Content-type": "application/json" },
      data: {
        title: selectedMovie.title,
        description: selectedMovie.overview,
        poster: selectedMovie.poster_path,
        release_date: selectedMovie.release_date,
        user_rating: starRating,
        user_review: userReview,
        date_watched: date,
        tmdb_id: selectedMovie.id
      },
    };
    try {
      const url = "http://localhost:3001/reviews";
      const response = await axios.post(url, config.data);
      setSavedMovies([...savedMovies, response.data]);
      handleCloseModal();
    } catch (error) {
      res.status(500).send(error);
    }
  };

  useEffect(() => {
    setStarRating(0);
    setUserReview("");
    setDate("");
  }, [selectedMovie]);

  return (
    <>
      {selectedMovie && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.primary"
                  gutterBottom
                >
                  {selectedMovie?.title} {selectedMovie?.release_date}
                </Typography>
                <div>
                  I watched on{" "}
                  <DatePicker value={date} onChange={(day) => setDate(day)} />
                </div>
                <form>
                  <textarea
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    rows="4"
                    cols="20"
                  />
                </form>
                <Stack spacing={1}>
                  <Rating
                    name="user_rating"
                    defaultValue={null}
                    precision={0.5}
                    value={starRating}
                    onChange={(e, newVal) => setStarRating(newVal)}
                  />
                </Stack>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={addUserReview}>
                  Add to watched Films
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Modal>
      )}
    </>
  );
}

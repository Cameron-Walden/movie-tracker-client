import { useState } from "react";
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
  Stack
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { style } from "./style";

export default function MovieModal({
  selectedMovie,
  savedMovies,
  setSavedMovies,
  openModal,
  handleCloseModal,
  movie,
}) {
  const [starRating, setStarRating] = useState(0);

  const addUserReview = async (e, res) => {
    const config = {
      headers: { "Content-type": "application/json" },
      data: {
        title: selectedMovie.title,
        description: selectedMovie.overview,
        user_rating: starRating
      },
    };
    try {
      const url = "http://localhost:3001/reviews";
      const response = await axios.post(url, config.data);
      setStarRating(starRating);
      setSavedMovies([...savedMovies, response]);
    } catch (error) {
      res.status(500).send(error);
    }
  };

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
                <Typography variant="h5" component="div">
                  I watched on here
                </Typography>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Add a review..."
                  style={{ width: 200 }}
                  label="user_review"
                />
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

import { Modal, Box, Typography } from "@mui/material";
import { style } from "./style";

export default function MovieModal({
  selectedMovie,
  openModal,
  handleCloseModal,
  addUserReview,
  movie,
}) {

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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedMovie?.title}
              <button onClick={() => addUserReview(movie.id)}>add fave</button>
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}

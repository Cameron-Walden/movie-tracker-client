import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";

export default function Movies({ movies }) {
  return (
    <div>
      {movies.results.map((movie) => (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {movie.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {movie.release_date}
            </Typography>
            <Typography variant="body2" component="div">
              {movie.overview}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">favorite</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { MovieTitle, Container, AboutMovie, MovieInfo, Button } from "./MovieDetails.styled";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzAyMjMxNGZlNmNmMjVlZmYyOTBkZDkxYjUxOTAzZiIsInN1YiI6IjY0NmZhMDQyYzVhZGE1MDBkZWU2Njc4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uIxfSgTwNgRYS5UWjwvghZ01EYEFs3x2JVSyeT6FUHE",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch movie details");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [movieId, options]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { title, original_title, name, overview, status, vote_average, poster_path, genres } = data;

  return (
    <Container>
      <Button to={backLinkRef.current} type="button">
        Go Back
      </Button>
      <AboutMovie>
        {poster_path && <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title || name || original_title} />}
        <MovieInfo>
          <MovieTitle>{title || name || original_title}</MovieTitle>
          <p>User Score: {vote_average}</p>
          <p>{overview}</p>
          <p>{status}</p>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </MovieInfo>
      </AboutMovie>
    </Container>
  );
};

export default MovieDetails;

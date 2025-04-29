import axios from "axios";
export const formatMovie = (movie) => {
  const { id, title, poster, imdb_rating, genres } = movie;
  return {
    id,
    title,
    poster,
    rated: imdb_rating,
    genres: genres,
  };
};

export async function getMovieByName(name) {
  if (!name) {
    return;
  }
  const res = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/movies?q=${name}`
  );
  if (res.data.data.length === 0) {
    return;
  }
  return res.data.data.map(formatMovie);
}
export async function getGenres(genre_name) {
  const res = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/genres/${genre_name}/movies`
  );
  return res.data;
}

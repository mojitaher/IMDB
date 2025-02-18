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
export async function getMovieByName(name, page) {
  const res = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/movies?q=${name}&page=${page}`
  );
  return res.data.data.map(formatMovie);
}
export async function getGenres() {
  const res = await axios.get(
    "https://moviesapi.codingfront.dev/api/v1/genres"
  );
  return res.data;
}

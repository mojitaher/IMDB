import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
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
  const res = await axios.get(`${API_URL}/movies?q=${name}`);
  if (res.data.data.length === 0) {
    return;
  }
  return res.data.data.map(formatMovie);
}
export async function getGenres() {
  const res = await axios.get(`${API_URL}/genres`);
  return res.data;
}
export async function getMovieByGenres(genre_name, page) {
  if (!genre_name) {
    return;
  }
  const res = await axios.get(
    `${API_URL}/genres/${genre_name}/movies?page=${page}`
  );
  return res.data;
}

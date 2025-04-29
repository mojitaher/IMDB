import axios from "axios";

//detail page
//////////////////////////////////////////

const formatDetail = (data) => {
  const {
    id,
    title,
    poster,
    released,
    imdb_rating,
    type,
    genres,
    runtime,
    plot,
    images,
  } = data;
  return {
    id,
    title,
    poster,
    released,
    rated: imdb_rating,
    genres,
    type,
    runtime,
    plot,
    images,
  };
};
export default async function getDetailsById(id) {
  if (!id) {
    return;
  }
  const res = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/movies/${id}`
  );
  return formatDetail(res.data);
}

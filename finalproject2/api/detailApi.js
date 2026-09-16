import axios from "axios";
import { API_URL } from "./api";
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
  const res = await axios.get(`${API_URL}/movies/${id}`);
  return formatDetail(res.data);
}

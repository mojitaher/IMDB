import axios from "axios";

export async function regester(name, email, password) {
  const res = await axios.post(
    "https://moviesapi.codingfront.dev/api/v1/register",
    {
      name,
      email,
      password,
    }
  );
  console.log(res.data);
}

import {
  formatMovie,
  getMovieByName,
  getGenres,
  getMovieByGenres,
} from "../../api/api";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import Header from "../components/Header";
import Tab from "../components/Tab";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from "../components/skeletonLoader";
import InfinityScroll from "../components/useInfinityScroll";
import { Button } from "flowbite-react";

export default function Home() {
  const [genresPage, setGenresPage] = useState(1);
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGener, setSelectedGener] = useState("");
  const [genresList, setGenresList] = useState([]);
  function handleBack() {
    setMovieList([]);
  }
  async function getAllMovies() {
    setLoader(true);

    const res = await axios.get(
      `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}`
    );
    const formatMovies = res.data.data.map(formatMovie);
    const totalPages = res.data.metadata.page_count;
    setMovie((movie) => [...movie, ...formatMovies]);
    if (page > totalPages) {
      setHasMore(false);
    } else {
      setPage((page) => page + 1);
    }
    setLoader(false);
  }

  async function fetchGetMovieByGenres() {
    const res = await getMovieByGenres(selectedGener, genresPage);
    const newMovie = res.data.map(formatMovie);
    setGenresList((movie) => [...movie, ...newMovie]);
    // const totalPage = res.metadata.page_count;
    // if (genresPage < totalPage) {
    //   setGenresPage((page) => page + 1);
  }
  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    getGenres().then((genres) => {
      setGenres(genres);
    });
  }, []);
  useEffect(() => {
    setGenresPage(1);
    setGenresList([]);
  }, [selectedGener]);
  useEffect(() => {
    fetchGetMovieByGenres();
  }, [genresPage, selectedGener]);
  const handelSubmit = (event, movieSearch) => {
    getMovieByName(movieSearch).then((movies) => {
      setMovieList(movies);
    });
    event.preventDefault();
    const movieResult =
      movieSearch != ""
        ? movieList.filter((el) =>
            el.title
              .toLowerCase()
              .trim()
              .includes(movieSearch.toLowerCase().trim())
          )
        : movieList;

    return setMovieList(movieResult);
  };
  function handelAllBtn() {
    setGenresList([]);
    setPage(1);
    console.log(genresList);
  }
  return (
    <>
      <Header />
      <div className="leading-normal gap-16 mx-32 flex-wrap text-white">
        <h1 className="font-black text-4xl mb-6 mt-16">MaileHereko</h1>
        <p className="max-w-42">
          List of movies and TV Shows, I, Pramod Poudel have watched till date.
          Explore what I have watched and also feel free to make a suggestion.
          😉
        </p>
      </div>
      <div>
        <Searchbar handelSubmit={handelSubmit} />
      </div>

      <div>
        <ul className="flex flex-wrap gap-4 p-4">
          <Button onClick={handelAllBtn}>All</Button>
          {genres.map((genre) => {
            return (
              <>
                <li key={genre.id}>
                  <Tab
                    data={genre}
                    onGenreClick={() => setSelectedGener(genre.name)}
                  />
                </li>
              </>
            );
          })}
        </ul>
        <h3 className=" mx-32 text-gray-400 font-normal text-3xl leading-10 font-poppin flex items-baseline gap-1">
          ALL <span className="text-base leading-6">({movie.length})</span>{" "}
          {/*fix length*/}
        </h3>
        {movieList.length > 0 ? (
          <>
            <Button onClick={handleBack}>Back</Button>;
            <ul className="mx-32 inline-flex flex-wrap gap-x-6 gap-y-5">
              {movieList.map((movies) => (
                <div className="max-w-72 " key={movies.id}>
                  <Link to={`/Detail/${movies.id}`}>
                    {!loader ? (
                      <MovieCard movie={movies} />
                    ) : (
                      <SkeletonLoader />
                    )}
                  </Link>
                </div>
              ))}
            </ul>
          </>
        ) : genresList.length > 0 ? (
          <ul className="mx-32 inline-flex flex-wrap gap-x-6 gap-y-5">
            {genresList.map((movies, index) => (
              <div className="max-w-72 " key={`${movies.id}-${index}`}>
                <Link to={`/Detail/${movies.id}`}>
                  {!loader ? <MovieCard movie={movies} /> : <SkeletonLoader />}
                </Link>
              </div>
            ))}
          </ul>
        ) : (
          InfinityScroll(movie, getAllMovies, hasMore, loader, MovieCard)
        )}
      </div>
    </>
  );
}

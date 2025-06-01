import {
  formatMovie,
  getMovieByName,
  getGenres,
  getMovieByGenres,
} from "../../api/api";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import Searchbar from "../components/searchbar";
import Header from "../components/header";
import Tab from "../components/Tab";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from "../components/skeletonLoader";
import InfinityScroll from "../components/useInfinityScroll";
import { Button } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import BackGround from "../components/background";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [genresPage, setGenresPage] = useState(1);
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState([]);
  const [movieLength, setMovieLength] = useState(1);
  const [loader, setLoader] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGener, setSelectedGener] = useState("");
  const [genresList, setGenresList] = useState([]);
  function handleBack() {
    setMovieList([]);
  }
  function handelAllBtn() {
    setGenresList([]);
    setHasMore(true);
  }
  async function getAllMovies() {
    setLoader(true);

    const res = await axios.get(
      `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}`
    );
    const formatMovies = res.data.data.map(formatMovie);
    const totalPages = res.data.metadata.page_count;
    const totalCount = res.data.metadata.total_count;
    setMovie((movie) => [...movie, ...formatMovies]);
    setMovieLength(totalCount);

    if (page > totalPages) {
      setHasMore(false);
    } else {
      setPage((page) => page + 1);
    }
    setLoader(false);
  }

  async function fetchGetMovieByGenres() {
    const res = await getMovieByGenres(selectedGener, genresPage);
    if (!res) {
      return;
    }
    const newMovie = res.data.map(formatMovie);
    setGenresList((movie) => [...movie, ...newMovie]);
    const totalPage = res.metadata.page_count;
    if (genresPage > totalPage) {
      setHasMore(false);
    } else {
      setGenresPage((page) => page + 1);
    }
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
  const { t, i18n } = useTranslation();
  function handelLang(lang) {
    i18n.changeLanguage(lang);
    if (lang === "fas") document.body.dir = i18n.dir("fa");
    else {
      document.body.dir = i18n.dir("en");
    }
  }
  return (
    <>
      <BackGround />
      <Header />
      <div className="flex px-3 gap-5">
        <Button onClick={() => handelLang("en")}>english</Button>
        <Button onClick={() => handelLang("fas")}>فارسی</Button>
      </div>
      <div className="leading-normal gap-16 mx-32 flex-wrap text-white ">
        <h1 className="font-black text-4xl mb-6 mt-16 ">{t("movieCenter")}</h1>
        <p className="max-w-42">{t("listOfMovie_message")}</p>
      </div>
      <div>
        <Searchbar handelSubmit={handelSubmit} />
      </div>

      <div>
        <ul className="flex flex-wrap gap-4 p-4">
          <Button onClick={handelAllBtn} disabled={movieList.length > 0}>
            All
          </Button>
          {genres.map((genre) => {
            return (
              <div key={genre.id}>
                <li>
                  <Tab
                    data={genre}
                    onGenreClick={() => setSelectedGener(genre.name)}
                    disable={movieList.length > 0}
                  />
                </li>
              </div>
            );
          })}
        </ul>
        <h3 className=" mx-32 my-4 text-gray-400 font-normal text-3xl leading-10 font-poppin flex items-baseline gap-1">
          {t("all")}{" "}
          <span className="text-base leading-6">({movieLength})</span>{" "}
        </h3>
        {movieList.length > 0 ? (
          <>
            <Button onClick={handleBack} className="mx-5">
              Back
            </Button>
            ;
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
          <InfiniteScroll
            dataLength={genresList}
            next={fetchGetMovieByGenres}
            hasMore={hasMore}
          >
            <ul className="mx-32 inline-flex flex-wrap gap-x-6 gap-y-5">
              {genresList.map((movies, index) => (
                <div className="max-w-72 " key={`${movies.id}-${index}`}>
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
          </InfiniteScroll>
        ) : (
          InfinityScroll(movie, getAllMovies, hasMore, loader, MovieCard)
        )}
      </div>
    </>
  );
}

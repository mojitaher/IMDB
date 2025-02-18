import { formatMovie, getMovieByName, getGenres } from "../../api/api";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import Searchbar from "../components/SearchBar";
import Header from "../components/Header";
import Tab from "../components/Tab";
import { Link } from "react-router-dom";
import axios from "axios";
import SkeletonLoader from "../components/skeletonLoader";

// import { useLoaderData } from "react-router-dom";
// export async function loader({ param }) {
//   const movies = getMovies(param);
//   return { movies };
// }

export default function Home() {
  //   const { movies } = useLoaderData();
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [movie, setMovie] = useState([]);
  const [loader, setLoader] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [genres, setGenres] = useState([]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setScroll(true);
    }
  };
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener("scroll", debounce(handleScroll, 500));
  window.scrollTo({ top: 0 });

  useEffect(() => {
    if (scroll) {
      setPage((nextPage) => page <= 21 && nextPage + 1);
      setScroll(false);
    }
  }, [scroll]);
  async function getMovies() {
    setLoader(true);
    const res = await axios.get(
      `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}`
    );
    return res.data.data.map(formatMovie);
  }
  useEffect(() => {
    getMovies()
      .then((movies) => {
        setMovie(movies);
        setMovieList(movies);
      })
      .finally(() => {
        setLoader(false);
      });
    getGenres().then((genres) => {
      genres = genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        movies_count: genre.movies_count,
        isSelected: false,
      }));

      genres.unshift({
        id: -1,
        name: "All",
        isSelected: true,
        movies_count: null,
      });

      setGenres(genres);
    });
  }, [page]);
  useEffect(() => {
    getMovieByName(movieList).then((movies) => {
      setMovieList(movies);
    });
  }, []);
  const handelSubmit = (event, movieSearch) => {
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

    return setMovie(movieResult);
  };

  function onGenreClick(genre) {
    genre = genre.toLowerCase();
    if (genre === "all".toLocaleLowerCase()) {
      setMovie(movieList);
      setGenres(genres);
      return;
    }

    const genresWithSelected = genres.map((eachGenre) => {
      if (eachGenre.name.toLocaleLowerCase() === genre) {
        return { ...eachGenre, isSelected: true };
      } else {
        return { ...eachGenre, isSelected: false };
      }
    });

    const genreFilteredMovies = movieList.filter((movie) =>
      movie.genres.some((g) => g.toLowerCase() === genre)
    );

    setMovie(genreFilteredMovies);
    setGenres(genresWithSelected);
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
      {genres
        .sort((o) => o.name)
        .map((genre) => (
          <Tab
            key={genre.id}
            props={{
              text: genre.name,
              id: genre.name,
              isSelected: genre.isSelected,
              onClick: onGenreClick,
            }}
          />
        ))}

      <div>
        <h3 className=" mx-32 text-gray-400 font-normal text-3xl leading-10 font-poppin flex items-baseline gap-1">
          ALL <span className="text-base leading-6">({movie.length})</span>
        </h3>
        <ul className="mx-32 inline-flex flex-wrap gap-x-6 gap-y-5">
          {movie.map((movies) => (
            <div className="max-w-72 " key={movies.id}>
              <Link to={`/Detail/${movies.id}`}>
                {!loader ? <MovieCard movie={movies} /> : <SkeletonLoader />}
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

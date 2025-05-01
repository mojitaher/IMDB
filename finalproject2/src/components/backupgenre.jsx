useEffect(() => {
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
}, []);

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
{
  genres
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
    ));
}

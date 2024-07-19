import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieByQuery } from 'services/API';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { MovieList } from '../../components/MovieList/MovieList';
import { Loader } from 'components/Loader/Loader';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieName, setMovieName] = useState('');

  // const [isLoading, setIsLoading] = useState(false);

  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const movieName = searchParams.get('query') ?? '';
    setMovieName(movieName);
    (async () => {
      try {
        // setIsLoading(true);
        const movies = await fetchMovieByQuery(movieName);
        setSearchResults(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        // setIsLoading(false);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <SearchBar value={movieName} onChange={updateQueryString} />
      {/* {isLoading ? (
        <Loader />
      ) : searchResults?.length > 0 ? (
        <MovieList movies={searchResults} />
      ) : (
        <h2>Nothing found! Please try again</h2>
      )} */}
      <Suspense fallback={<Loader />}>
        {searchResults?.length > 0 ? (
          <MovieList movies={searchResults} />
        ) : (
          <h2>Nothing found! Please try again</h2>
        )}
      </Suspense>
    </>
  );
};
export default MoviesPage;

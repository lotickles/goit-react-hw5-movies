import React from 'react';
import { fetchTrendingMovies } from 'services/API';
import { Link } from 'react-router-dom';
import wrapPromise from 'utils/wrapPromise';

const trendingMoviesPromise = wrapPromise(fetchTrendingMovies());

const TrendingMovies = () => {
  const trendingMovies = trendingMoviesPromise();
  return (
    <ul>
      {trendingMovies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default TrendingMovies;

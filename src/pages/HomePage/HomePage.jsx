import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import TrendingMovies from 'components/TrendingMovies/TrendingMovies';

const HomePage = () => {
  return (
    <div>
      <h1>Trending Movies</h1>
      <Suspense fallback={<Loader />}>
        <TrendingMovies />
      </Suspense>
    </div>
  );
};

export default HomePage;

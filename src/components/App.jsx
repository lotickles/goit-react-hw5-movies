import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import SharedLayout from './SharedLayout/SharedLayout';
// import HomePage from '../pages/HomePage/HomePage';
// import MoviesPage from 'pages/MoviesPage/MoviesPage';
// import { Reviews } from './Reviews/Reviews';

// lazy load should be a default export
const SharedLayout = lazy(() => import('./SharedLayout/SharedLayout'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('pages/MoviesPage/MoviesPage'));
// const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies">
          <Route index element={<MoviesPage />} />
          {/* <Route path=":movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<CastList />} />
            <Route path="reviews" element={<ReviewsList />} />
          </Route> */}
        </Route>

        {/* <Route path="reviews" element={<Reviews />} /> */}
      </Route>
    </Routes>
  );
};

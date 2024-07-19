import { useEffect, useState, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/API';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetailPage.module.css';

const MovieDetailsPage = () => {
  const [movieId] = useParams([]);
  const [movieDetails, setMovieDetails] = useState();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    (async () => {
      try {
        const movie = await fetchMovieDetails(movieId);
        setMovieDetails(movie);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [movieId]);

  if (!movieDetails) {
    return <Loader />;
  }
  return (
    <>
      <Link to={backLinkHref}>
        <Button text="<- Go Back" />
      </Link>
    </>
  );
};
export default MoviesPage;

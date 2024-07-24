import { useEffect, useState, Suspense } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/API';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetailPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

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

  const {
    title,
    release_date,
    popularity,
    overview,
    genres,
    poster_path,
    original_title,
  } = movieDetails || {};

  return (
    <>
      <Link to={-1}>Go Back</Link>
      <div className={css.Container}>
        <img
          width="300px"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://fakeimg.pl/600x400?text=No+Image+Available`
          }
          alt={original_title}
        />
        <div>
          <h1>
            {title} ({release_date.slice(0, 4)})
          </h1>
          <p>User score: {popularity}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <li className={css.List}>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </li>
        </div>
      </div>
      <hr />

      <div>
        <h3>Additional information</h3>
        <ul className={css.ListInfo}>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews" preventScrollReset={true}>
              Reviews
            </Link>
          </li>
        </ul>
        <hr />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default MovieDetailsPage;

import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/API';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
// import { Link } from 'react-router-dom';
import css from './MovieDetailPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
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
      <Link to={backLinkHref}>
        <Button text="<- Go Back" />
      </Link>
      <div className={css.Container}>
        <img
          width="300px"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
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
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    </>
  );
};
export default MovieDetailsPage;

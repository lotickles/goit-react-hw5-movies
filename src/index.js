import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { Loader } from 'components/Loader/Loader';
import { ErrorBoundary } from 'react-error-boundary';
import 'index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter basename="goit-react-hw5-movies">
          <App />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

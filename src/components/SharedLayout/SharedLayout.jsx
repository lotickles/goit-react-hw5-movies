import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Footer } from 'components/Footer/Footer';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <>
      <div className={css.container}>
        <Header />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </>
  );
};
export default SharedLayout;

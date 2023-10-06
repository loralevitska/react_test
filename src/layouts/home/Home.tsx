import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

function Home() {
  const { user } = useSelector(state => state.user);

  if (user) {
    return (
      <>
        <Header />
        <h1>{user.firstName}</h1>
        <h2>{user.lastName}</h2>
        <h3>{user.email}</h3>
      </>
    );
  }

  return <Header />;
}

export default Home;
